import { getRandomIntInclusive, parseParameter } from "core/helpers";
import { mockupUser } from "core/followers";

const rootNode = document.getElementById(
    "instagramFollowersCheckerRoot"
) as HTMLElement;
const baseUrl = rootNode
    ? (rootNode.getAttribute("data-baseUrl") as string)
    : "";

export const options = {
    appId: parseParameter("X-IG-App-ID"),
    viewerId:
        parseParameter("viewerId") || "user" + getRandomIntInclusive(1, 10),
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
    querryType = "followers",
    userId = options.viewerId || null
) {
    if (!options.appId)
        return simulateApi({ ...qOptions, count: 10 }, querryType);

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

const simulateApi = (
    qOptions: IQueryOptions = { count: 10 },
    querryType = "followers"
) => {
    switch (querryType) {
        case "followers":
        case "following":
            return new Promise(resolve => {
                setTimeout(() => {
                    const users = [];
                    for (let i = 0; i < qOptions.count; i++) {
                        users.push({
                            ...mockupUser(getRandomIntInclusive(1, 10)),
                            pk: "user" + getRandomIntInclusive(1, 10),
                            pk_id: "user" + getRandomIntInclusive(1, 999999)
                        });
                    }
                    resolve({ users });
                }, 200);
            });
        default:
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({ users: [] });
                }, 200);
            });
    }
};
