import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MessageSquare, Play, CheckCircle2, AlertCircle, Mic, Loader2, ArrowRight } from "lucide-react";
import { Progress } from "./ui/progress";
import { useAuth } from "./AuthContext";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

const interviewTypes = [
  {
    title: "HR Interview",
    questions: 5,
    duration: "15 min",
    difficulty: "Easy",
    topics: ["Tell me about yourself", "Strengths & Weaknesses", "Career Goals", "Why this company?"]
  },
  {
    title: "Technical Interview (Core CS)",
    questions: 5,
    duration: "20 min",
    difficulty: "Medium",
    topics: ["OOP", "DBMS", "OS", "Networks", "DSA Basics"]
  },
  {
    title: "Coding Interview Prep",
    questions: 5,
    duration: "30 min",
    difficulty: "Hard",
    topics: ["Problem Solving", "Complexity Analysis", "Data Structure choice", "System design"]
  }
];

export function MockInterview() {
  const { fetchWithAuth } = useAuth();
  
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  
  // States to accumulate scores and reviews
  const [answersList, setAnswersList] = useState<string[]>([]);
  const [evaluations, setEvaluations] = useState<any[]>([]);
  
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [submittingAnswer, setSubmittingAnswer] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  const [finalScoreSummary, setFinalScoreSummary] = useState<any | null>(null);

  const startInterview = async (type: string) => {
    setSelectedType(type);
    setLoadingQuestions(true);
    setFinalScoreSummary(null);
    setAnswersList([]);
    setEvaluations([]);
    setCurrentQuestionIdx(0);
    setUserAnswer("");

    try {
      const response = await fetchWithAuth("/ai/interview", {
        method: "POST",
        body: JSON.stringify({
          action: "generate",
          type: type
        })
      });
      const data = await response.json();
      if (response.ok) {
        setQuestions(data.questions || []);
        setInterviewStarted(true);
      } else {
        toast.error(data.message || "Failed to load questions");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error fetching interview questions");
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleSpeechToText = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Speech recognition is not supported in this browser. Try Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      toast.info("Microphone is active. Speak now...");
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      toast.error("Speech recognition error: " + event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setUserAnswer((prev) => (prev ? prev + " " + transcript : transcript));
    };

    recognition.start();
  };

  const handleNextOrComplete = async () => {
    if (!userAnswer.trim()) {
      toast.warning("Please provide an answer before moving to next question.");
      return;
    }

    setSubmittingAnswer(true);
    try {
      // Evaluate current answer
      const response = await fetchWithAuth("/ai/interview", {
        method: "POST",
        body: JSON.stringify({
          action: "evaluate",
          question: questions[currentQuestionIdx],
          answer: userAnswer
        })
      });

      const data = await response.json();
      if (response.ok) {
        const nextEvaluations = [...evaluations, data];
        setEvaluations(nextEvaluations);
        setAnswersList([...answersList, userAnswer]);
        
        setUserAnswer("");

        if (currentQuestionIdx + 1 < questions.length) {
          setCurrentQuestionIdx(currentQuestionIdx + 1);
        } else {
          // Average the metrics for final score
          const totalComm = nextEvaluations.reduce((sum, item) => sum + (item.communicationScore || 0), 0);
          const totalConf = nextEvaluations.reduce((sum, item) => sum + (item.confidenceScore || 0), 0);
          const totalTech = nextEvaluations.reduce((sum, item) => sum + (item.technicalScore || 0), 0);
          
          const count = nextEvaluations.length;
          const finalAvg = Math.round(((totalComm + totalConf + totalTech) / (count * 3)) * 10); // scale 0-10 to percentage

          setFinalScoreSummary({
            score: finalAvg,
            communication: (totalComm / count).toFixed(1),
            confidence: (totalConf / count).toFixed(1),
            technical: (totalTech / count).toFixed(1),
            feedback: nextEvaluations[0]?.feedback || "Evaluation complete! Good effort.",
            improvements: nextEvaluations.flatMap((ev) => ev.improvements || []).filter((v, i, a) => a.indexOf(v) === i).slice(0, 4) // deduplicated tips
          });
          setInterviewStarted(false);
          setSelectedType(null);
        }
      } else {
        toast.error(data.message || "Evaluation failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error evaluating answer");
    } finally {
      setSubmittingAnswer(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MessageSquare className="w-6 h-6 text-indigo-600 animate-pulse" />
          <h2 className="text-3xl font-bold">AI Mock Interview</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">Practice with real-time AI-powered interview simulations</p>
      </div>

      {!interviewStarted ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {interviewTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow bg-white dark:bg-[#111]">
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
                      "bg-red-600 text-white border-red-600"
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

                  <Button 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
                    onClick={() => startInterview(type.title)}
                    disabled={loadingQuestions}
                  >
                    {loadingQuestions && selectedType === type.title ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating Questions...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start Interview
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {finalScoreSummary && (
            <Card className="border-2 border-green-600 bg-white dark:bg-[#111] mt-6 animate-in zoom-in duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="w-6 h-6" />
                  Interview Assessment Complete!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-green-600 mb-2">{finalScoreSummary.score}%</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Weighted Performance Score</p>
                </div>
                <Progress value={finalScoreSummary.score} className="h-3 bg-gray-200 dark:bg-gray-800" />

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-b dark:border-gray-800 py-4">
                  <div className="text-center border-r dark:border-gray-800">
                    <p className="text-2xl font-bold text-blue-600">{finalScoreSummary.communication}/10</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Communication</p>
                  </div>
                  <div className="text-center border-r dark:border-gray-800">
                    <p className="text-2xl font-bold text-yellow-600">{finalScoreSummary.confidence}/10</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Confidence</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{finalScoreSummary.technical}/10</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Accuracy & Tech</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-gray-900 dark:text-white">Recruiter Summary:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#1a1a1a] p-4 rounded-lg italic">
                    {finalScoreSummary.feedback}
                  </p>
                </div>

                {finalScoreSummary.improvements.length > 0 && (
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-900 dark:text-white">Recommendations for Improvement:</p>
                    <div className="space-y-2">
                      {finalScoreSummary.improvements.map((tip: string, i: number) => (
                        <div key={i} className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5" />
                          <p className="text-sm text-gray-700 dark:text-gray-300">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card className="bg-white dark:bg-[#111]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-indigo-600">{selectedType}</CardTitle>
                <CardDescription>Answer the recruiter's prompt below.</CardDescription>
              </div>
              <Badge className="bg-indigo-600">Question {currentQuestionIdx + 1}/{questions.length}</Badge>
            </div>
            <Progress value={((currentQuestionIdx) / questions.length) * 100} className="mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900 p-6 rounded-lg">
              <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-2">Prompt:</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {questions[currentQuestionIdx]}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="answer">Your Answer</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSpeechToText}
                  className={`text-xs ${isListening ? "bg-red-50 text-red-600 animate-pulse border-red-200" : ""}`}
                >
                  <Mic className="w-3.5 h-3.5 mr-1" />
                  {isListening ? "Listening..." : "Dictate (Speech to Text)"}
                </Button>
              </div>
              <Textarea
                id="answer"
                placeholder="Type your answer clearly. Try to provide complete explanations, structural concepts, and examples."
                rows={5}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={submittingAnswer}
              />
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setInterviewStarted(false);
                  setSelectedType(null);
                }}
                disabled={submittingAnswer}
              >
                Quit Session
              </Button>
              
              <Button
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={handleNextOrComplete}
                disabled={submittingAnswer}
              >
                {submittingAnswer ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Evaluating response...
                  </>
                ) : (
                  <>
                    {currentQuestionIdx + 1 === questions.length ? "Finish Interview" : "Next Question"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
