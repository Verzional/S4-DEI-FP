"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  ListChecks,
  MessageCircleWarning,
  Lightbulb,
  Home,
} from "lucide-react";

interface SessionData {
  duration: number; 
  fillerCounts: Record<string, number>;
  totalFillerWords: number;
  fillerWordPercentage: string; 
}

export default function ResultPage() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [fillerPerMinute, setFillerPerMinute] = useState<string>("0.0");
  const [topFillerWords, setTopFillerWords] = useState<[string, number][]>([]);

  useEffect(() => {
    const dataString = localStorage.getItem("lastSession");
    if (dataString) {
      try {
        const parsedData: SessionData = JSON.parse(dataString);
        setSession(parsedData);

        if (parsedData.duration > 0 && parsedData.totalFillerWords > 0) {
          const fpm = parsedData.totalFillerWords / (parsedData.duration / 60);
          setFillerPerMinute(fpm.toFixed(1));
        } else {
          setFillerPerMinute("0.0");
        }

        const sortedFillers = Object.entries(parsedData.fillerCounts)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3); // Get top 3
        setTopFillerWords(sortedFillers);
      } catch (error) {
        console.error("Failed to parse session data from localStorage:", error);
        setSession(null); // Fallback if parsing fails
      }
    }
  }, []);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
        <MessageCircleWarning className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Data Sesi Tidak Ditemukan
        </h2>
        <p className="text-gray-500 mb-6">
          Sepertinya tidak ada data dari sesi latihan terakhir Anda.
        </p>
        <Link href="/scenarios">
          <button className="bg-primary-orange text-white font-semibold py-2 px-6 rounded-lg hover:bg-secondary-orange transition-colors duration-200 flex items-center">
            <Home className="w-4 h-4 mr-2" />
            Mulai Latihan Baru
          </button>
        </Link>
      </div>
    );
  }

  const formatDuration = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} menit ${seconds} detik`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Analisis Sesi Latihan Anda
        </h1>
        <p className="text-lg text-gray-600">
          Berikut adalah rincian performa Anda dari sesi terakhir.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Overall Performance Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center text-primary-orange mb-4">
            <BarChart3 className="w-8 h-8 mr-3" />
            <h2 className="text-2xl font-semibold">Ringkasan Performa</h2>
          </div>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between items-center">
              <span className="font-medium">Durasi Latihan:</span>
              <span className="text-lg font-semibold text-gray-800">
                {formatDuration(session.duration)}
              </span>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Kata Pengisi:</span>
              <span className="text-lg font-semibold text-red-600">
                {session.totalFillerWords}
              </span>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <span className="font-medium">Persentase Kata Pengisi:</span>
              <span className="text-lg font-semibold text-red-600">
                {session.fillerWordPercentage}%
              </span>
            </div>
            <hr />
            <div className="flex justify-between items-center">
              <span className="font-medium">Kata Pengisi per Menit (FPM):</span>
              <span className="text-lg font-semibold text-red-600">
                {fillerPerMinute}
              </span>
            </div>
          </div>
        </div>

        {/* Filler Word Breakdown Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center text-primary-orange mb-4">
            <ListChecks className="w-8 h-8 mr-3" />
            <h2 className="text-2xl font-semibold">Rincian Kata Pengisi</h2>
          </div>
          {session.totalFillerWords > 0 ? (
            <>
              {topFillerWords.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Kata Pengisi Teratas:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {topFillerWords.map(([label, count]) => (
                      <span
                        key={label}
                        className="bg-orange-100 text-primary-orange text-sm font-medium px-3 py-1 rounded-full"
                      >
                        {label}: {count}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {Object.entries(session.fillerCounts).map(([label, count]) =>
                  count > 0 ? ( // Only display if count > 0
                    <div
                      key={label}
                      className="flex justify-between items-center bg-gray-50 p-2 rounded-md"
                    >
                      <span className="text-gray-700">{label}</span>
                      <span className="font-semibold text-primary-orange px-2 py-0.5 bg-orange-50 rounded-md">
                        {count} kali
                      </span>
                    </div>
                  ) : null
                )}
              </div>
            </>
          ) : (
            <p className="text-gray-600 text-center py-8">
              🎉 Selamat! Tidak ada kata pengisi yang terdeteksi.
            </p>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-orange-50 rounded-xl border border-orange-200 p-6 mb-8 shadow-lg">
        <div className="flex items-center text-orange-600 mb-3">
          <Lightbulb className="w-7 h-7 mr-3" />
          <h2 className="text-2xl font-semibold">Tips Peningkatan</h2>
        </div>
        <ul className="list-disc list-inside text-gray-700 space-y-2 pl-2">
          <li>
            <strong>Berlatih Jeda:</strong> Alih-alih menggunakan kata pengisi,
            cobalah untuk berhenti sejenak untuk mengumpulkan pikiran Anda. Ini
            bisa membuat Anda terdengar lebih bijaksana.
          </li>
          <li>
            <strong>Sadar dan Catat:</strong> Setelah Anda mengetahui kata
            pengisi mana yang sering Anda gunakan (seperti yang ditunjukkan di
            atas), cobalah untuk lebih sadar saat Anda mengucapkannya selama
            percakapan sehari-hari atau latihan berikutnya.
          </li>
          <li>
            <strong>Perlambat Tempo:</strong> Berbicara terlalu cepat dapat
            meningkatkan penggunaan kata pengisi. Cobalah berbicara dengan tempo
            yang lebih terkontrol.
          </li>
          <li>
            <strong>Rekam Diri Anda:</strong> Teruslah berlatih dan rekam diri
            Anda. Mendengarkan kembali dapat membantu Anda mengidentifikasi pola
            dan area untuk perbaikan.
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
        <Link href="/scenarios">
          <button className="w-full sm:w-auto bg-primary-orange text-white font-semibold py-3 px-8 rounded-lg hover:bg-secondary-orange transition-colors duration-200 flex items-center justify-center shadow-md hover:shadow-lg">
            <ListChecks className="w-5 h-5 mr-2" />
            Pilih Skenario Lain
          </button>
        </Link>
      </div>
    </div>
  );
}
