class GptController {
    constructor({ getGptResponse }) {
      this.getGptResponse = getGptResponse;
    }
  
    async getGptResponseHandler(req, res) {
      try {
        const { text, image } = req.body; 
        const response = await this.getGptResponse.execute({ text, image });  
        res.status(200).json({ response });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  }
  
  module.exports = GptController;
  