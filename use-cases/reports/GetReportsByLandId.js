class GetReportsByLandId {
  constructor({ reportRepository }) {
    this.reportRepository = reportRepository;
  }

  async execute(landId) {
    return await this.reportRepository.getByLandId(landId);
  }
}

module.exports = GetReportsByLandId;
