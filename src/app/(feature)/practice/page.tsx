"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useFillerWordDetection, useConversationPractice } from "@/lib/speech";
import { Mic, MicOff, Redo, Send, MessageSquare, BarChart } from "lucide-react";

export default function PublicSpeakingApp() {
  const router = useRouter();
  const [showStats, setShowStats] = useState(false);
  const [isCombinedActive, setIsCombinedActive] = useState(false);

  // Initialize filler word detection with forceActive prop
  const {
    displayLabels,
    counts,
    sessionTime,
    resetFillerStats,
    getTotalFillerWords,
    getFillerWordsPerMinute,
    startFillerDetection,
    stopFillerDetection,
  } = useFillerWordDetection(isCombinedActive);

  // Initialize conversation practice with callbacks
  const {
    messages,
    // isConversationListening,
    userInput,
    setUserInput,
    handleSendMessage,
    handleReset: resetConversation,
    chatContainerRef,
    getProgressPercentage,
  } = useConversationPractice(
    isCombinedActive,
    // onSpeechStart callback
    () => {
      if (!isCombinedActive) {
        setIsCombinedActive(true);
        startFillerDetection();
      }
    },
    // onSpeechEnd callback
    () => {
      if (isCombinedActive) {
        setIsCombinedActive(false);
        stopFillerDetection();
      }
    }
  );

  // Combined start/stop function
  const toggleListening = () => {
    if (isCombinedActive) {
      // Stop both systems
      setIsCombinedActive(false);
      stopFillerDetection();
    } else {
      // Start both systems
      setIsCombinedActive(true);
      startFillerDetection();
    }
  };

  // Combined reset function
  const handleReset = () => {
    resetConversation();
    resetFillerStats();
    setIsCombinedActive(false);
  };

  // Effect to scroll chat to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatContainerRef, messages]);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 bg-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Public Speaking Assistant
      </h1>

      <div className="w-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latihan Wawancara Pekerjaan</h2>
          <div className="flex items-center space-x-4">
            <button
              className="text-blue-600 hover:text-blue-500 flex items-center gap-1"
              onClick={() => setShowStats(!showStats)}
            >
              <BarChart className="w-5 h-5" />
              <span>{showStats ? "Hide Stats" : "Show Stats"}</span>
            </button>
            <button
              className="text-gray-600 hover:text-gray-500"
              onClick={handleReset}
            >
              <Redo className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex items-center mb-6">
          <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium ml-4">
            {getProgressPercentage()}%
          </span>
        </div>

        <div
          ref={chatContainerRef}
          className="border border-gray-200 rounded-lg p-6 mb-4 h-[400px] overflow-y-auto flex flex-col"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              {msg.sender === "ai" && (
                <div className="w-10 h-10 rounded-full bg-orange-500 mr-4 flex-shrink-0 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
              )}
              <div
                className={`${
                  msg.sender === "user"
                    ? "bg-orange-100 text-right ml-auto"
                    : "bg-gray-100"
                } p-4 rounded-lg max-w-[80%]`}
              >
                <p>{msg.text}</p>
              </div>
              {msg.sender === "user" && (
                <div className="w-10 h-10 rounded-full bg-blue-500 ml-4 flex-shrink-0 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>

        {showStats && (
          <div className="mb-6 border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h3 className="font-bold text-lg mb-2 text-blue-600">
              Filler Word Statistics
            </h3>
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-700">
                <p>
                  Session time:{" "}
                  <span className="font-medium">{sessionTime}s</span>
                </p>
                <p>
                  Total filler words:{" "}
                  <span className="font-medium">{getTotalFillerWords()}</span>
                </p>
                <p>
                  Filler words per minute:{" "}
                  <span className="font-medium">
                    {getFillerWordsPerMinute().toFixed(1)}
                  </span>
                </p>
              </div>

              <div className="flex gap-1">
                {Object.entries(counts)
                  .slice(0, 3)
                  .map(
                    ([label, count]) =>
                      count > 0 && (
                        <div
                          key={label}
                          className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
                        >
                          {label}: {count}
                        </div>
                      )
                  )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {displayLabels.map((label) => (
                <div
                  key={label}
                  className="flex justify-between items-center bg-white p-2 rounded border border-gray-200"
                >
                  <span className="text-sm font-medium">{label}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {counts[label] ?? 0}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="relative">
          <div className="flex items-center border border-gray-200 rounded-lg">
            <button
              className={`p-3 text-white ${
                isCombinedActive ? "bg-red-500" : "bg-green-500"
              } rounded-l-lg hover:opacity-90 transition-opacity`}
              onClick={toggleListening}
            >
              {isCombinedActive ? (
                <MicOff className="w-6 h-6" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </button>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Respon Anda atau tekan mikrofon untuk berbicara..."
              className="flex-1 p-3 focus:outline-none"
            />
            <button
              className="p-3 text-gray-500 hover:text-gray-700"
              onClick={handleSendMessage}
            >
              <Send className="w-6 h-6" />
            </button>
          </div>

          {isCombinedActive && (
            <div className="bg-green-50 border border-green-200 mt-4 p-4 rounded-lg">
              <h3 className="font-medium mb-1 text-green-800">
                Pengenalan Suara Aktif
              </h3>
              <p className="text-green-700 text-sm">
                Bicaralah dengan jelas ke mikrofon Anda. Sistem sedang
                mendengarkan dan mendeteksi filler words.
              </p>
            </div>
          )}

          {getProgressPercentage() === 100 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => router.push("/result")}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                End Session & View Results
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
