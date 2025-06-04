"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface RecognitionResult {
  scores: number[];
  embedding?: Float32Array;
  spectrogram?: {
    data: Float32Array;
    frameSize: number;
    frameCount: number;
  };
}

interface RecognizerOptions {
  includeSpectrogram?: boolean;
  probabilityThreshold?: number;
  invokeCallbackOnNoiseAndUnknown?: boolean;
  overlapFactor?: number;
}

interface SpeechRecognizer {
  wordLabels(): string[];
  ensureModelLoaded(): Promise<void>;
  listen(
    callback: (result: RecognitionResult) => void,
    options?: RecognizerOptions
  ): void;
  stopListening(): void;
}

interface SpeechCommands {
  create(
    modelType: string,
    vocabulary?: string,
    modelJson?: string,
    metadataJson?: string
  ): SpeechRecognizer;
}

// Define a more specific interface for storing sessions
interface StoredSessionData {
  id: string;
  timestamp: string;
  duration: number;
  fillerCounts: Record<string, number>;
  totalFillerWords: number;
  fillerWordPercentage: string;
}

declare global {
  interface Window {
    speechCommands: SpeechCommands;
    tf: {
      loadLayersModel: (url: string) => Promise<unknown>;
      [key: string]: unknown;
    };
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

const MODEL_URL = "https://teachablemachine.withgoogle.com/models/T4W8Efm6G/";
const ALL_SESSIONS_KEY = "allAudiciaSessions"; // Key for storing all sessions

export const useFillerWordDetection = (forceActive?: boolean) => {
  const [allLabels, setAllLabels] = useState<string[]>([]);
  const [displayLabels, setDisplayLabels] = useState<string[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [isFillerDetectionActive, setIsFillerDetectionActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [sessionTime, setSessionTime] = useState<number>(0);
  const recognizerRef = useRef<SpeechRecognizer | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const loadScript = useCallback((src: string, globalCheck?: () => boolean): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        if (globalCheck) {
          const interval = setInterval(() => {
            if (globalCheck()) {
              clearInterval(interval);
              resolve();
            }
          }, 50);
        } else {
          resolve();
        }
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = true;

      script.onload = () => {
        if (globalCheck) {
          const interval = setInterval(() => {
            if (globalCheck()) {
              clearInterval(interval);
              resolve();
            }
          }, 50);
        } else {
          resolve();
        }
      };

      script.onerror = () =>
        reject(new Error(`Failed to load script: ${src}`));
      document.body.appendChild(script);
    });
  }, []);

  const loadCDNScripts = useCallback(async () => {
    await loadScript(
      "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js",
      () => !!window.tf
    );

    await loadScript(
      "https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands@0.4.0/dist/speech-commands.min.js",
      () =>
        !!window.speechCommands &&
        typeof window.speechCommands.create === "function"
    );
  }, [loadScript]);

  const createModel = useCallback(async () => {
    await loadCDNScripts();

    if (!window.speechCommands || typeof window.speechCommands.create !== "function") {
      console.error("speechCommands not loaded or not available on window");
      return;
    }

    const recognizer = window.speechCommands.create(
      "BROWSER_FFT",
      undefined,
      MODEL_URL + "model.json",
      MODEL_URL + "metadata.json"
    );

    await recognizer.ensureModelLoaded();
    recognizerRef.current = recognizer;
    const labels = recognizer.wordLabels();
    setAllLabels(labels);
    setDisplayLabels(labels.filter((label) => label !== "Background Noise"));
  }, [loadCDNScripts]);

  const startFillerDetection = useCallback(() => {
    const recognizer = recognizerRef.current;
    if (!recognizer) return;

    // Reset counters for a new session
    setCounts({});
    setSessionTime(0);
    setStartTime(Date.now());
    setIsFillerDetectionActive(true);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);

    recognizer.listen(
      (result: RecognitionResult) => {
        setCounts((prevCounts) => {
          const updatedCounts = { ...prevCounts };
          result.scores.forEach((score, index) => {
            const label = allLabels[index];
            if (score >= 0.7 && label !== "Background Noise") {
              updatedCounts[label] = (updatedCounts[label] || 0) + 1;
            }
          });
          return updatedCounts;
        });
      },
      {
        includeSpectrogram: true,
        probabilityThreshold: 0.7,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.1,
      }
    );
  }, [allLabels]);

  const stopFillerDetection = useCallback(() => {
    const recognizer = recognizerRef.current;
    if (recognizer) {
      recognizer.stopListening();
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setIsFillerDetectionActive(false);

    // Only save data if there was a session
    if (startTime) {
      const end = Date.now();
      const durationSec = Math.floor((end - startTime) / 1000);
      const totalFillerWords = Object.values(counts).reduce((a, b) => a + b, 0);
      const fillerWordPercentage =
        durationSec > 0
          ? ((totalFillerWords / durationSec) * 100).toFixed(2)
          : "0.00";

      // Create new session data object
      const newSessionData: StoredSessionData = {
        id: Date.now().toString(), // Use timestamp as unique ID
        timestamp: new Date().toISOString(),
        duration: durationSec,
        fillerCounts: { ...counts },
        totalFillerWords,
        fillerWordPercentage,
      };

      // Save current session for the result page
      localStorage.setItem("lastSession", JSON.stringify(newSessionData));

      // Save to all sessions history
      try {
        // Get existing sessions or initialize empty array
        const existingSessionsStr = localStorage.getItem(ALL_SESSIONS_KEY);
        const existingSessions: StoredSessionData[] = existingSessionsStr 
          ? JSON.parse(existingSessionsStr) 
          : [];
        
        // Add new session to the array
        existingSessions.push(newSessionData);
        
        // Save back to localStorage
        localStorage.setItem(ALL_SESSIONS_KEY, JSON.stringify(existingSessions));
      } catch (error) {
        console.error("Failed to save session history:", error);
      }
    }
  }, [counts, startTime]);

  const resetFillerStats = useCallback(() => {
    setCounts({});
    setSessionTime(0);
    setStartTime(null);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (isFillerDetectionActive) {
      setStartTime(Date.now());
      intervalRef.current = setInterval(() => {
        setSessionTime((prev) => prev + 1);
      }, 1000);
    }
  }, [isFillerDetectionActive]);

  const toggleFillerDetection = useCallback(() => {
    if (isFillerDetectionActive) {
      stopFillerDetection();
    } else {
      startFillerDetection();
    }
  }, [isFillerDetectionActive, stopFillerDetection, startFillerDetection]);

  // Effect to handle forceActive prop
  useEffect(() => {
    if (forceActive !== undefined) {
      if (forceActive && !isFillerDetectionActive) {
        startFillerDetection();
      } else if (!forceActive && isFillerDetectionActive) {
        stopFillerDetection();
      }
    }
  }, [forceActive, isFillerDetectionActive, startFillerDetection, stopFillerDetection]);

  // Initialize model on mount
  useEffect(() => {
    createModel();
    return () => {
      recognizerRef.current?.stopListening();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [createModel]);

  const getTotalFillerWords = useCallback(
    () => Object.values(counts).reduce((a, b) => a + b, 0),
    [counts]
  );

  const getFillerWordsPerMinute = useCallback(() => {
    const totalFillerWords = getTotalFillerWords();
    const minutes = sessionTime / 60;
    return minutes > 0 ? totalFillerWords / minutes : 0;
  }, [getTotalFillerWords, sessionTime]);

  return {
    allLabels,
    displayLabels,
    counts,
    isFillerDetectionActive,
    sessionTime,
    toggleFillerDetection,
    startFillerDetection,
    stopFillerDetection,
    resetFillerStats,
    getTotalFillerWords,
    getFillerWordsPerMinute
  };
};

export const useConversationPractice = (
  fillerDetectionActive?: boolean,
  onSpeechStart?: () => void,
  onSpeechEnd?: () => void
) => {
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "ai" }[]
  >([
    {
      text: "Halo! Saya adalah pewawancara AI Anda hari ini. Kami sedang mencari kandidat yang cocok dengan perusahaan kami dan memiliki keterampilan yang kami butuhkan. Mari kita mulai dengan pertanyaan umum: Bisakah Anda ceritakan sedikit tentang diri Anda dan mengapa Anda tertarik dengan posisi ini?",
      sender: "ai",
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [userInput, setUserInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const generateAIResponse = useCallback((userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("halo")) {
      return "Halo juga, apa saja kelebihan dan kekurangan mu?";
    }
    if (lowerMessage.includes("kelebihan")) {
      return "Kelebihan mu sangat baik, tetapi kekurangan mu juga harus diperbaiki. Apakah kamu bisa menceritakan tentang pengalaman kerja sebelumnya?";
    }
    if (lowerMessage.includes("pengalaman")) {
      return "Bisa tolong jelaskan pengalaman Anda yang relevan dengan posisi ini? Khususnya bagaimana Anda menangani tantangan komunikasi di tempat kerja sebelumnya?";
    }
    return "Apakah bisa Anda menjelaskan lebih lanjut? Saya tertarik mendengar tentang kemampuan komunikasi Anda.";
  }, []);

  const handleStartListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error("Could not start recognition", e);
      }
    }
  }, []);

  const handleStopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  const handleSendMessage = useCallback(() => {
    if (userInput.trim()) {
      setMessages((prev) => [...prev, { text: userInput, sender: "user" }]);

      setTimeout(() => {
        const aiResponse = generateAIResponse(userInput);
        setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
      }, 500);

      setUserInput("");
    }
  }, [userInput, generateAIResponse]);

  const handleReset = useCallback(() => {
    setMessages([
      {
        text: "Halo! Saya adalah pewawancara AI Anda hari ini. Kami sedang mencari kandidat yang cocok dengan perusahaan kami dan memiliki keterampilan yang kami butuhkan. Mari kita mulai dengan pertanyaan umum: Bisakah Anda ceritakan sedikit tentang diri Anda dan mengapa Anda tertarik dengan posisi ini?",
        sender: "ai",
      },
    ]);
    setIsListening(false);

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        console.warn("Speech Recognition API not supported in this browser.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "id-ID";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setMessages((prev) => [...prev, { text: transcript, sender: "user" }]);
        setUserInput("");

        setTimeout(() => {
          const aiResponse = generateAIResponse(transcript);
          setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
        }, 500);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error);
        if (onSpeechEnd) onSpeechEnd();
      };

      recognition.onstart = () => {
        if (onSpeechStart) onSpeechStart();
      };

      recognition.onend = () => {
        // Auto-restart recognition while listening is active
        if (isListening) {
          try {
            recognition.start();
          } catch (e) {
            console.error("Could not restart recognition", e);
            setIsListening(false);
            if (onSpeechEnd) onSpeechEnd();
          }
        } else {
          if (onSpeechEnd) onSpeechEnd();
        }
      };

      recognitionRef.current = recognition;
    }
  }, [isListening, onSpeechStart, onSpeechEnd, generateAIResponse]);

  // Scroll chat to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Effect to handle synchronized state with fillerDetectionActive
  useEffect(() => {
    if (fillerDetectionActive !== undefined) {
      if (fillerDetectionActive && !isListening) {
        handleStartListening();
      } else if (!fillerDetectionActive && isListening) {
        handleStopListening();
      }
    }
  }, [fillerDetectionActive, isListening, handleStartListening, handleStopListening]);

  const getProgressPercentage = useCallback(() => {
    const userMessages = messages.filter((msg) => msg.sender === "user").length;
    return Math.min(100, Math.floor((userMessages / 5) * 100));
  }, [messages]);

  return {
    messages,
    isConversationListening: isListening,
    userInput,
    setUserInput,
    handleStartConversationListening: handleStartListening,
    handleStopConversationListening: handleStopListening,
    handleSendMessage,
    handleReset,
    chatContainerRef,
    getProgressPercentage
  };
};
