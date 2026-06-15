import express from "express";
import multer from "multer";
import {
  getCareerRecommendations,
  getCareerRoadmap,
  getSkillGapAnalysis,
  analyzeResume,
  handleMockInterview,
  predictSalary,
} from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Configure multer for memory storage uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  },
});

router.post("/career", protect, getCareerRecommendations);
router.post("/roadmap", protect, getCareerRoadmap);
router.post("/skill-gap", protect, getSkillGapAnalysis);
router.post("/resume", protect, upload.single("resume"), analyzeResume);
router.post("/interview", protect, handleMockInterview);
router.post("/salary", predictSalary); // prediction can be public

export default router;
