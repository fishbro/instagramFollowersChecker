import React, { useEffect } from "react";
import {
    type FollowersResult,
    getFollowersAndFollowing,
    User
} from "core/followers";
import { EventSystem } from "App";

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

    return (
        <>
            <button onClick={getFollowers}>Get Followers</button>
            {loadStatus ? <div className="loadStatus">{loadStatus}</div> : null}
            <div className="result">
                {Object.keys(followers).map(key => {
                    return (
                        <div className="result__block" key={key}>
                            <h3>{key}</h3>
                            <ul>
                                {
                                    // @ts-ignore
                                    followers[key].map((follower: User) => {
                                        return (
                                            <li key={follower.username}>
                                                {/*<img src={follower.avatar_url} alt={follower.login} />*/}
                                                <span>{follower.username}</span>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default CheckFollowers;
