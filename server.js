const http = require('http');
const fs = require('fs');

http
  .createServer(function(req, res) {
    if (req.url === '/api/guest' && req.method === 'POST') {
      console.log('test');
      let buffer = '';
      req.on('data', chunk => {
        buffer += chunk;
      });
      req.on('end', () => {
        addGuest(buffer);
        res.write('posted');
        res.end();
      });
    } else if (req.url === '/api/guest' && req.method === 'GET') {
      readFile('./guest.json').then(html => {
        res.write(html);
        res.end();
      });
    } else if (req.url === '/' && req.method === 'GET') {
      readFile('./index.html').then(html => {
        res.write(html);
        res.end();
      });
    }
  })

  .listen(8080);

const readFile = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    });
  });
};

const writeFile = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const addGuest = guest => {
  return readFile('./guest.json')
    .then(data => {
      //console.log(guest);
      const guests = JSON.parse(data);
      let max = guests.reduce((acc, guest) => {
        console.log(JSON.parse(guest).id);
        if (JSON.parse(guest).id > acc) {
          console.log('if statement reacted');
          acc = JSON.parse(guest).id;
        }
        return acc;
      }, 0);
      console.log('max', (JSON.parse(guest).id = max + 1));
      JSON.parse(guest).id = max + 1;
      guests.push(JSON.parse(guest));
      return writeFile('./guest.json', JSON.stringify(guests, null, 2));
    })
    .then(() => {
      return guest;
    });
};
