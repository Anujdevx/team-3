"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useExam } from "@/lib/(team-3)/ExamContext";
import { QuestionNavigator } from "@/components/(team-3)/QuestionNavigator";
import { Button } from "@/components/ui/button";

export default function ExamMainPage() {
  const router = useRouter();
  const { state, isLoading, setAnswer, setQuestionStatus, setCurrentQuestion } = useExam();

  useEffect(() => {
    if (!state) return;
    
    const currentQ = state.questions.find((q) => q.id === state.currentQuestionId);
    if (currentQ?.type === "programming") {
      router.replace(`/exam/${state.examId}/programming`);
    }
  }, [state?.currentQuestionId, state, router]);

  if (isLoading || !state) {
    return <div className="flex items-center justify-center w-full h-full">Loading...</div>;
  }

  const currentQ = state.questions.find((q) => q.id === state.currentQuestionId);
  const currentIndex = state.questions.findIndex((q) => q.id === state.currentQuestionId);

  const handleNext = () => {
    if (currentIndex < state.questions.length - 1) {
      setCurrentQuestion(state.questions[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentQuestion(state.questions[currentIndex - 1].id);
    }
  };

  const handleFinish = () => {
    router.push(`/exam/${state.examId}/submission`);
  };

  if (!currentQ || currentQ.type === "programming") {
    return null; // Will redirect via useEffect
  }

  const options = ["Option A", "Option B", "Option C", "Option D"]; // Mock options

  return (
    <div className="flex w-full h-full bg-[#f7f8fc]">
      <QuestionNavigator />
      
      <div className="flex-grow p-8 flex flex-col h-full overflow-y-auto">
        <div className="bg-white rounded-lg border border-[#d5c1cc] p-8 shadow-sm flex-grow flex flex-col max-w-4xl mx-auto w-full">
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold font-sans text-[#21191e]">
              Question {currentIndex + 1}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newStatus = currentQ.status === "review" ? (currentQ.answer ? "answered" : "unanswered") : "review";
                setQuestionStatus(currentQ.id, newStatus);
              }}
              className="border-[#ff6200] text-[#ff6200] hover:bg-[#fff0e5]"
            >
              {currentQ.status === "review" ? "Unflag" : "Flag for Review"}
            </Button>
          </div>

          <div className="prose max-w-none text-[#51434c] mb-8 font-sans text-lg leading-relaxed">
            <p>
              This is a placeholder for the multiple-choice question content. 
              In a real scenario, this text would be fetched from the Team 2 Question Creation API.
            </p>
          </div>

          <div className="flex flex-col gap-3 mb-8">
            {options.map((opt, idx) => {
              const isSelected = currentQ.answer === String(idx);
              return (
                <label 
                  key={idx} 
                  className={`flex items-center gap-3 p-4 border rounded-md cursor-pointer transition-colors ${
                    isSelected 
                      ? "border-[#6c1d5f] bg-[#fff7f9]" 
                      : "border-[#d5c1cc] hover:border-[#83727c] bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${currentQ.id}`}
                    value={idx}
                    checked={isSelected}
                    onChange={() => setAnswer(currentQ.id, String(idx))}
                    className="w-4 h-4 text-[#6c1d5f] accent-[#6c1d5f]"
                  />
                  <span className="font-sans text-[#21191e]">{opt}</span>
                </label>
              );
            })}
          </div>

          <div className="mt-auto flex justify-between pt-6 border-t border-[#eddfe5]">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="border-[#6c1d5f] text-[#6c1d5f] hover:bg-[#f9eaf0]"
            >
              Previous
            </Button>
            
            {currentIndex < state.questions.length - 1 ? (
              <Button onClick={handleNext} className="bg-[#6c1d5f] hover:bg-[#4a1e47] text-white">
                Next
              </Button>
            ) : (
              <Button onClick={handleFinish} className="bg-[#ff6200] hover:bg-[#e65800] text-white">
                Finish Exam
              </Button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
