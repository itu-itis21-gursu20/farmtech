const Farmer = require("../../entities/Farmer.js");

class UpdateFarmer {
  constructor({ farmerRepository }) {
    this.farmerRepository = farmerRepository;
  }

  async execute(phoneNumber, data) {
    return await this.farmerRepository.updateByPhoneNumber(phoneNumber, data);
  }
}

module.exports = UpdateFarmer;

