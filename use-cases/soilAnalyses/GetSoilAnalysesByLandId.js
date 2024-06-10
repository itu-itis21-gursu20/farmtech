class GetSoilAnalysesByLandId {
  constructor({ soilAnalysisRepository }) {
    this.soilAnalysisRepository = soilAnalysisRepository;
  }

  async execute(landId) {
    return await this.soilAnalysisRepository.getByLandId(landId);
  }
}

module.exports = GetSoilAnalysesByLandId;
