"use client";

import { Mic, MicOff, Redo, Send, MessageSquare } from "lucide-react";

interface ConversationPracticeTabProps {
  messages: { text: string; sender: "user" | "ai" }[];
  isConversationListening: boolean;
  userInput: string;
  setUserInput: (input: string) => void;
  handleStartConversationListening: () => void;
  handleStopConversationListening: () => void;
  handleSendMessage: () => void;
  handleReset: () => void;
  chatContainerRef: React.RefObject<HTMLDivElement | null>;
}

export default function ConversationPracticeTab({
  messages,
  isConversationListening,
  userInput,
  setUserInput,
  handleStartConversationListening,
  handleStopConversationListening,
  handleSendMessage,
  handleReset,
  chatContainerRef,
}: ConversationPracticeTabProps) {
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Latihan Wawancara Pekerjaan</h2>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-500" onClick={handleReset}>
            <Redo className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <div className="flex-1 bg-gray-200 h-2 rounded-full"></div>
        <span className="text-sm font-medium ml-4">0%</span>
      </div>

      <div 
        ref={chatContainerRef} 
        className="border border-gray-200 rounded-lg p-6 mb-4 h-[400px] overflow-y-auto flex flex-col"
      >
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-4`}>
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

      <div className="relative">
        <div className="flex items-center border border-gray-200 rounded-lg">
          <button 
            className={`p-3 text-white ${isConversationListening ? "bg-red-500" : "bg-green-500"} rounded-l-lg hover:bg-green-600`}
            onClick={isConversationListening ? handleStopConversationListening : handleStartConversationListening}
          >
            {isConversationListening ? (
              <MicOff className="w-6 h-6" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </button>
          <input 
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Respon Anda..."
            className="flex-1 p-3 focus:outline-none"
          />
          <button 
            className="p-3 text-gray-500 hover:text-gray-700"
            onClick={handleSendMessage}
          >
            <Send className="w-6 h-6" />
          </button>
        </div>

        <div className={`${isConversationListening ? "" : "hidden"} bg-gray-100 mt-4 p-4 rounded-lg`}>
          <h3 className="font-medium mb-1">Pengenalan Suara Aktif</h3>
          <p className="text-gray-600 text-sm">Bicaralah dengan jelas ke mikrofon Anda. Suara Anda akan ditranskripsikan di sini.</p>
        </div>
      </div>
    </div>
  );
}