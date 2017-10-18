function TwitchViewer() {
    this.favChannels = ["ESL_SC2", "cretetion", "freecodecamp", "gamereactor"];
    this.favChannelsData = [];
    this.twitchUrl = "https://wind-bow.glitch.me/twitch-api/";
}

TwitchViewer.prototype.init = function () {
    this.getFavoriteChannels();
};

TwitchViewer.prototype.getFavoriteChannels = function () {
    let self = this;
    let promises = [];
    let streamPromises = [];
    for (let i = 0; i < this.favChannels.length; i++) {
        promises.push(fetch(this.twitchUrl + "channels/" + this.favChannels[i]).then(function (response) {
            return response.json();
        }));

        streamPromises.push(fetch(this.twitchUrl + "streams/" + this.favChannels[i]).then(function (response) {
            return response.json();
        }));
    }
    Promise.all(promises)
        .then(function (data) {
            self.favChannelsData = data;
        })
        .catch(function (err) {
            console.log(err);
        });

    Promise.all(streamPromises)
        .then(function (data) {
            for (let i = 0; i < self.favChannelsData.length; i++) {
                self.favChannelsData[i].streamData = data[i];
            }

            self.populateTable(self.favChannelsData);
        })
        .catch(function (err) {
            console.log(err);
        });
};

TwitchViewer.prototype.populateTable = function (data) {
    let target = $('tbody');
    let channelStatus = "";

    for (let i = 0; i < data.length; i++) {
        if (data[i].status !== 404) {
            if (data[i].streamData.stream !== null && data[i].streamData.stream !== undefined) {
                channelStatus = data[i].status;
            } else {
                channelStatus = "offline";
            }
            target.append(`<tr><td><img width="75px" height="30px" alt="${data[i].name}" src="${data[i].logo}"/> </td><td> <a href="${data[i].url}">${data[i].name}</a> </td><td> ${channelStatus} </td></tr>`);
        }
    }
};

$(document).ready(function () {
    let twitch = new TwitchViewer();
    twitch.init();
});
