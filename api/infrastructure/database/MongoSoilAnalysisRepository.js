const { ObjectId } = require("mongodb");
const SoilAnalysis = require("../../entities/SoilAnalysis");

class MongoSoilAnalysisRepository {
  constructor({ db }) {
    this.db = db;
  }

  async add(soilAnalysis, landId) {
    const now = new Date();
    const soilAnalysisWithTimestamps = {
      ...soilAnalysis,
      land_id: new ObjectId(landId),
      createdAt: now,
      updatedAt: now,
    };
    const result = await this.db.collection("soilanayses").insertOne(soilAnalysisWithTimestamps);
    if (result.insertedId) {
      return {
        _id: result.insertedId,
        ...soilAnalysisWithTimestamps
      };
    }
    throw new Error('SoilAnalysis creation failed');
  }

  async getById(id) {
    const objectId = new ObjectId(id);
    return await this.db.collection("soilanalyses").findOne({ _id: objectId });
  }

  async getAll() {
    return await this.db.collection("soilanalyses").find({}).toArray();
  }

  async getByLandId(landId) {
    const objectId = new ObjectId(landId);
    return await this.db.collection("soilanalyses").find({ land_id: objectId }).toArray();
  }

  async updateById(id, data) {
    data.updatedAt = new Date();
    const objectId = new ObjectId(id);
    const result = await this.db.collection("soilanalyses").findOneAndUpdate(
      { _id: objectId },
      { $set: data },
      { returnDocument: 'after' }
    );
    return result.value;
  }

  async deleteById(id) {
    const objectId = new ObjectId(id);
    await this.db.collection("soilanalyses").findOneAndDelete({ _id: objectId });
  }
}

module.exports = MongoSoilAnalysisRepository;
