import OpenAI from "openai";
import pdf from "pdf-parse";
import User from "../models/User.js";
import Career from "../models/Career.js";
import Roadmap from "../models/Roadmap.js";
import ResumeAnalysis from "../models/ResumeAnalysis.js";

// Helper to check and clean OpenAI response
const parseJSONResponse = (text) => {
  try {
    // Strip markdown code block wrapping if present
    let cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanText);
  } catch (err) {
    console.error("Failed to parse AI JSON response. Raw text:", text);
    throw new Error("Invalid JSON structure from AI response");
  }
};

// Initialize OpenAI client
const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === "YOUR_OPENAI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  return new OpenAI({ apiKey });
};

// @desc    Generate Career Recommendations
// @route   POST /api/ai/career
// @access  Private (or Public if token omitted, but we secure it as requested)
export const getCareerRecommendations = async (req, res) => {
  try {
    const { education, skills, interests, goals } = req.body;
    const skillsStr = Array.isArray(skills) ? skills.join(", ") : skills;
    const interestsStr = Array.isArray(interests) ? interests.join(", ") : interests;

    const openai = getOpenAIClient();

    if (!openai) {
      // Return highly contextual mock recommendations
      const mockRecs = [
        {
          title: `Full Stack Engineer (focusing on ${skillsStr || "Web Development"})`,
          match: 94,
          description: `Great alignment with your education (${education || "B.Tech/MCA"}) and skills in ${skillsStr || "general development"}.`,
          skills: [skillsStr || "React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
          salary: "₹6 - ₹15 LPA",
          futureScope: "High growth, high startup capability"
        },
        {
          title: "Cloud Infrastructure / DevOps Engineer",
          match: 85,
          description: "Fits goals related to high scalability and cloud adoption. Recommended transition pathway.",
          skills: ["Linux", "AWS/Azure", "Docker", "Kubernetes", "CI/CD Pipelines"],
          salary: "₹7 - ₹18 LPA",
          futureScope: "Excellent future scope, DevOps is essential for all modern tech companies"
        },
        {
          title: "AI Integrations Engineer",
          match: 78,
          description: `Leverages interests in ${interestsStr || "AI / Product Design"} to build intelligent SaaS tools.`,
          skills: ["Python", "API Integration", "Prompt Engineering", "Node.js", "Vector Databases"],
          salary: "₹8 - ₹22 LPA",
          futureScope: "Highest rising scope in current global market"
        }
      ];
      return res.json({ recommendations: mockRecs });
    }

    const systemPrompt = `You are a career guidance advisor. You recommend exactly 3 tailored career paths. You MUST return ONLY a JSON array, with no other text, comments or markdown.
The format must match this typescript schema:
Array<{
  title: string;
  match: number; // 0 to 100
  description: string;
  skills: string[];
  salary: string; // e.g. "₹5 - ₹12 LPA"
  futureScope: string;
}>`;

    const userPrompt = `Education: ${education}
Skills: ${skillsStr}
Interests: ${interestsStr}
Goals: ${goals}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
    });

    const recommendations = parseJSONResponse(completion.choices[0].message.content);

    // Save under career cache if authenticated
    if (req.user) {
      await Career.deleteMany({ user: req.user._id });
      for (const rec of recommendations) {
        await Career.create({
          user: req.user._id,
          careerName: rec.title,
          salary: rec.salary,
          requiredSkills: rec.skills,
          futureScope: rec.futureScope,
          description: rec.description,
          matchPercentage: rec.match
        });
      }
    }

    res.json({ recommendations });
  } catch (error) {
    console.error("Career AI Error:", error);
    res.status(500).json({ message: "Error generating career recommendations" });
  }
};

// @desc    Generate Career Roadmap
// @route   POST /api/ai/roadmap
// @access  Private
export const getCareerRoadmap = async (req, res) => {
  try {
    const { careerName } = req.body;
    if (!careerName) {
      return res.status(400).json({ message: "Please provide target career name" });
    }

    const openai = getOpenAIClient();

    if (!openai) {
      // Mock Roadmap
      const mockRoadmap = {
        career: careerName,
        timeline: "6 Months",
        milestones: [
          {
            phase: "Month 1-2: Foundation",
            title: "Build Basic Competency",
            description: "Learn core syntax, theory, and basic workflows required for this track.",
            resources: ["freeCodeCamp Guide", "Official Documentation", "YouTube crash courses"],
            certifications: ["Basic Competency Badge"]
          },
          {
            phase: "Month 3-4: Application",
            title: "Project Development & Frameworks",
            description: "Build 2-3 real-world projects applying structural libraries.",
            resources: ["GitHub repos", "MDN Tutorials", "Coursera Guided Projects"],
            certifications: ["Certified Developer Associate"]
          },
          {
            phase: "Month 5-6: Readiness",
            title: "Advanced Topics & Placement Prep",
            description: "Optimization, tooling, deployment pipelines, and mock interviews.",
            resources: ["LeetCode / HackerRank", "ATS Resume builders", "Mock Interview Platforms"],
            certifications: ["Professional Practitioner Certificate"]
          }
        ]
      };

      if (req.user) {
        await Roadmap.create({
          user: req.user._id,
          career: careerName,
          generatedPlan: mockRoadmap
        });
      }

      return res.json(mockRoadmap);
    }

    const systemPrompt = `You are a technical career planner. Generate a step-by-step roadmap for the requested career. Return ONLY a JSON object matching this schema:
{
  "career": string,
  "timeline": string,
  "milestones": Array<{
    "phase": string, // e.g. "Month 1-2"
    "title": string,
    "description": string,
    "resources": string[],
    "certifications": string[]
  }>
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Generate a roadmap for: ${careerName}` }
      ],
      temperature: 0.7,
    });

    const roadmapData = parseJSONResponse(completion.choices[0].message.content);

    if (req.user) {
      await Roadmap.create({
        user: req.user._id,
        career: careerName,
        generatedPlan: roadmapData
      });
    }

    res.json(roadmapData);
  } catch (error) {
    console.error("Roadmap AI Error:", error);
    res.status(500).json({ message: "Error generating roadmap" });
  }
};

// @desc    Skill Gap Analyzer
// @route   POST /api/ai/skill-gap
// @access  Private
export const getSkillGapAnalysis = async (req, res) => {
  try {
    const { currentSkills, targetCareer } = req.body;
    if (!targetCareer) {
      return res.status(400).json({ message: "Target career is required" });
    }

    const currentSkillsStr = Array.isArray(currentSkills) ? currentSkills.join(", ") : currentSkills || "None";
    const openai = getOpenAIClient();

    if (!openai) {
      // Mock Gap Analysis
      const mockGap = {
        missingSkills: [
          { skill: "Docker & Containers", priority: "High", difficulty: "Medium", duration: "2 Weeks" },
          { skill: "System Architecture Design", priority: "Medium", difficulty: "Hard", duration: "4 Weeks" },
          { skill: "CI/CD & Github Actions", priority: "High", difficulty: "Medium", duration: "2 Weeks" },
          { skill: "NoSQL DB (MongoDB/Redis)", priority: "Medium", difficulty: "Easy", duration: "1 Week" }
        ]
      };
      return res.json(mockGap);
    }

    const systemPrompt = `Compare the user's current skills vs the target career. Determine missing skills, their learning priority, difficulty level, and estimated learning duration. Return ONLY a JSON object:
{
  "missingSkills": Array<{
    "skill": string,
    "priority": "High" | "Medium" | "Low",
    "difficulty": "Easy" | "Medium" | "Hard",
    "duration": string
  }>
}`;

    const userPrompt = `Current Skills: ${currentSkillsStr}
Target Career: ${targetCareer}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
    });

    const gapData = parseJSONResponse(completion.choices[0].message.content);
    res.json(gapData);
  } catch (error) {
    console.error("Skill Gap AI Error:", error);
    res.status(500).json({ message: "Error generating skill gap analysis" });
  }
};

