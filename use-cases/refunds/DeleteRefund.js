class DeleteRefund {
  constructor({ refundRepository }) {
    this.refundRepository = refundRepository;
  }

  async execute(id) {
    return await this.refundRepository.deleteById(id);
  }
}

module.exports = DeleteRefund;
