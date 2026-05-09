import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Building2, Calendar, GraduationCap, IndianRupee, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const governmentJobs = [
  {
    title: "NIC Scientist-B",
    organization: "National Informatics Centre",
    eligibility: "MCA/M.Tech/M.Sc (CS/IT)",
    salary: "₹44,900 - ₹1,42,400 (Level 10)",
    age: "18-30 years",
    exam: "Computer Based Test + Interview",
    subjects: ["Data Structures", "Algorithms", "DBMS", "Networking", "Java/C++"],
    applicationDates: "Usually July-August",
    vacancies: "~300 posts",
    category: "technical"
  },
  {
    title: "SSC CGL (Tax Assistant)",
    organization: "Staff Selection Commission",
    eligibility: "Bachelor's Degree",
    salary: "₹25,500 - ₹81,100 (Level 4)",
    age: "18-27 years",
    exam: "Tier I, II, III (CBT + Descriptive)",
    subjects: ["Reasoning", "Quantitative Aptitude", "English", "General Awareness"],
    applicationDates: "Usually September-October",
    vacancies: "~8000 posts",
    category: "administrative"
  },
  {
    title: "IBPS SO (IT Officer)",
    organization: "Institute of Banking Personnel Selection",
    eligibility: "B.E/B.Tech in CS/IT or equivalent",
    salary: "₹23,700 - ₹42,000 (Scale I)",
    age: "20-30 years",
    exam: "Prelims + Mains + Interview",
    subjects: ["IT Knowledge", "Reasoning", "English", "Quantitative Aptitude"],
    applicationDates: "Usually November-December",
    vacancies: "~1000 posts",
    category: "banking"
  },
  {
    title: "NIELIT Scientist-B",
    organization: "National Institute of Electronics & IT",
    eligibility: "M.Tech/MCA/M.Sc with 60% marks",
    salary: "₹56,100 - ₹1,77,500 (Level 10)",
    age: "Not exceeding 35 years",
    exam: "Written Test + Interview",
    subjects: ["Computer Science", "Electronics", "IT", "Research Aptitude"],
    applicationDates: "As per notification",
    vacancies: "~50-100 posts",
    category: "technical"
  },
  {
    title: "Railways (Junior Engineer - IT)",
    organization: "Railway Recruitment Board",
    eligibility: "Diploma/B.Tech in CS/IT",
    salary: "₹35,400 - ₹1,12,400 (Level 6)",
    age: "18-33 years",
    exam: "CBT Stage I & II + Document Verification",
    subjects: ["Technical (CS/IT)", "General Awareness", "Reasoning", "Mathematics"],
    applicationDates: "Usually March-April",
    vacancies: "~500 posts",
    category: "technical"
  },
  {
    title: "State PSC (Assistant Programmer)",
    organization: "Various State PSCs",
    eligibility: "MCA/B.Tech (CS/IT)",
    salary: "₹25,000 - ₹70,000 (varies by state)",
    age: "21-35 years",
    exam: "Prelims + Mains + Interview",
    subjects: ["Programming", "DBMS", "Data Structures", "General Studies"],
    applicationDates: "Check state PSC websites",
    vacancies: "Varies by state",
    category: "state"
  }
];

export function GovernmentJobs() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Building2 className="w-6 h-6 text-green-600" />
          <h2 className="text-3xl font-bold">Government Job Opportunities</h2>
        </div>
        <p className="text-gray-600">Curated list of government exams for CS/IT graduates</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
          <TabsTrigger value="all">All Jobs</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="banking">Banking</TabsTrigger>
          <TabsTrigger value="state">State PSC</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {governmentJobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </TabsContent>

        <TabsContent value="technical" className="space-y-4 mt-6">
          {governmentJobs.filter(j => j.category === "technical").map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </TabsContent>

        <TabsContent value="banking" className="space-y-4 mt-6">
          {governmentJobs.filter(j => j.category === "banking").map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </TabsContent>

        <TabsContent value="state" className="space-y-4 mt-6">
          {governmentJobs.filter(j => j.category === "state").map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function JobCard({ job }: { job: typeof governmentJobs[0] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-green-600" />
              {job.title}
            </CardTitle>
            <CardDescription>{job.organization}</CardDescription>
          </div>
          <Badge variant="outline">{job.vacancies}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <GraduationCap className="w-4 h-4" />
              Eligibility
            </div>
            <p className="text-sm font-semibold">{job.eligibility}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <IndianRupee className="w-4 h-4" />
              Salary
            </div>
            <p className="text-sm font-semibold">{job.salary}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Calendar className="w-4 h-4" />
              Age Limit
            </div>
            <p className="text-sm font-semibold">{job.age}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Exam Pattern:</p>
          <p className="text-sm text-gray-700">{job.exam}</p>
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Key Subjects:</p>
          <div className="flex flex-wrap gap-2">
            {job.subjects.map((subject, i) => (
              <Badge key={i} variant="secondary">{subject}</Badge>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t">
          <p className="text-sm text-gray-600">Application Period: <span className="font-semibold">{job.applicationDates}</span></p>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1">
            <ExternalLink className="w-4 h-4 mr-2" />
            Preparation Roadmap
          </Button>
          <Button variant="outline" className="flex-1">
            View Syllabus
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
