class DeleteSoilAnalysis {
  constructor({ soilAnalysisRepository }) {
    this.soilAnalysisRepository = soilAnalysisRepository;
  }

  async execute(id) {
    return await this.soilAnalysisRepository.deleteById(id);
  }
}

module.exports = DeleteSoilAnalysis;
