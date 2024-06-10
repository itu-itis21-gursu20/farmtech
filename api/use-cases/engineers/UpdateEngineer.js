const Engineer = require("../../entities/Engineer.js");

class UpdateEngineer {
  constructor({ engineerRepository }) {
    this.engineerRepository = engineerRepository;
  }

  async execute(phoneNumber, data) {
    return await this.engineerRepository.updateByPhoneNumber(phoneNumber, data);
  }
}

module.exports = UpdateEngineer;

