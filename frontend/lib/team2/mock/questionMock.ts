import { Question } from '@/types/team2/question';

export const DEFAULT_QUESTIONS: Question[] = [
  {
    id: 'q1',
    title: 'Implement a custom Middleware in Redux-Toolkit',
    version: 'V2.4',
    type: 'Programming',
    difficulty: 'Expert',
    status: 'Published',
    tags: ['React', 'State Management'],
    skills: ['Expert Code Architecture', 'Asynchronous Operations'],
    refCount: 3,
    problemStatement: `Implement a custom middleware in Redux-Toolkit to log actions, intercept payloads, and measure API execution latency.

The middleware must:
1. Log the action type and payload to the console.
2. Measure the start and end execution time using performance.now().
3. If an action fails, log the stack trace to an external monitoring endpoint (mocked).`,
    starterCode: `const loggerMiddleware = store => next => action => {\n  // Write your middleware logic here\n  return next(action);\n};`,
    testCases: [
      {
        id: 'q1_tc1',
        input: 'dispatch({ type: "FETCH_DATA_START" })',
        expectedOutput: 'Action: FETCH_DATA_START, time elapsed: <10ms',
        isPublic: true,
        timeLimit: '1.0s',
        memoryLimit: '256MB',
        matchType: 'Exact Match'
      }
    ],
    cognitiveLevel: 'Creating',
    basePoints: 30,
    negativeMarking: 25,
    partialMarking: true,
    defaultGradingMode: 'Exact String Match',
    lastModified: '10 mins ago',
    creator: 'Sarah Jenkins'
  },
  {
    id: 'q2',
    title: 'Select all valid AWS VPC peering constraints',
    version: 'V1.0',
    type: 'MRQ',
    difficulty: 'Medium',
    status: 'Draft',
    tags: ['Cloud', 'Networking'],
    skills: ['Cloud Infrastructure Design'],
    refCount: 0,
    problemStatement: `Which of the following are valid constraints when configuring VPC Peering in AWS? (Select all that apply)

- [ ] You cannot create a VPC peering connection between VPCs with matching or overlapping CIDR blocks.
- [ ] You cannot have more than 1 active VPC peering connection between the same two VPCs at the same time.
- [ ] Transitive peering is supported (e.g. if VPC A peers with B and B with C, A is peered with C).
- [ ] Unicast traffic is supported but Multicast traffic is not supported over VPC Peering.`,
    starterCode: '// Select options in the UI',
    testCases: [],
    cognitiveLevel: 'Understanding',
    basePoints: 10,
    negativeMarking: 0,
    partialMarking: true,
    defaultGradingMode: 'Option Matching',
    lastModified: '1 hour ago',
    creator: 'Alex Rivera'
  },
  {
    id: 'q3',
    title: 'Legacy API Gateway configurations for v1.x',
    version: 'V3.1',
    type: 'MCQ',
    difficulty: 'Easy',
    status: 'Retired',
    tags: ['Legacy'],
    skills: ['Legacy API Maintenance'],
    refCount: 0,
    problemStatement: `In AWS API Gateway v1.x, which routing mechanism is deprecated for edge-optimized APIs?

(A) Regional endpoint routing
(B) Direct CloudFront distribution bypass routing
(C) Private integration endpoint routing
(D) Custom edge-cache certificate pinning`,
    starterCode: '// Choose single answer',
    testCases: [],
    cognitiveLevel: 'Remembering',
    basePoints: 5,
    negativeMarking: 0,
    partialMarking: false,
    defaultGradingMode: 'Option Matching',
    lastModified: '2 days ago',
    creator: 'System Admin'
  },
  {
    id: 'q4',
    title: 'Programming: Graph Theory Q2',
    version: 'Version 4.2',
    type: 'Programming',
    difficulty: 'Hard',
    status: 'Draft',
    tags: ['Graphs', 'Shortest Path'],
    skills: ['Critical Thinking', 'Code Optimization'],
    refCount: 1,
    problemStatement: `Implement a function to find the shortest path in a weighted graph using Dijkstra's algorithm.

The graph is represented as an adjacency list where:
\\( G = (V, E) \\)

Each element in the adjacency list contains a tuple of the destination node and the positive weight of the edge.`,
    starterCode: `def shortest_path(graph, start_node):
    # Write your solution here
    pass`,
    testCases: [
      {
        id: 'q4_tc1',
        input: "{'A': [('B', 1)], 'B': []}, 'A'",
        expectedOutput: "{'A': 0, 'B': 1}",
        isPublic: true,
        timeLimit: '1.0s',
        memoryLimit: '256MB',
        matchType: 'Exact Match'
      }
    ],
    cognitiveLevel: 'Analyzing',
    basePoints: 20,
    negativeMarking: 25,
    partialMarking: true,
    defaultGradingMode: 'Exact String Match',
    lastModified: 'Last modified 2m ago',
    creator: 'Sarah Jenkins'
  },
  {
    id: 'q5',
    title: 'Coding Challenge: Array Transformation',
    version: 'V1.0',
    type: 'Programming',
    difficulty: 'Medium',
    status: 'Published',
    tags: ['Arrays', 'Math'],
    skills: ['Algorithmic Logic'],
    refCount: 2,
    problemStatement: `Write a function transformArray(arr) that takes an array of integers and returns a new array where each element at index i is the product of all the numbers in the original array except the one at i.

### Constraints:
- You must solve this without using the division operator.
- The solution should run in O(n) time complexity.
- The input array will contain between 2 and 10^5 elements.

### Example:
**Input:** \`[1, 2, 3, 4]\`
**Output:** \`[24, 12, 8, 6]\``,
    starterCode: `/**
 * @param {number[]} arr
 * @return {number[]}
 */
function transformArray(arr) {
    const n = arr.length;
    const result = new Array(n).fill(1);
    
    // Write your code here
    
    return result;
}`,
    testCases: [
      {
        id: 'q5_tc1',
        input: '[10, 3, 5, 6, 2]',
        expectedOutput: '[180, 600, 360, 300, 900]',
        isPublic: true,
        timeLimit: '1.0s',
        memoryLimit: '256MB',
        matchType: 'Exact Match'
      }
    ],
    cognitiveLevel: 'Applying',
    basePoints: 15,
    negativeMarking: 0,
    partialMarking: false,
    defaultGradingMode: 'Exact String Match',
    lastModified: '3 days ago',
    creator: 'Alex Rivera'
  }
];

