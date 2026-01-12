import { useState } from 'react';
import {
  Play,
  Send,
  RotateCcw,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  Code2,
  FileCode2,
  Trophy,
  Flame,
  BookOpen,
  Filter,
  Search,
  Building2,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DifficultyBadge, ProgressBar } from '@/components/dashboard/SkillWidgets';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { codingProblems } from '@/data/mockData';

const CodingPracticePage = () => {
  const [selectedProblem, setSelectedProblem] = useState(codingProblems[0]);
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(`# Write your solution here
def two_sum(nums, target):
    # Your code here
    pass
`);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setOutput('Test Case 1: Passed ✓\nTest Case 2: Passed ✓\nTest Case 3: Failed ✗\n\nExpected: [0, 1]\nGot: [1, 0]');
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    setTimeout(() => {
      setOutput('All test cases passed! 🎉\n\nTime Complexity: O(n)\nSpace Complexity: O(n)\n\nRuntime: 45ms (beats 78% of submissions)\nMemory: 14.2MB (beats 65% of submissions)');
      setIsRunning(false);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col gap-4 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-skill-coding-muted">
              <Code2 className="h-6 w-6 text-skill-coding" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Coding Practice</h1>
              <p className="text-sm text-muted-foreground">
                Solve problems • Build skills • Get hired
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-warning/10 text-warning">
              <Flame className="h-4 w-4" />
              <span className="text-sm font-medium">5 day streak</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-skill-coding-muted">
              <Trophy className="h-4 w-4 text-skill-coding" />
              <span className="text-sm font-medium text-skill-coding">245 pts</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-0">
          {/* Problem List Sidebar */}
          <Card className="lg:col-span-3 flex flex-col overflow-hidden">
            <CardHeader className="pb-3 shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Problems</CardTitle>
                <Badge variant="secondary">128 total</Badge>
              </div>
              <div className="flex gap-2 mt-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-8 h-8 text-sm" />
                </div>
                <Button variant="outline" size="icon" className="h-8 w-8 shrink-0">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-0">
              <div className="divide-y">
                {codingProblems.map((problem) => (
                  <button
                    key={problem.id}
                    onClick={() => setSelectedProblem(problem)}
                    className={`w-full text-left p-3 hover:bg-muted/50 transition-colors ${
                      selectedProblem.id === problem.id ? 'bg-muted' : ''
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">
                        {problem.solved ? (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{problem.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <DifficultyBadge difficulty={problem.difficulty as any} />
                          <span className="text-xs text-muted-foreground">
                            {problem.acceptance}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Problem Details & Editor */}
          <div className="lg:col-span-9 flex flex-col gap-4 min-h-0">
            <Tabs defaultValue="description" className="flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between shrink-0">
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="solutions">Solutions</TabsTrigger>
                  <TabsTrigger value="submissions">Submissions</TabsTrigger>
                </TabsList>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="c">C</SelectItem>
                    <SelectItem value="sql">SQL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <TabsContent value="description" className="flex-1 mt-4 min-h-0">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 h-full">
                  {/* Problem Description */}
                  <Card className="overflow-auto">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{selectedProblem.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <DifficultyBadge difficulty={selectedProblem.difficulty as any} />
                            <span className="text-xs text-muted-foreground">
                              Acceptance: {selectedProblem.acceptance}%
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <BookOpen className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                      <div>
                        <p className="text-muted-foreground leading-relaxed">
                          Given an array of integers <code className="px-1 py-0.5 bg-muted rounded text-xs">nums</code> and an integer{' '}
                          <code className="px-1 py-0.5 bg-muted rounded text-xs">target</code>, return indices of the two numbers such
                          that they add up to target.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mt-3">
                          You may assume that each input would have exactly one solution, and you may not use the same element twice.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="font-medium">Example 1:</p>
                        <div className="bg-muted/50 rounded-lg p-3 font-mono text-xs">
                          <p>Input: nums = [2,7,11,15], target = 9</p>
                          <p>Output: [0,1]</p>
                          <p className="text-muted-foreground mt-1">
                            Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="font-medium">Constraints:</p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>2 ≤ nums.length ≤ 10⁴</li>
                          <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
                          <li>-10⁹ ≤ target ≤ 10⁹</li>
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {selectedProblem.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <div className="flex flex-wrap gap-1">
                          {selectedProblem.companies.map((company) => (
                            <Badge key={company} variant="outline" className="text-xs">
                              {company}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Code Editor & Output */}
                  <div className="flex flex-col gap-4 min-h-[400px]">
                    {/* Code Editor */}
                    <Card className="flex-1 flex flex-col overflow-hidden">
                      <CardHeader className="py-2 px-4 border-b shrink-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileCode2 className="h-4 w-4" />
                            <span className="text-sm font-medium">solution.py</span>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => setCode('')}>
                            <RotateCcw className="h-3 w-3 mr-1" />
                            Reset
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 p-0 overflow-hidden">
                        <textarea
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          className="w-full h-full p-4 font-mono text-sm bg-muted/30 resize-none focus:outline-none"
                          spellCheck={false}
                        />
                      </CardContent>
                    </Card>

                    {/* Output Panel */}
                    <Card className="shrink-0">
                      <CardHeader className="py-2 px-4 border-b">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Output</span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleRun}
                              disabled={isRunning}
                            >
                              <Play className="h-3 w-3 mr-1" />
                              Run
                            </Button>
                            <Button
                              size="sm"
                              onClick={handleSubmit}
                              disabled={isRunning}
                              className="bg-skill-coding hover:bg-skill-coding/90"
                            >
                              <Send className="h-3 w-3 mr-1" />
                              Submit
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap min-h-[80px]">
                          {isRunning ? 'Running...' : output || 'Click "Run" to test your code'}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="solutions" className="flex-1 mt-4">
                <Card className="h-full flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Solutions will be available after you solve the problem</p>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="submissions" className="flex-1 mt-4">
                <Card className="h-full flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No submissions yet</p>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CodingPracticePage;
