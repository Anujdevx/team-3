import { useState, useEffect } from 'react';
import { Question } from '@/types/team2/question';
import { formatSecondsToHHMMSS } from '@/lib/team2/time';

interface QuestionNavState {
  answered: boolean;
  flagged: boolean;
}

export function useCandidateNavigation(
  questions: Question[],
  initialTarget: Question | null
) {
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(initialTarget);
  const [activeNavIndex, setActiveNavIndex] = useState(12); // Default question 12 is active

  // Navigation states for 45 questions
  const [questionStates, setQuestionStates] = useState<Record<number, QuestionNavState>>(() => {
    const defaultStates: Record<number, QuestionNavState> = {};
    for (let i = 1; i <= 45; i++) {
      defaultStates[i] = {
        answered: i < 12 && i !== 5 && i !== 8,
        flagged: i === 5 || i === 8 || i === 12,
      };
    }
    return defaultStates;
  });

  // Code editor text state
  const [codeValue, setCodeValue] = useState(initialTarget?.starterCode ?? '');

  // Clock countdown timer
  const [timerString, setTimerString] = useState('01:45:20');
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(6320); // 1 hr, 45 mins, 20 seconds

  // Code execution console output
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [lastSavedString, setLastSavedString] = useState('10:24 AM');

  // Submission Dialogs
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Sync state with active question starter code
  useEffect(() => {
    if (activeQuestion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCodeValue(activeQuestion.starterCode);
    }
  }, [activeQuestion]);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        const next = prev - 1;
        setTimerString(formatSecondsToHHMMSS(next));
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const selectQuestionFromGrid = (index: number) => {
    setActiveNavIndex(index);
    const mockIdx = (index - 1) % questions.length;
    const nextQ = questions[mockIdx];
    if (nextQ) {
      setActiveQuestion(nextQ);
      setCodeValue(nextQ.starterCode);
      setConsoleOutput(null);
    }
  };

  const toggleFlag = () => {
    setQuestionStates((prev) => {
      const current = prev[activeNavIndex] || { answered: false, flagged: false };
      return {
        ...prev,
        [activeNavIndex]: {
          ...current,
          flagged: !current.flagged,
        },
      };
    });
  };

  const runCodeTests = () => {
    setIsRunningTests(true);
    setConsoleOutput('Compiling files & launching execution runner...');

    setTimeout(() => {
      setConsoleOutput(
        `[INFO] Running 1 Public Test Case...\n✓ Test Case 1: Base Case Passed (14ms)\n  - Input: [10, 3, 5, 6, 2]\n  - Expected Output: [180, 600, 360, 300, 900]\n  - Actual Output: [180, 600, 360, 300, 900]\n\n✓ Validation tests completed. Output is correct! (100% score)`
      );
      setIsRunningTests(false);

      // Mark as answered
      setQuestionStates((prev) => ({
        ...prev,
        [activeNavIndex]: {
          ...prev[activeNavIndex],
          answered: true,
        },
      }));
    }, 1200);
  };

  const saveCodeProgress = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const mins = now.getMinutes().toString().padStart(2, '0');
    const period = now.getHours() >= 12 ? 'PM' : 'AM';
    setLastSavedString(`${hours}:${mins} ${period}`);

    // Mark as answered
    setQuestionStates((prev) => ({
      ...prev,
      [activeNavIndex]: {
        ...prev[activeNavIndex],
        answered: true,
      },
    }));

    alert('Progress saved successfully to exam server!');
  };

  const nextQuestion = () => {
    const nextIdx = activeNavIndex < 45 ? activeNavIndex + 1 : 1;
    selectQuestionFromGrid(nextIdx);
  };

  const prevQuestion = () => {
    const prevIdx = activeNavIndex > 1 ? activeNavIndex - 1 : 45;
    selectQuestionFromGrid(prevIdx);
  };

  return {
    activeQuestion,
    setActiveQuestion,
    activeNavIndex,
    setActiveNavIndex,
    questionStates,
    setQuestionStates,
    codeValue,
    setCodeValue,
    timerString,
    timeLeftSeconds,
    consoleOutput,
    setConsoleOutput,
    isRunningTests,
    lastSavedString,
    isSubmitOpen,
    setIsSubmitOpen,
    isNavOpen,
    setIsNavOpen,
    selectQuestionFromGrid,
    toggleFlag,
    runCodeTests,
    saveCodeProgress,
    nextQuestion,
    prevQuestion,
  };
}
