//COMMANDS: concert-this, spotify-this-song, movie-this, do-what-it-says

require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
let commands = process.argv[2];
let parameter = process.argv[3];
let queryUrl = "";
let file = "";

function start() {
  switch (commands) {
    case "concert-this": {
      bandsintown();
      break;
    }
    case "spotify-this-song": {
      spotifySearch();
      break;
    }
    case "movie-this": {
      onmb();
      break;
    }
    case "do-what-it-says": {
      doWhatitSays();
      break;
    }
  }
}

start();

function bandsintown() {
  logText(file + "REQUEST: " + commands + " " + parameter);
  queryUrl = "https://rest.bandsintown.com/artists/" + parameter + "/events?app_id=codingbootcamp";
  console.log(queryUrl);
  axios.get(queryUrl).then(
    (response) => {
      if (response.status === 200) {
        let concertInfo = response.data
        concertInfo.forEach(searchInfo => {
          let dateTime = searchInfo.datetime;
          let month = dateTime.substring(5, 7);
          let year = dateTime.substring(0, 4);
          let day = dateTime.substring(8, 10);
          let dateForm = month + "/" + day + "/" + year;
          console.log("\n---------------------------------------------------\n");
          logText("---------------------------------------------------");
          console.log(parameter + " Concert at:");
          logText(parameter + " Concert at:");
          console.log("Name of the venue: " + searchInfo.venue.name);
          logText("Name of the venue: " + searchInfo.venue.name);
          console.log("Venue Location: " + searchInfo.venue.city + ", " + searchInfo.venue.country);
          logText("Venue Location: " + searchInfo.venue.city + ", " + searchInfo.venue.country);
          console.log("Date of the Event: " + dateForm);
          logText("Date of the Event: " + dateForm);
          console.log("\n---------------------------------------------------\n");
          logText("---------------------------------------------------");
        })
      }
    })
    .catch((error) => {
      console.log(error.config);
    });
  console.log("Log file has been updated!");
};

function spotifySearch() {
  logText(file + "REQUEST: " + commands + " " + parameter);
  if (!parameter) { song = "The Sign" }
  else { song = parameter };
  spotify.search({ type: 'track', query: song }, (err, data) => {
    if (err) throw new Error(JSON.stringify(err));
    var songData = data.tracks.items[0];
    console.log("\n---------------------------------------------------\n");
    logText("---------------------------------------------------");
    console.log("Spotify Song: " + song);
    logText("Spotify Song: " + song);
    console.log("Artist(s): " + songData.artists[0].name);
    logText("Artist(s): " + songData.artists[0].name);
    console.log("Album: " + songData.album.name);
    logText("Album: " + songData.album.name);
    console.log("Song Title: " + songData.name);
    logText("Song Title: " + songData.name);
    console.log("Link: " + songData.external_urls.spotify);
    logText("Link: " + songData.external_urls.spotify);
    console.log("\n---------------------------------------------------\n");
    logText("---------------------------------------------------");
  });
  console.log("Log file has been updated!");
};

function onmb() {
  logText(file + "REQUEST: " + commands + " " + parameter);
  if (!parameter) { movieName = "Mr. Nobody" }
  else { movieName = parameter };
  queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"
  axios.get(queryUrl).then(
    (response) => {
      console.log("\n---------------------------------------------------\n");
      logText("\n---------------------------------------------------\n");
      console.log("Title of the movie: " + movieName);
      logText("Title of the movie: " + movieName);
      console.log("Year the movie came out: " + response.data.Year);
      logText("Year the movie came out: " + response.data.Year);
      console.log("IMDB Rating of the movie: " + response.data.Ratings[0].Value);
      logText("IMDB Rating of the movie: " + response.data.Ratings[0].Value);
      console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
      logText("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
      console.log("Country where the movie was produced: " + response.data.Country);
      logText("Country where the movie was produced: " + response.data.Country);
      console.log("Language of the movie: " + response.data.Language);
      logText("Language of the movie: " + response.data.Language);
      console.log("Plot of the movie: " + response.data.Plot);
      logText("Plot of the movie: " + response.data.Plot);
      console.log("Actors in the movie: " + response.data.Actors);
      logText("Actors in the movie: " + response.data.Actors);
    })
  console.log("Log file has been updated!");
};

function doWhatitSays() {
  logText("REQUEST: " + commands);
  file = "FILE COMMANDS ";
  fs.readFile("random.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    // Get the command and parameter from file
    data = data.split(", ");
    commands = data[0];
    parameter = data[1];
    start();
  })
};

function logText(datalog) {
  fs.appendFileSync("log.txt", `\n${datalog}`, function (err) {
    // If an error was experienced we will log it.
    if (err) {
      console.log(err);
    }
  });
};