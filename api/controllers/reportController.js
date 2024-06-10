class ReportController {
  constructor({ createReport, getReport, getReportsByLandId, updateReport, deleteReport }) {
    this.createReport = createReport;
    this.getReport = getReport;
    this.getReportsByLandId = getReportsByLandId;
    this.updateReport = updateReport;
    this.deleteReport = deleteReport;
  }

  async createReportHandler(req, res) {
    try {
      const report = await this.createReport.execute(req.body, req.params.landId);
      res.status(201).json(report);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getReportHandler(req, res) {
    try {
      const report = await this.getReport.execute(req.params.id);
      if (report) {
        res.status(200).json(report);
      } else {
        res.status(404).json({ message: 'Report not found.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getReportsByLandIdHandler(req, res) {
    try {
      const reports = await this.getReportsByLandId.execute(req.params.landId);
      if (reports.length > 0) {
        res.status(200).json(reports);
      } else {
        res.status(404).json({ message: 'No reports found with the given land ID.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateReportHandler(req, res) {
    try {
      const report = await this.updateReport.execute(req.params.id, req.body);
      if (report) {
        res.status(200).json(report);
      } else {
        res.status(404).json({ message: 'Report not found.' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteReportHandler(req, res) {
    try {
      await this.deleteReport.execute(req.params.id);
      res.status(200).json({ message: "Report has been deleted." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = ReportController;
