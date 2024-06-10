class LeafAnalysisController {
  constructor({ createLeafAnalysis, getLeafAnalysis, getLeafAnalysesByLandId, updateLeafAnalysis, deleteLeafAnalysis }) {
    this.createLeafAnalysis = createLeafAnalysis;
    this.getLeafAnalysis = getLeafAnalysis;
    this.getLeafAnalysesByLandId = getLeafAnalysesByLandId;
    this.updateLeafAnalysis = updateLeafAnalysis;
    this.deleteLeafAnalysis = deleteLeafAnalysis;
  }

  async createLeafAnalysisHandler(req, res) {
    try {
      const leafAnalysis = await this.createLeafAnalysis.execute(req.body, req.params.landId);
      res.status(201).json(leafAnalysis);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getLeafAnalysisHandler(req, res) {
    try {
      const leafAnalysis = await this.getLeafAnalysis.execute(req.params.id);
      if (leafAnalysis) {
        res.status(200).json(leafAnalysis);
      } else {
        res.status(404).json({ message: 'Leaf analysis not found.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getLeafAnalysesByLandIdHandler(req, res) {
    try {
      const leafAnalyses = await this.getLeafAnalysesByLandId.execute(req.params.landId);
      if (leafAnalyses.length > 0) {
        res.status(200).json(leafAnalyses);
      } else {
        res.status(404).json({ message: 'No leaf analyses found with the given land ID.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateLeafAnalysisHandler(req, res) {
    try {
      const leafAnalysis = await this.updateLeafAnalysis.execute(req.params.id, req.body);
      if (leafAnalysis) {
        res.status(200).json(leafAnalysis);
      } else {
        res.status(404).json({ message: 'Leaf analysis not found.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteLeafAnalysisHandler(req, res) {
    try {
      await this.deleteLeafAnalysis.execute(req.params.id);
      res.status(200).json({ message: "Leaf analysis has been deleted." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = LeafAnalysisController;
