class GetRefundsByLandId {
    constructor({ refundRepository }) {
      this.refundRepository = refundRepository;
    }
  
    async execute(landId) {
      return await this.refundRepository.getByLandId(landId);
    }
  }
  
  module.exports = GetRefundsByLandId;
  