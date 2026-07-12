"use client";

import React, { useEffect } from "react";
import { useExam } from "@/lib/(team-3)/ExamContext";

export function ExamTimer() {
  const { state, decrementTimer } = useExam();

  useEffect(() => {
    if (!state || state.remainingSeconds <= 0) return;

    const interval = setInterval(() => {
      decrementTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [state, decrementTimer]);

  if (!state) return null;

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const isWarning = state.remainingSeconds < 300; // Less than 5 minutes

  return (
    <div className={`font-mono text-xl font-bold px-4 py-2 rounded-md border ${isWarning ? "bg-[#ba1a1a] text-white border-[#93000a]" : "bg-[#fff7f9] text-[#21191e] border-[#d5c1cc]"}`}>
      {formatTime(state.remainingSeconds)}
    </div>
  );
}
