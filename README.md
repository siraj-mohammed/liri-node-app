# LIRI Bot


### Overview
LIRI is like iPhone's SIRI. While SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.


### Instructions
LIRI accepts one of the following commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

Example:   
* `movie-this "The Matrix"`


### What Each Command Does
1. `node liri.js concert-this <artist/band name here>`
* This searches the Bands in Town Artist Events API for an artist and renders the following information about each event to the terminal:
    * Name of the venue
    * Venue location
    * Date of the Event (in "MM/DD/YYYY" format)

2. `node liri.js spotify-this-song '<song name here>'`
 * This shows the following information about the song in the terminal/bash window:
    * Artist(s)     
    * The song's name     
    * A preview link of the song from Spotify     
    * The album that the song is from

3. `node liri.js movie-this '<movie name here>'`
* This will output the following information to the terminal/bash window:
    * Title of the movie
    * Year the movie came out
    * IMDB Rating of the movie
    * Rotten Tomatoes Rating of the movie
    * Country where the movie was produced
    * Language of the movie
    * Plot of the movie
    * Actors in the movie

4. `node liri.js do-what-it-says`
* LIRI will take the text inside of random.txt and then use it to call one of its commands

In addition, all commands and outputs are appended to the `log.txt` file


** Note **
To run this app, you'll need to create a _.env_ file in the root directory, and add the following in it:

```
# Spotify API keys

SPOTIFY_ID=<your-spotify-id-here>
SPOTIFY_SECRET=<your-spotify-secret-here>
```

### APIs/Libraries Used
* Node.js
* DotEnv
* Request
* Node-Spotify-API
* Moment
* Bands in Town API [https://rest.bandsintown.com/artists/]
* OMDB API