const fs = require('fs');

const mock = jest.fn(url => new Promise((resolve, reject) => {
  fs.readFile(`./__mockData__${url}.json`, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    }
    resolve(JSON.parse(data));
  });
}));

module.exports = {
  get: mock,
  post: mock,
  create: jest.fn(function () {
    return this;
  })
};
