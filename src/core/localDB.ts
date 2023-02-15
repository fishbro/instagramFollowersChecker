import { FollowersResult } from "core/followers";

const defaultDB: FollowersResult = {
    followed: [],
    not_followed: [],
    is_private: []
};

if (!window.localStorage.getItem("followersCheckerDB"))
    window.localStorage.setItem(
        "followersCheckerDB",
        JSON.stringify(defaultDB)
    );

export const getDB = (): FollowersResult => {
    return JSON.parse(
        window.localStorage.getItem("followersCheckerDB") ||
            JSON.stringify(defaultDB)
    );
};

export const setDB = (data: FollowersResult) => {
    window.localStorage.setItem("followersCheckerDB", JSON.stringify(data));
};

export const clearDB = () => {
    window.localStorage.setItem(
        "followersCheckerDB",
        JSON.stringify(defaultDB)
    );
};

export const removeUserDB = (user_id: string) => {
    const db = getDB();
    const newDB = {
        followed: db.followed.filter(u => u.pk !== user_id),
        not_followed: db.not_followed.filter(u => u.pk !== user_id),
        is_private: db.is_private.filter(u => u.pk !== user_id)
    };
    setDB(newDB);
};
