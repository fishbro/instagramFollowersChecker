import {parseParameter} from "/js/modules/misc.js";

export const options = {
    appId: parseParameter("X-IG-App-ID"),
    viewerId: parseParameter("viewerId"),
};
const headers = new Headers([["x-ig-app-id", options.appId]]);

export async function callApi(
    qOptions = { count: 10 },
    querryType = "followers",
    userId = options.viewerId
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