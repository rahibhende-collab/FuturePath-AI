import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "./AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Sparkles, Loader2 } from "lucide-react";

export function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    education: {
      degree: "",
      college: "",
      year: "",
      cgpa: "",
    },
    skills: "",
    interests: "",
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) return;

    setLoading(true);
    // Parse skills and interests into arrays
    const parsedSkills = formData.skills
      ? formData.skills.split(",").map((s) => s.trim()).filter((s) => s.length > 0)
      : [];
    const parsedInterests = formData.interests
      ? formData.interests.split(",").map((i) => i.trim()).filter((i) => i.length > 0)
      : [];

    const submitData = {
      ...formData,
      skills: parsedSkills,
      interests: parsedInterests,
    };

    const success = await register(submitData);
    setLoading(false);

    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center p-4 py-12">
      <Card className="w-full max-w-lg border dark:border-gray-800 bg-white dark:bg-[#111] shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-blue-600 animate-pulse" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">FuturePath AI</h1>
          </div>
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Fill in your profile details to get personalized career recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="border-t dark:border-gray-800 pt-4 mt-4">
              <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">Education Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Select
                    onValueChange={(val) =>
                      setFormData({
                        ...formData,
                        education: { ...formData.education, degree: val },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BCA">BCA</SelectItem>
                      <SelectItem value="MCA">MCA</SelectItem>
                      <SelectItem value="B.Tech (CS/IT)">B.Tech (CS/IT)</SelectItem>
                      <SelectItem value="M.Tech">M.Tech</SelectItem>
                      <SelectItem value="B.Sc (CS)">B.Sc (CS)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="college">College/University</Label>
                  <Input
                    id="college"
                    placeholder="XYZ Institute"
                    value={formData.education.college}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        education: { ...formData.education, college: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="year">Graduation Year</Label>
                  <Input
                    id="year"
                    placeholder="2026"
                    value={formData.education.year}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        education: { ...formData.education, year: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cgpa">CGPA / %</Label>
                  <Input
                    id="cgpa"
                    placeholder="8.5"
                    value={formData.education.cgpa}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        education: { ...formData.education, cgpa: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="border-t dark:border-gray-800 pt-4">
              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input
                  id="skills"
                  placeholder="e.g. Java, Python, SQL, React"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="interests">Interests (comma-separated)</Label>
              <Input
                id="interests"
                placeholder="e.g. Software Development, Banking Exams, AI Research"
                value={formData.interests}
                onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
              />
            </div>

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 underline">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
