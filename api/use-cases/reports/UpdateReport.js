class UpdateReport {
  constructor({ reportRepository }) {
    this.reportRepository = reportRepository;
  }

  async execute(id, data) {
    return await this.reportRepository.updateById(id, data);
  }
}

module.exports = UpdateReport;
