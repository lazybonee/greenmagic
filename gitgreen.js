const child_process = require('child_process');
const fs = require('fs');

const currentTime = new Date().getTime().toString().substr(0,10);
const startTime = currentTime - 200 * 86400;
const lastTime = currentTime - 365 * 24 * 60 * 60;
let commitTime = startTime;
let runner = setInterval(() => {
  commitTime = commitTime - 86400;
  fs.writeFile('cheat.txt', commitTime, (err) => {
    if (err) {
      console.error(err.message);
      clearInterval(runner);
    } else {
      child_process.exec("git add .;GIT_AUTHOR_DATE='" + commitTime + "' GIT_COMMITTER_DATE='" + commitTime + "' git commit -m 'update'; git push -u origin master;", (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Done !!');
        }
      });
    }
  });
  if (lastTime === commitTime) {
    clearInterval(runner);
    console.log('finish !! ');
  }
}, 10000);
