// NOTE:  In order to execute this script and access any stream via the Windows10 cmd window, we must set the HTTP_PROXY env variable.
//           Execute this command:
//                  set HTTP_PROXY=http://proxy-fw.intelink.gov

// Declare Vars
var fs = require('fs');
var request = require('request'); 

//var sourceURL = "https://player.vimeo.com/external/236075858.sd.mp4?s=488e67b8e35ca33ef18880b46bb4752da56a4035&amp;profile_id=164&amp;oauth2_token_id=57447761";
//var sourceURL = "https://player.vimeo.com/external/310295912.sd.mp4?s=4b4a6fd5d3ace225e0cb284b46c1abbb00cd70ae&amp;profile_id=164&amp;oauth2_token_id=57447761";
var LukeSunsetURL = "https://preview.redd.it/i33dtyohf9d11.gif?format=mp4&s=54cc4d2437a86c3d573129d6af6dd7a5d30c6410";

var sourceURL = LukeSunsetURL
var dest = "LukeSunset.mp4"

var download = function (sourceURL, dest, cb) {
  const file = fs.createWriteStream(dest);
  console.log("Created WriteStream; now invoking request.get()");
  const sendReq = request.get(sourceURL);

  // verify response code
  sendReq.on('response', function(response) {
    if (response.statusCode !== 200) {   // check if response wasn't a success
        return cb('Response status was ' + response.statusCode);
    }
    // pipe the response into the writable stream
    console.log("Invoking sendReq.pipe()")
    sendReq.pipe(file);
  });
  
  // closing of file is async; call cb after close completes
  file.on('finish', function() {
         file.close(cb);
         console.log("invoked file.close()");
  });
  
  // Handle any errors from the request.get() request
  sendReq.on('error', function(err) { 
    console.log("inside error block of code....");
    console.error(err.message);
    console.log("Now Deleting downloaded file using unlinkSync()");
    fs.unlinkSync(dest);   // Delete the target file asyncronously.
  });
    
  // Handle any errors from the createWriteStream() file
  file.on('error', function(err) {
      fs.unlinkSync(dest);
      return cb(err.message);
  });
};

download(sourceURL, dest);
