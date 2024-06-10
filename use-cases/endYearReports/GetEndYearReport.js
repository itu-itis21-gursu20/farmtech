class GetEndYearReport {
  constructor({ endYearReportRepository }) {
    this.endYearReportRepository = endYearReportRepository;
  }

  async execute(id) {
    if (id) {
      return await this.endYearReportRepository.getById(id);
    } else {
      return await this.endYearReportRepository.getAll();
    }
  }
}

module.exports = GetEndYearReport;
