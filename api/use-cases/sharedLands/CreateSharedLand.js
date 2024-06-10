const SharedLand = require("../../entities/SharedLand");

class CreateSharedLand {
  constructor({ sharedLandRepository }) {
    this.sharedLandRepository = sharedLandRepository;
  }

  async execute(data) {
    const sharedLand = new SharedLand(data);
    const createdSharedLand = await this.sharedLandRepository.add(sharedLand);
    return createdSharedLand;
  }
}

module.exports = CreateSharedLand;
