class GetGptResponse {
    constructor({ gptService }) {
      this.gptService = gptService;
    }
  
    // async execute(prompt) {
    //   return await this.gptService.getChatResponse(prompt);
    // }
    async execute(prompt) {
        const messages = [
          {
            role: "system",
            content: "You are a helpful assistant."
          },
          {
            role: "user",
            content: prompt.text
          }
        ];
    
        if (prompt.image) { // image_url
          messages.push({
            role: "user",
            content: "![Image](data:image/jpeg;base64," + prompt.image + ")" //content: `![Image](${prompt.image_url})
          });
        }
        return await this.gptService.getChatResponse(messages);
  }
}

module.exports = GetGptResponse;
  