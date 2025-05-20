"use client";

export interface RecognitionResult {
  scores: number[];
  embedding?: Float32Array;
  spectrogram?: {
    data: Float32Array;
    frameSize: number;
    frameCount: number;
  };
}

export interface RecognizerOptions {
  includeSpectrogram?: boolean;
  probabilityThreshold?: number;
  invokeCallbackOnNoiseAndUnknown?: boolean;
  overlapFactor?: number;
}

export interface SpeechRecognizer {
  wordLabels(): string[];
  ensureModelLoaded(): Promise<void>;
  listen(
    callback: (result: RecognitionResult) => void,
    options?: RecognizerOptions
  ): void;
  stopListening(): void;
}

export interface SpeechCommands {
  create(
    modelType: string,
    vocabulary?: string,
    modelJson?: string,
    metadataJson?: string
  ): SpeechRecognizer;
}

export interface ChatMessage {
  text: string;
  sender: "user" | "ai";
}

export interface FillerDetectionSession {
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

export const MODEL_URL = "https://teachablemachine.withgoogle.com/models/T4W8Efm6G/";