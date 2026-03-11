const express = require("express");
const AuthMiddleware = require("../middlewares/auth.middleware");
const InterviewRoute = express.Router();
const upload = require("../middlewares/file.middleware");
const {
  InterviewController,
  GetinterviewreportByidController,
  GetAllReportsController,
  generateResumePdfController
} = require("../controllers/ai.controller");

/**
 * @route POST /api/interview
 * @description Genrate new interview report on the basis of user given resume and job description or jodescription
 * @access private
 */

InterviewRoute.post(
  "/",
  AuthMiddleware,
  upload.single("resume"),
  InterviewController,
);

/**
 * @route GET /api/interview
 * @description Get all interview reports of the user
 * @access private
 */

InterviewRoute.get(
  "/report/:interviewId",
  AuthMiddleware,
  GetinterviewreportByidController,
);

/**
 * @route GET api/interview/
 * @description Get all interview reports of logged user
 * @access private
 *
 */
InterviewRoute.get("/", AuthMiddleware, GetAllReportsController);

/**
 * @route POST api/interview/resume/pdf/:interviewReportId
 * @description Generate resume PDF for the given interview report ID
 * @access private
 * 
 */

InterviewRoute.post("/resume/pdf/:interviewReportId",AuthMiddleware,generateResumePdfController)

module.exports = InterviewRoute;
