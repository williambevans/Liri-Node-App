require("dotenv").config();

var Spotify = require('node-spotify-api');

var axios = require("axios");

var keys = require("./keys");

var inquirer = require("inquirer");

var spotify = new Spotify(keys.spotify);



var userInput;


inquirer
    .prompt([

        {
            type: "list",
            message: "Please choose what type of search you would like to execute...",
            choices: ["Concerts", "Songs", "Movies"],
            name: "execution"
        },
        {
            type: "input",
            message: "What would you like to search today?",
            name: "input"
        }

    ])
    .then(function (inquirerResponse) {

        userInput = inquirerResponse.input

        if (inquirerResponse.execution === "Concerts") {
            concertThis();
        } else if (inquirerResponse.execution === "Songs") {
            spotifyThis();
        } else if (inquirerResponse.execution === "Movies") {
            movieThis();
        } else console.log("Sorry, invalid input. Please re-run program...")
    });




function concertThis(err, data) {
    console.log("Hello World!");
    var queryUrl = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {

            var venue = response.data[1].venue.name;
            var country = response.data[1].venue.country;
            var city = response.data[1].venue.city;
            var state = response.data[1].venue.region;
            var time = response.data[1].datetime;
            console.log(venue);
            console.log(country);
            console.log(city + ", " + state);
            console.log(time);
        }
    );
}


function spotifyThis(err, data) {
    spotify.search({
            type: 'track',
            query: userInput
        })
        .then(function (response) {

            artist = (response.tracks.items[1].artists[0].name);
            song = (response.tracks.items[1].name);
            preview = (response.tracks.items[1].album.external_urls.spotify);
            album = (response.tracks.items[1].album.name);
            console.log('');
            console.log("Artist: " + artist);
            console.log("Song Name: " + song);
            console.log("Album name: " + album);
            console.log("Click here to listen now! " + preview);
            console.log('');
        })
        .catch(function (err) {
            console.log(err);
        });
}


function movieThis(err, data) {
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log(response);
            debugger;
            var movieName = response.data.Title;
            var yearReleased = response.data.Year;
            var rated = response.data.Rated;
            var releaseDate = response.data.Released;
            var runTime = response.data.Runtime;
            var genre = response.data.Genre;
            var director = response.data.Director;
            var actors = response.data.Actors;
            var plot = response.data.Plot;
            var language = response.data.Language;
            var country = response.data.Country;
            var rating = response.data.Ratings[0].Source + " " + response.data.Ratings[0].Value;

            console.log('');
            console.log('Movie Name: ' + movieName);
            console.log('Year released: ' + yearReleased);
            console.log('Rating: ' + rating);
            console.log('Country produced: ' + country);
            console.log('Language: ' + language)
            console.log('Viewer Rated: ' + rated);
            console.log('Date Released: ' + releaseDate);
            console.log('Runtime: ' + runTime);
            console.log('Genre: ' + genre);
            console.log('Movie Director:' + director);
            console.log('Actors: ' + actors);
            console.log('Plot: ' + plot);
            console.log('');

        }
    ).catch(function (err) {
        console.log(err);
    });
}