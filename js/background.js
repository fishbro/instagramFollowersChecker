import {callApi, options} from "/js/modules/api.js";
import {drawResult} from "/js/modules/draw.js";

const checkFollowers = async () => {
    const followers = await callApi({count: 200}, "followers");
    const following = await callApi({count: 200}, "following");
    const resultNode = app.querySelector(".result");

    let progress = 0;
    const usersPromises = [];
    for (let i = 0; i < following.users.length; i++) {
      const user = following.users[i];
      const user_id = user.pk;

      usersPromises.push(
          new Promise((resolve, _reject) => {
            setTimeout(resolve, i*500);
          }).then(() => {
              progress += 100 / following.users.length;
              resultNode.innerHTML = `
                <div class="p-list followed">
                  ${progress.toFixed(2) + "%"}
                </div>`;
              return callApi({count: 3}, "following", user_id)
          })
      );
    }

    Promise.all(usersPromises).then((data) => {
      following.users.forEach((user, key) => (user.followed = data[key]));
      const result = following.users.reduce((acc, user) => {
        if (user.followed.users.findIndex((u) => u.pk === options.viewerId.toString()) > -1) {
          acc.followed.push(user.username);
        }else if(user.is_private){
            if(followers.users.findIndex((u) => u.pk === user.pk.toString()) > -1){
                acc.followed.push(user.username);
            }else{
                acc.is_private.push(user.username);
            }
        }else{
          acc.not_followed.push(user.username);
        }
        return acc;
      }, {followed: [], not_followed: [], is_private: []});

        resultNode.innerHTML = drawResult(result);
    });
}

const body = document.querySelector("body");
const app = document.createElement("div");
app.id = "instagramFollowersCheckerApp";
app.innerHTML = `
  <div class="app" style="
    position: fixed; 
    top: 0; 
    right: 0; 
    max-height: 100vh; 
    width: 220px;
    display: flex;
    flex-direction: column;
    background: #fff;
    color: #000;
    padding: 1rem;
    box-sizing: border-box;
    border: none;
    line-height: 30px;
  ">
    <button style="
        background: #5500af;
        color: #fff;
        border-radius: 5px;
    ">Check followers</button>
    <div class="result" style="
        max-height: 100%;
        overflow-y: scroll;
    "></div>
  </div>
`;

window.addEventListener("load", async () => {
  body.appendChild(app);
  app.querySelector("button").addEventListener("click", checkFollowers);
});
