const SharedLand = require("../../entities/SharedLand.js");

class DeleteSharedLand {
  constructor({ sharedLandRepository }) {
    this.sharedLandRepository = sharedLandRepository;
  }

  async execute(id) {
    return await this.sharedLandRepository.deleteById(id);
  }
}

module.exports = DeleteSharedLand;


