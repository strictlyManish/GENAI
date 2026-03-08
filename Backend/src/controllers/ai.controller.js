const pdfParse = require("pdf-parse");
const interviewReportModel = require("../models/interviewReport.model");
const generateInterviewReport = require("../service/ai.service");

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function InterviewController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Resume PDF file is required",
      });
    }

    // Parse PDF
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();

    const { selfDescription, jobDescription } = req.body;

    if (!selfDescription || !jobDescription) {
      return res.status(400).json({
        message: "selfDescription and jobDescription are required",
      });
    }

    // Generate AI report
    const interViewReportByAi = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
    });

    // Save to DB
    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      ...interViewReportByAi,
    });

    res.status(201).json({
      message: "Interview report generated successfully.",
      interviewReport,
    });
  } catch (error) {
    console.error("Interview Report Error:", error);

    res.status(500).json({
      message: "Something went wrong while generating the interview report",
      error: error.message,
    });
  }
}

module.exports = InterviewController;