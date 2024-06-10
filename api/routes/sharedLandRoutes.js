const express = require('express');
const router = express.Router();
const CreateSharedLand = require('../use-cases/sharedLands/CreateSharedLand');
const GetSharedLand = require('../use-cases/sharedLands/GetSharedLand');
const GetSharedLandByPhoneNumber = require('../use-cases/sharedLands/GetSharedLandByPhoneNumber');
const UpdateSharedLand = require('../use-cases/sharedLands/UpdateSharedLand');
const DeleteSharedLand = require('../use-cases/sharedLands/DeleteSharedLand');
const SharedLandController = require('../controllers/sharedLandController');
const MongoSharedLandRepository = require('../infrastructure/database/MongoSharedLandRepository');
const mongoose = require('mongoose');

router.use((req, res, next) => {
  const sharedLandRepository = new MongoSharedLandRepository({ db: mongoose.connection.db });
  req.createSharedLand = new CreateSharedLand({ sharedLandRepository });
  req.getSharedLand = new GetSharedLand({ sharedLandRepository });
  req.getSharedLandByPhoneNumber = new GetSharedLandByPhoneNumber({ sharedLandRepository });
  req.updateSharedLand = new UpdateSharedLand({ sharedLandRepository });
  req.deleteSharedLand = new DeleteSharedLand({ sharedLandRepository });
  req.sharedLandController = new SharedLandController({
    createSharedLand: req.createSharedLand,
    getSharedLand: req.getSharedLand,
    getSharedLandByPhoneNumber: req.getSharedLandByPhoneNumber,
    updateSharedLand: req.updateSharedLand,
    deleteSharedLand: req.deleteSharedLand
  });
  next();
});

router.post("/", (req, res) => req.sharedLandController.createSharedLandHandler(req, res));
router.get("/find/:landId?", (req, res) => req.sharedLandController.getSharedLandHandler(req, res));
router.get("/:phoneNumber?", (req, res) => req.sharedLandController.getSharedLandByPhoneNumberHandler(req, res));
router.put("/:landId", (req, res) => req.sharedLandController.updateSharedLandHandler(req, res));
router.delete("/:landId", (req, res) => req.sharedLandController.deleteSharedLandHandler(req, res));

module.exports = router;
