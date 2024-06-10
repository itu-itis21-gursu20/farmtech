class Purchase {
    constructor({ approved, description, purchaseItems }) {
      this.approved = approved;
      this.description = description;
      this.purchaseItems = purchaseItems;
    }
  }
  
  module.exports = Purchase;
  