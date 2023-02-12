import React from "react";
import "App.scss";
import CheckFollowers from "modules/CheckFollowers/CheckFollowers";
import EventEmitter from "eventemitter3";

export const EventSystem = new EventEmitter();

const App = () => {
    return (
        <div className="instagramFollowersCheckerApp">
            <CheckFollowers />
        </div>
    );
};

export default App;
