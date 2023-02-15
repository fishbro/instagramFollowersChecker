import React, { useEffect } from "react";
import { type FollowersResult, getFollowersAndFollowing } from "core/followers";
import { EventSystem } from "App";
import { UserSpoiler } from "modules/CheckFollowers/c/UserSpoiler";

const CheckFollowers = () => {
    const [followers, setFollowers] = React.useState<FollowersResult>({
        followed: [],
        not_followed: [],
        is_private: []
    });
    const [loadStatus, setLoadStatus] = React.useState(0);

    const getFollowers = () => {
        getFollowersAndFollowing().then(data => setFollowers(data));
    };

    useEffect(() => {
        EventSystem.on("ChangeLoadStatus", setLoadStatus);

        return () => {
            EventSystem.off("ChangeLoadStatus", setLoadStatus);
        };
    }, [setLoadStatus]);

    const followersCount = Object.keys(followers).reduce((acc, key) => {
        // @ts-ignore
        return acc + followers[key].length || 0;
    }, 0);

    return (
        <>
            {loadStatus ? <div className="loadStatus">{loadStatus}</div> : null}
            {followersCount && !loadStatus ? (
                <div className="result">
                    {Object.keys(followers).map(type => (
                        <UserSpoiler
                            key={type}
                            type={type}
                            // @ts-ignore
                            users={followers[type]}
                        />
                    ))}
                </div>
            ) : null}
            {!loadStatus ? (
                <button
                    className={followersCount ? "reload" : "load"}
                    onClick={getFollowers}
                >
                    {followersCount ? "Reload" : "Get Followers"}
                </button>
            ) : null}
        </>
    );
};

export default CheckFollowers;
