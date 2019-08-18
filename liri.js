//COMMANDS: concert-this, spotify-this-song, movie-this, do-what-it-says

require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
let keys = require("./keys.js");
let spotify = new Spotify(keys.spotify);
let commands = process.argv[2];
let parameter = process.argv[3];
let queryUrl = "";

switch (commands) {
  case "concert-this": {
    let artist = parameter;
    queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axiosFunction(queryUrl);
    break;
  }
  case "spotify-this-song": {
    console.log(commands)
    break;
  }
  case "movie-this": {
    console.log(commands)
    break;
  }
  case "do-what-it-says": {
    console.log(commands)
    break;
  }
}
function axiosFunction(queryUrl) {
  console.log(queryUrl);
  // Then run a request with axios to the OMDB API with the movie specified
  axios.get(queryUrl).then(
    (response) => {
      console.log(response.data.length);
      //console.log(artist);
      if (response.status === 200) {
        let concertInfo = response.data
        for (i = 0; i < concertInfo.length; i++) {
          let dateTime = concertInfo[i].datetime;
          let month = dateTime.substring(5, 7);
          let year = dateTime.substring(0, 4);
          let day = dateTime.substring(8, 10);
          let dateForm = month + "/" + day + "/" + year
          console.log("\n---------------------------------------------------\n");
          console.log("Name of the venue: " + concertInfo[i].venue.name);
          console.log("Venue Location: " + concertInfo[i].venue.city + ", " + concertInfo[i].venue.country);
          console.log("Date of the Event: " + dateForm);
        }
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
}