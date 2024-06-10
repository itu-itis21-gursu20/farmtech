const Purchase = require("../../entities/Purchase");

class CreatePurchase {
  constructor({ purchaseRepository }) {
    this.purchaseRepository = purchaseRepository;
  }

  async execute(data, landId) {
    const purchase = new Purchase(data);
    const createdPurchase = await this.purchaseRepository.add(purchase, landId);
    return createdPurchase;
  }
}

module.exports = CreatePurchase;

