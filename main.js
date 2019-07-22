const fs = require('fs');

const ytdl = require('ytdl-core');
const readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin
});

rl.on('line', line => {
  if(line == null || line == ''){
    return;
  }

  ytdl.getInfo(line, function(err, info) {
    console.log(info.title.replace(/ /g, ''));
    ytdl(line).pipe(fs.createWriteStream('download/' + info.title.replace(/\//g, '／') + '.mp4'));
  });

});