// @desc    Analyze PDF Resume
// @route   POST /api/ai/resume
// @access  Private
export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a PDF resume file" });
    }

    // Extract text from PDF buffer
    let parsedPdf;
    try {
      parsedPdf = await pdf(req.file.buffer);
    } catch (pdfErr) {
      console.error("PDF Parsing Error:", pdfErr);
      return res.status(400).json({ message: "Failed to parse PDF file. Ensure it is a valid PDF." });
    }

    const resumeText = parsedPdf.text;
    const openai = getOpenAIClient();

    if (!openai) {
      // Mock ATS Resume Score
      const mockAnalysis = {
        atsScore: 78,
        suggestions: [
          "Include quantifiable metrics (e.g. 'reduced latency by 30%', 'managed 500+ active users').",
          "Add professional projects matching target roles.",
          "Add a brief LinkedIn profile link in header."
        ],
        missingKeywords: [
          "REST APIs",
          "CI/CD Pipelines",
          "Kubernetes",
          "Microservices",
          "Agile Methodology"
        ],
        formattingImprovements: [
          "Maintain uniform spacing around section dividers.",
          "Limit total length to exactly 1 or 2 pages maximum.",
          "Avoid using nested two-column tables, which confuse ATS scanners."
        ]
      };

      if (req.user) {
        await ResumeAnalysis.create({
          user: req.user._id,
          atsScore: mockAnalysis.atsScore,
          suggestions: mockAnalysis.suggestions,
          missingKeywords: mockAnalysis.missingKeywords,
          formattingImprovements: mockAnalysis.formattingImprovements
        });
      }

      return res.json(mockAnalysis);
    }

    const systemPrompt = `You are an expert ATS (Applicant Tracking System) optimizer. Analyze the provided resume text and generate a structured evaluation. Return ONLY a JSON object:
{
  "atsScore": number, // 0 to 100
  "suggestions": string[], // concrete suggestions
  "missingKeywords": string[], // keywords relevant for modern tech/CS roles
  "formattingImprovements": string[] // layout guidelines
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Resume Text:\n\n${resumeText.substring(0, 8000)}` }
      ],
      temperature: 0.5,
    });

    const analysis = parseJSONResponse(completion.choices[0].message.content);

    if (req.user) {
      await ResumeAnalysis.create({
        user: req.user._id,
        atsScore: analysis.atsScore,
        suggestions: analysis.suggestions,
        missingKeywords: analysis.missingKeywords,
        formattingImprovements: analysis.formattingImprovements
      });
    }

    res.json(analysis);
  } catch (error) {
    console.error("Resume AI Error:", error);
    res.status(500).json({ message: "Error analyzing resume" });
  }
};

