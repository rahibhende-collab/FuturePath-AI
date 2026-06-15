import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { FileText, Upload, Check, Star, AlertCircle, Sparkles, Loader2, RefreshCw } from "lucide-react";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

export function ResumeBuilder() {
  const { fetchWithAuth } = useAuth();
  
  // Builder form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    degree: "",
    college: "",
    year: "",
    cgpa: "",
    skills: "",
    projectTitle: "",
    projectDesc: "",
    company: "",
    role: "",
    duration: "",
    responsibilities: ""
  });

  // Analyzer states
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        toast.error("Please upload a PDF file only.");
        return;
      }
      setPdfFile(file);
    }
  };

  const handleAnalyzeResume = async () => {
    if (!pdfFile) {
      toast.warning("Please choose a PDF resume file to analyze.");
      return;
    }

    setAnalyzing(true);
    setAnalysisResult(null);

    const bodyData = new FormData();
    bodyData.append("resume", pdfFile);

    try {
      const response = await fetchWithAuth("/ai/resume", {
        method: "POST",
        body: bodyData,
      });

      const data = await response.json();
      if (response.ok) {
        setAnalysisResult(data);
        toast.success("Resume analysis completed!");
      } else {
        toast.error(data.message || "Failed to analyze resume");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error while uploading resume");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDownloadMockPDF = () => {
    toast.success("PDF generated and download started (mock)!");
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <FileText className="w-6 h-6 text-blue-600 animate-pulse" />
          <h2 className="text-3xl font-bold">Resume Hub</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">Build an ATS-optimized resume or evaluate your current one using AI</p>
      </div>

      <Tabs defaultValue="analyzer" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="analyzer">AI Resume Analyzer</TabsTrigger>
          <TabsTrigger value="builder">Smart Resume Builder</TabsTrigger>
        </TabsList>

        {/* ANALYZER TAB */}
        <TabsContent value="analyzer" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <Card className="bg-white dark:bg-[#111] border dark:border-gray-800">
                <CardHeader>
                  <CardTitle>ATS PDF Analyzer</CardTitle>
                  <CardDescription>Upload your current PDF resume to run a mock ATS scan and receive detailed optimization tips.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-850 rounded-lg p-8 text-center bg-gray-50 dark:bg-gray-950/20 hover:bg-gray-100 dark:hover:bg-gray-950/30 transition-colors">
                    <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                    <Label htmlFor="resume-file" className="cursor-pointer font-semibold text-blue-600 dark:text-blue-400 block mb-1">
                      Choose PDF file
                    </Label>
                    <p className="text-xs text-gray-505 dark:text-gray-500 mb-2">Only PDF files up to 5MB supported</p>
                    
                    <input
                      id="resume-file"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {pdfFile && (
                      <div className="mt-4 p-2 bg-blue-100/30 dark:bg-blue-900/10 rounded flex items-center justify-center gap-2 border border-blue-200/50">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate max-w-xs">
                          {pdfFile.name}
                        </span>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={handleAnalyzeResume}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={analyzing || !pdfFile}
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Extracting & Analyzing with GPT...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Analyze Resume
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {analysisResult && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-350">
                  <Card className="bg-white dark:bg-[#111]">
                    <CardHeader>
                      <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">Suggestions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {analysisResult.suggestions?.map((item: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 text-sm bg-gray-50 dark:bg-[#1a1a1a] p-2 rounded">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-750 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-white dark:bg-[#111]">
                    <CardHeader>
                      <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">Formatting Improvements</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {analysisResult.formattingImprovements?.map((item: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 text-sm bg-gray-50 dark:bg-[#1a1a1a] p-2 rounded">
                          <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-750 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {analysisResult ? (
                <Card className="border-2 border-blue-600 bg-white dark:bg-[#111] animate-in zoom-in-95 duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      ATS Grade Result
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-center">
                    <div className="text-6xl font-bold text-blue-600 mb-1">{analysisResult.atsScore}%</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">ATS Score Compatibility</p>
                    <Progress value={analysisResult.atsScore} className="h-3" />
                    
                    <div className="text-left border-t dark:border-gray-800 pt-4">
                      <p className="font-semibold text-xs text-gray-500 mb-2">Missing Keywords Detected:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {analysisResult.missingKeywords?.map((keyword: string, i: number) => (
                          <Badge key={i} variant="outline" className="bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border-red-200">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-white dark:bg-[#111]">
                  <CardHeader>
                    <CardTitle className="text-base">Why analyze?</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-3 text-gray-650 dark:text-gray-400">
                    <p>✓ Ensure your PDF reads correctly on algorithmic screeners.</p>
                    <p>✓ Retrieve missing skills or technical keywords tailored to CS/IT profiles.</p>
                    <p>✓ Identify formatting layout errors that cause parsers to glitch.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* BUILDER TAB */}
        <TabsContent value="builder" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <Card className="bg-white dark:bg-[#111] border dark:border-gray-800">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+91 99999 99999" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input id="linkedin" placeholder="linkedin.com/in/john" value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-[#111] border dark:border-gray-800">
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="degree">Degree</Label>
                  <Input id="degree" placeholder="MCA, B.Tech (CS)" value={formData.degree} onChange={(e) => setFormData({...formData, degree: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="college">College/University</Label>
                    <Input id="college" placeholder="IIT Delhi" value={formData.college} onChange={(e) => setFormData({...formData, college: e.target.value})} />
                  </div>
                  <div>
                    <Label htmlFor="year">Graduation Year</Label>
                    <Input id="year" placeholder="2026" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-[#111] border dark:border-gray-800">
              <CardHeader>
                <CardTitle>Skills & Projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="skills">Technical Skills (comma-separated)</Label>
                  <Textarea id="skills" placeholder="Java, React, SQL..." rows={2} value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} />
                </div>
                <div className="border-t dark:border-gray-800 pt-4">
                  <Label htmlFor="proj-title">Project Title</Label>
                  <Input id="proj-title" placeholder="FuturePath AI" className="mb-2" value={formData.projectTitle} onChange={(e) => setFormData({...formData, projectTitle: e.target.value})} />
                  <Label htmlFor="proj-desc">Project Description</Label>
                  <Textarea id="proj-desc" placeholder="Developed career planner..." rows={3} value={formData.projectDesc} onChange={(e) => setFormData({...formData, projectDesc: e.target.value})} />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button className="flex-1" onClick={handleDownloadMockPDF}>
                Generate PDF Resume
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="bg-white dark:bg-[#111]">
              <CardHeader>
                <CardTitle className="text-base">Builder tips</CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2 leading-relaxed text-gray-500">
                <p>• Avoid graphics, progress bars or visual ratings in skills. Algorithms read them as empty.</p>
                <p>• Use active, professional verbs like "Constructed", "Optimized", "Spearheaded".</p>
                <p>• Save file names clearly (e.g. John_Doe_Resume.pdf).</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
