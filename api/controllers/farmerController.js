class FarmerController {

    constructor({ createFarmer, getFarmer, updateFarmer, deleteFarmer }) {
      this.createFarmer = createFarmer;
      this.getFarmer = getFarmer;
      this.updateFarmer = updateFarmer;
      this.deleteFarmer = deleteFarmer;
    }
  
    async createFarmerHandler(req, res) {
      try {
        const farmer = await this.createFarmer.execute(req.body);
        res.status(201).json(farmer);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    async getFarmerHandler(req, res) {
      try {
        const farmer = await this.getFarmer.execute(req.params.phoneNumber);
        if (farmer) {
          res.status(200).json(farmer);
        } else {
          res.status(404).json({ message: 'Farmer not found.' });
        }
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    async updateFarmerHandler(req, res) {
      try {
        const farmer = await this.updateFarmer.execute(req.params.phoneNumber, req.body);
        if (farmer) {
          res.status(200).json(farmer);
        } else {
          res.status(404).json({ message: 'Farmer not found.' });
        }
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  
    async deleteFarmerHandler(req, res) {
      try {
        await this.deleteFarmer.execute(req.params.phoneNumber);
        res.status(200).json({ message: "Farmer has been deleted." });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  }
  
  module.exports = FarmerController;
  