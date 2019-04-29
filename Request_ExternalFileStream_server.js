// Declare Vars & Read Files

var fs = require('fs'),
    http = require('http'),
    url = require('url'),
    path = require('path');
var movie_webm, movie_mp4, movie_ogg;

const request = require('request');

// Serve & Stream Video
http.createServer(function (req, res) {
    console.log("Inside http.createServer block");

    if (req.url == "/movie") {
        console.log("Inside req.url  block");

        // NOTE:  In order to execute this script and stream via the Windows10 cmd window, we must set the HTTP_PROXY env variable.
        //        Execute this command:
        //               set HTTP_PROXY=http://proxy-fw.intelink.gov

        // Below request is an example how to dump out the body of the request....whether it's binary or html
        //   NOTE: this request will NOT stream because it returns HTML that is rendered by the browser to stream.
        // request("http://mazwai.com/#/grid/videos/179", function (error, response, body) { 
        
        // These next 3 request do return binaries that stream because they are direct links to .mp4's.  
        //    They are located at https://www.pexels.com/videos.  I sourced the html page to get their direct links off the server.
        //    i.e. Beach 
        request("https://player.vimeo.com/external/310295912.sd.mp4?s=4b4a6fd5d3ace225e0cb284b46c1abbb00cd70ae&amp;profile_id=164&amp;oauth2_token_id=57447761", function (error, response) {    
        //    i.e. Space Mountains Lake
        //request("https://player.vimeo.com/external/236075858.sd.mp4?s=488e67b8e35ca33ef18880b46bb4752da56a4035&amp;profile_id=164&amp;oauth2_token_id=57447761", function (error, response) { 
        //    i.e. Sunset time lapse
        //request("https://player.vimeo.com/external/306619138.sd.mp4?s=a7cb8a56ee700da618a4bc6bdd474eca0cf75d92&amp;profile_id=164&amp;oauth2_token_id=57447761", function (error, response) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            // console.log('body:', body);  // Print the HTML for the specific content
        }).pipe(res)
    }
    
}).listen(3000, function () {
    console.log('Listening on port 3000!')
  });
