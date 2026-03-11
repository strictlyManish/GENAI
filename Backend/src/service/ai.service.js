// resumeInterviewService.js
const Groq = require("groq-sdk");
const { z } = require("zod");
const { chromium } = require("playwright");

// Initialize Groq SDK
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// -----------------------------
// Zod Schemas
// -----------------------------
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

const resumePdfSchema = z.object({
  html: z.string(),
});

// -----------------------------
// Playwright PDF generator
// -----------------------------
async function generatePdfForHTML(htmlContent) {
  const browser = await chromium.launch({
    // optional: use Brave browser
    executablePath:
      "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    headless: true,
  });

  const page = await browser.newPage();

  await page.setContent(htmlContent, {
    waitUntil: "networkidle",
  });

  const pdfBuffer = await page.pdf({
    path: "output.pdf",
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  return pdfBuffer;
}

// -----------------------------
// Interview Report Generator
// -----------------------------
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

    // Remove markdown code blocks if present
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

// -----------------------------
// Resume PDF Generator
// -----------------------------
async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    // Define CSS separately in your backend to save AI tokens
    const cssStyles = `
        body { font-family: 'Helvetica', sans-serif; line-height: 1.5; color: #333; }
        .container { padding: 40px; }
        h1 { color: #2c3e50; border-bottom: 2px solid #eee; }
        .section { margin-top: 20px; }
        .header { text-align: center; }
    `;

    const prompt = `Generate a professional resume as a JSON object.
                    Resume Data: ${resume}
                    Target Job: ${jobDescription}
                    Context: ${selfDescription}

                    Output format:
                    {
                        "title": "Full Name - Resume",
                        "html_body": "Only the HTML content inside the <body> tag. Use single quotes for attributes."
                    }
                    
                    Focus on making it ATS-friendly and 1-2 pages. Use professional headings.`;

    try {
        const response = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.1,
            // 1. Set max_tokens higher (4096 is a safe bet for resumes)
            max_tokens: 4096, 
            response_format: { type: "json_object" }, 
        });

        const text = response.choices[0].message.content;
        const parsed = JSON.parse(text);

        // 2. Combine the AI's content with your CSS Skeleton
        const fullHtml = `
            <html>
                <head>
                    <style>${cssStyles}</style>
                </head>
                <body>
                    <div class="container">
                        ${parsed.html_body}
                    </div>
                </body>
            </html>
        `;

        // 3. Generate PDF from the combined HTML
        const pdfBuffer = await generatePdfForHTML(fullHtml);

        return pdfBuffer;
    } catch (error) {
        // If the API fails with 400, it's usually because the prompt or tokens need adjustment
        console.error("Groq API Error:", error.message);
        if (error.failed_generation) {
            console.error("Partial content received:", error.failed_generation);
        }
        throw error;
    }
}

// -----------------------------
// Export functions
// -----------------------------
module.exports = {
  generateInterviewReport,
  generateResumePdf,
};
