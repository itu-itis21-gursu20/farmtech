const {OpenAI} = require("openai");


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const getChatResponse = async (messages) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        // messages: [
        // {
        //     role: "system",
        //     content: "You are a helpful assistant."
        // },
        // {
        //     role: "user",
        //     content: prompt
        // }
        // ],
        messages: messages,
        max_tokens: 300,
});

return response.choices[0].message.content.trim()

//console.log(JSON.stringify(result, null, 2));
}

module.exports = {
    getChatResponse,
};