const STORAGE_KEY = 'xebia_exam_platform_questions';

export function getQuestions(): Question[] {
  if (typeof window === 'undefined') {
    return DEFAULT_QUESTIONS;
  }
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_QUESTIONS));
      return DEFAULT_QUESTIONS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error accessing local storage', error);
    return DEFAULT_QUESTIONS;
  }
}

export function saveQuestion(question: Question): void {
  if (typeof window === 'undefined') return;
  try {
    const questions = getQuestions();
    const index = questions.findIndex(q => q.id === question.id);
    if (index > -1) {
      questions[index] = {
        ...question,
        lastModified: 'Just now'
      };
    } else {
      questions.push({
        ...question,
        id: `q_${Date.now()}`,
        lastModified: 'Just now',
        refCount: 0
      });
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  } catch (error) {
    console.error('Error saving question to local storage', error);
  }
}

export function duplicateQuestion(id: string): Question | null {
  if (typeof window === 'undefined') return null;
  try {
    const questions = getQuestions();
    const target = questions.find(q => q.id === id);
    if (!target) return null;

    const duplicated: Question = {
      ...target,
      id: `q_${Date.now()}`,
      title: `${target.title} (Copy)`,
      version: 'V1.0',
      status: 'Draft',
      refCount: 0,
      lastModified: 'Just now'
    };

    questions.push(duplicated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
    return duplicated;
  } catch (error) {
    console.error('Error duplicating question', error);
    return null;
  }
}

export function deleteQuestion(id: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const questions = getQuestions();
    const filtered = questions.filter(q => q.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting question', error);
    return false;
  }
}

export function resetQuestions(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_QUESTIONS));
  } catch (error) {
    console.error('Error resetting questions', error);
  }
}
