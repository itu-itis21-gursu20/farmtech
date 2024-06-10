const express = require('express');
const router = express.Router();
const CreateReport = require('../use-cases/reports/CreateReport');
const GetReport = require('../use-cases/reports/GetReport');
const GetReportsByLandId = require('../use-cases/reports/GetReportsByLandId');
const UpdateReport = require('../use-cases/reports/UpdateReport');
const DeleteReport = require('../use-cases/reports/DeleteReport');
const ReportController = require('../controllers/reportController');
const MongoReportRepository = require('../infrastructure/database/MongoReportRepository');
const mongoose = require('mongoose');

// const { jwtMiddleware, userMiddleware } = require('../middleware/auth');

// router.use(jwtMiddleware); // JWT doğrulamasını ekle
// router.use(userMiddleware); // Kullanıcı (farmer veya engineer) erişimi



router.use((req, res, next) => {
  const reportRepository = new MongoReportRepository({ db: mongoose.connection.db });
  req.createReport = new CreateReport({ reportRepository });
  req.getReport = new GetReport({ reportRepository });
  req.getReportsByLandId = new GetReportsByLandId({ reportRepository });
  req.updateReport = new UpdateReport({ reportRepository });
  req.deleteReport = new DeleteReport({ reportRepository });
  req.reportController = new ReportController({
    createReport: req.createReport,
    getReport: req.getReport,
    getReportsByLandId: req.getReportsByLandId,
    updateReport: req.updateReport,
    deleteReport: req.deleteReport
  });
  next();
});

router.post("/:landId?", (req, res) => req.reportController.createReportHandler(req, res));
router.put("/:id", (req, res) => req.reportController.updateReportHandler(req, res));
router.delete("/:id", (req, res) => req.reportController.deleteReportHandler(req, res));
router.get("/find/:id?", (req, res) => req.reportController.getReportHandler(req, res));
router.get("/:landId?", (req, res) => req.reportController.getReportsByLandIdHandler(req, res));

module.exports = router;
