import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Lightbulb, TrendingUp, Users, IndianRupee, Rocket, Code } from "lucide-react";

const startupIdeas = [
  {
    title: "AI-Powered Study Planner SaaS",
    description: "Build an AI tool that creates personalized study schedules for students preparing for competitive exams",
    investment: "₹50,000 - ₹1,00,000",
    skills: ["Java/Python", "AI/ML APIs", "Web Development", "Cloud"],
    market: "EdTech - Growing at 20% CAGR",
    revenue: "Subscription: ₹199-999/month",
    difficulty: "Medium",
    potential: "High - Exam prep market is huge in India"
  },
  {
    title: "Campus Connect Platform",
    description: "A platform connecting students with alumni for mentorship, job referrals, and career guidance",
    investment: "₹30,000 - ₹80,000",
    skills: ["Full Stack Development", "Database", "UI/UX"],
    market: "Professional Networking",
    revenue: "Freemium + Premium: ₹299/month",
    difficulty: "Low-Medium",
    potential: "Medium - Network effect benefits"
  },
  {
    title: "Government Exam Prep App",
    description: "Mobile-first platform for SSC, IBPS, NIC exam preparation with mock tests and analytics",
    investment: "₹1,00,000 - ₹2,00,000",
    skills: ["Mobile Development", "Backend", "Analytics"],
    market: "Govt Exam Prep - ₹5000+ Cr market",
    revenue: "Subscription + Course Sales",
    difficulty: "Medium-High",
    potential: "Very High - Millions of aspirants"
  },
  {
    title: "Freelance IT Services Agency",
    description: "Offer web development, mobile apps, and API integration services to local businesses",
    investment: "₹20,000 - ₹50,000",
    skills: ["Web Development", "Client Communication", "Project Management"],
    market: "Digital Services for SMEs",
    revenue: "Project-based: ₹15,000-₹2,00,000 per project",
    difficulty: "Low",
    potential: "Medium - Steady income opportunity"
  },
  {
    title: "Resume & Interview Prep Service",
    description: "Provide ATS-optimized resume building and mock interview services to job seekers",
    investment: "₹10,000 - ₹30,000",
    skills: ["Content Writing", "HR Knowledge", "Video Conferencing"],
    market: "Career Services",
    revenue: "₹299-999 per service",
    difficulty: "Low",
    potential: "Medium - High volume possible"
  },
  {
    title: "College Management SaaS",
    description: "Build an all-in-one platform for colleges to manage attendance, placements, and student records",
    investment: "₹1,50,000 - ₹3,00,000",
    skills: ["Full Stack", "Database Design", "B2B Sales"],
    market: "EdTech Infrastructure",
    revenue: "B2B: ₹50,000-₹2,00,000 yearly per college",
    difficulty: "High",
    potential: "Very High - Recurring revenue model"
  }
];

export function StartupIdeas() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Rocket className="w-6 h-6 text-orange-600" />
          <h2 className="text-3xl font-bold">Startup & Business Ideas</h2>
        </div>
        <p className="text-gray-600">Turn your technical skills into business opportunities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              Curated Ideas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{startupIdeas.length}</div>
            <p className="text-sm text-gray-600">Based on your skills</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-green-600" />
              Low Investment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">₹10K+</div>
            <p className="text-sm text-gray-600">Start with minimal capital</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              High Potential
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">3+</div>
            <p className="text-sm text-gray-600">Scalable opportunities</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {startupIdeas.map((idea, index) => (
          <Card key={index} className="border-l-4 border-l-orange-500">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-orange-600" />
                    {idea.title}
                  </CardTitle>
                  <CardDescription className="mt-2">{idea.description}</CardDescription>
                </div>
                <Badge
                  variant={idea.difficulty === "Low" ? "default" : idea.difficulty === "Medium" ? "secondary" : "outline"}
                  className={idea.difficulty === "Low" ? "bg-green-600" : idea.difficulty === "Medium" ? "bg-yellow-600" : "bg-red-600"}
                >
                  {idea.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Initial Investment</p>
                  <p className="font-semibold text-green-700">{idea.investment}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Market</p>
                  <p className="font-semibold">{idea.market}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Revenue Model</p>
                  <p className="font-semibold text-sm">{idea.revenue}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Potential</p>
                  <p className="font-semibold text-blue-600">{idea.potential}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Skills Required:</p>
                <div className="flex flex-wrap gap-2">
                  {idea.skills.map((skill, i) => (
                    <Badge key={i} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button className="flex-1">
                  <Rocket className="w-4 h-4 mr-2" />
                  View Business Plan
                </Button>
                <Button variant="outline" className="flex-1">
                  <Users className="w-4 h-4 mr-2" />
                  Find Co-founders
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
