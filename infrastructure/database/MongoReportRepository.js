const { ObjectId } = require("mongodb");
const Report = require("../../entities/Report");

class MongoReportRepository {
  constructor({ db }) {
    this.db = db;
  }

  async add(report, landId) {
    const now = new Date();
    const reportWithTimestamps = {
      ...report,
      land_id: new ObjectId(landId),
      createdAt: now,
      updatedAt: now,
    };
    const result = await this.db.collection("reports").insertOne(reportWithTimestamps);
    if (result.insertedId) {
      return {
        _id: result.insertedId,
        ...reportWithTimestamps
      };
    }
    throw new Error('Report creation failed');
  }

  async getById(id) {
    const objectId = new ObjectId(id);
    return await this.db.collection("reports").findOne({ _id: objectId });
  }

  async getAll() {
    return await this.db.collection("reports").find({}).toArray();
  }

  async getByLandId(landId) {
    const objectId = new ObjectId(landId);
    return await this.db.collection("reports").find({ land_id: objectId }).toArray();
  }

  async updateById(id, data) {
    data.updatedAt = new Date();
    const objectId = new ObjectId(id);
    const result = await this.db.collection("reports").findOneAndUpdate(
      { _id: objectId },
      { $set: data },
      { returnDocument: 'after' }
    );
    return result.value;
  }

  async deleteById(id) {
    const objectId = new ObjectId(id);
    await this.db.collection("reports").findOneAndDelete({ _id: objectId });
  }
}

module.exports = MongoReportRepository;
