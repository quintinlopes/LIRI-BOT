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

var seperation = "\n-----------END-------------\n";

