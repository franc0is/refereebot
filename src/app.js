/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');

var wind = new UI.Window();
var player1 = new UI.Text({
 position: new Vector2(0, 0),
 size: new Vector2(144, 84),
 font: 'bitham-42-bold',
 color: 'white',
 textAlign: 'center',
 text: '0'
});
var player2 = new UI.Text({
 position: new Vector2(0, 84),
 size: new Vector2(144, 84),
 font: 'bitham-42-bold',
 color: 'white',
 textAlign: 'center',
 text: '0'
});
wind.add(player1);
wind.add(player2);

wind.show();

setInterval(function() {
  console.log("INTERVAL");
  var ajax = require('ajax');
  ajax({ url: 'http://pebbleref.meteor.com/players', type: 'json' },
    function(data) {
      console.log("home: " + data[0].score);
      console.log("away: " + data[1].score);
      player1.text(data[0].score);
      player2.text(data[1].score);
    }
  );
}, 5000);

