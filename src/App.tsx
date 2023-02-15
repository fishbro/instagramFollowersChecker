import React from "react";
import "App.scss";
import CheckFollowers from "modules/CheckFollowers/CheckFollowers";
import EventEmitter from "eventemitter3";
import checkerIcon from "assets/img/checkerIcon.svg";
import closeIcon from "assets/img/closeIcon.svg";
import { options } from "core/api";

export const EventSystem = new EventEmitter();

const App = () => {
    const [show, setShow] = React.useState(false);

    return (
        <div
            className={`instagramFollowersCheckerApp ${show ? "show" : "hide"}`}
        >
            <div className="logo">FollowersChecker</div>
            <div className="app-button" onClick={() => setShow(!show)}>
                <img
                    src={`${options.baseUrl}${!show ? checkerIcon : closeIcon}`}
                    alt="Toggle App"
                />
            </div>
            <CheckFollowers />
        </div>
    );
};

export default App;
