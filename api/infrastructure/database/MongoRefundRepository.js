const { ObjectId } = require("mongodb");
const Refund = require("../../entities/Refund");

class MongoRefundRepository {
  constructor({ db }) {
    this.db = db;
  }

  async add(refund, landId) {
    const now = new Date();
    const refundWithTimestamps = {
      ...refund,
      land_id: new ObjectId(landId),
      createdAt: now,
      updatedAt: now,
    };
    const result = await this.db.collection("refunds").insertOne(refundWithTimestamps);
    if (result.insertedId) {
      return {
        _id: result.insertedId,
        ...refundWithTimestamps
      };
    }
    throw new Error('Refund creation failed');
  }

  async getById(id) {
    const objectId = new ObjectId(id);
    return await this.db.collection("refunds").findOne({ _id: objectId });
  }

  async getAll() {
    return await this.db.collection("refunds").find({}).toArray();
  }

  async getByLandId(landId) {
    const objectId = new ObjectId(landId);
    return await this.db.collection("refunds").find({ land_id: objectId }).toArray();
  }

  async updateById(id, data) {
    data.updatedAt = new Date();
    const objectId = new ObjectId(id);
    const result = await this.db.collection("refunds").findOneAndUpdate(
      { _id: objectId },
      { $set: data },
      { returnDocument: 'after' }
    );
    return result.value;
  }

  async deleteById(id) {
    const objectId = new ObjectId(id);
    await this.db.collection("refunds").findOneAndDelete({ _id: objectId });
  }
}

module.exports = MongoRefundRepository;
