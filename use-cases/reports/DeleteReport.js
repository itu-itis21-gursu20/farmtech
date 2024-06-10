class DeleteReport {
  constructor({ reportRepository }) {
    this.reportRepository = reportRepository;
  }

  async execute(id) {
    return await this.reportRepository.deleteById(id);
  }
}

module.exports = DeleteReport;
