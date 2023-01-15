const parseParameter = (param) => {
  const container = [...document.querySelectorAll("script")].find((script) =>
    script.innerHTML.contains(param)
  );
  if (container) {
    const result = container.innerHTML.match(
      new RegExp(`"${param}":.?"([1-9]*)"`)
    );
    if (result && result[1]) return parseInt(result[1]);
    console.warn(`${param} not found!`);
  } else {
    console.warn(`${param} not found!`);
    return null;
  }
};

const options = {
  appId: parseParameter("X-IG-App-ID"),
  viewerId: parseParameter("viewerId"),
};

const headers = new Headers([["x-ig-app-id", options.appId]]);

async function callApi(
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

const followers = await callApi();

const usersPromises = [];
for (let i = 0; i < followers.users.length; i++) {
  const user = followers.users[i];
  const user_id = user.pk;

  usersPromises.push(callApi(user_id, "following"));
}

const usersData = Promise.all(usersPromises).then((data) => {
  followers.users.forEach((user, key) => (user.followed = data[key]));
  console.log(followers);
});
