class GetReport {
  constructor({ reportRepository }) {
    this.reportRepository = reportRepository;
  }

  async execute(id) {
    if (id) {
      return await this.reportRepository.getById(id);
    } else {
      return await this.reportRepository.getAll();
    }
  }
}

module.exports = GetReport;
