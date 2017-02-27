const child_process = require('child_process');
const fs = require('fs');

let currentTime = new Date().getTime().toString().substr(0,10);
const lastTime = currentTime - 365 * 24 * 60 * 60;

let runner = setInterval(() => {
  currentTime = currentTime - 86400;
  fs.writeFile('cheat.txt', currentTime, (err) => {
    if (err) {
      console.error(err.message);
      clearInterval(runner);
    } else {
      child_process.exec("git add .;GIT_AUTHOR_DATE='" + currentTime + "' GIT_COMMITTER_DATE='" + currentTime + "' git commit -m 'update'; git push origin master -f;", (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Done !!');
        }
      });
    }
  });
  if (lastTime === currentTime) {
    clearInterval(runner);
    console.log('finish !! ');
  }
}, 800);
