class Refund {
    constructor({ approved, description, refundItems }) {
      this.approved = approved;
      this.description = description;
      this.refundItems = refundItems;
    }
  }
  
  module.exports = Refund;
  