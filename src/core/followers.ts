import { callApi, options } from "core/api";
import { EventSystem } from "App";
import { setDB } from "core/localDB";

export type User = {
    account_badges: string[];
    full_name: string;
    has_anonymous_profile_picture: boolean;
    is_private: boolean;
    is_verified: boolean;
    latest_reel_media: number;
    pk: string;
    pk_id: string;
    profile_pic_id: string;
    profile_pic_url: string;
    username: string;
    followed?: {
        users: User[];
    };
};

export type FollowersTypes = "followed" | "not_followed" | "is_private";
export type FollowersResult = {
    [t in FollowersTypes]: Array<User>;
};

const followers = (): Promise<{ users: User[] }> =>
    callApi({ count: 200 }, "followers");
const following = (): Promise<{ users: User[] }> =>
    callApi({ count: 200 }, "following");

const getFollowers = (followingUsers: User[], followersUsers: User[]) => {
    const usersPromises = [];
    for (let i = 0; i < followingUsers.length; i++) {
        const user = followingUsers[i];
        const user_id = parseInt(user.pk);

        usersPromises.push(
            new Promise((resolve, _reject) => {
                setTimeout(resolve, i * 500);
            }).then(() => {
                const prg = (100 / followingUsers.length) * i;
                console.log(prg.toFixed(2));
                EventSystem.emit("ChangeLoadStatus", prg.toFixed(2));
                return callApi({ count: 3 }, "following", user_id);
            })
        );
    }

    return Promise.all(usersPromises).then(data => {
        followingUsers.forEach((user, key) => (user.followed = data[key]));
        EventSystem.emit("ChangeLoadStatus", 0);
        const users = followingUsers.reduce(
            (acc: FollowersResult, user) => {
                if (
                    user.followed &&
                    user.followed.users.findIndex(
                        u => u.pk === options.viewerId?.toString()
                    ) > -1
                ) {
                    acc.followed.push(user);
                } else if (user.is_private) {
                    if (
                        followersUsers.findIndex(
                            u => u.pk === user.pk.toString()
                        ) > -1
                    ) {
                        acc.followed.push(user);
                    } else {
                        acc.is_private.push(user);
                    }
                } else {
                    acc.not_followed.push(user);
                }
                return acc;
            },
            { followed: [], not_followed: [], is_private: [] }
        );
        setDB(users);

        return users;
    });
};

export const unfollowUser = (user: User): Promise<any> => {
    return callApi({}, "unfollow", parseInt(user.pk), true);
};

export const getFollowersAndFollowing = (): Promise<FollowersResult> => {
    return Promise.all([followers(), following()]).then(
        ([followers, following]) => {
            return getFollowers(following.users, followers.users);
        }
    );
};

export const mockupUser = (id: number): User => ({
    account_badges: [],
    full_name: `User ${id}`,
    has_anonymous_profile_picture: false,
    is_private: false,
    is_verified: false,
    latest_reel_media: 0,
    pk: "user" + id,
    pk_id: "user" + id,
    profile_pic_id: id.toString(),
    profile_pic_url: `https://picsum.photos/200/200?random=${id}`,
    username: `user${id}`
});
