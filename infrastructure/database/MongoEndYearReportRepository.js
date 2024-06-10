const { ObjectId } = require("mongodb");
const EndYearReport = require("../../entities/EndYearReport");

class MongoEndYearReportRepository {
  constructor({ db }) {
    this.db = db;
  }

  async add(endYearReport, landId) {
    const now = new Date();
    const endYearReportWithTimestamps = {
      ...endYearReport,
      land_id: new ObjectId(landId),
      createdAt: now,
      updatedAt: now,
    };
    const result = await this.db.collection("endyearreports").insertOne(endYearReportWithTimestamps);
    if (result.insertedId) {
      return {
        _id: result.insertedId,
        ...endYearReportWithTimestamps
      };
    }
    throw new Error('EndYearReport creation failed');
  }

  async getById(id) {
    const objectId = new ObjectId(id);
    return await this.db.collection("endyearreports").findOne({ _id: objectId });
  }

  async getAll() {
    return await this.db.collection("endyearreports").find({}).toArray();
  }

  async getByLandId(landId) {
    const objectId = new ObjectId(landId);
    return await this.db.collection("endyearreports").find({ land_id: objectId }).toArray();
  }

  async updateById(id, data) {
    data.updatedAt = new Date();
    const objectId = new ObjectId(id);
    const result = await this.db.collection("endyearreports").findOneAndUpdate(
      { _id: objectId },
      { $set: data },
      { returnDocument: 'after' }
    );
    return result.value;
  }

  async deleteById(id) {
    const objectId = new ObjectId(id);
    await this.db.collection("endyearreports").findOneAndDelete({ _id: objectId });
  }
}

module.exports = MongoEndYearReportRepository;
