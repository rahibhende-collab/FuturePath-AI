import { Routes, Route, Navigate, NavLink, useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "./components/ThemeToggle";
import { Hero } from "./components/Hero";
import { CareerRecommendation } from "./components/CareerRecommendation";
import { GovernmentJobs } from "./components/GovernmentJobs";
import { PlacementPrep } from "./components/PlacementPrep";
import { StartupIdeas } from "./components/StartupIdeas";
import { ResumeBuilder } from "./components/ResumeBuilder";
import { MockInterview } from "./components/MockInterview";
import { ProgressTracker } from "./components/ProgressTracker";
import { Sparkles, Building2, Target, Rocket, FileText, MessageSquare, TrendingUp, Home } from "lucide-react";

function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "career", label: "Career AI", icon: Sparkles, path: "/dashboard/career" },
    { id: "govt", label: "Govt Jobs", icon: Building2, path: "/dashboard/govt" },
    { id: "placement", label: "Placement", icon: Target, path: "/dashboard/placement" },
    { id: "startup", label: "Startup", icon: Rocket, path: "/dashboard/startup" },
    { id: "resume", label: "Resume", icon: FileText, path: "/dashboard/resume" },
    { id: "interview", label: "Interview", icon: MessageSquare, path: "/dashboard/interview" },
    { id: "progress", label: "Progress", icon: TrendingUp, path: "/dashboard/progress" },
    { id: "home", label: "Home", icon: Home, path: "/" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex flex-col">
      <header className="bg-white dark:bg-[#111] border-b dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
              <Sparkles className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FuturePath AI</h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <span className="text-sm text-gray-600 dark:text-gray-300">Welcome, Student</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                S
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#111] border dark:border-gray-800 rounded-lg p-1 overflow-x-auto custom-scrollbar">
            <nav className="flex space-x-2 min-w-max">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div className="mt-6">
                <Routes>
                  <Route path="career" element={<CareerRecommendation />} />
                  <Route path="govt" element={<GovernmentJobs />} />
                  <Route path="placement" element={<PlacementPrep />} />
                  <Route path="startup" element={<StartupIdeas />} />
                  <Route path="resume" element={<ResumeBuilder />} />
                  <Route path="interview" element={<MockInterview />} />
                  <Route path="progress" element={<ProgressTracker />} />
                  <Route path="*" element={<Navigate to="career" replace />} />
                </Routes>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-bold">FuturePath AI</h3>
              </div>
              <p className="text-sm text-gray-400">
                Right Career Before Wrong Decisions
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Career Guidance</li>
                <li>Government Jobs</li>
                <li>Placement Prep</li>
                <li>Startup Ideas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Resume Builder</li>
                <li>Mock Interviews</li>
                <li>Progress Tracker</li>
                <li>Career Roadmaps</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Pricing</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Basic - ₹99/mo</li>
                <li>Premium - ₹299/mo</li>
                <li>Pro - ₹999/mo</li>
                <li>College Plans</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 FuturePath AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Hero onGetStarted={() => navigate("/dashboard")} />} />
      <Route path="/dashboard/*" element={<DashboardLayout />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}