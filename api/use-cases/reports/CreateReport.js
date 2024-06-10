const Report = require("../../entities/Report");

class CreateReport {
  constructor({ reportRepository }) {
    this.reportRepository = reportRepository;
  }

  async execute(data, landId) {
    const report = new Report(data);
    const createdReport = await this.reportRepository.add(report, landId);
    return createdReport;
  }
}

module.exports = CreateReport;
