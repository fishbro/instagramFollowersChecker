import { callApi } from "core/api";
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
    callApi({ count: 200 }, "followers"); //who follow me
const following = (): Promise<{ users: User[] }> =>
    callApi({ count: 200 }, "following"); //who I follow

const getFollowers = (
    followingUsers: User[],
    followersUsers: User[],
    useAdditionalCheck = false
): Promise<FollowersResult> => {
    return new Promise<FollowersResult>(resolve => {
        const result: FollowersResult = {
            followed: [],
            not_followed: [],
            is_private: []
        };
        followersUsers.forEach(user => {
            result.followed.push(user);
        });

        const additionalCheck = (result.not_followed = followingUsers.filter(
            user => followersUsers.findIndex(u => u.pk === user.pk) === -1
        ));

        if (useAdditionalCheck) {
            console.log(additionalCheck); //TODO: do it if necessary for accounts doesn't included in following list
            setDB(result);
            resolve(result);
        }

        setDB(result);
        resolve(result);
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
