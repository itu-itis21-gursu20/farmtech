class RefundController {
  constructor({ createRefund, getRefund, getRefundsByLandId, updateRefund, deleteRefund }) {
    this.createRefund = createRefund;
    this.getRefund = getRefund;
    this.getRefundsByLandId = getRefundsByLandId;
    this.updateRefund = updateRefund;
    this.deleteRefund = deleteRefund;
  }

  async createRefundHandler(req, res) {
    try {
      const refund = await this.createRefund.execute(req.body, req.params.landId);
      res.status(201).json(refund);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getRefundHandler(req, res) {
    try {
      const refund = await this.getRefund.execute(req.params.id);
      if (refund) {
        res.status(200).json(refund);
      } else {
        res.status(404).json({ message: 'Refund not found.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getRefundsByLandIdHandler(req, res) {
    try {
      const refunds = await this.getRefundsByLandId.execute(req.params.landId);
      if (refunds.length > 0) {
        res.status(200).json(refunds);
      } else {
        res.status(404).json({ message: 'No refunds found with the given land ID.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateRefundHandler(req, res) {
    try {
      const refund = await this.updateRefund.execute(req.params.id, req.body);
      if (refund) {
        res.status(200).json(refund);
      } else {
        res.status(404).json({ message: 'Refund not found.' });
      }
    } catch (err) {
      res.status500.json({ error: err.message });
    }
  }

  async deleteRefundHandler(req, res) {
    try {
      await this.deleteRefund.execute(req.params.id);
      res.status(200).json({ message: "Refund has been deleted." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = RefundController;
