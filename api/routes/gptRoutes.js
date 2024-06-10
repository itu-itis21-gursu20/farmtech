const express = require('express');
const router = express.Router();
const GptController = require('../controllers/gptController');
const GetGptResponse = require('../use-cases/gpt/GetGptResponse');
const GptService = require('../services/gptService');

router.use((req, res, next) => {
  const gptService = GptService;
  req.getGptResponse = new GetGptResponse({ gptService });
  req.gptController = new GptController({ getGptResponse: req.getGptResponse });
  next();
});

router.post("/", (req, res) => req.gptController.getGptResponseHandler(req, res));

module.exports = router;
