import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { FileText, Download, Check, Star } from "lucide-react";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

export function ResumeBuilder() {
  const [resumeScore, setResumeScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnalyze = () => {
    setResumeScore(78);
    setShowScore(true);
  };

  const improvements = [
    { text: "Add quantifiable achievements", done: false },
    { text: "Include relevant technical skills", done: true },
    { text: "Use action verbs in descriptions", done: true },
    { text: "Add GitHub/Portfolio links", done: false },
    { text: "Keep it to 1-2 pages", done: true },
    { text: "Include certifications", done: false }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <FileText className="w-6 h-6 text-blue-600" />
          <h2 className="text-3xl font-bold">Smart Resume Builder</h2>
        </div>
        <p className="text-gray-600">Create ATS-friendly resumes that get you noticed</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your Name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" placeholder="linkedin.com/in/yourprofile" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>Your academic background</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="degree">Degree</Label>
                <Input id="degree" placeholder="e.g., MCA, B.Tech (Computer Science)" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="college">College/University</Label>
                  <Input id="college" placeholder="Your Institution" />
                </div>
                <div>
                  <Label htmlFor="year">Graduation Year</Label>
                  <Input id="year" placeholder="2026" />
                </div>
              </div>
              <div>
                <Label htmlFor="cgpa">CGPA/Percentage</Label>
                <Input id="cgpa" placeholder="8.5 CGPA or 85%" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Your technical expertise</CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="skills">Technical Skills (comma-separated)</Label>
              <Textarea
                id="skills"
                placeholder="e.g., Java, Python, React, MySQL, Git, AWS"
                rows={3}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Showcase your work</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="project-title">Project Title</Label>
                <Input id="project-title" placeholder="e.g., E-Commerce Website" />
              </div>
              <div>
                <Label htmlFor="project-desc">Project Description</Label>
                <Textarea
                  id="project-desc"
                  placeholder="Describe what you built, technologies used, and impact..."
                  rows={4}
                />
              </div>
              <Button variant="outline" className="w-full">
                + Add Another Project
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Work Experience (Optional)</CardTitle>
              <CardDescription>Internships or jobs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" placeholder="Company or Organization" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" placeholder="e.g., Software Intern" />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" placeholder="e.g., Jun 2025 - Aug 2025" />
                </div>
              </div>
              <div>
                <Label htmlFor="responsibilities">Key Responsibilities</Label>
                <Textarea
                  id="responsibilities"
                  placeholder="What did you accomplish?"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button className="flex-1" onClick={handleAnalyze}>
              <FileText className="w-4 h-4 mr-2" />
              Analyze Resume
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {showScore && (
            <Card className="border-2 border-blue-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Resume Score
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">{resumeScore}%</div>
                  <p className="text-sm text-gray-600">ATS Compatibility</p>
                </div>
                <Progress value={resumeScore} className="h-3" />
                <div className="space-y-2">
                  <p className="font-semibold text-sm">Improvement Checklist:</p>
                  {improvements.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      {item.done ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-300 rounded" />
                      )}
                      <span className={item.done ? "text-gray-900" : "text-gray-600"}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resume Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Professional Template
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Modern Template
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Technical Template
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Badge variant="default" className="mt-0.5">1</Badge>
                <p>Use action verbs like "Developed", "Implemented", "Designed"</p>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="default" className="mt-0.5">2</Badge>
                <p>Quantify achievements with numbers and metrics</p>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="default" className="mt-0.5">3</Badge>
                <p>Keep formatting simple for ATS systems</p>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="default" className="mt-0.5">4</Badge>
                <p>Include relevant keywords from job descriptions</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
