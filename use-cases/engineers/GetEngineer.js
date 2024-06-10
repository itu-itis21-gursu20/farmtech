const Engineer = require("../../entities/Engineer.js");

class GetEngineer {
  constructor({ engineerRepository }) {
    this.engineerRepository = engineerRepository;
  }

  async execute(phoneNumber) {
    if (phoneNumber) {
      return await this.engineerRepository.getByPhoneNumber(phoneNumber);
    } else {
      return await this.engineerRepository.getAll();
    }
  }
}

module.exports = GetEngineer;
