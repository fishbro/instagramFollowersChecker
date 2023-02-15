import { User } from "core/followers";
import React from "react";
import { UserLine } from "modules/CheckFollowers/c/UserLine";

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
                    return <UserLine user={follower} key={follower.pk_id} />;
                })}
            </div>
        </div>
    );
};
