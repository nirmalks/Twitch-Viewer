function TwitchViewer() {
    this.favChannels = [];
    this.favChannelsData = {};
}

TwitchViewer.prototype.init = function(){
    
};

TwitchViewer.prototype.getFavoriteChannels = function(){

};

TwitchViewer.prototype.makeRequest = function(url) {
    // https://wind-bow.glitch.me/twitch-api/channels/freecodecamp
    fetch(url).then(function(response) {
        return response.json();
    })
    .catch(function(err) {
        console.log(err);
    });
};
$(document).ready(function() {
    var twitch = new TwitchViewer();
    twitch.init();
});