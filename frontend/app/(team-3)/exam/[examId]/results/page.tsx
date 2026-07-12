import React from "react";
import { Download, Award, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResultsPage({ params }: { params: { examId: string } }) {
  // Mock results data
  const score = 85;
  const percentile = 92;
  const sections = [
    { name: "Algorithms", score: 90 },
    { name: "System Design", score: 75 },
    { name: "Core Language", score: 95 },
  ];

  return (
    <div className="flex w-full h-full bg-[#f7f8fc] overflow-y-auto p-6 md:p-12">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-sans text-[#21191e]">Exam Scorecard</h1>
            <p className="text-[#51434c] mt-1 font-sans">
              Xebia Assessment - Exam ID: {params.examId}
            </p>
          </div>
          <Button className="bg-[#6c1d5f] hover:bg-[#4a1e47] text-white flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" />
            Download Certificate
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Main Score */}
          <div className="md:col-span-2 bg-white rounded-lg border border-[#d5c1cc] p-8 shadow-sm flex flex-col justify-center items-center">
            <div className="relative w-48 h-48 mb-4">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <path
                  className="text-[#f9eaf0]"
                  strokeDasharray="100, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  className="text-[#01ac9f]"
                  strokeDasharray={`${score}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold font-mono text-[#21191e]">{score}%</span>
                <span className="text-sm font-sans text-[#51434c] uppercase tracking-wide mt-1">Overall Score</span>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold font-sans text-[#21191e] flex items-center justify-center gap-2">
                <Award className="text-[#01ac9f] w-6 h-6" />
                Passed with Distinction
              </h2>
              <p className="text-[#51434c] mt-2 max-w-md mx-auto">
                Congratulations! You have demonstrated excellent proficiency across the assessed domains.
              </p>
            </div>
          </div>

          {/* Percentile */}
          <div className="bg-[#6c1d5f] rounded-lg border border-[#4a1e47] p-8 shadow-sm flex flex-col justify-center items-center text-white text-center">
            <Target className="w-12 h-12 text-[#fface8] mb-4" />
            <h3 className="text-sm uppercase tracking-widest text-[#fface8] font-semibold mb-2">Cohort Percentile</h3>
            <span className="text-6xl font-bold font-mono">{percentile}</span>
            <span className="text-lg mt-1 font-serif italic">th</span>
            <p className="text-[#ffd7f0] text-sm mt-4 leading-relaxed">
              You scored higher than {percentile}% of candidates in this cohort.
            </p>
          </div>
        </div>

        {/* Section Breakdown */}
        <div className="bg-white rounded-lg border border-[#d5c1cc] p-8 shadow-sm">
          <h3 className="text-xl font-bold font-sans text-[#21191e] mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#ff6200]" />
            Section Breakdown
          </h3>

          <div className="space-y-6">
            {sections.map((section, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-sans font-semibold text-[#21191e]">{section.name}</span>
                  <span className="font-mono font-bold text-[#51434c]">{section.score}%</span>
                </div>
                <div className="w-full bg-[#f9eaf0] rounded-full h-3">
                  <div
                    className="bg-[#6c1d5f] h-3 rounded-full"
                    style={{ width: `${section.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
