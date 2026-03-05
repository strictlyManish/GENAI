const {GoogleGenAI} = require("@google/genai");
const {z} = require("zod");
const {zodToJsonSchema} = require("zod-to-json-schema");



const ai = new GoogleGenAI({
    apiKey : process.env.GOOGEL_GENAI_API_KEY
});

async function invokeGeminiAi() {
    const response = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:"hello Gemini ! Explain what is interview ?"
    });

    console.log(response.text)
};

module.exports = invokeGeminiAi;