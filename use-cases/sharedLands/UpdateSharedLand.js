const SharedLand = require("../../entities/SharedLand.js");

class UpdateSharedLand {
  constructor({ sharedLandRepository }) {
    this.sharedLandRepository = sharedLandRepository;
  }

  async execute(id, data) {
    return await this.sharedLandRepository.updateById(id, data);
  }
}

module.exports = UpdateSharedLand;
