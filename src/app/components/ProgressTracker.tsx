import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { TrendingUp, Target, Award, Calendar, CheckCircle2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const weeklyProgress = [
  { day: "Mon", progress: 45 },
  { day: "Tue", progress: 52 },
  { day: "Wed", progress: 58 },
  { day: "Thu", progress: 55 },
  { day: "Fri", progress: 65 },
  { day: "Sat", progress: 72 },
  { day: "Sun", progress: 68 }
];

const milestones = [
  { title: "Complete Profile Setup", completed: true, date: "Apr 15, 2026" },
  { title: "Finish Aptitude Module", completed: true, date: "Apr 22, 2026" },
  { title: "Build Resume", completed: true, date: "Apr 28, 2026" },
  { title: "Complete 50 Coding Problems", completed: false, date: "Target: May 5, 2026" },
  { title: "Attend Mock Interview", completed: false, date: "Target: May 10, 2026" },
  { title: "Apply to 10 Companies", completed: false, date: "Target: May 15, 2026" }
];

const skillProgress = [
  { skill: "Java Programming", level: 85, category: "Technical" },
  { skill: "Data Structures", level: 70, category: "Technical" },
  { skill: "Aptitude", level: 75, category: "Placement" },
  { skill: "Communication", level: 65, category: "Soft Skills" },
  { skill: "Resume Writing", level: 90, category: "Career Prep" },
  { skill: "Interview Skills", level: 60, category: "Soft Skills" }
];

export function ProgressTracker() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <TrendingUp className="w-6 h-6 text-green-600" />
          <h2 className="text-3xl font-bold">Progress Tracker</h2>
        </div>
        <p className="text-gray-600">Monitor your career preparation journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Overall
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600 mb-2">68%</div>
            <Progress value={68} className="mb-2" />
            <p className="text-sm text-gray-600">Career Ready Score</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" />
              Placement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600 mb-2">72%</div>
            <Progress value={72} className="mb-2" />
            <p className="text-sm text-gray-600">Placement Readiness</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              Govt Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-purple-600 mb-2">55%</div>
            <Progress value={55} className="mb-2" />
            <p className="text-sm text-gray-600">Exam Preparation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-orange-600 mb-2">12h</div>
            <p className="text-sm text-gray-600">Study Time</p>
            <p className="text-xs text-green-600 mt-1">↑ 15% from last week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Progress Trend</CardTitle>
          <CardDescription>Your daily progress over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="progress" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Skill Development</CardTitle>
            <CardDescription>Your proficiency across different areas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {skillProgress.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold text-sm">{item.skill}</p>
                    <p className="text-xs text-gray-600">{item.category}</p>
                  </div>
                  <Badge variant="secondary">{item.level}%</Badge>
                </div>
                <Progress value={item.level} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Milestones</CardTitle>
            <CardDescription>Track your major achievements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                {milestone.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`font-semibold text-sm ${milestone.completed ? "text-gray-900" : "text-gray-600"}`}>
                    {milestone.title}
                  </p>
                  <p className="text-xs text-gray-500">{milestone.date}</p>
                </div>
                {milestone.completed && (
                  <Badge variant="default" className="bg-green-600">Done</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <CardContent className="py-8">
          <div className="text-center">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Keep Going! You're Doing Great!</h3>
            <p className="text-blue-100 mb-4">You've completed 68% of your career preparation journey</p>
            <div className="flex justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-2xl font-bold">18</p>
                <p className="text-sm text-blue-100">Modules Done</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-blue-100">Certifications</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-blue-100">Practice Tests</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
