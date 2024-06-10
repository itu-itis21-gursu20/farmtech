class UpdatePurchase {
  constructor({ purchaseRepository }) {
    this.purchaseRepository = purchaseRepository;
  }

  async execute(id, data) {
    return await this.purchaseRepository.updateById(id, data);
  }
}

module.exports = UpdatePurchase;
