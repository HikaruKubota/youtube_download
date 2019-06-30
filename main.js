const fs = require('fs');

const ytdl = require('ytdl-core');
const readline = require('readline');

const BASE_PATH = 'https://www.youtube.com/watch?v=';

const youtubeId = 'dk75pr6C8hU';

var lines = [];
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

reader.on('line', line => lines.push(line))
reader.on('close', () => {
  lines.forEach(value => {
    ytdl(BASE_PATH + value).pipe(fs.createWriteStream(value + '.mp4'));
  })
})
