class DeletePurchase {
  constructor({ purchaseRepository }) {
    this.purchaseRepository = purchaseRepository;
  }

  async execute(id) {
    return await this.purchaseRepository.deleteById(id);
  }
}

module.exports = DeletePurchase;
