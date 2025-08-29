"use client";

import { useState } from "react";
import { X, Rocket, User, Shield } from "lucide-react";

export default function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 relative">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Rocket className="w-5 h-5 flex-shrink-0" />
          <div className="flex items-center gap-6 text-sm">
            <span className="font-medium">🚀 This is a live demo!</span>
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>customer@demo.com</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>admin@demo.com</span>
              </div>
            </div>
            <span className="text-blue-100">Try both accounts to explore all features!</span>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="hover:bg-white/10 p-1 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
