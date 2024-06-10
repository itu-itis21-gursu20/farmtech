const Farmer = require("../../entities/Farmer.js");

class GetFarmer {
  constructor({ farmerRepository }) {
    this.farmerRepository = farmerRepository;
  }

  async execute(phoneNumber) {
    if (phoneNumber) {
      return await this.farmerRepository.getByPhoneNumber(phoneNumber);
    } else {
      return await this.farmerRepository.getAll();
    }
  }
}

module.exports = GetFarmer;
