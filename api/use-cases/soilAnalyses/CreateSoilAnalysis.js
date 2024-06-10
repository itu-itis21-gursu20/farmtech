const SoilAnalysis = require("../../entities/SoilAnalysis");

class CreateSoilAnalysis {
  constructor({ soilAnalysisRepository }) {
    this.soilAnalysisRepository = soilAnalysisRepository;
  }

  async execute(data, landId) {
    const soilAnalysis = new SoilAnalysis(data);
    const createdSoilAnalysis = await this.soilAnalysisRepository.add(soilAnalysis, landId);
    return createdSoilAnalysis;
  }
}

module.exports = CreateSoilAnalysis;
