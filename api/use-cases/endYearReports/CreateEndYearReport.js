const EndYearReport = require("../../entities/EndYearReport");

class CreateEndYearReport {
  constructor({ endYearReportRepository }) {
    this.endYearReportRepository = endYearReportRepository;
  }

  async execute(data, landId) {
    const endYearReport = new EndYearReport(data);
    const createdEndYearReport = await this.endYearReportRepository.add(endYearReport, landId);
    return createdEndYearReport;
  }
}

module.exports = CreateEndYearReport;
