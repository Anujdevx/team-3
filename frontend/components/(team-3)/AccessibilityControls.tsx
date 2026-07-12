"use client";

import React, { useState, useRef, useEffect } from "react";
import { Settings, Type, Contrast } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "extra-large">("normal");
  const [highContrast, setHighContrast] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const applyAccessibility = (size: "normal" | "large" | "extra-large", contrast: boolean) => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("text-base", "text-lg", "text-xl", "high-contrast");
      if (size === "large") document.documentElement.classList.add("text-lg");
      if (size === "extra-large") document.documentElement.classList.add("text-xl");
      if (contrast) document.documentElement.classList.add("high-contrast");
    }
  };

  const handleSizeChange = (newSize: "normal" | "large" | "extra-large") => {
    setFontSize(newSize);
    applyAccessibility(newSize, highContrast);
    setIsOpen(false);
  };

  const handleContrastToggle = () => {
    const newContrast = !highContrast;
    setHighContrast(newContrast);
    applyAccessibility(fontSize, newContrast);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => setIsOpen(!isOpen)}
        className="border-[#d5c1cc] text-[#51434c] hover:bg-[#fcedf3] hover:text-[#21191e]"
      >
        <Settings className="w-5 h-5" />
        <span className="sr-only">Accessibility Controls</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-[#d5c1cc] rounded-md shadow-lg z-50 py-2">
          <div className="px-4 py-2 font-sans font-medium text-[#21191e] border-b border-[#eddfe5]">
            Accessibility
          </div>
          
          <button 
            onClick={() => handleSizeChange("normal")} 
            className={`w-full flex items-center px-4 py-2 text-sm text-left ${fontSize === "normal" ? "bg-[#fcedf3] text-[#6c1d5f]" : "text-[#51434c] hover:bg-[#f9eaf0]"}`}
          >
            <Type className="w-4 h-4 mr-2" />
            Normal Text
          </button>
          <button 
            onClick={() => handleSizeChange("large")} 
            className={`w-full flex items-center px-4 py-2 text-sm text-left ${fontSize === "large" ? "bg-[#fcedf3] text-[#6c1d5f]" : "text-[#51434c] hover:bg-[#f9eaf0]"}`}
          >
            <Type className="w-5 h-5 mr-2" />
            Large Text
          </button>
          <button 
            onClick={() => handleSizeChange("extra-large")} 
            className={`w-full flex items-center px-4 py-2 text-sm text-left ${fontSize === "extra-large" ? "bg-[#fcedf3] text-[#6c1d5f]" : "text-[#51434c] hover:bg-[#f9eaf0]"}`}
          >
            <Type className="w-6 h-6 mr-2" />
            Extra Large Text
          </button>
          
          <div className="border-t border-[#eddfe5] my-1"></div>
          
          <button 
            onClick={handleContrastToggle} 
            className={`w-full flex items-center px-4 py-2 text-sm text-left ${highContrast ? "bg-[#fcedf3] text-[#6c1d5f]" : "text-[#51434c] hover:bg-[#f9eaf0]"}`}
          >
            <Contrast className="w-4 h-4 mr-2" />
            High Contrast {highContrast ? "On" : "Off"}
          </button>
        </div>
      )}
    </div>
  );
}
