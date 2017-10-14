function TwitchViewer() {
    this.favChannels = ["ESL_SC2", "cretetion", "freecodecamp", "comster404"];
    this.favChannelsData = [];
    this.twitchUrl = "https://wind-bow.glitch.me/twitch-api/channels/";
}

TwitchViewer.prototype.init = function () {
    this.getFavoriteChannels();
    console.log(this.favChannelsData);

};

TwitchViewer.prototype.getFavoriteChannels = function () {
    let self = this;
    let promises = [];
    for (let i = 0; i < this.favChannels.length; i++) {
        promises.push(fetch(this.twitchUrl + this.favChannels[i]).then(function (response) {
            return response.json();
        }));
    }
    Promise.all(promises)
        .then(function (data) {
            self.favChannelsData = data;
            self.populateTable(self.favChannelsData);
        })
        .catch(function (err) {
            console.log(err);
        });
};

TwitchViewer.prototype.populateTable = function (data) {
    console.log(data);
    let target = $('tbody');
    for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        if(data[i].status !== 404) {
            target.append(`<tr><td><img alt="${data[i].name}" src="${data[i].logo}"/> </td><td> ${data[i].name} </td><td> ${data[i].status} </td></tr>`);
        }
    }
};

$(document).ready(function () {
    let twitch = new TwitchViewer();
    twitch.init();
});