const fs = require('fs');

const ytdl = require('ytdl-core');
const readline = require('readline');
const uuid = require('uuid');

var u = uuid.v1({
    node: [0X01, 0X02, 0X03, 0X04, 0X05, 0X06],
    clockseq: 0X1234,
    msecs: new Date(),
    nsecs: 1234
}, buf, 0);

let rl = readline.createInterface({
  input: process.stdin
});

rl.on('line', line => {
  if(line == undefined || line == ''){
    return;
  }
  ytdl.getInfo(line, function(err, info) {
    // console.log(info.title.replace(/\//g, ''));
    // ytdl(line).pipe(fs.createWriteStream('download/' + info.title.replace(/\//g, '／') + '.mp4'));
    ytdl(line).pipe(fs.createWriteStream('download/' + u + '.mp4'));
  });
});
