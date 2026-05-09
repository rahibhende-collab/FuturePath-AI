import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Sparkles, Target, BookOpen, Code, Briefcase } from "lucide-react";
import { Badge } from "./ui/badge";

export function CareerRecommendation() {
  const [formData, setFormData] = useState({
    education: "",
    skills: "",
    interest: "",
    goal: ""
  });
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mockRecommendations = [
      {
        title: "Backend Developer (Java/Spring Boot)",
        match: 95,
        description: "High demand in IT industry, matches your MCA background and Java skills",
        skills: ["Java", "Spring Boot", "MySQL", "REST API", "Microservices"],
        salary: "₹5-12 LPA",
        companies: ["TCS", "Infosys", "Wipro", "Accenture", "Cognizant"]
      },
      {
        title: "NIC Scientist-B (IT)",
        match: 88,
        description: "Government job with technical work, ideal for computer science graduates",
        skills: ["Java", "Database", "Data Structures", "Networking"],
        salary: "₹44,900 - ₹1,42,400 (Level 10)",
        exam: "NIC Entrance Exam"
      },
      {
        title: "SaaS Startup (AI Tools)",
        match: 82,
        description: "Build AI-powered solutions for businesses using your technical skills",
        skills: ["Java", "API Integration", "Cloud", "Business Development"],
        investment: "₹50,000 - ₹2,00,000",
        potential: "High scalability, growing market"
      }
    ];

    setRecommendations(mockRecommendations);
    setShowResults(true);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-blue-600" />
          <h2 className="text-3xl font-bold">AI Career Recommendation</h2>
        </div>
        <p className="text-gray-600">Get personalized career suggestions based on your profile</p>
      </div>

      {!showResults ? (
        <Card>
          <CardHeader>
            <CardTitle>Tell Us About Yourself</CardTitle>
            <CardDescription>Help us understand your background to provide accurate recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="education">Education Level</Label>
                <Select onValueChange={(value) => setFormData({...formData, education: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your education" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bca">BCA</SelectItem>
                    <SelectItem value="mca">MCA</SelectItem>
                    <SelectItem value="btech">B.Tech (CS/IT)</SelectItem>
                    <SelectItem value="mtech">M.Tech</SelectItem>
                    <SelectItem value="bsc">B.Sc (Computer Science)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="skills">Primary Skills</Label>
                <Input
                  id="skills"
                  placeholder="e.g., Java, Python, Web Development"
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="interest">Career Interest</Label>
                <Select onValueChange={(value) => setFormData({...formData, interest: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="What interests you most?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private Sector Jobs</SelectItem>
                    <SelectItem value="government">Government Jobs</SelectItem>
                    <SelectItem value="startup">Start a Business</SelectItem>
                    <SelectItem value="higher">Higher Studies</SelectItem>
                    <SelectItem value="all">Open to All Options</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="goal">Primary Goal</Label>
                <Select onValueChange={(value) => setFormData({...formData, goal: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="What's your main priority?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salary">High Salary</SelectItem>
                    <SelectItem value="stability">Job Stability</SelectItem>
                    <SelectItem value="growth">Career Growth</SelectItem>
                    <SelectItem value="worklife">Work-Life Balance</SelectItem>
                    <SelectItem value="passion">Follow Passion</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Get AI Recommendations
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Your Personalized Career Paths</h3>
            <Button variant="outline" onClick={() => setShowResults(false)}>Start Over</Button>
          </div>

          {recommendations.map((rec, index) => (
            <Card key={index} className="border-l-4 border-l-blue-600">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {index === 0 && <Target className="w-5 h-5 text-blue-600" />}
                      {index === 1 && <Briefcase className="w-5 h-5 text-green-600" />}
                      {index === 2 && <Code className="w-5 h-5 text-purple-600" />}
                      {rec.title}
                    </CardTitle>
                    <CardDescription>{rec.description}</CardDescription>
                  </div>
                  <Badge variant="default" className="bg-blue-600">
                    {rec.match}% Match
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-semibold mb-2">Required Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {rec.skills.map((skill: string, i: number) => (
                      <Badge key={i} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  {rec.salary && (
                    <div>
                      <p className="text-sm text-gray-600">Salary Range</p>
                      <p className="font-semibold">{rec.salary}</p>
                    </div>
                  )}
                  {rec.companies && (
                    <div>
                      <p className="text-sm text-gray-600">Top Recruiters</p>
                      <p className="font-semibold text-sm">{rec.companies.slice(0, 3).join(", ")}</p>
                    </div>
                  )}
                  {rec.exam && (
                    <div>
                      <p className="text-sm text-gray-600">Entrance Exam</p>
                      <p className="font-semibold">{rec.exam}</p>
                    </div>
                  )}
                  {rec.investment && (
                    <div>
                      <p className="text-sm text-gray-600">Initial Investment</p>
                      <p className="font-semibold">{rec.investment}</p>
                    </div>
                  )}
                </div>

                <Button className="w-full mt-4">
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Detailed Roadmap
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
