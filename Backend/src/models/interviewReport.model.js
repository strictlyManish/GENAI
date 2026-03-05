const mongoose = require("mongoose");

const TechnicalQuestionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical Question Is Required"],
    },
    answer: {
      type: String,
      required: [true, "Answer Is Required"],
    },
    intention: {
      type: String,
      required: [true, "Intention Is Required"],
    },
  },
  { _id: false },
);

const BehavioralQuestionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical Question Is Required"],
    },
    answer: {
      type: String,
      required: [true, "Answer Is Required"],
    },
    intention: {
      type: String,
      required: [true, "Intention Is Required"],
    },
  },
  { _id: false },
);

const SkillGapsSchema = mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill Is Required"],
    },
    servity: {
      type: String,
      required: [true, "Servity Is Required"],
      enum: ["Low", "Medium", "High"],
    },
  },
  { _id: false },
);

const PreprationPlanSchema = mongoose.Schema({
  day: {
    type: Number,
    required: [true, "Day Is Required"],
  },
  focus: {
    type: String,
    required: [true, "Focus Is Required"],
  },
  task: [
    {
      type: String,
      required: [true, "Task Is Required"],
    },
  ],
});

const InterViewSchemaReport = mongoose.Schema({
  jobDescription: {
    type: String,
    required: [true, "Job Description is required"],
  },
  resume: {
    type: String,
  },
  selfDescription: {
    type: String,
  },
  matchScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  TechnicalQuestions: [TechnicalQuestionSchema],
  BehavioralQuestions: [BehavioralQuestionSchema],
  skillGaps: [SkillGapsSchema],
  preprationPlan: [PreprationPlanSchema],
},{ timestamps: true});

 
const InterviewReport = mongoose.model("InterviewReport", InterViewSchemaReport);
module.exports = InterviewReport;
