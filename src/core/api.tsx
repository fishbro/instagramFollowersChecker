import { parseParameter } from "core/helpers";

const rootNode = document.getElementById(
    "instagramFollowersCheckerApp"
) as HTMLElement;
const baseUrl = rootNode
    ? (rootNode.getAttribute("data-baseUrl") as string)
    : "";

export const options = {
    appId: parseParameter("X-IG-App-ID"),
    viewerId: parseParameter("viewerId"),
    baseUrl
};
const headers = new Headers([
    ["x-ig-app-id", options?.appId?.toString() || ""]
]);

interface IQueryOptions {
    [x: string]: string | number;
}

export async function callApi(
    qOptions: IQueryOptions = { count: 10 },
    querryType = "CheckFollowers",
    userId = options.viewerId
) {
    const queryOptions = Object.entries(qOptions)
        .reduce((acc: string[], [opt, val]) => [...acc, opt + "=" + val], [])
        .join("&");
    return fetch(
        `https://www.instagram.com/api/v1/friendships/${userId}/${querryType}/?${queryOptions}`,
        {
            headers,
            body: null,
            method: "GET"
        }
    )
        .then(response => response.json())
        .then(data => {
            return data;
        });
}
