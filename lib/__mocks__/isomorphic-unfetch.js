const fs = require('fs');
const path = require('path');

class Body {
  constructor(data) {
    this.data = data;

    this.status = this.data.status;
  }

  json() {
    return new Promise((resolve, reject) => {
      resolve(JSON.parse(this.data.body));
    });
  }
}

const fetch = url => new Promise((resolve, reject) => {
  const dataPath = path.join(__dirname, 'data', url) + '.json';

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) resolve(new Body({
      url,
      status: 404,
      statusText: 'Not Found',
      body: JSON.stringify({ name: 'Not Found', message: '', code: 0, status: 404 })
    }));

    resolve(new Body({
      url,
      status: 200,
      statusText: 'OK',
      body: data,
    }));
  });
});

export default fetch;
