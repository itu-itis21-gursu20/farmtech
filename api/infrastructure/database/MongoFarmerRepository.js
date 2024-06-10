const Farmer = require("../../entities/Farmer");

class MongoFarmerRepository {
  constructor({ db }) {
    this.db = db;
  }

  async add(farmer) {
    const now = new Date();
    const newFarmer = {
      ...farmer,
      createdAt: now,
      updatedAt: now,
    };
    const result = await this.db.collection("farmers").insertOne(newFarmer);
    console.log("newFarmer", newFarmer);
    if (result.insertedId) {
      return {
        _id: result.insertedId,
        ...newFarmer,
      };
    }
    throw new Error('Farmer creation failed');
  }

  async getByPhoneNumber(phoneNumber) {
    const result = await this.db.collection("farmers").findOne({ phoneNumber });
    console.log("getByPhoneNumber", result);
    return result;
  }

  async getAll() {
    const result = await this.db.collection("farmers").find({}).toArray();
    console.log("getAll", result);
    return result;
  }

  async updateByPhoneNumber(phoneNumber, data) {
    const result = await this.db.collection("farmers").findOneAndUpdate(
      { phoneNumber },
      { $set: data },
      { returnDocument: 'after' }
    );
    return result.value;
  }

  async deleteByPhoneNumber(phoneNumber) {
    await this.db.collection("farmers").findOneAndDelete({ phoneNumber });
  }
}

module.exports = MongoFarmerRepository;
