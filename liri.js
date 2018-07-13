var key = require('./key');
// This client runs Spotify. 
var Spotify = require('node-spotify-api');
var spotify = new Spotify(key.spotify);
require("dotenv").config();

// This is the client that runs Twitter.
var Twitter = require('twitter');
var client = new Twitter(key.twitter);

//Who knows what this is actually used for. 
var request = require("request");
// This part of the npm framework for OMDB 
var omdb = require('omdb');

// We used this because the instructions ask us to use this
var fs = require("fs");

//Array of songs that will store the songs that people can input
var songArray = [];

//Directions asked that we made the default song The Ask... 
var song = 'The sign'

//I couldn't think of an applicable way to use the other method, so I'm stuck with using argv[2]
var startingPoints = process.argv[2];

if (process.argv.length >= 3) {
    //This is a for loop that will push the song array. 
    for (var i = 3; i < process.argv.length; i++) {
        songArray.push(process.argv[i]);
    }
    //This will append the song to the song array. 
    //songArray.push(song);
}
//Switch statements to allow ease of use between different systems
switch (startingPoints) {
    //If someone decides to use the tweet system.
    case 'my-tweets':
        tweets();
        break;

    //If someone decides to use the spotify system 
    case 'spotify-this-song':
        SpotifySongs();
        break;
    //If someone wants to look up a movie
    case 'movie-this':
        movie();
        break;

    case 'do-what-it-says':
        something();
        break;
    default:
    console.log('You typed nothing.')
}
//This defines what the tweet function actually does. 
function tweets() {
    var params = {screen_name: 'ichabodford'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].length);
  }
}
  else{
      console.log(error);
  }
});
    //What is the username of the Twitter account being used. 
    var userName = {
        screenName: 'ichabodford',
    }
    //This is what'll happen if there is no error. It will create a loop that will find the letters within the tweeet. 

    //What happens if there is an error; console.log will try it's best to determine where the problem's source is. 
};
//This function defines what the function 'SpotifySongs' actually does
function SpotifySongs() {
    //THis will search for something 
    spotify.search({ type: 'track', query: 'All the Small Things' },
    function(err, data) {
        if (err) {
            console.log('Error : ' + err);
            return;
        }

        // Do something with 'data'
        else {
            console.log('Artist: ' + data.tracks.items[0].artists[0].name);
            console.log('Album ' + data.tracks.items[0].album.name);

            // console.log('Artist: ' + data.tracks.items[0].artists[0]);
            // console.log('Album: ' + data.tracks.items[0].album[0]);
            // console.log('Song Name: ' + data.tracks.items[0]);
        }
        console.log(err);
    });
}
//This will define what the function 'movie' actually does.
function movie(movie) {
    //URL needed to make this thing work
    var URL = 'http://www.omdbapi.com/?t=' + searchMovie + '&plot=short&tomatoes=true';
    //Default string for searchmovie variable
    var searchMovie = '';
    //If the searchmovie string has no words inputted, it will simply be 'Mr. Nobody' as per the instructions
    if (movie = ''){
        searchMovie = 'Mr. Nobody';
    }
    //If that is not the case, it stores the variable movie
    else{
        searchMovie = movie;
    }
    //Removing all spaces and turning them into plusses when its being inputted into the URL. 
    searchMovie = searchMovie.trim().split(' ').join('+');


    request(URL, function(err, body){
        var jsonData = JSON.parse(body);
        //If there is an error, console.log will find it.
        if (err){
            console.log(err);
        }
        //If there is no error, it will
        else{
            console.log('Movie Name: ' + jsonData.title);
            console.log('Rating: ' + jsonData.imbdrating);
            console.log('Plot: ' + data.plot);
        }
    })
}
