import {callApi, options} from "/js/modules/api.js";

const checkFollowers = async () => {
    const followers = await callApi({count: 200}, "following");

    const usersPromises = [];
    for (let i = 0; i < followers.users.length; i++) {
      const user = followers.users[i];
      const user_id = user.pk;

      usersPromises.push(
          new Promise((resolve, reject) => {
            setTimeout(resolve, i*500);
          }).then(() => callApi({count: 3}, "following", user_id))
      );
    }

    Promise.all(usersPromises).then((data) => {
      followers.users.forEach((user, key) => (user.followed = data[key]));
      const result = followers.users.reduce((acc, user) => {
        if (user.followed.users.findIndex((u) => u.pk === options.viewerId.toString()) > -1) {
          acc.followed.push(user.username);
        }else if(user.is_private){ //TODO: check personal followers list if user is private
          acc.is_private.push(user.username);
        }else{
          acc.not_followed.push(user.username);
        }
        return acc;
      }, {followed: [], not_followed: [], is_private: []});

      console.log({followers, result});
    });
}

const body = document.querySelector("body");
const app = document.createElement("div");
app.id = "instagramFollowersCheckerApp";
app.innerHTML = `
  <div class="app" style="position: fixed; top: 1rem; right: 1rem;">
    <button>Check followers</button>
    <div class="result"></div>
  </div>
`;

window.addEventListener("load", async () => {
  body.appendChild(app);
  app.querySelector("button").addEventListener("click", checkFollowers);
});
