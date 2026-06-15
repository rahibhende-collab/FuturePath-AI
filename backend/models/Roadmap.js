import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  career: {
    type: String,
    required: true,
  },
  generatedPlan: {
    type: mongoose.Schema.Types.Mixed, // Storing JSON structure with milestones, timeline, resources, certifications
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Roadmap = mongoose.model("Roadmap", roadmapSchema);
export default Roadmap;
