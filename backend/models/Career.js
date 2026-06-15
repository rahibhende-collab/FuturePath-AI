import mongoose from "mongoose";

const careerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  careerName: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    default: "",
  },
  requiredSkills: {
    type: [String],
    default: [],
  },
  futureScope: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  matchPercentage: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Career = mongoose.model("Career", careerSchema);
export default Career;
