const fs = require('fs');

const ytdl = require('ytdl-core');
const readline = require('readline');

const BASE_PATH = 'https://www.youtube.com/watch?v=';

var lines = [];
var rl = readline.createInterface({
  input: process.stdin
});

rl.on('line', line => {
  if(line == null || line == ''){
    return;
  }
  let youtube_id = getParam('v', line);
  ytdl(BASE_PATH + youtube_id).pipe(fs.createWriteStream('download/' + youtube_id + '.mp4'));
});

function getParam(name, url){
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
