class GetLeafAnalysis {
  constructor({ leafAnalysisRepository }) {
    this.leafAnalysisRepository = leafAnalysisRepository;
  }

  async execute(id) {
    if (id) {
      return await this.leafAnalysisRepository.getById(id);
    } else {
      return await this.leafAnalysisRepository.getAll();
    }
  }
}

module.exports = GetLeafAnalysis;
