class PurchaseController {
  constructor({ createPurchase, getPurchase, getPurchasesByLandId, updatePurchase, deletePurchase }) {
    this.createPurchase = createPurchase;
    this.getPurchase = getPurchase;
    this.getPurchasesByLandId = getPurchasesByLandId;
    this.updatePurchase = updatePurchase;
    this.deletePurchase = deletePurchase;
  }

  async createPurchaseHandler(req, res) {
    try {
      const purchase = await this.createPurchase.execute({ land_id: req.params.landId, ...req.body });
      res.status(201).json(purchase);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getPurchaseHandler(req, res) {
    try {
      const purchase = await this.getPurchase.execute(req.params.id);
      if (purchase) {
        res.status(200).json(purchase);
      } else {
        res.status(404).json({ message: 'Purchase not found.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getPurchasesByLandIdHandler(req, res) {
    try {
      const purchases = await this.getPurchasesByLandId.execute(req.params.landId);
      if (purchases.length > 0) {
        res.status(200).json(purchases);
      } else {
        res.status(404).json({ message: 'No purchases found with the given land ID.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updatePurchaseHandler(req, res) {
    try {
      const purchase = await this.updatePurchase.execute(req.params.id, req.body);
      if (purchase) {
        res.status(200).json(purchase);
      } else {
        res.status(404).json({ message: 'Purchase not found.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deletePurchaseHandler(req, res) {
    try {
      await this.deletePurchase.execute(req.params.id);
      res.status(200).json({ message: "Purchase has been deleted." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = PurchaseController;
