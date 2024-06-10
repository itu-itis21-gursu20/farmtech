class UpdateRefund {
  constructor({ refundRepository }) {
    this.refundRepository = refundRepository;
  }

  async execute(id, data) {
    return await this.refundRepository.updateById(id, data);
  }
}

module.exports = UpdateRefund;
