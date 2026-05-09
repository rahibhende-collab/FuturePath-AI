import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Hero } from "./components/Hero";
import { CareerRecommendation } from "./components/CareerRecommendation";
import { GovernmentJobs } from "./components/GovernmentJobs";
import { PlacementPrep } from "./components/PlacementPrep";
import { StartupIdeas } from "./components/StartupIdeas";
import { ResumeBuilder } from "./components/ResumeBuilder";
import { MockInterview } from "./components/MockInterview";
import { ProgressTracker } from "./components/ProgressTracker";
import { Sparkles, Building2, Target, Rocket, FileText, MessageSquare, TrendingUp } from "lucide-react";

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {!showDashboard ? (
        <Hero onGetStarted={() => setShowDashboard(true)} />
      ) : (
        <div className="min-h-screen">
          <header className="bg-white border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                  <h1 className="text-2xl font-bold text-gray-900">FuturePath AI</h1>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">Welcome, Student</span>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    S
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Tabs defaultValue="career" className="space-y-6">
              <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full">
                <TabsTrigger value="career" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Career AI</span>
                </TabsTrigger>
                <TabsTrigger value="govt" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Govt Jobs</span>
                </TabsTrigger>
                <TabsTrigger value="placement" className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span className="hidden sm:inline">Placement</span>
                </TabsTrigger>
                <TabsTrigger value="startup" className="flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  <span className="hidden sm:inline">Startup</span>
                </TabsTrigger>
                <TabsTrigger value="resume" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Resume</span>
                </TabsTrigger>
                <TabsTrigger value="interview" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">Interview</span>
                </TabsTrigger>
                <TabsTrigger value="progress" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="hidden sm:inline">Progress</span>
                </TabsTrigger>
                <TabsTrigger value="home" className="flex items-center gap-2">
                  <span className="hidden sm:inline">Home</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="career">
                <CareerRecommendation />
              </TabsContent>

              <TabsContent value="govt">
                <GovernmentJobs />
              </TabsContent>

              <TabsContent value="placement">
                <PlacementPrep />
              </TabsContent>

              <TabsContent value="startup">
                <StartupIdeas />
              </TabsContent>

              <TabsContent value="resume">
                <ResumeBuilder />
              </TabsContent>

              <TabsContent value="interview">
                <MockInterview />
              </TabsContent>

              <TabsContent value="progress">
                <ProgressTracker />
              </TabsContent>

              <TabsContent value="home">
                <div onClick={() => setShowDashboard(false)} className="cursor-pointer">
                  <Hero onGetStarted={() => setShowDashboard(true)} />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <footer className="bg-gray-900 text-white mt-16">
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
      )}
    </div>
  );
}