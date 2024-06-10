class EndYearReportController {
  constructor({ createEndYearReport, getEndYearReport, getEndYearReportsByLandId, updateEndYearReport, deleteEndYearReport }) {
    this.createEndYearReport = createEndYearReport;
    this.getEndYearReport = getEndYearReport;
    this.getEndYearReportsByLandId = getEndYearReportsByLandId;
    this.updateEndYearReport = updateEndYearReport;
    this.deleteEndYearReport = deleteEndYearReport;
  }

  async createEndYearReportHandler(req, res) {
    try {
      const endYearReport = await this.createEndYearReport.execute(req.body, req.params.landId);
      res.status(201).json(endYearReport);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getEndYearReportHandler(req, res) {
    try {
      const endYearReport = await this.getEndYearReport.execute(req.params.id);
      if (endYearReport) {
        res.status(200).json(endYearReport);
      } else {
        res.status(404).json({ message: 'End year report not found.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getEndYearReportsByLandIdHandler(req, res) {
    try {
      const endYearReports = await this.getEndYearReportsByLandId.execute(req.params.landId);
      if (endYearReports.length > 0) {
        res.status(200).json(endYearReports);
      } else {
        res.status(404).json({ message: 'No end year reports found with the given land ID.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateEndYearReportHandler(req, res) {
    try {
      const endYearReport = await this.updateEndYearReport.execute(req.params.id, req.body);
      if (endYearReport) {
        res.status(200).json(endYearReport);
      } else {
        res.status(404).json({ message: 'End year report not found.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteEndYearReportHandler(req, res) {
    try {
      await this.deleteEndYearReport.execute(req.params.id);
      res.status(200).json({ message: "End year report has been deleted." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = EndYearReportController;
