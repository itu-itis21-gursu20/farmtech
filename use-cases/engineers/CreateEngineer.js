const Engineer = require("../../entities/Engineer");

class CreateEngineer {
  constructor({ engineerRepository }) {
    this.engineerRepository = engineerRepository;
  }

  async execute(data) {
    const engineer = new Engineer(data);
    const createdEngineer = await this.engineerRepository.add(engineer);
    return createdEngineer;
  }
}

module.exports = CreateEngineer;