// @desc    Mock Interview System (Questions & Feedback)
// @route   POST /api/ai/interview
// @access  Private
export const handleMockInterview = async (req, res) => {
  try {
    const { action, type, question, answer } = req.body;

    if (!action) {
      return res.status(400).json({ message: "Action (generate or evaluate) is required" });
    }

    const openai = getOpenAIClient();

    if (action === "generate") {
      const category = type || "Technical (Core CS)";

      if (!openai) {
        // Mock Questions
        const mockQuestions = [
          `Can you describe the lifecycle of a thread in Java/OOP?`,
          `What are indexes in DBMS, and how do they speed up database search queries?`,
          `Explain the difference between TCP and UDP networking protocols.`,
          `What is a memory leak, and how does Java's Garbage Collector address it?`,
          `Describe a situation where you had to solve a difficult debugging puzzle in your projects.`
        ];
        return res.json({ questions: mockQuestions });
      }

      const systemPrompt = `You are a tech recruiter. Generate exactly 5 relevant interview questions for the specified category. Return ONLY a JSON array of strings, no other content:
e.g. ["Question 1", "Question 2", ...]`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Category: ${category}` }
        ],
        temperature: 0.7,
      });

      const questions = parseJSONResponse(completion.choices[0].message.content);
      return res.json({ questions });
    }

    if (action === "evaluate") {
      if (!question || !answer) {
        return res.status(400).json({ message: "Question and Answer are required for evaluation" });
      }

      if (!openai) {
        // Mock Feedback
        return res.json({
          communicationScore: 8,
          confidenceScore: 7,
          technicalScore: 8,
          feedback: `Good structured response. You successfully explained the concept of "${question.substring(0, 30)}...".`,
          improvements: [
            "Provide a specific concrete example from your past coding experiences.",
            "Avoid verbal pauses like 'um' or 'ah' to boost confidence score."
          ]
        });
      }

      const systemPrompt = `Evaluate the candidate's response to the given question. Grade their communication skills, technical correctness, and confidence. Return ONLY a JSON object:
{
  "communicationScore": number, // 1 to 10
  "confidenceScore": number, // 1 to 10
  "technicalScore": number, // 1 to 10
  "feedback": string,
  "improvements": string[]
}`;

      const userPrompt = `Question: ${question}
Answer: ${answer}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.5,
      });

      const feedback = parseJSONResponse(completion.choices[0].message.content);
      return res.json(feedback);
    }

    res.status(400).json({ message: "Invalid action. Choose 'generate' or 'evaluate'." });
  } catch (error) {
    console.error("Interview AI Error:", error);
    res.status(500).json({ message: "Error conducting mock interview" });
  }
};

// @desc    Salary Predictor
// @route   POST /api/ai/salary
// @access  Public
export const predictSalary = async (req, res) => {
  try {
    const { career, location, experience } = req.body;

    if (!career) {
      return res.status(400).json({ message: "Career path is required" });
    }

    const loc = location || "India (Tier-1)";
    const exp = experience || "0-1 years (Entry level)";
    const openai = getOpenAIClient();

    if (!openai) {
      // Mock Salary
      return res.json({
        salaryRange: "₹6 LPA - ₹11 LPA",
        growthProjection: "15% annual growth, peaking around ₹25 LPA after 5-7 years in senior roles."
      });
    }

    const systemPrompt = `You are a salary consulting advisor. Predict a realistic salary range and growth trajectory based on career title, location and years of experience. Keep values relevant to the location. Return ONLY a JSON object:
{
  "salaryRange": string, // e.g. "₹6 LPA - ₹11 LPA"
  "growthProjection": string
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Career: ${career}, Location: ${loc}, Experience: ${exp}` }
      ],
      temperature: 0.5,
    });

    const salaryData = parseJSONResponse(completion.choices[0].message.content);
    res.json(salaryData);
  } catch (error) {
    console.error("Salary AI Error:", error);
    res.status(500).json({ message: "Error predicting salary" });
  }
};
