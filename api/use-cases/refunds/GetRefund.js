class GetRefund {
  constructor({ refundRepository }) {
    this.refundRepository = refundRepository;
  }

  async execute(id) {
    if (id) {
      return await this.refundRepository.getById(id);
    } else {
      return await this.refundRepository.getAll();
    }
  }
}

module.exports = GetRefund;
