class GetPurchasesByLandId {
  constructor({ purchaseRepository }) {
    this.purchaseRepository = purchaseRepository;
  }

  async execute(landId) {
    return await this.purchaseRepository.getByLandId(landId);
  }
}

module.exports = GetPurchasesByLandId;
