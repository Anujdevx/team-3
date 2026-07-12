"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useExam } from "@/lib/(team-3)/ExamContext";
import { QuestionNavigator } from "@/components/(team-3)/QuestionNavigator";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/(team-3)/CodeEditor";

export default function ProgrammingExamPage() {
  const router = useRouter();
  const { state, isLoading, setCode, setQuestionStatus, setCurrentQuestion } = useExam();
  const [output, setOutput] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!state) return;
    
    const currentQ = state.questions.find((q) => q.id === state.currentQuestionId);
    if (currentQ?.type === "mcq") {
      router.replace(`/exam/${state.examId}`);
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

  const handleRunCode = () => {
    setOutput("Running...\n\nHello World!\nTime: 12ms\nMemory: 4.2MB\n\nExecution successful.");
  };

  if (!currentQ || currentQ.type === "mcq") {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="flex w-full h-full bg-[#f7f8fc]">
      <QuestionNavigator />
      
      <div className="flex-grow flex h-full overflow-hidden">
        {/* Left pane: Problem description */}
        <div className="w-1/2 p-6 overflow-y-auto border-r border-[#d5c1cc] bg-white flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold font-sans text-[#21191e]">
              Question {currentIndex + 1}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newStatus = currentQ.status === "review" ? (currentQ.code ? "answered" : "unanswered") : "review";
                setQuestionStatus(currentQ.id, newStatus);
              }}
              className="border-[#ff6200] text-[#ff6200] hover:bg-[#fff0e5]"
            >
              {currentQ.status === "review" ? "Unflag" : "Flag for Review"}
            </Button>
          </div>

          <div className="prose max-w-none text-[#51434c] mb-8 font-sans text-lg leading-relaxed flex-grow">
            <h3 className="font-bold text-[#21191e] mb-2">Problem Statement</h3>
            <p>
              Write a function that prints &quot;Hello World!&quot;. 
              This is a programming question simulation.
            </p>
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

        {/* Right pane: Code Editor */}
        <div className="w-1/2 p-6 bg-[#f7f8fc]">
          <CodeEditor
            value={currentQ.code || ""}
            onChange={(val) => setCode(currentQ.id, val)}
            language="javascript"
            onRun={handleRunCode}
            output={output}
          />
        </div>
      </div>
    </div>
  );
}
