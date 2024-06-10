const mongoose = require("mongoose");

class SharedLand {
  constructor({ parcel, products, title, mapUrl, numList }) {
    this.parcel = parcel;
    this.products = products;
    this.title = title;
    this.mapUrl = mapUrl;
    this.numList = numList;
  }
}

module.exports = SharedLand;
