const Engineer = require("../../entities/Engineer");

class MongoEngineerRepository {
  constructor({ db }) {
    this.db = db;
  }

  async add(engineer) {
    const now = new Date();
    const newEngineer = {
      ...engineer,
      createdAt: now,
      updatedAt: now,
    };
    const result = await this.db.collection("engineers").insertOne(newEngineer);
    console.log("newEngineer", newEngineer);
    if (result.insertedId) {
      return {
        _id: result.insertedId,
        ...newEngineer,
      };
    }
    throw new Error('Engineer creation failed');
  }

  async getByPhoneNumber(phoneNumber) {
    const result = await this.db.collection("engineers").findOne({ phoneNumber });
    console.log("getByPhoneNumber", result);
    return result;
  }

  async getAll() {
    const result = await this.db.collection("engineers").find({}).toArray();
    console.log("getAll", result);
    return result;
  }

  async updateByPhoneNumber(phoneNumber, data) {
    const result = await this.db.collection("engineers").findOneAndUpdate(
      { phoneNumber },
      { $set: data },
      { returnDocument: 'after' }
    );
    return result.value;
  }

  async deleteByPhoneNumber(phoneNumber) {
    await this.db.collection("engineers").findOneAndDelete({ phoneNumber });
  }
}

module.exports = MongoEngineerRepository;
