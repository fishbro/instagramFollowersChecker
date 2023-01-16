import {parseParameter} from "/js/modules/misc.js";

const options = {
    appId: parseParameter("X-IG-App-ID"),
    viewerId: parseParameter("viewerId"),
};
const headers = new Headers([["x-ig-app-id", options.appId]]);

export async function callApi(
    userId = options.viewerId,
    querryType = "followers",
    qOptions = { count: 10 }
) {
    const querryOptions = Object.entries(qOptions)
        .reduce((acc, [opt, val]) => [...acc, opt + "=" + val], [])
        .join("&");
    return fetch(
        `https://www.instagram.com/api/v1/friendships/${userId}/${querryType}/?${querryOptions}`,
        {
            headers,
            body: null,
            method: "GET",
        }
    )
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}