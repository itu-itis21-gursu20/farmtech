
// class GetGptResponse {
//     constructor({ gptService }) {
//       this.gptService = gptService;
//     }


//     async execute(prompt) {
//       console.log("prompt", prompt);
//         const messages = [
//           {
//             role: "system",
//             content: "You are a helpful assistant."
//           },
//           {
//             "role": "user", "content": [
//             {"type": "text", "text": prompt.text},
//             {"type": "image_url", "image_url": {
//               url: `data:image/png;base64,${prompt.image}`}
//             }
//             ]
//           }

//         ];
  
        
//         return await this.gptService.getChatResponse(messages);
//   }
// }

// module.exports = GetGptResponse;
  


class GetGptResponse {
  constructor({ gptService }) {
    this.gptService = gptService;
  }

  async execute(prompt) {
    console.log("prompt", prompt);

    const userContent = [];

    if (prompt.text) {
      userContent.push({ "type": "text", "text": prompt.text });
    }

    if (prompt.image) {
      userContent.push({
        "type": "image_url",
        "image_url": {
          "url": `data:image/png;base64,${prompt.image}`
        }
      });
    }

    const messages = [
      {
        role: "system",
        content: "You are a helpful assistant."
      },
      {
        role: "user",
        content: userContent
      }
    ];

    return await this.gptService.getChatResponse(messages);
  }
}

module.exports = GetGptResponse;

