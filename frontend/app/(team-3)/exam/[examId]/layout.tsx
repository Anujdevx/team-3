import React from "react";
import { ExamProvider } from "@/lib/(team-3)/ExamContext";
import { ExamTimer } from "@/components/(team-3)/ExamTimer";
import { AccessibilityControls } from "@/components/(team-3)/AccessibilityControls";
import Image from "next/image";

export default async function ExamLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ examId: string }>;
}) {
  const resolvedParams = await params;

  return (
    <ExamProvider examId={resolvedParams.examId}>
      <div className="flex flex-col h-screen bg-[#f7f8fc]">
        {/* Top Navigation Bar */}
        <header className="flex-none h-16 bg-white border-b border-[#d5c1cc] flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <Image
              src="/Logo-Purple.png"
              alt="Xebia Logo"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <div>
              <h1 className="font-sans font-bold text-lg text-[#21191e] tracking-tight leading-none">
                Xebia Assessment
              </h1>
              <p className="font-sans text-xs text-[#51434c] mt-1">
                Proctored Exam Session
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="font-sans text-sm font-semibold text-[#51434c] uppercase tracking-wider">
                Time Remaining
              </span>
              <ExamTimer />
            </div>
            <AccessibilityControls />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow flex overflow-hidden">
          {children}
        </main>
      </div>
    </ExamProvider>
  );
}
