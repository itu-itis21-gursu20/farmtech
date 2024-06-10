const SharedLand = require("../entities/SharedLand.js");

class SharedLandController {
  constructor({ createSharedLand, getSharedLand, getSharedLandByPhoneNumber, updateSharedLand, deleteSharedLand }) {
    this.createSharedLand = createSharedLand;
    this.getSharedLand = getSharedLand;
    this.getSharedLandByPhoneNumber = getSharedLandByPhoneNumber;
    this.updateSharedLand = updateSharedLand;
    this.deleteSharedLand = deleteSharedLand;
  }

  async createSharedLandHandler(req, res) {
    try {
      const sharedLand = await this.createSharedLand.execute(req.body);
      res.status(201).json(sharedLand);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getSharedLandHandler(req, res) {
    try {
      const sharedLand = await this.getSharedLand.execute(req.params.landId);
      console.log(sharedLand);
      if (sharedLand.length > 0) {
        res.status(200).json(sharedLand);
      } else {
        res.status(404).json({ message: 'SharedLand not found.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getSharedLandByPhoneNumberHandler(req, res) {
    try {
      const sharedLands = await this.getSharedLandByPhoneNumber.execute(req.params.phoneNumber);
      if (sharedLands.length > 0) {
        res.status(200).json(sharedLands);
      } else {
        res.status(404).json({ message: 'No lands found with the given phone number.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateSharedLandHandler(req, res) {
    try {
      const sharedLand = await this.updateSharedLand.execute(req.params.landId, req.body);
      if (sharedLand) {
        res.status(200).json(sharedLand);
      } else {
        res.status(404).json({ message: 'SharedLand not found.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteSharedLandHandler(req, res) {
    try {
      await this.deleteSharedLand.execute(req.params.landId);
      res.status(200).json({ message: "SharedLand has been deleted." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = SharedLandController;

