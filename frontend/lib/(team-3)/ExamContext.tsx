"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getItem, setItem } from "./idb";

export type QuestionStatus = "unanswered" | "answered" | "review";

export type Question = {
  id: string;
  type: "mcq" | "programming";
  status: QuestionStatus;
  answer?: string; // For MCQ
  code?: string; // For Programming
};

export type ExamState = {
  examId: string;
  questions: Question[];
  currentQuestionId: string;
  remainingSeconds: number;
};

type ExamContextType = {
  state: ExamState | null;
  isLoading: boolean;
  setAnswer: (questionId: string, answer: string) => void;
  setCode: (questionId: string, code: string) => void;
  setQuestionStatus: (questionId: string, status: QuestionStatus) => void;
  setCurrentQuestion: (questionId: string) => void;
  decrementTimer: () => void;
};

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export function ExamProvider({ children, examId }: { children: React.ReactNode; examId: string }) {
  const [state, setState] = useState<ExamState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize state from IDB or mock data
  useEffect(() => {
    const init = async () => {
      const cached = await getItem<ExamState>(`exam_${examId}`);
      if (cached) {
        setState(cached);
      } else {
        // Mock initial state (usually fetched from Team 2 API)
        const initialState: ExamState = {
          examId,
          remainingSeconds: 3600, // 1 hour
          currentQuestionId: "q1",
          questions: [
            { id: "q1", type: "mcq", status: "unanswered" },
            { id: "q2", type: "mcq", status: "unanswered" },
            { id: "q3", type: "programming", status: "unanswered" },
          ],
        };
        setState(initialState);
        await setItem(`exam_${examId}`, initialState);
      }
      setIsLoading(false);
    };
    init();
  }, [examId]);

  // Sync to IDB whenever state changes (debounce might be better for large apps, but simple for now)
  useEffect(() => {
    if (state && !isLoading) {
      setItem(`exam_${examId}`, state);
    }
  }, [state, examId, isLoading]);

  const setAnswer = (questionId: string, answer: string) => {
    setState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        questions: prev.questions.map((q) =>
          q.id === questionId ? { ...q, answer, status: "answered" } : q
        ),
      };
    });
  };

  const setCode = (questionId: string, code: string) => {
    setState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        questions: prev.questions.map((q) =>
          q.id === questionId ? { ...q, code, status: "answered" } : q
        ),
      };
    });
  };

  const setQuestionStatus = (questionId: string, status: QuestionStatus) => {
    setState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        questions: prev.questions.map((q) => (q.id === questionId ? { ...q, status } : q)),
      };
    });
  };

  const setCurrentQuestion = (questionId: string) => {
    setState((prev) => {
      if (!prev) return prev;
      return { ...prev, currentQuestionId: questionId };
    });
  };

  const decrementTimer = () => {
    setState((prev) => {
      if (!prev || prev.remainingSeconds <= 0) return prev;
      return { ...prev, remainingSeconds: prev.remainingSeconds - 1 };
    });
  };

  return (
    <ExamContext.Provider
      value={{
        state,
        isLoading,
        setAnswer,
        setCode,
        setQuestionStatus,
        setCurrentQuestion,
        decrementTimer,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
}

export function useExam() {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error("useExam must be used within an ExamProvider");
  }
  return context;
}
