import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootNode = document.getElementById(
    "instagramFollowersCheckerRoot"
) as HTMLElement;
const root = ReactDOM.createRoot(
    rootNode || (document.getElementById("root") as HTMLElement)
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
