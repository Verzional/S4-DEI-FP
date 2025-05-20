"use client";

import { Mic, MicOff } from "lucide-react";
import Link from "next/link";

interface FillerWordDetectionTabProps {
  displayLabels: string[];
  counts: Record<string, number>;
  isFillerDetectionActive: boolean;
  sessionTime: number;
  toggleFillerDetection: () => void;
}

export default function FillerWordDetectionTab({
  displayLabels,
  counts,
  isFillerDetectionActive,
  sessionTime,
  toggleFillerDetection,
}: FillerWordDetectionTabProps) {
  return (
    <div className="w-full flex flex-col items-center">
      <button
        onClick={toggleFillerDetection}
        className={`w-20 h-20 rounded-full shadow-lg flex items-center justify-center transition ${
          isFillerDetectionActive
            ? "bg-red-600 hover:bg-red-700"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isFillerDetectionActive ? (
          <MicOff className="w-10 h-10 text-white" />
        ) : (
          <Mic className="w-10 h-10 text-white" />
        )}
      </button>

      <div className="mt-4 text-xl text-gray-700 font-semibold">
        Session Time: <span className="text-indigo-600">{sessionTime}s</span>
      </div>

      <div className="mt-8 w-full max-w-md space-y-3">
        {displayLabels.map((label) => (
          <div
            key={label}
            className="flex justify-between items-center bg-gray-100 p-3 rounded text-gray-700 font-medium"
          >
            <span>{label}</span>
            <span className="bg-indigo-200 text-indigo-800 px-2 py-1 rounded-full text-sm">
              {counts[label] ?? 0} times
            </span>
          </div>
        ))}
      </div>

      <Link href="/result">
        <button className="mt-8 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">
          View Results
        </button>
      </Link>
    </div>
  );
}