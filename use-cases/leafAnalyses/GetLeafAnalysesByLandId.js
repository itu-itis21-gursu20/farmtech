class GetLeafAnalysesByLandId {
  constructor({ leafAnalysisRepository }) {
    this.leafAnalysisRepository = leafAnalysisRepository;
  }

  async execute(landId) {
    return await this.leafAnalysisRepository.getByLandId(landId);
  }
}

module.exports = GetLeafAnalysesByLandId;
