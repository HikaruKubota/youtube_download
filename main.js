const fs = require('fs')

const ytdl = require('ytdl-core')
const readline = require('readline')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)

let rl = readline.createInterface({
  input: process.stdin
});
let mode = false

rl.on('line', line => {
  if(line == undefined || line == ''){
    return
  }
  if (line == 'mode' && mode == true) {
    mode = false
    console.log("off")
    return
  }else if(line == 'mode' && mode == false){
    mode = true
    console.log("on")
    return
  }

  if(mode){
    const audioOutput = 'download/sound.mp4';
    const mainOutput = 'download/output.mp4';
    ytdl(line, { filter: format => {
      return format.container === 'm4a' && !format.encoding; } })
      .pipe(fs.createWriteStream(audioOutput))
      .on('finish', () => {
        ffmpeg()
          .input(ytdl(line, { filter: format => {
            return format.container === 'mp4' && !format.audioEncoding; } }))
          .videoCodec('copy')
          .input(audioOutput)
          .audioCodec('copy')
          .save(mainOutput)
          .on('error', console.error)
          .on('progress', progress => {
            process.stdout.cursorTo(0);
            process.stdout.clearLine(1);
            process.stdout.write(progress.timemark);
          }).on('end', () => {
            fs.unlink(audioOutput, err => {
              if(err) console.error(err);
              else console.log('\nfinished downloading');
            });
          });
      });
  }else{
    ytdl.getInfo(line, function(err, info) {
      console.log(info.title.replace(/ /g, ''))
      ytdl(line).pipe(fs.createWriteStream('download/' + info.title.replace(/\//g, '／') + '.mp4'))
    });
  }
});
