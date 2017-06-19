// Calling all node packages
	// fs
var fs = require("fs");
	// Inquirer 
var inquirer = require("inquirer");
	// Request
var request = require("request");
	// Twitter
var Twitter = require("twitter");
	// Spotify
var spotify = require("node-spotify-api");

// Getting the Keys required for the Twitter API
var keys = require("./keys.js");
	// And setting variables for them
	var consumer_key = keys.twitterKeys.consumer_key;
		// console.log(consumer_key);
	var consumer_secret = keys.twitterKeys.consumer_secret;
	var access_token_key = keys.twitterKeys.access_token_key;
	var access_token_secret = keys.twitterKeys.access_token_secret;

// Use Inquirer to capture user input
inquirer.prompt([
	{
		type:"input",
		message:"Good Morning! What would you like to do today?",
		name:"userInput"
	}
]).then(function(user){

	// Once user input has been captured, set up switch cases 
	switch (user.userInput){
		// For Twitter
		case "my-tweets":
			twitter();
			break;

		// For Spotify
		case "spotify-this-song":
			spotify();
			break;

		// For Movies
		case "movie-this":
			movies();
			break;

		// For Do-what-it-says
		case "do-what-it-says":
			read();
			break;

		// If an undefinable input is captured 
		default:
			console.log("LIRI is unable to process your request");
	}


// If the "twitter" function is called
function twitter() {
	
	var client = new Twitter({
  	consumer_key: consumer_key,
  	consumer_secret: consumer_secret,
  	access_token_key: access_token_key,
  	access_token_secret: access_token_secret
		});

	var params = {screen_name: 'Autolycus_Cat'};
	
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {
    	for (var i = 0; i < 20; i++) {
      	console.log(tweets[i].text);
      		//TO FIX: Showing tweets, but still throwing an error
       }
  	}
	});
}

// If the "movies" function is called
function movies() {

	var movieInput = process.argv;
	var movieTitle = "";

	if (process.argv[3] == undefined){

		request("http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&apikey=40e9cece", function(error, response, body) {

	  	if (!error && response.statusCode === 200) {
	    console.log("The movie's Title is: " + JSON.parse(body).Title);
	    console.log("Release Year: " + JSON.parse(body).Year);
	    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	    console.log("Country: " + JSON.parse(body).Country);
	    console.log("Language: " + JSON.parse(body).Language);
	    console.log("Plot: " + JSON.parse(body).Plot);
	  	console.log("Actors: " + JSON.parse(body).Actors);
	  	console.log("Website: " + JSON.parse(body).Website);
	  	}
		});	
	}

	else{

		for (var i = 1; i < movieInput.length; i++) {

	  	if (i > 1 && i < movieInput.length) {
	    movieTitle = movieTitle + "+" + movieInput[i];
	  	}

	  	else {
	    movieTitle += movieInput[i];
	  	}
		}

		request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

	  	if (!error && response.statusCode === 200) {
	    console.log("The movie's Title is: " + JSON.parse(body).Title);
	    console.log("Release Year: " + JSON.parse(body).Year);
	    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	    console.log("Country: " + JSON.parse(body).Country);
	    console.log("Language: " + JSON.parse(body).Language);
	    console.log("Plot: " + JSON.parse(body).Plot);
	  	console.log("Actors: " + JSON.parse(body).Actors);
	  	console.log("Website: " + JSON.parse(body).Website);
	  	}
		});
	}	
}



//End of Inquirer Prompt/End of input
})