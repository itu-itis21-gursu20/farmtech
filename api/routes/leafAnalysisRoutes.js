const express = require('express');
const router = express.Router();
const CreateLeafAnalysis = require('../use-cases/leafAnalyses/CreateLeafAnalysis');
const GetLeafAnalysis = require('../use-cases/leafAnalyses/GetLeafAnalysis');
const GetLeafAnalysesByLandId = require('../use-cases/leafAnalyses/GetLeafAnalysesByLandId');
const UpdateLeafAnalysis = require('../use-cases/leafAnalyses/UpdateLeafAnalysis');
const DeleteLeafAnalysis = require('../use-cases/leafAnalyses/DeleteLeafAnalysis');
const LeafAnalysisController = require('../controllers/leafAnalysisController');
const MongoLeafAnalysisRepository = require('../infrastructure/database/MongoLeafAnalysisRepository');
const mongoose = require('mongoose');

router.use((req, res, next) => {
  const leafAnalysisRepository = new MongoLeafAnalysisRepository({ db: mongoose.connection.db });
  req.createLeafAnalysis = new CreateLeafAnalysis({ leafAnalysisRepository });
  req.getLeafAnalysis = new GetLeafAnalysis({ leafAnalysisRepository });
  req.getLeafAnalysesByLandId = new GetLeafAnalysesByLandId({ leafAnalysisRepository });
  req.updateLeafAnalysis = new UpdateLeafAnalysis({ leafAnalysisRepository });
  req.deleteLeafAnalysis = new DeleteLeafAnalysis({ leafAnalysisRepository });
  req.leafAnalysisController = new LeafAnalysisController({
    createLeafAnalysis: req.createLeafAnalysis,
    getLeafAnalysis: req.getLeafAnalysis,
    getLeafAnalysesByLandId: req.getLeafAnalysesByLandId,
    updateLeafAnalysis: req.updateLeafAnalysis,
    deleteLeafAnalysis: req.deleteLeafAnalysis
  });
  next();
});

router.post("/:landId?", (req, res) => req.leafAnalysisController.createLeafAnalysisHandler(req, res));
router.put("/:id", (req, res) => req.leafAnalysisController.updateLeafAnalysisHandler(req, res));
router.delete("/:id", (req, res) => req.leafAnalysisController.deleteLeafAnalysisHandler(req, res));
router.get("/find/:id?", (req, res) => req.leafAnalysisController.getLeafAnalysisHandler(req, res));
router.get("/:landId?", (req, res) => req.leafAnalysisController.getLeafAnalysesByLandIdHandler(req, res));

module.exports = router;
