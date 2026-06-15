import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Sparkles, Target, BookOpen, Code, Briefcase, Loader2, Calendar, Award, ExternalLink, IndianRupee, MapPin, BriefcaseIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

export function CareerRecommendation() {
  const { user, fetchWithAuth } = useAuth();
  
  // Recommendations state
  const [formData, setFormData] = useState({
    education: "",
    skills: "",
    interest: "",
    goal: ""
  });
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roadmapLoading, setRoadmapLoading] = useState<string | null>(null);
  const [activeRoadmap, setActiveRoadmap] = useState<any | null>(null);

  // Salary Predictor state
  const [salaryInput, setSalaryInput] = useState({
    career: "",
    location: "India (Tier-1)",
    experience: "0-1 years (Entry level)"
  });
  const [salaryResult, setSalaryResult] = useState<any | null>(null);
  const [loadingSalary, setLoadingSalary] = useState(false);

  // Pre-fill form if user data is loaded
  useEffect(() => {
    if (user) {
      setFormData({
        education: user.education?.degree?.toLowerCase() || "",
        skills: user.skills?.join(", ") || "",
        interest: user.interests?.join(", ") || "",
        goal: user.goals?.[0] || ""
      });
      setSalaryInput(prev => ({
        ...prev,
        career: user.targetCareer || ""
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setActiveRoadmap(null);

    try {
      const response = await fetchWithAuth("/ai/career", {
        method: "POST",
        body: JSON.stringify({
          education: formData.education,
          skills: formData.skills,
          interests: formData.interest,
          goals: formData.goal
        })
      });

      const data = await response.json();
      if (response.ok) {
        setRecommendations(data.recommendations || []);
        setShowResults(true);
      } else {
        toast.error(data.message || "Failed to generate recommendations");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error while calling AI service");
    } finally {
      setLoading(false);
    }
  };

  const handleViewRoadmap = async (careerTitle: string) => {
    if (activeRoadmap && activeRoadmap.career === careerTitle) {
      setActiveRoadmap(null);
      return;
    }

    setRoadmapLoading(careerTitle);
    try {
      const response = await fetchWithAuth("/ai/roadmap", {
        method: "POST",
        body: JSON.stringify({ careerName: careerTitle })
      });
      const data = await response.json();
      if (response.ok) {
        setActiveRoadmap(data);
      } else {
        toast.error(data.message || "Failed to generate roadmap");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error communicating with roadmap service");
    } finally {
      setRoadmapLoading(null);
    }
  };

  const handlePredictSalary = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!salaryInput.career) {
      toast.warning("Please provide a career name to predict salary.");
      return;
    }

    setLoadingSalary(true);
    setSalaryResult(null);

    try {
      const response = await fetchWithAuth("/ai/salary", {
        method: "POST",
        body: JSON.stringify(salaryInput)
      });
      const data = await response.json();
      if (response.ok) {
        setSalaryResult(data);
        toast.success("Salary projection calculated!");
      } else {
        toast.error(data.message || "Prediction failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error running salary estimator");
    } finally {
      setLoadingSalary(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-blue-600 animate-pulse" />
          <h2 className="text-3xl font-bold">AI Career Recommendation</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">Get personalized career suggestions based on your profile</p>
      </div>

      {!showResults ? (
        <Card className="border dark:border-gray-800 bg-white dark:bg-[#111]">
          <CardHeader>
            <CardTitle>Tell Us About Yourself</CardTitle>
            <CardDescription>Help us understand your background to provide accurate recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="education">Education Level</Label>
                <Select 
                  value={formData.education} 
                  onValueChange={(value) => setFormData({...formData, education: value})}
                >
                  <SelectTrigger className="w-full">
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
                  value={formData.skills}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="interest">Career Interest</Label>
                <Select 
                  value={formData.interest} 
                  onValueChange={(value) => setFormData({...formData, interest: value})}
                >
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
                <Select 
                  value={formData.goal} 
                  onValueChange={(value) => setFormData({...formData, goal: value})}
                >
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

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing Profile...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get AI Recommendations
                  </>
                )}
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
            <Card key={index} className="border-l-4 border-l-blue-600 bg-white dark:bg-[#111]">
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
                      <p className="text-sm text-gray-600 dark:text-gray-400">Salary Range</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{rec.salary}</p>
                    </div>
                  )}
                  {rec.futureScope && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Future Scope</p>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{rec.futureScope}</p>
                    </div>
                  )}
                </div>

                <Button
                  className="w-full mt-4"
                  onClick={() => handleViewRoadmap(rec.title)}
                  disabled={roadmapLoading === rec.title}
                >
                  {roadmapLoading === rec.title ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Designing Roadmap...
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4 mr-2" />
                      {activeRoadmap && activeRoadmap.career === rec.title ? "Hide Roadmap" : "View Detailed Roadmap"}
                    </>
                  )}
                </Button>

                {activeRoadmap && activeRoadmap.career === rec.title && (
                  <div className="mt-6 pt-6 border-t dark:border-gray-800 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                      <div>
                        <h4 className="font-bold text-lg text-blue-700 dark:text-blue-400">Career Roadmap</h4>
                        <p className="text-sm text-blue-600 dark:text-blue-500">Structured Path</p>
                      </div>
                      <Badge variant="outline" className="border-blue-500 text-blue-600 dark:text-blue-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {activeRoadmap.timeline}
                      </Badge>
                    </div>

                    <div className="relative border-l-2 border-blue-200 dark:border-blue-900 ml-4 space-y-8">
                      {activeRoadmap.milestones.map((ms: any, i: number) => (
                        <div key={i} className="relative pl-6">
                          <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-[#111]" />
                          
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                              {ms.phase}
                            </span>
                            <h5 className="font-bold text-gray-900 dark:text-white text-base">
                              {ms.title}
                            </h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {ms.description}
                            </p>

                            {ms.resources && ms.resources.length > 0 && (
                              <div className="pt-2">
                                <span className="text-xs font-semibold text-gray-500 block mb-1">Learning Resources:</span>
                                <div className="flex flex-wrap gap-2">
                                  {ms.resources.map((res: string, idx: number) => (
                                    <Badge key={idx} variant="outline" className="text-xs flex items-center gap-1">
                                      <ExternalLink className="w-2.5 h-2.5" />
                                      {res}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {ms.certifications && ms.certifications.length > 0 && (
                              <div className="pt-2">
                                <span className="text-xs font-semibold text-gray-500 block mb-1">Recommended Certifications:</span>
                                <div className="flex flex-wrap gap-2">
                                  {ms.certifications.map((cert: string, idx: number) => (
                                    <Badge key={idx} className="bg-green-600/10 text-green-700 hover:bg-green-600/10 border-green-200 text-xs flex items-center gap-1">
                                      <Award className="w-3 h-3" />
                                      {cert}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* DEDICATED SALARY PREDICTOR WIDGET */}
      <Card className="border dark:border-gray-800 bg-white dark:bg-[#111] mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-green-600" />
            AI Salary Predictor
          </CardTitle>
          <CardDescription>Estimate realistic salary ranges and future growth for specific career roles</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePredictSalary} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary-career">Career Role</Label>
                <div className="relative">
                  <BriefcaseIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="salary-career"
                    placeholder="e.g. Backend Engineer"
                    value={salaryInput.career}
                    onChange={(e) => setSalaryInput({ ...salaryInput, career: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary-location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="salary-location"
                    placeholder="e.g. Bangalore, India"
                    value={salaryInput.location}
                    onChange={(e) => setSalaryInput({ ...salaryInput, location: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary-exp">Experience</Label>
                <Select
                  value={salaryInput.experience}
                  onValueChange={(val) => setSalaryInput({ ...salaryInput, experience: val })}
                >
                  <SelectTrigger id="salary-exp">
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1 years (Entry level)">0-1 years (Entry level)</SelectItem>
                    <SelectItem value="1-3 years (Junior)">1-3 years (Junior)</SelectItem>
                    <SelectItem value="3-5 years (Mid-level)">3-5 years (Mid-level)</SelectItem>
                    <SelectItem value="5+ years (Senior)">5+ years (Senior)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={loadingSalary}>
              {loadingSalary ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Estimating Salary...
                </>
              ) : (
                "Predict Expected Salary"
              )}
            </Button>
          </form>

          {salaryResult && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-900 rounded-lg animate-in slide-in-from-top-4 duration-350">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-green-700 dark:text-green-400 uppercase tracking-wider mb-1">Expected Salary Range</h4>
                  <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{salaryResult.salaryRange}</p>
                </div>
                <div className="md:max-w-md">
                  <h4 className="text-sm font-bold text-green-700 dark:text-green-400 uppercase tracking-wider mb-1">Growth & Projection</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{salaryResult.growthProjection}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
