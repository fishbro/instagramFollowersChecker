import React, { useEffect } from "react";
import { type FollowersResult, getFollowersAndFollowing } from "core/followers";
import { EventSystem } from "App";
import { UserSpoiler } from "modules/CheckFollowers/c/UserSpoiler";
import { getDB } from "core/localDB";

const CheckFollowers = () => {
    const [followers, setFollowers] = React.useState<FollowersResult>(getDB());
    const [loadStatus, setLoadStatus] = React.useState(0);

    const getFollowers = () => {
        getFollowersAndFollowing().then(data => setFollowers(data));
    };

    const updateFollowers = () => {
        setFollowers(getDB());
    };

    useEffect(() => {
        EventSystem.on("ChangeLoadStatus", setLoadStatus);
        EventSystem.on("UpdateFollowersData", updateFollowers);

        return () => {
            EventSystem.off("ChangeLoadStatus", setLoadStatus);
            EventSystem.off("UpdateFollowersData", updateFollowers);
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
