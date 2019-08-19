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

switch (commands) {
  case "concert-this": {
    let artist = parameter;
    queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    bandsintown(queryUrl);
    break;
  }
  case "spotify-this-song": {
    console.log(commands);
    spotifySearch();
    break;
  }
  case "movie-this": {
    console.log(commands);
    onmb();
    break;
  }
  case "do-what-it-says": {
    console.log(commands)
    break;
  }
}
function bandsintown(queryUrl) {
  console.log(queryUrl);
  // Then run a request with axios to the OMDB API with the movie specified
  axios.get(queryUrl).then(
    (response) => {
      console.log(response.data.length);
      //console.log(artist);
      if (response.status === 200) {
        let concertInfo = response.data
        concertInfo.forEach(searchInfo => {
          let dateTime = searchInfo.datetime;
          let month = dateTime.substring(5, 7);
          let year = dateTime.substring(0, 4);
          let day = dateTime.substring(8, 10);
          let dateForm = month + "/" + day + "/" + year

          console.log("\n---------------------------------------------------\n");
          console.log(parameter + " Concert at:");
          console.log("Name of the venue: " + searchInfo.venue.name);
          console.log("Venue Location: " + searchInfo.venue.city + ", " + searchInfo.venue.country);
          console.log("Date of the Event: " + dateForm);
          console.log("\n---------------------------------------------------\n");
        })
      }

    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
};

function spotifySearch() {
  if (!parameter) { song = "The Sign" }
  else { song = parameter };

  spotify.search({ type: 'track', query: song }, (err, data) => {

    if (err) throw new Error(JSON.stringify(err));
    var songData = data.tracks.items[0];
    console.log("\n---------------------------------------------------\n");
    console.log("Spotify Song: " + song);
    console.log("Artist(s): " + songData.artists[0].name);
    console.log("Album: " + songData.album.name);
    console.log("Song Title: " + songData.name);
    console.log("Link: " + songData.external_urls.spotify);
    console.log("\n---------------------------------------------------\n");
  });
};

function onmb() {
  if (!parameter) { movieName = "Mr. Nobody" }
  else { movieName = parameter };
  queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"
  axios.get(queryUrl).then(
    (response) => {
      console.log("\n---------------------------------------------------\n");
      console.log("Title of the movie: " + movieName);
      console.log("Year the movie came out: " + response.data.Year);
      console.log("IMDB Rating of the movie: " + response.data.Ratings[0].Value);
      console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
      console.log("Country where the movie was produced: " + response.data.Country);
      console.log("Language of the movie: " + response.data.Language);
      console.log("Plot of the movie: " + response.data.Plot);
      console.log("Actors in the movie: " + response.data.Actors);
    })
}
