import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { CheckCircle2, Circle, BookOpen, Code, MessageSquare, FileText, Target } from "lucide-react";
import { Badge } from "./ui/badge";

const roadmapModules = [
  {
    title: "Aptitude & Reasoning",
    topics: ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", "Data Interpretation"],
    progress: 75,
    completed: 18,
    total: 24
  },
  {
    title: "Technical Skills",
    topics: ["DSA Basics", "OOP Concepts", "DBMS", "Operating Systems", "Computer Networks"],
    progress: 60,
    completed: 12,
    total: 20
  },
  {
    title: "Programming",
    topics: ["Java/Python", "Problem Solving", "Code Optimization", "Debugging"],
    progress: 45,
    completed: 9,
    total: 20
  },
  {
    title: "HR & Soft Skills",
    topics: ["Communication", "Group Discussion", "Common HR Questions", "Body Language"],
    progress: 30,
    completed: 6,
    total: 20
  }
];

const upcomingCompanies = [
  { name: "TCS", date: "May 15, 2026", package: "₹3.5-7 LPA", type: "Mass Recruitment" },
  { name: "Infosys", date: "May 22, 2026", package: "₹4.5-9 LPA", type: "Power Programmer" },
  { name: "Wipro", date: "June 5, 2026", package: "₹3.5-6 LPA", type: "WILP Program" },
  { name: "Cognizant", date: "June 12, 2026", package: "₹4-7.5 LPA", type: "GenC Program" },
];

const practiceAreas = [
  {
    icon: Code,
    title: "Coding Practice",
    description: "50+ company-specific coding questions",
    questions: 156,
    solved: 45
  },
  {
    icon: MessageSquare,
    title: "Interview Questions",
    description: "Technical & HR interview preparation",
    questions: 230,
    solved: 89
  },
  {
    icon: FileText,
    title: "Aptitude Tests",
    description: "Mock tests from previous years",
    questions: 45,
    solved: 12
  }
];

export function PlacementPrep() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Target className="w-6 h-6 text-purple-600" />
          <h2 className="text-3xl font-bold">Placement Preparation</h2>
        </div>
        <p className="text-gray-600">Your personalized roadmap to crack campus placements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">58%</div>
            <Progress value={58} className="mb-2" />
            <p className="text-sm text-gray-600">45 out of 84 modules completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Placement Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">Good</div>
            <div className="flex items-center gap-2">
              <Badge variant="default" className="bg-green-600">Resume Ready</Badge>
              <Badge variant="outline">Interview: 60%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Next Drive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold mb-1">TCS - May 15</div>
            <p className="text-sm text-gray-600 mb-2">Package: ₹3.5-7 LPA</p>
            <Button size="sm" className="w-full">Prepare Now</Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Learning Roadmap</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roadmapModules.map((module, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{module.title}</CardTitle>
                <CardDescription>{module.completed} of {module.total} topics completed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Progress value={module.progress} />
                <div className="space-y-1">
                  {module.topics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      {i < Math.floor(module.topics.length * module.progress / 100) ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-400" />
                      )}
                      <span className={i < Math.floor(module.topics.length * module.progress / 100) ? "text-gray-900" : "text-gray-500"}>
                        {topic}
                      </span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-2">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Continue Learning
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Practice Areas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {practiceAreas.map((area, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <area.icon className="w-5 h-5 text-blue-600" />
                  {area.title}
                </CardTitle>
                <CardDescription>{area.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Solved: {area.solved}/{area.questions}</span>
                    <span>{Math.round((area.solved / area.questions) * 100)}%</span>
                  </div>
                  <Progress value={(area.solved / area.questions) * 100} />
                </div>
                <Button className="w-full">Start Practice</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Upcoming Placement Drives</h3>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {upcomingCompanies.map((company, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">{company.name}</h4>
                      <p className="text-sm text-gray-600">{company.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-blue-600">{company.package}</p>
                      <p className="text-sm text-gray-600">{company.date}</p>
                    </div>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
