const express = require('express');
const router = express.Router();
const CreateFarmer = require('../use-cases/farmers/CreateFarmer');
const GetFarmer = require('../use-cases/farmers/GetFarmer');
const UpdateFarmer = require('../use-cases/farmers/UpdateFarmer');
const DeleteFarmer = require('../use-cases/farmers/DeleteFarmer');
const FarmerController = require('../controllers/farmerController');
const MongoFarmerRepository = require('../infrastructure/database/MongoFarmerRepository');


// const { jwtMiddleware, adminMiddleware } = require('../middleware/auth');


// router.use(jwtMiddleware); // JWT doğrulamasını ekle
// router.use(adminMiddleware); // Sadece admin erişimi


router.use((req, res, next) => {
  const farmerRepository = new MongoFarmerRepository({ db: req.db });
  req.createFarmer = new CreateFarmer({ farmerRepository });
  req.getFarmer = new GetFarmer({ farmerRepository });
  req.updateFarmer = new UpdateFarmer({ farmerRepository });
  req.deleteFarmer = new DeleteFarmer({ farmerRepository });
  req.farmerController = new FarmerController({
    createFarmer: req.createFarmer,
    getFarmer: req.getFarmer,
    updateFarmer: req.updateFarmer,
    deleteFarmer: req.deleteFarmer
  });
  next();
});

router.post("/", (req, res) => req.farmerController.createFarmerHandler(req, res));
router.get("/:phoneNumber?", (req, res) => req.farmerController.getFarmerHandler(req, res));
router.put("/:phoneNumber", (req, res) => req.farmerController.updateFarmerHandler(req, res));
router.delete("/:phoneNumber", (req, res) => req.farmerController.deleteFarmerHandler(req, res));

module.exports = router;

