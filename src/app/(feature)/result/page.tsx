"use client";
import { useEffect, useState } from "react";

interface SessionData {
  duration: number;
  fillerCounts: Record<string, number>;
  totalFillerWords: number;
  fillerWordPercentage: string;
}

export default function Result() {
  const [session, setSession] = useState<SessionData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("lastSession");
    if (data) {
      setSession(JSON.parse(data));
    }
  }, []);

  if (!session) return <p className="text-center">No session data available</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Session Statistics</h2>

      <p><strong>Duration:</strong> {session.duration} seconds</p>
      <p><strong>Total Filler Words:</strong> {session.totalFillerWords}</p>
      <p><strong>Filler Word Percentage:</strong> {session.fillerWordPercentage}%</p>

      <div className="mt-4">
        <h3 className="font-semibold text-lg mb-2">Filler Words Breakdown:</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {Object.entries(session.fillerCounts).map(([label, count]) => (
            <li key={label}>
              {label}: {count} seconds
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
