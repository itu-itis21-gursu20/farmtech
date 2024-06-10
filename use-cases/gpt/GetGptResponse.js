
class GetGptResponse {
    constructor({ gptService }) {
      this.gptService = gptService;
    }


    async execute(prompt) {
      console.log("prompt", prompt);
        const messages = [
          {
            role: "system",
            content: "You are a helpful assistant."
          },
          // {
          //   role: "user",
          //   content: JSON.stringify([
          //     { "type": "text", "text": prompt.text },
          //     { "type": "image_url", "image_url": prompt.image_url }
          //   ])
          // }
          {
            "role": "user", "content": [
            {"type": "text", "text": prompt.text},
            {"type": "image_url", "image_url": {
              url: `data:image/png;base64,${prompt.image}`}
            }
        ]}

        ];
    
        // if (prompt.image_base64) {
        //   messages.push({
        //     role: "user",
        //     content: `{"type": "image_url", "image_url": {"url": "data:image/png;base64,${prompt.image_base64}"}}`
        //   });
        //   console.log(messages.content);
        // }
        
        // if (prompt.image_base64) {
        //   messages.push({
        //     role: "user",
        //     content: "![Image](prompt.image_base64)"
        //   });
        // }
        
        return await this.gptService.getChatResponse(messages);
  }
}

module.exports = GetGptResponse;
  