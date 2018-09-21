const Speaker = require('speaker');
const lame = require("node-lame").Lame;
const stream = require('stream');

const encoder = new lame({
  "output": "buffer",
  "bitrate": 192
}).setFile("./musicStore/StapleStable.mp3");

encoder.encode()
  .then(() => {
    // Encoding finished
    const buffer = encoder.getBuffer();
    // Initiate the source
    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);

    // Create the Speaker instance
    const speaker = new Speaker({
      channels: 2,          // 2 channels
      bitDepth: 16,         // 16-bit samples
      sampleRate: 44100     // 44,100 Hz sample rate
    });

    bufferStream.pipe(speaker);
  });
