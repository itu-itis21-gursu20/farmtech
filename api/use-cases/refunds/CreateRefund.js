const Refund = require("../../entities/Refund");

class CreateRefund {
  constructor({ refundRepository }) {
    this.refundRepository = refundRepository;
  }

  async execute(data, landId) {
    const refund = new Refund(data);
    const createdRefund = await this.refundRepository.add(refund, landId);
    return createdRefund;
  }
}

module.exports = CreateRefund;
