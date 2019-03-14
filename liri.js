require("dotenv").config();

// Access files in 'keys.js'
const keys = require('./keys');

const fs = require('fs');

// NPM model used to access APIs
const axios = require('axios');

// NPM model used for moment.js
const moment = require('moment');

// NPM model for using Spotify's API
var Spotify = require('node-spotify-api');

// Going to be used to log information to 'log.txt'
var filename = './log.txt';

// vars
var spotify = new Spotify(keys.spotify);

// userCommand & inputPara
var  userCommand = process.argv[2];
var inputPara = process.argv[3];

// For multiple words in the 2nd user input 
for (var i = 4; i < process.argv.length; i++) {
    inputPara += '+' + process.argv[i];
}

const bitID = 'codingbootcamp';
const omdbID = 'trilogy';

var separation = "\n-----------END-------------\n";

const search = class {
    getSpotify(songName) {
        if (songName === undefined) {
            songName = "What's my age again?";
        }

        spotify.search(
            {
                type: "track",
                query: userCommand
            },
            function (err, data) {
                if (err) {
                    console.log("Error occurred: " + err);
                    return;
                }

                var songs = data.tracks.items;

                for (var i = 0; i < songs.length; i++) {
                    console.log(i);
                    console.log("artist(s): " + songs[i].artists.map(getArtistNames));
                    console.log("song name: " +songs[i].name)
                    console.log("preview song: " + songs[i].preview_url);
                    console.log("album: " + song[i].album.name);
                    console.log(separation)
                }
            }
        );
    };

    // CHECK THIS OVER ** you might not need the if statement upon testing
    getMovie(getMovie) {
        // OMDB Movie
        if (movie) {
            // Run the request to the OMDB API
            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=" + omdbID;
            axios.get(queryUrl)
            .then(function (response) {
                var i = 0; 
                var temp = [];
                do {
                    var rottenTomatoes = response.data.Ratings[i].Source;
                    var ratingRT = "";

                    if (rottenTomatoes === 'Rotten Tomatoes') {
                        temp.push(response.data.Ratings[i].Value);
                    }
                    i++;
                }
                while(i < response.data.Ratings.length);
                
                // ** Check this out before ** //
                console.log(getMovie());
                // console.log();

                var result = [
                    "Title: " + response.data.Title,
                    "Year: " + response.data.Year,
                    "imdbRating: " + response.data.imdbRating,
                    "Country: " + response.data.Country,
                    "Language: " + response.data.Language,
                    "Plot: " + response.data.Plot,
                    "Actors: " + response.data.Actors,
                    "Rotten Tomatoes " + temp[0]
                ].join(",");
                // .join("\n");

                console.log(result);
                console.log();

                // ** Log Command ... work around changing it **
                search.txtCommand(result);

            }).catch(function (err) {
                console.log(err)
            });

            // ****** CHECK THE IF YOU MIGHT NOT NEED THIS **** //
        } else {
            // Pretty much the same thing but with a set movie (I chose Deadpool instead of MR. Nobody cause it's more fun)
            movie = 'Deadpool';
            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=" + omdbID;
            axios.get(queryUrl).then(function (response) {
                var i = 0;
                var temp = [];
                do {
                    var rottenTomatoes = response.data.Ratings[i].Source;
                    var ratingRT = "";

                    if (rottenTomatoes === 'Rotten Tomatoes') {
                        temp.push(response.data.Ratings[i].Value);
                    }
                    i++;
                }
                while(i < response.data.Ratings.length);
                
                // ** Check this out before ** //
                console.log(getMovie());
                // console.log();

                var result = [
                    "Title: " + response.data.Title,
                    "Year: " + response.data.Year,
                    "imdbRating: " + response.data.imdbRating,
                    "Country: " + response.data.Country,
                    "Language: " + response.data.Language,
                    "Plot: " + response.data.Plot,
                    "Actors: " + response.data.Actors,
                    "Rotten Tomatoes " + temp[0]
                ].join(",");
                // .join("\n");

                console.log(result);
                console.log();

                // ** Log Command ... work around changing it **
                search.txtCommand(result);

            }).catch(function (err) {
                console.log(err)
            });
        }
    }

    getConcert(getArtistNames) {
        var bitUrl = `https://rest.bandsintown.com/artists/${getArtistNames}/events?app_id=${bitID}`;
        
        // Making a request
        axios.get(bitUrl).then(function (response) {

            // ** CHECK THIS OUT //

            var result = [
                "Name of venue: " + response.data[0].venue.name,
                "location: " + response.data[0].venue.city + ", " + response.data[0].venue.country,
                "Date: " + moment(response.data[0].datetime).format('MM/DD/YYYY')
            ].join(",");
            // .join("\n");
            
            console.log(result);
            console.log();

            // ** Log Command CHECK THIS OUT ** //
            search.txtCommand(result);
        }).catch(function (err) {
            console.log(err);
        });
    };

    getWhatItDo() {
       var response = "";
       fs.readFile('random.txt', 'utf-8', function(err,txt) {
            if (err)
                console.log(err);
            else {
                var itIsWhatItISMang = 'do-what-it-says';
                res = txt.split(',');
                command = res[0];
                var temp = "";
                if (command != itIsWhatItISMang) {
                    temp = res[1];
                    // ** CHECK THIS OUT ** //
                    query = temp.replace(/['"]+/g, '');
                    myCommands();
                } else {
                    console.log("that's null homie");
                }
            }
       });
    }
};

function myCommands(userCommand) {

    if(userCommand != undefined) {
        switch (userCommand) {
        case "concert-this":
            search.getConcert(inputPara);
            break;
        
        case "spotify-this-song":
            search.getSpotify(inputPara);
            break;

        case "movie-this":
            search.getMovie(inputPara);
            break;

        case "do-what-it-says":
            search.getWhatItDo(inputPara);
            break;
        }
    } else {
        console.log("Not a valid command")
    }
};