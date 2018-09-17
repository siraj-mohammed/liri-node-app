require("dotenv").config(); // To set the Spotify ID and Secret from the .env file
var keys = require("./keys"); // Used for initializing the Spotify object on line 8
var request = require("request"); // To make REST API calls
var Spotify = require("node-spotify-api"); // Spotify API
var moment = require("moment"); // To format datetime returned by the BandsInTown API
var fs = require("fs"); // To append all app logs in the log.txt file, and to read from random.txt

var spotify = new Spotify(keys.spotify);

command = process.argv[2]; // what must the app do
keyword = process.argv[3]; // search/action keyword

switch(command){ // Run the appropriate function based on command received from user
    case "concert-this":
        concertSearch(keyword);
        break;
    case "spotify-this-song":
        spotifySearch(keyword)
        break;
    case "movie-this":
        movieSearch(keyword);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("Sorry, I did not understand that ¯\\_(ツ)_/¯")
}

function concertSearch(keyword){
    console.log ("Let me search for bands in town...");
    var query = keyword || "Drake";
    var URL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp"
    request(URL, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var result = JSON.parse(body);
            var limit = (result.length > 10) ? 10 : result.length; // Limit results to 10
            var location;
            if (limit > 0){
                console.log ("OK. Here's what I found:");
                console.log(' ');
                for (var i = 0; i < limit ; i++){
                    if (limit > 1){
                        console.log ("=== Event " + (i + 1) + " info ===");
                    }
                    console.log("Venue: " + result[i].venue.name);
                    location = ""; // Used for building the location in the 'city, state, country' format
                    if (result[i].venue.city){
                        location += result[i].venue.city + ", "; 
                    }
                    if (result[i].venue.region){
                        location += result[i].venue.region + ", ";
                    }
                    if (result[i].venue.country){
                        location += result[i].venue.country;
                    }
                    console.log("Location: " + location);
                    date = moment(result[i].datetime).format("MM/DD/YYYY"); // Formatting date in the given format using Moment JS
                    console.log("Date: " + date);
                    console.log(' ');
                    // Add the command and keyword, along with results, to log.txt
                    appendLog(command + "," + keyword + "\n"
                    + JSON.stringify(result, null, 2) + "\n"
                    + "====================================================================================" + "\n"
                    );
                }
            }
            else {
                console.log("Sorry, no matching concerts were found");
                return;
            }
        } else {
            console.log("Error: " + error);
            return;
        }
    });
    
}

function spotifySearch(keyword){
    console.log ("Let me search Spotify...");
    var query = keyword || "The Sign Ace of Base";
    spotify.search({type: "track", query: query}, function(error, data) {
        if (error) {
            console.log("Error: " + error);
            return;
        }
        if (data.tracks.items.length > 0){
            var result = data.tracks.items[0];
            console.log ("OK. Here's what I found:");
            console.log(' ');
            console.log("Artist: " + result.artists[0].name + "\n"
            + "Name of Song: " + result.name + "\n"
            + "Preview Link: " + result.preview_url + "\n"
            + "Album: " + result.album.name
            );
            console.log(' ');
            // Add the command and keyword, along with results, to log.txt
            appendLog(command + "," + keyword + "\n"
            + JSON.stringify(result, null, 2) + "\n"
            + "====================================================================================" + "\n"
            );
        } else {
            console.log("Sorry, no matching songs were found");
        }
    });
}

function movieSearch(keyword){
    console.log ("Let me lookup that movie...");
    var query = keyword || "Mr. Nobody";
    if(query === "Mr. Nobody"){
        console.log('');
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
        console.log('');
    }
    var URL = "http://www.omdbapi.com/?t=" + query + "&tomatoes=true&plot=short&apikey=trilogy";
    request(URL, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var result = JSON.parse(body);
            if (result.Title){
                console.log ("OK. Here's what I found:");
                console.log(' ');
                console.log("Title: " + result.Title + "\n"
                + "Year: " + result.Year + "\n"
                + "IMDb Rating: " + result.imdbRating + "\n"
                + "Rotten Tomatoes Rating: " + result.tomatoRating + "\n"
                + "Country: " + result.Country + "\n"
                + "Language: " + result.Language + "\n"
                + "Plot: " + result.Plot + "\n"
                + "Actors: " + result.Actors
                );
                console.log(' ');
                // Add the command and keyword, along with results, to log.txt
                appendLog(command + "," + keyword + "\n"
                + JSON.stringify(result, null, 2) + "\n"
                + "====================================================================================" + "\n"
                );
            } else {
                console.log("Sorry, no matching movies were found");
                return;
            }
        } else {
            console.log("Error: " + error);
            return;
        }
    });
}

function doWhatItSays(){
    fs.readFile('random.txt', 'utf8', function(err, data) {
        if(err) throw err;
        var command = data.split(',');
        spotifySearch(command[1]);
    });
}

function appendLog(data){
    fs.appendFile('log.txt', data, function(err) {
        if(err) {
          console.log(err);
        }
    });
}