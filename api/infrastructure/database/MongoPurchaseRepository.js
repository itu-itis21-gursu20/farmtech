const { ObjectId } = require("mongodb");
const Purchase = require("../../entities/Purchase");

class MongoPurchaseRepository {
  constructor({ db }) {
    this.db = db;
  }

  async add(purchase, landId) {
    const now = new Date();
    const purchaseWithTimestamps = {
      ...purchase,
      land_id: new ObjectId(landId),
      createdAt: now,
      updatedAt: now,
    };
    const result = await this.db.collection("purchases").insertOne(purchaseWithTimestamps);
    if (result.insertedId) {
      return {
        _id: result.insertedId,
        ...purchaseWithTimestamps
      };
    }
    throw new Error('Purchase creation failed');
  }

  async getById(id) {
    const objectId = new ObjectId(id);
    return await this.db.collection("purchases").findOne({ _id: objectId });
  }

  async getAll() {
    return await this.db.collection("purchases").find({}).toArray();
  }

  async getByLandId(landId) {
    const objectId = new ObjectId(landId);
    return await this.db.collection("purchases").find({ land_id: objectId }).toArray();
  }

  async updateById(id, data) {
    data.updatedAt = new Date();
    const objectId = new ObjectId(id);
    const result = await this.db.collection("purchases").findOneAndUpdate(
      { _id: objectId },
      { $set: data },
      { returnDocument: 'after' }
    );
    return result.value;
  }

  async deleteById(id) {
    const objectId = new ObjectId(id);
    await this.db.collection("purchases").findOneAndDelete({ _id: objectId });
  }
}

module.exports = MongoPurchaseRepository;
