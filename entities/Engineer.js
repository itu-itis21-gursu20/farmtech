const mongoose = require("mongoose");

class Engineer {
    constructor({ name, type, phoneNumber }) {
      this.name = name;
      this.type = type;
      this.phoneNumber = phoneNumber;
    }
  }
  
  module.exports = Engineer;
  