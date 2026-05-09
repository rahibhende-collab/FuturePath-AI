import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MessageSquare, Play, CheckCircle2, AlertCircle, Mic, Video } from "lucide-react";
import { Progress } from "./ui/progress";

const interviewTypes = [
  {
    title: "HR Interview",
    questions: 25,
    duration: "30 min",
    difficulty: "Easy",
    topics: ["Tell me about yourself", "Strengths & Weaknesses", "Career Goals", "Why this company?"]
  },
  {
    title: "Technical Interview (Core CS)",
    questions: 40,
    duration: "45 min",
    difficulty: "Medium",
    topics: ["OOP", "DBMS", "OS", "Networks", "DSA Basics"]
  },
  {
    title: "Coding Interview",
    questions: 30,
    duration: "60 min",
    difficulty: "Hard",
    topics: ["Problem Solving", "Arrays", "Strings", "Recursion", "Complexity Analysis"]
  }
];

const commonQuestions = [
  {
    category: "HR",
    question: "Tell me about yourself",
    tips: "Use the Present-Past-Future framework. Start with current status, mention relevant past experience, end with future goals.",
    sampleAnswer: "I'm currently pursuing my MCA with a focus on Java development..."
  },
  {
    category: "Technical",
    question: "What is the difference between abstract class and interface?",
    tips: "Explain conceptual difference first, then implementation details",
    sampleAnswer: "Abstract classes can have both concrete and abstract methods, while interfaces..."
  },
  {
    category: "Behavioral",
    question: "Describe a challenging project you worked on",
    tips: "Use STAR method: Situation, Task, Action, Result",
    sampleAnswer: "During my college project, we faced a database performance issue..."
  }
];

export function MockInterview() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState<number | null>(null);

  const startInterview = (type: string) => {
    setSelectedType(type);
    setInterviewStarted(true);
    setCurrentQuestion(0);
  };

  const completeInterview = () => {
    setScore(75);
    setInterviewStarted(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MessageSquare className="w-6 h-6 text-indigo-600" />
          <h2 className="text-3xl font-bold">AI Mock Interview</h2>
        </div>
        <p className="text-gray-600">Practice with AI-powered interview simulations</p>
      </div>

      {!interviewStarted ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {interviewTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                  <CardDescription>{type.questions} questions • {type.duration}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Badge
                    variant={type.difficulty === "Easy" ? "default" : type.difficulty === "Medium" ? "secondary" : "outline"}
                    className={
                      type.difficulty === "Easy" ? "bg-green-600" :
                      type.difficulty === "Medium" ? "bg-yellow-600" :
                      "bg-red-600"
                    }
                  >
                    {type.difficulty}
                  </Badge>

                  <div>
                    <p className="text-sm font-semibold mb-2">Topics Covered:</p>
                    <div className="space-y-1">
                      {type.topics.map((topic, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" onClick={() => startInterview(type.title)}>
                    <Play className="w-4 h-4 mr-2" />
                    Start Interview
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Common Interview Questions & Tips</h3>
            <div className="space-y-3">
              {commonQuestions.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{item.question}</CardTitle>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-blue-600 mb-1">💡 Pro Tip:</p>
                      <p className="text-sm text-gray-700">{item.tips}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm font-semibold mb-1">Sample Answer:</p>
                      <p className="text-sm text-gray-700 italic">{item.sampleAnswer}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {score !== null && (
            <Card className="border-2 border-green-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  Interview Completed!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-5xl font-bold text-green-600 mb-2">{score}%</div>
                  <p className="text-sm text-gray-600">Overall Performance</p>
                </div>
                <Progress value={score} className="h-3" />

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">8/10</p>
                    <p className="text-sm text-gray-600">Communication</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">7/10</p>
                    <p className="text-sm text-gray-600">Technical</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">9/10</p>
                    <p className="text-sm text-gray-600">Confidence</p>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <p className="font-semibold">Feedback:</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                      <p className="text-sm">Good clarity in explaining technical concepts</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                      <p className="text-sm">Strong examples from projects</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <p className="text-sm">Could improve on discussing challenges faced</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full" onClick={() => setScore(null)}>
                  Practice Another Round
                </Button>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Mock Interview in Progress</CardTitle>
              <Badge>Question {currentQuestion + 1}/10</Badge>
            </div>
            <Progress value={(currentQuestion + 1) * 10} className="mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Question {currentQuestion + 1}</p>
              <p className="text-lg font-semibold">
                {currentQuestion === 0 && "Tell me about yourself and your background."}
                {currentQuestion === 1 && "What are your greatest strengths?"}
                {currentQuestion === 2 && "Why do you want to work in the IT industry?"}
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="outline">
                <Mic className="w-5 h-5 mr-2" />
                Record Audio
              </Button>
              <Button size="lg" variant="outline">
                <Video className="w-5 h-5 mr-2" />
                Record Video
              </Button>
            </div>

            <div className="flex gap-4">
              <Button
                className="flex-1"
                onClick={() => setCurrentQuestion(Math.min(currentQuestion + 1, 9))}
              >
                Next Question
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={completeInterview}
              >
                Complete Interview
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
