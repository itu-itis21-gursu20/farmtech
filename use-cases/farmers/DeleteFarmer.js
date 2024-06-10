const Farmer = require("../../entities/Farmer.js");

class DeleteFarmer {
  constructor({ farmerRepository }) {
    this.farmerRepository = farmerRepository;
  }

  async execute(phoneNumber) {
    return await this.farmerRepository.deleteByPhoneNumber(phoneNumber);
  }
}

module.exports = DeleteFarmer;

