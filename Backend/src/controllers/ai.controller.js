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
    const resumeContent = await new pdfParse.PDFParse(
      Uint8Array.from(req.file.buffer),
    ).getText();

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

async function GetinterviewreportByidController(req, res) {
  const { interviewId } = req.params;

  try {
    const interviewReport = await interviewReportModel.findOne({
      _id: interviewId,
      user: req.user.id,
    });

    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found",
      });
    }

    res.status(200).json({
      message: "Interview report fetched successfully",
      interviewReport,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching the interview report",
      error: error.message,
    });
  }
}

async function GetAllReportsController(req, res) {
  try {
    const interviewReports = await interviewReportModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");


    if(interviewReports.length === 0) {
      return res.status(404).json({
        message: "No interview reports found for the user",
      });
    };


    res.status(200).json({
      message: "Interview reports fetched successfully",
      interviewReports,
    });


  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching the interview reports",
      error: error.message,
    });
  }
}

module.exports = { InterviewController, GetinterviewreportByidController,GetAllReportsController };
