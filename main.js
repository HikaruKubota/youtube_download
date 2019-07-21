const fs = require('fs');

const ytdl = require('ytdl-core');
const readline = require('readline');

const BASE_PATH = 'https://www.youtube.com/watch?v=';

var rl = readline.createInterface({
  input: process.stdin
});

rl.on('line', line => {
  if(line == null || line == ''){
    return;
  }
  var youtube_id = getParam('v', line);

  ytdl.getInfo(BASE_PATH + youtube_id, function(err, info) {
    var title = info.title;
    console.log(info.title.replace(/ /g, ''));
    ytdl(BASE_PATH + youtube_id).pipe(fs.createWriteStream('download/' + info.title.replace(/\//g, '／') + '.mp4'));
  });

});

function getParam(name, url){
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
