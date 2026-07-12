"use client";

import React from "react";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  onRun: () => void;
  output?: string;
}

export function CodeEditor({ value, onChange, language = "javascript", onRun, output }: CodeEditorProps) {
  return (
    <div className="flex flex-col h-full border border-[#d5c1cc] rounded-md overflow-hidden bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-[#d5c1cc] bg-[#f9eaf0]">
        <div className="flex items-center gap-4">
          <span className="font-sans text-sm font-semibold text-[#51434c]">
            {language.charAt(0).toUpperCase() + language.slice(1)}
          </span>
          <span className="text-xs text-[#83727c] bg-white px-2 py-1 rounded border border-[#d5c1cc]">
            Code Editor
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onChange("")} 
            className="border-[#d5c1cc] text-[#51434c] hover:text-[#21191e] h-8 px-3"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Reset
          </Button>
          <Button 
            onClick={onRun} 
            size="sm" 
            className="bg-[#01ac9f] hover:bg-[#008f84] text-white h-8 px-4 font-semibold"
          >
            <Play className="w-3.5 h-3.5 mr-1" />
            Run Code
          </Button>
        </div>
      </div>
      
      {/* Editor Area (Fallback to textarea since we can't install monaco) */}
      <div className="flex-grow flex flex-col">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-grow p-4 font-mono text-sm resize-none focus:outline-none bg-[#fff7f9] text-[#21191e] leading-relaxed selection:bg-[#fface8]"
          placeholder="// Write your code here..."
          spellCheck={false}
        />
      </div>
      
      {/* Output Console */}
      {output !== undefined && (
        <div className="h-48 border-t border-[#d5c1cc] flex flex-col bg-[#362e33]">
          <div className="px-4 py-2 border-b border-[#51434c] flex items-center justify-between">
            <span className="text-xs font-mono font-medium text-[#fcedf3]">Output Console</span>
          </div>
          <div className="flex-grow p-4 overflow-y-auto font-mono text-xs text-[#ffd7f0] whitespace-pre-wrap">
            {output || "Ready."}
          </div>
        </div>
      )}
    </div>
  );
}
