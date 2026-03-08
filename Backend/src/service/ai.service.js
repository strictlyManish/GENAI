const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

// 1. DEFINE YOUR SCHEMA
const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate matches the JD"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question"),
        intention: z.string().describe("Why the interviewer is asking this"),
        answer: z.string().describe("The ideal points to cover in the answer")
    })).describe("List of technical questions"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral/soft-skill question"),
        intention: z.string().describe("What they are testing (e.g., leadership, conflict)"),
        answer: z.string().describe("The recommended STAR method approach")
    })).describe("List of behavioral questions"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The missing skill"),
        severity: z.enum(["low", "medium", "high"]).describe("Importance of this gap")
    })).describe("Critical gaps found in the profile"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("Day number"),
        focus: z.string().describe("Topic of the day"),
        tasks: z.array(z.string()).describe("Specific tasks/resources")
    })).describe("Day-wise study plan")
});

// 2. INITIALIZE AI
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    // CRITICAL: Convert Zod to Clean OpenAPI 3.0 for Gemini
    const jsonSchema = zodToJsonSchema(interviewReportSchema, { target: "openapi3" });
    
    // Remove metadata fields that Gemini rejects
    delete jsonSchema.$schema;
    delete jsonSchema.definitions;

    const prompt = `
        Generate an interview report for a candidate with the following details.
        RESUME: ${resume}
        SELF-DESCRIPTION: ${selfDescription}
        JOB DESCRIPTION: ${jobDescription}
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview", // Use 1.5-flash or 2.0-flash for high stability
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: {
                responseMimeType: "application/json",
                responseSchema: jsonSchema, // Forces structured output
                temperature: 0.1, // Keeps results consistent/factual
            }
        });

        // The response.text will be a pure JSON string
        // return JSON.parse(response.text);

        console.log(response.text)
    } catch (error) {
        console.error("AI Generation Error:", error.message);
        throw error;
    }
}

module.exports = { generateInterviewReport };