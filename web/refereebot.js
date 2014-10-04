Players = new Mongo.Collection("players");

if (Meteor.isClient) {
  Template.scoreboard.players = function() {
    return Players.find({});
  }
  Template.scoreboard.events({
    'click button.reset': function () {
      Players.find({}).forEach(function (player) {
        Players.update(player._id, {$set: {score: 0}});
      });
    }
  });
  Template.player.events({
    'click button.inc': function () {
      // increment the counter when button is clicked
      Players.update(this._id, {$inc: {score: 1}});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
/*
    Players.find({}).forEach(function (player) {
      Players.remove(player._id);
    });
*/
    if (Players.find().count() === 0) {
      Players.insert({name: "Home", score: 0});
      Players.insert({name: "Away", score: 0});
    }
  HTTP.publishFormats({
    'json': function(result) {
      this.setContentType('application/json');
      // Return EJSON string
        return EJSON.stringify(result);
      }
    });
    HTTP.publish({name: 'players'}, function(data) {
      return Players.find({});
    });
  });
}
