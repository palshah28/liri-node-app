// Required Packages for LIRI BOT


var dotenv = require("dotenv").config();
var tweets = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

// Importing Keys.js file 


var keys = require("./keys.js");


var liriTweets = new tweets(keys.twitter);
var liriMusic = new spotify(keys.spotify);
//var argument1 = process.argv[2];

if(process.argv.length > 2) {

// Twitter Calls    

if(process.argv[2] == "my-tweets") {   
/* Twitter Package Code */
var twitterParams = {
    q: 'developer_liribot',
    count: 10
    }
 liriTweets.get('statuses/user_timeline', twitterParams, function(error, tweets, response) {
    if ( error ) {
        console.log('Error occurred: in Twitter Package API' + error);
        return;
    }
  if (!error) {
    console.log("***********YOUR MOST RECENT 10 TWEETS/RETWEETS OF THE DAY*******************");  
    for(i=0;i<tweets.length;i++)  
    {
        
       console.log("Tweet "+parseInt(i+1)+"->"+tweets[i].text);
    }
   
  }
});

// Spotify Calls

} else if (process.argv[2] == "spotify-this-song" &&  process.argv.length > 3) {
/* Spotify Package Code */
var songName = process.argv[3];
for(i=4;i<process.argv.length;i++) {
    songName = songName + " " + process.argv[i];
}
console.log(songName);
getSongDetails(songName);

} else if (process.argv[2] == "spotify-this-song" &&  process.argv.length <= 3) { 

    fs.readFile("random.txt","utf8", function(error, data) {

        if(error) {
        
        }
        if(data) {
            var songName = data;
            console.log("No Song Details Entered-----"+"Here is a song of my choice--"+"Enjoy the Track : " + songName );
            getSongDetails(songName);
        }
        
        });
   // console.log('No songs occurred: Spotify Call');
}



// OMDB Calls

else if (process.argv[2] == "movie-this" &&  process.argv.length > 3) {
/* OMDB Movie Package Code*/
var movieName = process.argv[3];
for(i=4;i<process.argv.length;i++) {
    movieName = movieName + "+" + process.argv[i];
}
console.log(movieName);
var queryURL = "http://www.omdbapi.com/?t="+movieName+"&y=&plot=short&apikey=trilogy" ;
getMovieDetails(queryURL);
} 
else if (process.argv[2] == "movie-this" &&  process.argv.length <=3){
var  movieName = "Mr."+"+"+"Nobody";
var queryURL = "http://www.omdbapi.com/?t="+movieName+"&y=&plot=short&apikey=trilogy"; 
console.log("If you haven't watched"+ "Mr. Nobody," +"then you should: <http://www.imdb.com/title/tt0485947/>") ;
console.log("It's on Netflix!"); 
getMovieDetails(queryURL);
}


// If no arguments


} else { console.log ("Sorry I dont get this : Please enter : my-tweets / spotify-this-song / movie-this / do-what-it-says")}



//Movie Details from OMDB

function getMovieDetails(queryURL) {
    request(queryURL, function(error, response, body) {
        if ( error ) {
            console.log('Error occurred: in OMDB  API' + error);
            return;
        } 
      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {
    
        // Parse the body of the site and recover just the imdbRating
    
        
       
        // console.log(JSON.parse(body).Awards);
        console.log("*************** YOUR REQUESTED MOVIE DETAILS FROM OMDB ****************");
        console.log("The movie's title is: " + JSON.parse(body).Title);
        console.log("The movie's release date is: " + JSON.parse(body).Released);
        console.log("The movie's IMDB rating: " + JSON.parse(body).imdbRating);
        console.log("Awards and Nominations: " + JSON.parse(body).Awards);
        console.log("The movie's plot: " + JSON.parse(body).Plot);
        console.log("Actors in the movie: " + JSON.parse(body).Actors);
        console.log("Language of the movie: " + JSON.parse(body).Language);
        console.log("Country where the movie was produced: " + JSON.parse(body).Country);
      // console.log("Rotten Tomtoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
      }
    });
}


// Song Details from Spotify

function getSongDetails(songName) {
    liriMusic.search({ type: 'track', query: songName }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: Spotify Call' + err);
            return;
        }
        if ( data ) {
            console.log("*************** YOUR REQUESTED TRACK DETAILS FROM SPOTIFY ****************");
            console.log("The Song's name --" +data.tracks.items[0].name);
            console.log("The Spotify Song URL --" +data.tracks.items[0].external_urls.spotify);
            console.log("The Album's name --" +data.tracks.items[0].album.name);
            console.log("The Artist name --" +data.tracks.items[0].artists[0].name);
         
            return;
        }
       
    });
}