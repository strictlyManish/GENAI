const express = require("express");
const AuthMiddleware = require("../middlewares/auth.middleware");
const InterviewController = require("../controllers/user.interview.controller");
const InterviewRoute = express.Router();
const upload = require("../middlewares/file.middleware");

/**
 * @route POST /api/interview
 * @description Genrate new interview report on the basis of user given resume and job description or jodescription
 * @access private
 */

InterviewRoute.post("/",AuthMiddleware,upload.single("resume"),InterviewController)


module.exports = InterviewRoute;