const Groq = require("groq-sdk");
const { z } = require("zod");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z.number(),
  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),
  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),
  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    })
  ),
  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string()),
    })
  ),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {

  const prompt = `
Generate an interview report in JSON format.

Return ONLY valid JSON.
Do not wrap JSON in markdown or code blocks.

SCHEMA:
${JSON.stringify(interviewReportSchema.shape, null, 2)}

RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}
`;

  try {

    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
    });

    let text = response.choices[0].message.content;

    // 🔧 Remove markdown code blocks if present
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const parsed = JSON.parse(text);

    const validated = interviewReportSchema.parse(parsed);

    return validated
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}

module.exports = generateInterviewReport