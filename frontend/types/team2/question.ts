export type QuestionType = 'MCQ' | 'MRQ' | 'Programming';

export type QuestionDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';

export type QuestionStatus = 'Published' | 'Draft' | 'Retired';

export type CognitiveLevel =
  | 'Remembering'
  | 'Understanding'
  | 'Applying'
  | 'Analyzing'
  | 'Evaluating'
  | 'Creating';

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isPublic: boolean;
  timeLimit: string;     // e.g. "1.0s"
  memoryLimit: string;   // e.g. "256MB"
  matchType: string;     // e.g. "Exact Match"
}

export interface Question {
  id: string;
  title: string;
  version: string;       // e.g. "V2.4"
  type: QuestionType;
  difficulty: QuestionDifficulty;
  status: QuestionStatus;
  tags: string[];
  skills: string[];
  refCount: number;      // e.g. "Ref: 3"
  problemStatement: string;
  starterCode: string;
  testCases: TestCase[];
  cognitiveLevel: CognitiveLevel;
  basePoints: number;
  negativeMarking: number; // e.g. 25 for 25%
  partialMarking: boolean;
  defaultGradingMode: string; // e.g. "Exact String Match"
  lastModified: string;   // e.g. "Last modified 2m ago" or timestamp
  creator: string;       // e.g. "All Creators"
}
