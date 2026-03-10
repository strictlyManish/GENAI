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
    }),
  ),
  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),
  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    }),
  ),
  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string()),
    }),
  ),
  title: z.string(),
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
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(text);

    const validated = interviewReportSchema.parse(parsed);

    return validated;
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}

const resumePdfSchema = z.object({
  html: z.string(),
});

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  const prompt = `
You are a professional resume writer.

Generate a polished ATS-friendly resume in HTML format.

INPUT DATA
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

RULES
- Tailor the resume to the job description.
- Emphasize relevant skills and achievements.
- Use bullet points for experience.
- Do NOT invent information.

HTML REQUIREMENTS
- Output must be valid HTML.
- No markdown or explanations.
- Use semantic HTML tags.

Structure:
<header>
<h1>Name</h1>
<p>Contact Info</p>

<section>
<h2>Professional Summary</h2>

<section>
<h2>Skills</h2>

<section>
<h2>Work Experience</h2>

<section>
<h2>Education</h2>

<section>
<h2>Projects</h2>

OUTPUT FORMAT:
Return JSON with this schema:

{
  "html": "<html>...</html>"
}
`;

  try {
    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
    });

    let text = response.choices[0].message.content;

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(text);

    return resumePdfSchema.parse(parsed);
  } catch (error) {
    console.error("Resume Generation Error:", error);
    throw error;
  }
}

module.exports = {  generateInterviewReport, generateResumePdf };
