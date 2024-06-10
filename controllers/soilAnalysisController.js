class SoilAnalysisController {
  constructor({ createSoilAnalysis, getSoilAnalysis, getSoilAnalysesByLandId, updateSoilAnalysis, deleteSoilAnalysis }) {
    this.createSoilAnalysis = createSoilAnalysis;
    this.getSoilAnalysis = getSoilAnalysis;
    this.getSoilAnalysesByLandId = getSoilAnalysesByLandId;
    this.updateSoilAnalysis = updateSoilAnalysis;
    this.deleteSoilAnalysis = deleteSoilAnalysis;
  }

  async createSoilAnalysisHandler(req, res) {
    try {
      const soilAnalysis = await this.createSoilAnalysis.execute(req.body, req.params.landId);
      res.status(201).json(soilAnalysis);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getSoilAnalysisHandler(req, res) {
    try {
      const soilAnalysis = await this.getSoilAnalysis.execute(req.params.id);
      if (soilAnalysis) {
        res.status(200).json(soilAnalysis);
      } else {
        res.status(404).json({ message: 'Soil analysis not found.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getSoilAnalysesByLandIdHandler(req, res) {
    try {
      const soilAnalyses = await this.getSoilAnalysesByLandId.execute(req.params.landId);
      if (soilAnalyses.length > 0) {
        res.status(200).json(soilAnalyses);
      } else {
        res.status(404).json({ message: 'No soil analyses found with the given land ID.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateSoilAnalysisHandler(req, res) {
    try {
      const soilAnalysis = await this.updateSoilAnalysis.execute(req.params.id, req.body);
      if (soilAnalysis) {
        res.status(200).json(soilAnalysis);
      } else {
        res.status(404).json({ message: 'Soil analysis not found.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteSoilAnalysisHandler(req, res) {
    try {
      await this.deleteSoilAnalysis.execute(req.params.id);
      res.status(200).json({ message: "Soil analysis has been deleted." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = SoilAnalysisController;
