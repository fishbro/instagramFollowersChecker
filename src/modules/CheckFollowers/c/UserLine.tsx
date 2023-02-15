import React from "react";
import { unfollowUser, User } from "core/followers";
import { Link } from "react-router-dom";

export const UserLine = ({ user }: { user: User }) => {
    const removeUser = () => {
        if (
            window.confirm(`Do you really want to unfollow ${user.username}?`)
        ) {
            unfollowUser(user);
        }
    };

    return (
        <div className="user" key={user.pk_id}>
            <div className="user__icon">
                <Link to={`/${user.username}`} target="_blank">
                    <img src={user.profile_pic_url} alt={user.full_name} />
                </Link>
            </div>
            <div className="user__name">
                <Link to={`/${user.username}`} target="_blank">
                    {user.username}
                </Link>
            </div>
            <button className="user__remove" onClick={removeUser}>
                ✕
            </button>
        </div>
    );
};
