const http = require("http");
const fs = require("fs");

function readTheFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString())
      }
    });
  });
}

http
  .createServer(function(req, res) {
      readTheFile('./index.html').then(html => {
          res.write(html);
          res.end();
      })
  })
  .listen(8080);
