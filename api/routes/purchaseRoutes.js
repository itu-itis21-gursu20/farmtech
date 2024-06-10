const express = require('express');
const router = express.Router();
const CreatePurchase = require('../use-cases/purchases/CreatePurchase');
const GetPurchase = require('../use-cases/purchases/GetPurchase');
const GetPurchasesByLandId = require('../use-cases/purchases/GetPurchasesByLandId');
const UpdatePurchase = require('../use-cases/purchases/UpdatePurchase');
const DeletePurchase = require('../use-cases/purchases/DeletePurchase');
const PurchaseController = require('../controllers/purchaseController');
const MongoPurchaseRepository = require('../infrastructure/database/MongoPurchaseRepository');
const mongoose = require('mongoose');

router.use((req, res, next) => {
  const purchaseRepository = new MongoPurchaseRepository({ db: mongoose.connection.db });
  req.createPurchase = new CreatePurchase({ purchaseRepository });
  req.getPurchase = new GetPurchase({ purchaseRepository });
  req.getPurchasesByLandId = new GetPurchasesByLandId({ purchaseRepository });
  req.updatePurchase = new UpdatePurchase({ purchaseRepository });
  req.deletePurchase = new DeletePurchase({ purchaseRepository });
  req.purchaseController = new PurchaseController({
    createPurchase: req.createPurchase,
    getPurchase: req.getPurchase,
    getPurchasesByLandId: req.getPurchasesByLandId,
    updatePurchase: req.updatePurchase,
    deletePurchase: req.deletePurchase
  });
  next();
});

router.post("/:landId?", (req, res) => req.purchaseController.createPurchaseHandler(req, res));
router.put("/:id", (req, res) => req.purchaseController.updatePurchaseHandler(req, res));
router.delete("/:id", (req, res) => req.purchaseController.deletePurchaseHandler(req, res));
router.get("/:landId?", (req, res) => req.purchaseController.getPurchasesByLandIdHandler(req, res));
router.get("/find/:id?", (req, res) => req.purchaseController.getPurchaseHandler(req, res));

module.exports = router;
