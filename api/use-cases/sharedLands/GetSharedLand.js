const SharedLand = require("../../entities/SharedLand.js");

class GetSharedLand {
  constructor({ sharedLandRepository }) {
    this.sharedLandRepository = sharedLandRepository;
  }

  async execute(id) {
    if (id) {
      return await this.sharedLandRepository.getById(id);
    } else {
      return await this.sharedLandRepository.getAll();
    }
  }
}

module.exports = GetSharedLand;
