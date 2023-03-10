import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const rootNode = document.getElementById(
    "instagramFollowersCheckerRoot"
) as HTMLElement;
const root = ReactDOM.createRoot(
    rootNode || (document.getElementById("root") as HTMLElement)
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
