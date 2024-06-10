class UpdateLeafAnalysis {
  constructor({ leafAnalysisRepository }) {
    this.leafAnalysisRepository = leafAnalysisRepository;
  }

  async execute(id, data) {
    return await this.leafAnalysisRepository.updateById(id, data);
  }
}

module.exports = UpdateLeafAnalysis;
