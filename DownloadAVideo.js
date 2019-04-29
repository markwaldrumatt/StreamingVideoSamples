// NOTE:  In order to execute this script and access any stream via the Windows10 cmd window, we must set the HTTP_PROXY env variable.
//           Execute this command:
//                  set HTTP_PROXY=http://proxy-fw.intelink.gov

// Declare Vars
var fs = require('fs');
var http = require('https'); 

//var sourceURL = "https://player.vimeo.com/external/236075858.sd.mp4?s=488e67b8e35ca33ef18880b46bb4752da56a4035&amp;profile_id=164&amp;oauth2_token_id=57447761";
var sourceURL = "https://player.vimeo.com/external/310295912.sd.mp4?s=4b4a6fd5d3ace225e0cb284b46c1abbb00cd70ae&amp;profile_id=164&amp;oauth2_token_id=57447761"
var dest = "Rey.mp4"

var download = function (sourceURL, dest, cb) {
  const file = fs.createWriteStream(dest);
  const request = http.get(sourceURL, function(response) {
     console.log("invoked http.get()");
     if (response.statusCode !== 200) {  // check if response is a success
       return cb('Response status was ' + response.statusCode);
     }
     // pipe the response into the writable stream
     response.pipe(file);
     console.log("invoked response.pipe()")
     file.on('finish', function(response) {
         file.close(cb);  // close() is async, call cb after close completes.
         console.log("invoked file.close()");
     });
  }).on('error', function(err) { // Handle any errors from the http.get() request
    console.log("inside error block of code....");
    console.error(err.message);
    console.log("Now Deleting downloaded file using unlinkSync()");
    fs.unlinkSync(dest);   // Delete the target file asyncronously.
    
    // Handle any errors from the createWriteStream() file
    file.on('error', function(err) {
      fs.unlinkSync(dest);
      return cb(err.message);
    });
  });
};

download(sourceURL, dest);


// console.log('error:', error); // Print the error if one occurred
// console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
// console.log('body:', body);  // Print the HTML for the specific content
