import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  interests: {
    type: [String],
    default: [],
  },
  education: {
    degree: { type: String, default: "" },
    college: { type: String, default: "" },
    year: { type: String, default: "" },
    cgpa: { type: String, default: "" }
  },
  goals: {
    type: [String],
    default: [],
  },
  targetCareer: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const User = mongoose.model("User", userSchema);
export default User;
