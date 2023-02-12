"use strict";

// eslint-disable-next-line no-undef
const baseUrl = chrome.runtime.getURL("build");
const head =
    document.head ||
    document.getElementsByTagName("head")[0] ||
    document.documentElement;
const body =
    document.body ||
    document.getElementsByTagName("body")[0] ||
    document.documentElement;

const app = document.createElement("div");
app.setAttribute("id", "instagramFollowersCheckerRoot");
app.setAttribute("data-baseUrl", baseUrl);
body.insertBefore(app, body.lastChild);

const style = document.createElement("link");
style.setAttribute("rel", "stylesheet");

const script = document.createElement("script");
script.setAttribute("type", "module");
fetch(baseUrl + "/asset-manifest.json").then(manifest => {
    manifest.json().then(json => {
        style.setAttribute("href", baseUrl + json.files["main.css"]);
        script.setAttribute("src", baseUrl + json.files["main.js"]);
        head.insertBefore(style, head.lastChild);
        head.insertBefore(script, head.lastChild);
    });
});
