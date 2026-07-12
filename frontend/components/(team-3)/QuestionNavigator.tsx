"use client";

import React from "react";
import { useExam, QuestionStatus } from "@/lib/(team-3)/ExamContext";
import { CheckCircle2, Circle, HelpCircle } from "lucide-react";

export function QuestionNavigator() {
  const { state, setCurrentQuestion } = useExam();

  if (!state) return null;

  const getStatusIcon = (status: QuestionStatus) => {
    switch (status) {
      case "answered":
        return <CheckCircle2 className="w-5 h-5 text-[#01ac9f]" />;
      case "review":
        return <HelpCircle className="w-5 h-5 text-[#ff6200]" />;
      case "unanswered":
      default:
        return <Circle className="w-5 h-5 text-[#83727c]" />;
    }
  };

  return (
    <div className="w-64 bg-[#fcedf3] p-4 flex flex-col gap-4 border-r border-[#d5c1cc] h-full overflow-y-auto shrink-0">
      <h2 className="text-lg font-bold text-[#21191e] font-sans tracking-tight">Questions</h2>
      <div className="flex flex-col gap-2">
        {state.questions.map((q, index) => {
          const isActive = q.id === state.currentQuestionId;
          return (
            <button
              key={q.id}
              onClick={() => setCurrentQuestion(q.id)}
              className={`flex items-center gap-3 p-3 rounded-md border text-left transition-colors ${
                isActive
                  ? "border-[#6c1d5f] bg-[#ffd7f0] shadow-sm text-[#3a0032] font-semibold"
                  : "border-[#d5c1cc] bg-[#ffffff] hover:bg-[#f9eaf0] text-[#51434c]"
              }`}
            >
              {getStatusIcon(q.status)}
              <span className="font-sans text-sm">Question {index + 1}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
