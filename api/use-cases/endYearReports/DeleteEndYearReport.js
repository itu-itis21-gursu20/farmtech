class DeleteEndYearReport {
  constructor({ endYearReportRepository }) {
    this.endYearReportRepository = endYearReportRepository;
  }

  async execute(id) {
    return await this.endYearReportRepository.deleteById(id);
  }
}

module.exports = DeleteEndYearReport;
