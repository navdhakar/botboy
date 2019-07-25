// SFPC Bot Workshop
// Daniel Shiffman
// https://github.com/shiffman/SFPC-Twitter-Bot-Workshop

// Bot that replies

// Create an Twitter object to connect to Twitter API
// npm install twit
var Twit = require('twit');

// Pulling all my twitter account info from another fil
// Making a Twit object for connection to the API

var T = new Twit({
  consumer_key:         'xgBSNwD7KzDS1ZPYlAH40tVtl',
  consumer_secret:      'CjscjEa8JffmvP9hNv53dqdoXNZx6d1OTfhxBbQNJncUSd0ELY',
  access_token:         '1153520709315883014-FB5y51BQWtX89bwg6sYjXH0KIAcXh2',
  access_token_secret:  'qYGtVPLOHbcXuh89VyY7CdmHiBO14qqvQGWCvRx5z57WY',
 // timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
 // strictSSL:            true,     // optional - requires SSL certificates to be valid.
})
// Setting up a user stream
var stream = T.stream('user');

// Anytime someone follows me
stream.on('follow', followed);

// Just looking at the event but I could tweet back!
function followed(event) {
  var name = event.source.name;
  var screenName = event.source.screen_name;
  console.log('I was followed by: ' + name + ' ' + screenName);
}

// Now looking for tweet events
// See: https://dev.twitter.com/streaming/userstreams
stream.on('tweet', tweetEvent);

// Here a tweet event is triggered!
function tweetEvent(tweet) {

  // If we wanted to write a file out
  // to look more closely at the data
  // var fs = require('fs');
  // var json = JSON.stringify(tweet,null,2);
  // fs.writeFile("tweet.json", json, output);

  // Who is this in reply to?
  var reply_to = tweet.in_reply_to_screen_name;
  // Who sent the tweet?
  var name = tweet.user.screen_name;
  // What is the text?
  var txt = tweet.text;

  // Ok, if this was in reply to me
  // Tweets by me show up here too
  if (reply_to === 'nav_dhakar') {

    // Get rid of the @ mention
    txt = txt.replace(/@nav_dhakar/g,'');

    // Start a reply back to the sender
    var replyText = '.@'+name + ' ';
    // Reverse their text
    for (var i = txt.length-1; i >= 0; i--) {
      replyText += txt.charAt(i);
    }

    // Post that tweet!
    T.post('statuses/update', { status: replyText }, tweeted);

    // Make sure it worked!
    function tweeted(err, reply) {
      if (err) {
        console.log(err.message);
      } else {
        console.log('Tweeted: ' + reply.text);
      }
    }
  }

} 