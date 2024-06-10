const express = require('express');
const router = express.Router();
const CreateSoilAnalysis = require('../use-cases/soilAnalyses/CreateSoilAnalysis');
const GetSoilAnalysis = require('../use-cases/soilAnalyses/GetSoilAnalysis');
const GetSoilAnalysesByLandId = require('../use-cases/soilAnalyses/GetSoilAnalysesByLandId');
const UpdateSoilAnalysis = require('../use-cases/soilAnalyses/UpdateSoilAnalysis');
const DeleteSoilAnalysis = require('../use-cases/soilAnalyses/DeleteSoilAnalysis');
const SoilAnalysisController = require('../controllers/soilAnalysisController');
const MongoSoilAnalysisRepository = require('../infrastructure/database/MongoSoilAnalysisRepository');
const mongoose = require('mongoose');

router.use((req, res, next) => {
  const soilAnalysisRepository = new MongoSoilAnalysisRepository({ db: mongoose.connection.db });
  req.createSoilAnalysis = new CreateSoilAnalysis({ soilAnalysisRepository });
  req.getSoilAnalysis = new GetSoilAnalysis({ soilAnalysisRepository });
  req.getSoilAnalysesByLandId = new GetSoilAnalysesByLandId({ soilAnalysisRepository });
  req.updateSoilAnalysis = new UpdateSoilAnalysis({ soilAnalysisRepository });
  req.deleteSoilAnalysis = new DeleteSoilAnalysis({ soilAnalysisRepository });
  req.soilAnalysisController = new SoilAnalysisController({
    createSoilAnalysis: req.createSoilAnalysis,
    getSoilAnalysis: req.getSoilAnalysis,
    getSoilAnalysesByLandId: req.getSoilAnalysesByLandId,
    updateSoilAnalysis: req.updateSoilAnalysis,
    deleteSoilAnalysis: req.deleteSoilAnalysis
  });
  next();
});

router.post("/:landId?", (req, res) => req.soilAnalysisController.createSoilAnalysisHandler(req, res));
router.put("/:id", (req, res) => req.soilAnalysisController.updateSoilAnalysisHandler(req, res));
router.delete("/:id", (req, res) => req.soilAnalysisController.deleteSoilAnalysisHandler(req, res));
router.get("/find/:id?", (req, res) => req.soilAnalysisController.getSoilAnalysisHandler(req, res));
router.get("/:landId?", (req, res) => req.soilAnalysisController.getSoilAnalysesByLandIdHandler(req, res));

module.exports = router;


