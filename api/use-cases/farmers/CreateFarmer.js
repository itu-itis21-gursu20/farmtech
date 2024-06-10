const Farmer = require("../../entities/Farmer");

class CreateFarmer {
  constructor({ farmerRepository }) {
    this.farmerRepository = farmerRepository;
  }

  async execute(data) {
    const farmer = new Farmer(data);
    const createdFarmer = await this.farmerRepository.add(farmer);
    return createdFarmer;
  }
}

module.exports = CreateFarmer;
