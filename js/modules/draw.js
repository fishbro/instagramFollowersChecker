export const drawResult = ({followed, not_followed, is_private}) => {
    return `
        <div class="p-list followed">
            <h3>Followed <span>(${followed.length})</span></h3>
            <ul>
                ${followed.map((user) => `<li>${user}</li>`).join("")}
            </ul>
        </div>
        <div class="p-list not_followed">
            <h3>Not followed <span>(${not_followed.length})</span></h3>
            <ul>
                ${not_followed.map((user) => `<li>${user}</li>`).join("")}
            </ul>
        </div>
        <div class="p-list is_private">
            <h3>Is private <span>(${is_private.length})</span></h3>
            <ul>
                ${is_private.map((user) => `<li>${user}</li>`).join("")}
            </ul>
        </div>
        <style>
            .p-list {
                line-height: 20px;
                padding: 0.5rem 0;
            }
            .p-list h3{
                color: #000;
            }
            .p-list ul li{
                color: #000;
            }
        </style>
    `;
}