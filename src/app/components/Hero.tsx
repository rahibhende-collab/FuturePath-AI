import { Sparkles, Target, Briefcase, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-5xl font-bold">FuturePath AI</h1>
          </div>

          <p className="text-2xl mb-4 font-semibold">
            "Right Career Before Wrong Decisions"
          </p>

          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            AI-powered career guidance for placements, government jobs, higher studies, and startup opportunities
          </p>

          <div className="flex gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-white text-blue-700 hover:bg-blue-50"
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              View Demo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Target className="w-8 h-8 mb-2 mx-auto" />
              <h3 className="font-semibold mb-1">AI Career Guidance</h3>
              <p className="text-sm text-blue-100">Personalized recommendations</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Briefcase className="w-8 h-8 mb-2 mx-auto" />
              <h3 className="font-semibold mb-1">Government Jobs</h3>
              <p className="text-sm text-blue-100">SSC, IBPS, NIC & more</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <TrendingUp className="w-8 h-8 mb-2 mx-auto" />
              <h3 className="font-semibold mb-1">Placement Prep</h3>
              <p className="text-sm text-blue-100">Interview & resume support</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Sparkles className="w-8 h-8 mb-2 mx-auto" />
              <h3 className="font-semibold mb-1">Startup Ideas</h3>
              <p className="text-sm text-blue-100">Business opportunities</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
    </div>
  );
}
