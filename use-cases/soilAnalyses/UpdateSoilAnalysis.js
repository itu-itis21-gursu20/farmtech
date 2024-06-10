class UpdateSoilAnalysis {
  constructor({ soilAnalysisRepository }) {
    this.soilAnalysisRepository = soilAnalysisRepository;
  }

  async execute(id, data) {
    return await this.soilAnalysisRepository.updateById(id, data);
  }
}

module.exports = UpdateSoilAnalysis;
