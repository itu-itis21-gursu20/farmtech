class GetSoilAnalysis {
  constructor({ soilAnalysisRepository }) {
    this.soilAnalysisRepository = soilAnalysisRepository;
  }

  async execute(id) {
    if (id) {
      return await this.soilAnalysisRepository.getById(id);
    } else {
      return await this.soilAnalysisRepository.getAll();
    }
  }
}

module.exports = GetSoilAnalysis;
