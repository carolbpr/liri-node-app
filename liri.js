//COMMANDS: concert-this, spotify-this-song, movie-this, do-what-it-says

require("dotenv").config();
let fs = require("fs");
//var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);
let commands = process.argv[2];
let artist = process[3];
let queryUrl = "";

switch (commands) {
  case "concert-this": {
    console.log(commands)
    queryUrl = "https://rest.bandsintown.com/artists/"+ artist +"/events?app_id=codingbootcamp";
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
  var axios = require("axios");

  // Then run a request with axios to the OMDB API with the movie specified
  axios.get("https://rest.bandsintown.com/artists/"+ artist +"/events?app_id=codingbootcamp").then(
    function (response) {
      console.log("The movie's rating is: " + response);
    })
    .catch(function (error) {
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