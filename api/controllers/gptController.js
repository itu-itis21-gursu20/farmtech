class GptController {
    constructor({ getGptResponse }) {
      this.getGptResponse = getGptResponse;
    }
  
    async getGptResponseHandler(req, res) {
      try {
        const { text, image_base64 } = req.body; //  image_url
        const response = await this.getGptResponse.execute({ text, image_base64 });  //  image_url
        res.status(200).json({ response });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  }
  
  module.exports = GptController;
  