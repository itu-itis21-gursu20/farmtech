class UpdateEndYearReport {
  constructor({ endYearReportRepository }) {
    this.endYearReportRepository = endYearReportRepository;
  }

  async execute(id, data) {
    return await this.endYearReportRepository.updateById(id, data);
  }
}

module.exports = UpdateEndYearReport;
