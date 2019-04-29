// Declare Vars & Read Files

var fs = require('fs'),
    http = require('http'),
    url = require('url'),
    path = require('path');
var movie_webm, movie_mp4, movie_ogg;

// Read the entire file into memory (i.e. data); then assign to variable movie_mp4
fs.readFile(path.resolve(__dirname,"Clip_480_5sec_6mbps_h264.mp4"), function (err, data) {
    if (err) {
        throw err;
    }
    console.log("Entering block of code .... movie_mp4 = data")
    movie_mp4 = data;
});
// ... [snip] ... (Read two other formats for the video)

// Serve & Stream Video
http.createServer(function (req, res) {
    // ... [snip] ... (Serve client files
    console.log("Inside http.createServer block");

    var total;
    if (req.url == "/movie") {
        total = movie_mp4.length;
        console.log("Total length of movie is " + total);
    }
    // ... [snip] ... handle two other formats for the video
    var range = req.headers.range;
    var positions = range.replace(/bytes=/, "").split("-");
    var start = parseInt(positions[0], 10);
    var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
    var chunksize = (end - start) + 1;
    if (req.url == "/movie") {
        console.log("Inside reqResource == block");
        res.writeHead(206, {
            "Content-Range": "bytes " + start + "-" + end + "/" + total,
                "Accept-Ranges": "bytes",
                "Content-Length": chunksize,
                "Content-Type": "video/mp4"
        });
        res.end(movie_mp4.slice(start, end + 1), "binary");
    }
    
    // ... [snip] ... handle two other formats for the video
}).listen(3000, function () {
    console.log('Listening on port 3000!')
  });
