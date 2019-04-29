// Declare Vars & Read Files
var fs = require('fs'),
    http = require('http'),
    url = require('url'),
    path = require('path');


http.createServer(function (req, res) {
    if (req.url != "/movie") {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end('<video src="http://localhost:3000/movie.mp4" controls></video>');
    } else {
          // Get the absolute file name, and use fs.stat to get the size of the file 
          //  without reading the entire file into memory.
          var file = path.resolve(__dirname,"Clip_480_5sec_6mbps_h264.mp4");
          fs.stat(file, function(err, stats) {
            if (err) {
              if (err.code === 'ENOENT') {
                // 404 Error if file not found
                return res.sendStatus(404);
              }
            res.end(err);
            }
            // Process the range headers to get the start/end positions.
            var range = req.headers.range;
            if (!range) {
             // 416 Wrong range
             return res.sendStatus(416);
            }
            var positions = range.replace(/bytes=/, "").split("-");
            var start = parseInt(positions[0], 10);
            var total = stats.size;
            var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
            var chunksize = (end - start) + 1;
      
            res.writeHead(206, {
              "Content-Range": "bytes " + start + "-" + end + "/" + total,
              "Accept-Ranges": "bytes",
              "Content-Length": chunksize,
              "Content-Type": "video/mp4"
            });
      
            // Obtain part of the file into the read stream and pipe it to the 
            //  response stream.
            var stream = fs.createReadStream(file, { start: start, end: end })
              .on("open", function() {
                console.log("Now Streaming......");
                stream.pipe(res);
              }).on("error", function(err) {
                res.end(err);
              });
          });
    }
}).listen(3000, function () {
    console.log('Server up & Listening on port 3000!')
  });
