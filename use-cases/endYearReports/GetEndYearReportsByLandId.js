class GetEndYearReportsByLandId {
  constructor({ endYearReportRepository }) {
    this.endYearReportRepository = endYearReportRepository;
  }

  async execute(landId) {
    return await this.endYearReportRepository.getByLandId(landId);
  }
}

module.exports = GetEndYearReportsByLandId;
