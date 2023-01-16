import {callApi} from "/js/modules/api.js";

window.addEventListener("load", async () => {

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

});
