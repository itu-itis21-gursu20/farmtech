const Engineer = require("../../entities/Engineer.js");

class DeleteEngineer {
  constructor({ engineerRepository }) {
    this.engineerRepository = engineerRepository;
  }

  async execute(phoneNumber) {
    return await this.engineerRepository.deleteByPhoneNumber(phoneNumber);
  }
}

module.exports = DeleteEngineer;

