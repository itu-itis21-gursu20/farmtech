const express = require('express');
const router = express.Router();
const CreateRefund = require('../use-cases/refunds/CreateRefund');
const GetRefund = require('../use-cases/refunds/GetRefund');
const GetRefundsByLandId = require('../use-cases/refunds/GetRefundsByLandId');
const UpdateRefund = require('../use-cases/refunds/UpdateRefund');
const DeleteRefund = require('../use-cases/refunds/DeleteRefund');
const RefundController = require('../controllers/refundController');
const MongoRefundRepository = require('../infrastructure/database/MongoRefundRepository');
const mongoose = require('mongoose');

router.use((req, res, next) => {
  const refundRepository = new MongoRefundRepository({ db: mongoose.connection.db });
  req.createRefund = new CreateRefund({ refundRepository });
  req.getRefund = new GetRefund({ refundRepository });
  req.getRefundsByLandId = new GetRefundsByLandId({ refundRepository });
  req.updateRefund = new UpdateRefund({ refundRepository });
  req.deleteRefund = new DeleteRefund({ refundRepository });
  req.refundController = new RefundController({
    createRefund: req.createRefund,
    getRefund: req.getRefund,
    getRefundsByLandId: req.getRefundsByLandId,
    updateRefund: req.updateRefund,
    deleteRefund: req.deleteRefund
  });
  next();
});

router.post("/:landId?", (req, res) => req.refundController.createRefundHandler(req, res));
router.put("/:id", (req, res) => req.refundController.updateRefundHandler(req, res));
router.delete("/:id", (req, res) => req.refundController.deleteRefundHandler(req, res));
router.get("/find/:id?", (req, res) => req.refundController.getRefundHandler(req, res));
router.get("/:landId?", (req, res) => req.refundController.getRefundsByLandIdHandler(req, res));

module.exports = router;
