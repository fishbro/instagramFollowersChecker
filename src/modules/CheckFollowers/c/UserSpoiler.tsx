import { User } from "core/followers";
import React from "react";

export const UserSpoiler = ({
    type,
    users
}: {
    type: string;
    users: User[];
}) => {
    const [show, setShow] = React.useState(type === "not_followed");

    if (!users.length) return null;
    return (
        <div className={`user-list ${show ? "show" : "hide"}`} key={type}>
            <div className="user-list__title" onClick={() => setShow(!show)}>
                {type}: {users.length}
            </div>
            <div className="user-list__users">
                {users.map((follower: User) => {
                    return (
                        <div className="user" key={follower.pk_id}>
                            <div className="user__icon">
                                <img
                                    src={follower.profile_pic_url}
                                    alt={follower.full_name}
                                />
                            </div>
                            <div className="user__name">
                                {follower.username}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
