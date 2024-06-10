const express = require('express');
const router = express.Router();
const CreateEngineer = require('../use-cases/engineers/CreateEngineer');
const GetEngineer = require('../use-cases/engineers/GetEngineer');
const UpdateEngineer = require('../use-cases/engineers/UpdateEngineer');
const DeleteEngineer = require('../use-cases/engineers/DeleteEngineer');
const EngineerController = require('../controllers/engineerController');
const MongoEngineerRepository = require('../infrastructure/database/MongoEngineerRepository');

router.use((req, res, next) => {
  const engineerRepository = new MongoEngineerRepository({ db: req.db });
  req.createEngineer = new CreateEngineer({ engineerRepository });
  req.getEngineer = new GetEngineer({ engineerRepository });
  req.updateEngineer = new UpdateEngineer({ engineerRepository });
  req.deleteEngineer = new DeleteEngineer({ engineerRepository });
  req.engineerController = new EngineerController({
    createEngineer: req.createEngineer,
    getEngineer: req.getEngineer,
    updateEngineer: req.updateEngineer,
    deleteEngineer: req.deleteEngineer
  });
  next();
});

router.post("/", (req, res) => req.engineerController.createEngineerHandler(req, res));
router.get("/:phoneNumber?", (req, res) => req.engineerController.getEngineerHandler(req, res));
router.put("/:phoneNumber", (req, res) => req.engineerController.updateEngineerHandler(req, res));
router.delete("/:phoneNumber", (req, res) => req.engineerController.deleteEngineerHandler(req, res));

module.exports = router;
