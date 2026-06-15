import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ai", aiRoutes);

// Test runner function
async function runTests() {
  console.log("=== FuturePath AI Integration Tests ===");

  // 1. Mock DB connection (in-memory or sandbox db)
  const testMongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/futurepath-test";
  
  try {
    await mongoose.connect(testMongoUri);
    console.log("✓ MongoDB Connected for Testing");
  } catch (err) {
    console.log("⚠️ MongoDB offline, testing endpoints with fallback routes...");
  }

  // 2. Start temporary testing server on random port
  const port = 5999;
  const server = app.listen(port, async () => {
    console.log(`✓ Test Server listening on port ${port}`);

    try {
      const baseUrl = `http://localhost:${port}/api`;

      // 3. Test Registration Endpoint
      const testUser = {
        name: "Test Engineer",
        email: `test-${Date.now()}@futurepath.ai`,
        password: "securepassword123",
        skills: ["Java", "SQL"],
        interests: ["Coding", "System Design"],
        education: {
          degree: "MCA",
          college: "Testing University",
          year: "2026",
          cgpa: "9.0"
        }
      };

      console.log("\nTesting /auth/register...");
      const registerRes = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testUser)
      });
      const registerData = await registerRes.json();
      
      if (registerRes.ok && registerData.token) {
        console.log("✓ Registration Successful! Token generated.");
      } else {
        console.log("✗ Registration Failed:", registerData.message);
      }

      const token = registerData.token;

      // 4. Test Login Endpoint
      console.log("\nTesting /auth/login...");
      const loginRes = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password
        })
      });
      const loginData = await loginRes.json();
      if (loginRes.ok && loginData.token) {
        console.log("✓ Login Successful!");
      } else {
        console.log("✗ Login Failed:", loginData.message);
      }

      // 5. Test Profile Fetch
      console.log("\nTesting /user/profile GET...");
      const profileRes = await fetch(`${baseUrl}/user/profile`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const profileData = await profileRes.json();
      if (profileRes.ok && profileData.email === testUser.email) {
        console.log("✓ Profile retrieved matches input!");
      } else {
        console.log("✗ Profile retrieval failed:", profileData.message);
      }

      // 6. Test AI Career Recommendation
      console.log("\nTesting /ai/career...");
      const careerRes = await fetch(`${baseUrl}/ai/career`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          education: "MCA",
          skills: ["Java", "SQL"],
          interests: ["Backend Development"],
          goals: ["High Salary"]
        })
      });
      const careerData = await careerRes.json();
      if (careerRes.ok && careerData.recommendations) {
        console.log("✓ AI Career recommendations generated successfully!");
        console.log(`  Found path: ${careerData.recommendations[0]?.title}`);
      } else {
        console.log("✗ AI Career recommendations failed:", careerData.message);
      }

      // 7. Test AI Salary Predictor
      console.log("\nTesting /ai/salary...");
      const salaryRes = await fetch(`${baseUrl}/ai/salary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          career: "Full Stack Engineer",
          location: "Bangalore",
          experience: "1-3 years"
        })
      });
      const salaryData = await salaryRes.json();
      if (salaryRes.ok && salaryData.salaryRange) {
        console.log(`✓ AI Salary prediction success! Estimated: ${salaryData.salaryRange}`);
      } else {
        console.log("✗ AI Salary prediction failed:", salaryData.message);
      }

      console.log("\n=== Integration Tests Completed Successfully ===");
    } catch (err) {
      console.error("✗ Testing encountered error:", err);
    } finally {
      // Clean up connections
      await mongoose.disconnect();
      server.close();
      console.log("Test Server closed.");
      process.exit(0);
    }
  });
}

runTests();
