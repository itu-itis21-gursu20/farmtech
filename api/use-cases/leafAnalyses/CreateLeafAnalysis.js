const LeafAnalysis = require("../../entities/LeafAnalysis");

class CreateLeafAnalysis {
  constructor({ leafAnalysisRepository }) {
    this.leafAnalysisRepository = leafAnalysisRepository;
  }

  async execute(data, landId) {
    const leafAnalysis = new LeafAnalysis(data);
    const createdLeafAnalysis = await this.leafAnalysisRepository.add(leafAnalysis, landId);
    return createdLeafAnalysis;
  }
}

module.exports = CreateLeafAnalysis;
