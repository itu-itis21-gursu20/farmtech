const express = require('express');
const router = express.Router();
const CreateEndYearReport = require('../use-cases/endYearReports/CreateEndYearReport');
const GetEndYearReport = require('../use-cases/endYearReports/GetEndYearReport');
const GetEndYearReportsByLandId = require('../use-cases/endYearReports/GetEndYearReportsByLandId');
const UpdateEndYearReport = require('../use-cases/endYearReports/UpdateEndYearReport');
const DeleteEndYearReport = require('../use-cases/endYearReports/DeleteEndYearReport');
const EndYearReportController = require('../controllers/endYearReportController');
const MongoEndYearReportRepository = require('../infrastructure/database/MongoEndYearReportRepository');
const mongoose = require('mongoose');

router.use((req, res, next) => {
  const endYearReportRepository = new MongoEndYearReportRepository({ db: mongoose.connection.db });
  req.createEndYearReport = new CreateEndYearReport({ endYearReportRepository });
  req.getEndYearReport = new GetEndYearReport({ endYearReportRepository });
  req.getEndYearReportsByLandId = new GetEndYearReportsByLandId({ endYearReportRepository });
  req.updateEndYearReport = new UpdateEndYearReport({ endYearReportRepository });
  req.deleteEndYearReport = new DeleteEndYearReport({ endYearReportRepository });
  req.endYearReportController = new EndYearReportController({
    createEndYearReport: req.createEndYearReport,
    getEndYearReport: req.getEndYearReport,
    getEndYearReportsByLandId: req.getEndYearReportsByLandId,
    updateEndYearReport: req.updateEndYearReport,
    deleteEndYearReport: req.deleteEndYearReport
  });
  next();
});

router.post("/:landId?", (req, res) => req.endYearReportController.createEndYearReportHandler(req, res));
router.put("/:id", (req, res) => req.endYearReportController.updateEndYearReportHandler(req, res));
router.delete("/:id", (req, res) => req.endYearReportController.deleteEndYearReportHandler(req, res));
router.get("/find/:id?", (req, res) => req.endYearReportController.getEndYearReportHandler(req, res));
router.get("/:landId?", (req, res) => req.endYearReportController.getEndYearReportsByLandIdHandler(req, res));

module.exports = router;
