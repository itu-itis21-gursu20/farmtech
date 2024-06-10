const SharedLand = require("../../entities/SharedLand.js");

class GetSharedLandByPhoneNumber {
  constructor({ sharedLandRepository }) {
    this.sharedLandRepository = sharedLandRepository;
  }

  async execute(phoneNumber) {
    if(phoneNumber){
      return await this.sharedLandRepository.getByPhoneNumber(phoneNumber);
    } else {
      return await this.sharedLandRepository.getAll();
    }
  }
}

module.exports = GetSharedLandByPhoneNumber;

// async execute(id) {
//   console.log("id", id);
//   if (id) {
//     return await this.sharedLandRepository.getById(id);
//   } else {
//     return await this.sharedLandRepository.getAll();
//   }
// }