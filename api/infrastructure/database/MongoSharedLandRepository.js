const { ObjectId } = require("mongodb");
const SharedLand = require("../../entities/SharedLand");

class MongoSharedLandRepository {
  constructor({ db }) {
    this.db = db;
  }

  async add(sharedLand) {
    const now = new Date();
    const sharedLandWithTimestamps = {
      ...sharedLand,
      createdAt: now,
      updatedAt: now,
    };
    const result = await this.db.collection("sharedlands").insertOne(sharedLandWithTimestamps);
    if (result.insertedId) {
      return {
        _id: result.insertedId,
        ...sharedLandWithTimestamps
      };
    }
    throw new Error('SharedLand creation failed');
  }

  async getById(id) {
    const objectId = new ObjectId(id); // id'yi ObjectId'ye dönüştür
    return await this.db.collection("sharedlands").findOne({ _id: objectId });
  }

  async getAll() {
    return await this.db.collection("sharedlands").find({}).toArray();
  }

  async getByPhoneNumber(phoneNumber) {
    return await this.db.collection("sharedlands").find({ numList: phoneNumber }).toArray();
  }

  async updateById(id, data) {
    data.updatedAt = new Date();
    const objectId = new ObjectId(id); // id'yi ObjectId'ye dönüştür
    const result = await this.db.collection("sharedlands").findOneAndUpdate(
      { _id: objectId },
      { $set: data },
      { returnDocument: 'after' }
    );
    return result.value;
  }

  async deleteById(id) {
    const objectId = new ObjectId(id); // id'yi ObjectId'ye dönüştür
    await this.db.collection("sharedlands").findOneAndDelete({ _id: objectId });
  }
}

module.exports = MongoSharedLandRepository;
