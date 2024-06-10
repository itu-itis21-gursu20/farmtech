
class GetPurchase {
  constructor({ purchaseRepository }) {
    this.purchaseRepository = purchaseRepository;
  }

  async execute(id) {
    if (id) {
      return await this.purchaseRepository.getById(id);
    } else {
      return await this.purchaseRepository.getAll();
    }
  }
}

module.exports = GetPurchase;

