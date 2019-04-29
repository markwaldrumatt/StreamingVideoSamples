# StreamingVideoSamples
Streaming video examples for both local and external stream playback

HTML5stream_index.html - Used to read the movie big_buck_bunny.mp4 directly into the browser's memory without streaming through/from a process on the local machine.

index.html - HTML5 file used to stream a .mp4, either directly from the off local PC or initially streamed off the web.

NoExpress_LocalFileInMemory_server.js - Reads in a local .mp4 into local memory within the server and then sends it to the browser's response object to be played.  Does not use the "Request" module for easier handling of the file.

NoExpress_LocalFileStream_server.js - Obtains info of the .mp4 file, then streams in the file and pipes the output to the browser's response stream object.  Does not use the "Request" module for easier handling of the file.

Request_ExternalFileStream_server.js - Uses the "Request" module and reads in a .mp4 file from the internet and simultaneously pipes the output (i.e. streams it) to the response stream object of the browser.  

Request_DownloadAVideo.js - Download a .mp4 from a source URL using the "Request" module.  

DownloadAVideo.js - Download a .mp4 from a source URL without using the "Request" module. 
