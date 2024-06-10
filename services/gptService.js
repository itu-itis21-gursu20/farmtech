const {OpenAI} = require("openai");
require('dotenv').config(); // .env dosyasını yükle

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const getChatResponse = async (messages) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: messages,
    });

    return response.choices[0].message.content.trim()
}

module.exports = {
    getChatResponse,
};
