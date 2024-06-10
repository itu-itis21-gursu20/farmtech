class DeleteLeafAnalysis {
  constructor({ leafAnalysisRepository }) {
    this.leafAnalysisRepository = leafAnalysisRepository;
  }

  async execute(id) {
    return await this.leafAnalysisRepository.deleteById(id);
  }
}

module.exports = DeleteLeafAnalysis;
