function TwitchViewer() {
    this.favChannels = ["ESL_SC2", "cretetion", "freecodecamp" , "comster404"];
    this.favChannelsData = [];
    this.twitchUrl = "https://wind-bow.glitch.me/twitch-api/channels/";
}

TwitchViewer.prototype.init = function(){
    this.getFavoriteChannels();
};

TwitchViewer.prototype.getFavoriteChannels = function(){
    var self = this;
    for(let i = 0 ; i < this.favChannels.length ; i++ ) {  
         fetch(this.twitchUrl + this.favChannels[i]).then(function(response) {
            return response.json();
        })
        .then(function(data) {
            self.favChannelsData.push(data);
        })
        .catch(function(err) {
            console.log(err);
        });  
    }
};

$(document).ready(function() {
    let twitch = new TwitchViewer();
    twitch.init();
});