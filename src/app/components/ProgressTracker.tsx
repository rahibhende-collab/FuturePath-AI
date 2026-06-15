import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { TrendingUp, Target, Award, Calendar, CheckCircle2, Sparkles, Loader2, BookOpen, AlertTriangle, Play } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

const weeklyProgress = [
  { day: "Mon", progress: 45 },
  { day: "Tue", progress: 52 },
  { day: "Wed", progress: 58 },
  { day: "Thu", progress: 55 },
  { day: "Fri", progress: 65 },
  { day: "Sat", progress: 72 },
  { day: "Sun", progress: 68 }
];

export function ProgressTracker() {
  const { user, fetchWithAuth, updateProfile } = useAuth();
  
  // Custom states
  const [targetCareer, setTargetCareer] = useState(user?.targetCareer || "");
  const [analyzingGap, setAnalyzingGap] = useState(false);
  const [gapAnalysis, setGapAnalysis] = useState<any | null>(null);
  
  // Editing profile states
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileSkills, setProfileSkills] = useState(user?.skills?.join(", ") || "");
  const [profileGoals, setProfileGoals] = useState(user?.goals?.join(", ") || "");

  useEffect(() => {
    if (user) {
      setTargetCareer(user.targetCareer || "");
      setProfileSkills(user.skills?.join(", ") || "");
      setProfileGoals(user.goals?.join(", ") || "");
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = profileSkills.split(",").map(s => s.trim()).filter(s => s.length > 0);
    const goalsArray = profileGoals.split(",").map(g => g.trim()).filter(g => g.length > 0);

    const success = await updateProfile({
      skills: skillsArray,
      goals: goalsArray,
      targetCareer
    });

    if (success) {
      setIsEditingProfile(false);
    }
  };

  const handleRunSkillGap = async () => {
    if (!targetCareer) {
      toast.warning("Please select or enter a target career first.");
      return;
    }

    setAnalyzingGap(true);
    setGapAnalysis(null);

    try {
      const response = await fetchWithAuth("/ai/skill-gap", {
        method: "POST",
        body: JSON.stringify({
          currentSkills: user?.skills || [],
          targetCareer: targetCareer
        })
      });

      const data = await response.json();
      if (response.ok) {
        setGapAnalysis(data);
        toast.success("Skill gap analysis loaded!");
      } else {
        toast.error(data.message || "Failed to analyze skills");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error connecting to Skill Gap API");
    } finally {
      setAnalyzingGap(false);
    }
  };

  // Static learning recommendations for dynamic presentation
  const courseRecommendations = [
    { title: "Docker & Kubernetes Mastery", platform: "Udemy", duration: "18 hrs", rating: "4.8" },
    { title: "System Design Fundamentals", platform: "Educative", duration: "12 hrs", rating: "4.7" },
    { title: "CI/CD Pipelines with GitHub Actions", platform: "Coursera", duration: "8 hrs", rating: "4.6" }
  ];

  const youtubeChannels = [
    { name: "Hussein Nasser", topic: "Backend Engineering & Networking" },
    { name: "freeCodeCamp.org", topic: "Comprehensive Coding tutorials" },
    { name: "ByteByteGo", topic: "System Design visual breakdowns" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <TrendingUp className="w-6 h-6 text-green-600 animate-pulse" />
          <h2 className="text-3xl font-bold">Progress & Gap Analyzer</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">Monitor preparation metrics and address technical skill gaps</p>
      </div>

      {/* USER PROFILE INFO SUMMARY */}
      <Card className="bg-white dark:bg-[#111] border dark:border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Professional Profile Details</CardTitle>
              <CardDescription>Verify your education, current skill set, and targets</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(!isEditingProfile)}>
              {isEditingProfile ? "Cancel Edit" : "Modify Profile"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {!isEditingProfile ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-gray-500 font-semibold mb-1">Education Status:</p>
                <p className="font-bold text-gray-900 dark:text-white">
                  {user?.education?.degree || "Not set"} ({user?.education?.year || "Graduation not set"})
                </p>
                <p className="text-xs text-gray-500">{user?.education?.college || "No college added"}</p>
                <Badge className="mt-1" variant="secondary">GPA: {user?.education?.cgpa || "N/A"}</Badge>
              </div>

              <div>
                <p className="text-gray-500 font-semibold mb-1">Registered Skills:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user?.skills && user.skills.length > 0 ? (
                    user.skills.map((skill, i) => <Badge key={i} variant="outline">{skill}</Badge>)
                  ) : (
                    <span className="text-gray-500 italic">No skills registered yet</span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-gray-500 font-semibold mb-1">Target Role & Goals:</p>
                <p className="font-bold text-blue-600 dark:text-blue-400">{targetCareer || "No target role selected"}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user?.goals?.map((g, i) => (
                    <span key={i} className="text-xs text-gray-600 dark:text-gray-400">• {g}</span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="target-career-select">Target Career Role</Label>
                  <Select value={targetCareer} onValueChange={(val) => setTargetCareer(val)}>
                    <SelectTrigger id="target-career-select">
                      <SelectValue placeholder="Select target career" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full Stack Engineer">Full Stack Engineer</SelectItem>
                      <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                      <SelectItem value="DevOps Specialist">DevOps Specialist</SelectItem>
                      <SelectItem value="Cloud Infrastructure Engineer">Cloud Infrastructure Engineer</SelectItem>
                      <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-goals">Career Goals (comma-separated)</Label>
                  <Input
                    id="edit-goals"
                    value={profileGoals}
                    onChange={(e) => setProfileGoals(e.target.value)}
                    placeholder="High Salary, Growth, remote..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-skills">Skills (comma-separated)</Label>
                <Input
                  id="edit-skills"
                  value={profileSkills}
                  onChange={(e) => setProfileSkills(e.target.value)}
                  placeholder="Java, React, MongoDB..."
                />
              </div>

              <Button type="submit" size="sm" className="bg-blue-600 text-white">Save Changes</Button>
            </form>
          )}
        </CardContent>
      </Card>

      {/* SKILL GAP ANALYZER TRIGGER */}
      <Card className="border-l-4 border-l-blue-600 bg-white dark:bg-[#111]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            AI Skill Gap Analyzer
          </CardTitle>
          <CardDescription>Compare your registered profile skills with your target career to spot technical gaps.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <p className="text-sm font-semibold mb-1">Target Career:</p>
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                {targetCareer || "Please select a target role in 'Modify Profile' above"}
              </p>
            </div>
            <Button
              onClick={handleRunSkillGap}
              disabled={analyzingGap || !targetCareer}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {analyzingGap ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Calculating Gaps...
                </>
              ) : (
                "Run Gap Scan"
              )}
            </Button>
          </div>

          {gapAnalysis && (
            <div className="mt-6 border-t dark:border-gray-850 pt-4 space-y-6 animate-in slide-in-from-top-4 duration-350">
              <h3 className="font-bold text-base text-gray-900 dark:text-white">Missing Competency Checklist:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gapAnalysis.missingSkills?.map((gap: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-[#1a1a1a] rounded border dark:border-gray-800">
                    <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="font-bold text-sm text-gray-900 dark:text-white">{gap.skill}</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <Badge variant="outline">Priority: {gap.priority}</Badge>
                        <Badge variant="secondary">Difficulty: {gap.difficulty}</Badge>
                        <Badge variant="default" className="bg-blue-600 text-white border-blue-600">Time: {gap.duration}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* LEARNING RECOMMENDATION SYSTEM */}
      {gapAnalysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
          <Card className="bg-white dark:bg-[#111]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                Recommended Courses & Certifications
              </CardTitle>
              <CardDescription>Tailored tutorials for your missing competencies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {courseRecommendations.map((course, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 border-b dark:border-gray-800 last:border-0">
                  <div>
                    <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200">{course.title}</h4>
                    <p className="text-xs text-gray-500">{course.platform} • {course.duration}</p>
                  </div>
                  <Badge variant="secondary">★ {course.rating}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#111]">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Play className="w-5 h-5 text-red-600" />
                Tech Channels & YouTube Guides
              </CardTitle>
              <CardDescription>Recommended resources to study concepts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {youtubeChannels.map((channel, idx) => (
                <div key={idx} className="p-3 bg-gray-50 dark:bg-[#1a1a1a] rounded">
                  <h4 className="font-bold text-sm text-red-600 dark:text-red-400">{channel.name}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{channel.topic}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* GRAPH CHART SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-3 bg-white dark:bg-[#111]">
          <CardHeader>
            <CardTitle>Weekly Progress Trend</CardTitle>
            <CardDescription>Your daily mock practice hours and course completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[230px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="progress" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <CardHeader>
            <CardTitle className="text-white">Activity Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <Award className="w-12 h-12 mx-auto animate-bounce" />
            <div>
              <p className="text-3xl font-bold">12h</p>
              <p className="text-xs text-blue-200">Study hours this week</p>
            </div>
            <div className="border-t border-white/20 pt-3">
              <p className="text-lg font-bold">68%</p>
              <p className="text-xs text-blue-200">Career Readiness Score</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
