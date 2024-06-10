const express = require('express');
const bodyParser = require('body-parser');

class ExpressServer {
  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
  }

  start(port) {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }

  on(method, url, callback) {
    this.app[method](url, callback);
  }
}

module.exports = ExpressServer;
