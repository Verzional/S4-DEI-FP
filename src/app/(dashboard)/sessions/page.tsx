"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faCalendarAlt, faClock, faListOl, faChartLine, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

interface StoredSessionData {
  id: string;
  timestamp: string;
  duration: number; // in seconds
  fillerCounts: Record<string, number>;
  totalFillerWords: number;
  fillerWordPercentage: string;
}

const ALL_SESSIONS_KEY = "allAudiciaSessions";

export default function Sessions() {
  const [sessionsData, setSessionsData] = useState<StoredSessionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedSessionsString = localStorage.getItem(ALL_SESSIONS_KEY);
      if (storedSessionsString) {
        const parsedSessions: StoredSessionData[] = JSON.parse(storedSessionsString);
        // Sort sessions by timestamp in descending order (newest first)
        parsedSessions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setSessionsData(parsedSessions);
      }
    } catch (error) {
      console.error("Failed to load sessions from localStorage:", error);
      // Optionally, clear corrupted data or notify user
      // localStorage.removeItem(ALL_SESSIONS_KEY); 
    }
    setIsLoading(false);
  }, []);

  const formatDuration = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} m ${seconds} d`;
  };

  const calculateFPM = (totalFillerWords: number, duration: number): string => {
    if (duration === 0) return "0.0";
    const minutes = duration / 60;
    return minutes > 0 ? (totalFillerWords / minutes).toFixed(1) : "0.0";
  };

  const handleViewDetails = (session: StoredSessionData) => {
    // For now, we'll just store this specific session as 'lastSession'
    // and navigate to the generic result page.
    // In a more advanced setup, /result could take an ID.
    localStorage.setItem("lastSession", JSON.stringify(session));
    router.push("/result");
  };


  return (
    <>
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-black mb-2">
        Latihan Public Speaking
      </h1>
      <p className="text-gray-600 mb-8">
        Pilih skenario untuk berlatih dengan pendamping AI kami dan dapatkan
        umpan balik
      </p>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        <Link
          href="/scenarios"
          className="px-4 py-2 text-gray-500 hover:text-black"
        >
          Skenario
        </Link>

        <Link
          href="/sessions"
          className="px-4 py-2 font-medium text-black border-b-2 border-primary-orange"
        >
          Sesi Terbaru
        </Link>
      </div>

      {isLoading && <p className="text-center text-gray-500">Memuat sesi...</p>}

      {!isLoading && sessionsData.length === 0 && (
        <div className="text-center py-10">
          <div className="mb-4">
            <FontAwesomeIcon icon={faMicrophone} className="text-6xl text-gray-300" />
          </div>
          <h2 className="text-xl font-semibold text-black mb-1">
            Tidak ada sesi latihan terbaru
          </h2>
          <p className="text-gray-500 mb-8">
            Sesi latihan terbaru Anda akan muncul di sini setelah Anda
            menyelesaikannya.
          </p>
          <Link href="/scenarios">
            <button className="bg-primary-orange text-white py-2 px-4 rounded-md hover:bg-secondary-orange transition">
              Pilih Skenario
            </button>
          </Link>
        </div>
      )}

      {!isLoading && sessionsData.length > 0 && (
        <div className="space-y-6">
          {sessionsData.map((session) => (
            <div key={session.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div className="flex items-center mb-2 sm:mb-0">
                  <div className="w-10 h-10 bg-light-orange rounded-full flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faMicrophone} className="text-primary-orange text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-800">
                      Sesi Latihan
                    </p>
                    <p className="text-gray-500 text-sm">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" /> 
                      {new Date(session.timestamp).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                      <FontAwesomeIcon icon={faClock} className="ml-3 mr-1" />
                      {new Date(session.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                 <button 
                    onClick={() => handleViewDetails(session)}
                    className="text-sm bg-primary-orange text-white py-2 px-4 rounded-md hover:bg-secondary-orange transition mt-2 sm:mt-0 self-start sm:self-center"
                  >
                    Lihat Detail
                  </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-gray-500 mb-1 flex items-center"><FontAwesomeIcon icon={faClock} className="mr-2 text-primary-orange" /> Durasi</p>
                  <p className="font-semibold text-gray-700 text-base">{formatDuration(session.duration)}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-gray-500 mb-1 flex items-center"><FontAwesomeIcon icon={faListOl} className="mr-2 text-primary-orange" /> Total Kata Pengisi</p>
                  <p className="font-semibold text-gray-700 text-base">{session.totalFillerWords}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-gray-500 mb-1 flex items-center"><FontAwesomeIcon icon={faChartLine} className="mr-2 text-primary-orange" /> Pengisi/Menit (FPM)</p>
                  <p className="font-semibold text-gray-700 text-base">{calculateFPM(session.totalFillerWords, session.duration)}</p>
                </div>
              </div>
               {Object.keys(session.fillerCounts).length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                    <p className="text-gray-600 text-sm mb-2 font-medium flex items-center">
                        <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-primary-orange" />
                        Kata Pengisi Terdeteksi:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(session.fillerCounts).filter(([, count]) => count > 0).map(([key, value]) => (
                            <span key={key} className="text-xs bg-orange-100 text-primary-orange px-2 py-1 rounded-full">
                                {key}: {value}
                            </span>
                        ))}
                         {Object.values(session.fillerCounts).every(count => count === 0) && (
                            <span className="text-xs text-green-600">Tidak ada kata pengisi yang dominan.</span>
                        )}
                    </div>
                </div>
            )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}