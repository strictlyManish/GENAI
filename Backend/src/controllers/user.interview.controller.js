const pdfParse = require("pdf-parse");
const InterviewReport = require("../models/interviewReport.model");
const GenerateInterviewReport = require("../services/generateInterviewReport");

async function InterviewController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Resume file is required",
      });
    };

    const { jobDescription, selfDescription } = req.body;
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    const aiReports = await GenerateInterviewReport({
      resume: resumeText,
      jobDescription,
      selfDescription,
    });

    const userInterviewReport = await InterviewReport.create({
      user: req.user.id,
      resume: resumeText,
      selfDescription,
      jobDescription,
      ...aiReports,
    });

    return res.status(200).json({
      message: "Report Generated Successfully",
      userInterviewReport,
    });
  } catch (error) {
    console.error("Interview Report Error:", error);

    return res.status(500).json({
      message: "Failed to generate interview report",
      error: error.message,
    });
  }
}

module.exports = InterviewController;
