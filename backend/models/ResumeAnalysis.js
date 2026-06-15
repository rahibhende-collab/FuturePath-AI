import mongoose from "mongoose";

const resumeAnalysisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  atsScore: {
    type: Number,
    required: true,
  },
  suggestions: {
    type: [String],
    default: [],
  },
  missingKeywords: {
    type: [String],
    default: [],
  },
  formattingImprovements: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const ResumeAnalysis = mongoose.model("ResumeAnalysis", resumeAnalysisSchema);
export default ResumeAnalysis;
