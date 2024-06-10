const mongoose = require("mongoose");

class Farmer {
    constructor({ name, type, phoneNumber }) {
      this.name = name;
      this.type = type;
      this.phoneNumber = phoneNumber;
    }
  }
  
  module.exports = Farmer;
  