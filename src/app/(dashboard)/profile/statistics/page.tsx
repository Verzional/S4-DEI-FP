import {
  faChartLine,
  faClock,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProfileStatistics() {
  return (
    <>
      {/* Statistics Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Statistik Latihan
        </h2>
        <p className="text-gray-600 text-sm mb-8">
          Analisis terperinci tentang latihan berbicara Anda
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Practice Frequency */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faHistory} className="text-gray-500" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Frekuensi Latihan</p>
              <p className="text-2xl font-bold">2.5 sesi/minggu</p>
              <p className="text-gray-500 text-sm">
                Rata-rata selama 30 hari terakhir
              </p>
            </div>
          </div>

          {/* Average Duration */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faClock} className="text-gray-500" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Durasi Rata-Rata</p>
              <p className="text-2xl font-bold">14:30 menit</p>
              <p className="text-gray-500 text-sm">Per sesi latihan</p>
            </div>
          </div>

          {/* Score Trend */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faChartLine} className="text-gray-500" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Tren Skor</p>
              <p className="text-2xl text-primary-orange font-bold">
                +12% peningkatan
              </p>
              <p className="text-gray-500 text-sm">Selama 10 sesi terakhir</p>
            </div>
          </div>
        </div>

        {/* Most Practiced Scenarios */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4">
            Skenario yang Paling Sering Dilatih
          </h3>

          {/* Job Interview */}
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span>Wawancara Pekerjaan</span>
              <span>42%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-secondary-orange rounded-full h-2"
                style={{ width: "42%" }}
              ></div>
            </div>
          </div>

          {/* Business Presentation */}
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span>Presentasi Bisnis</span>
              <span>28%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-secondary-orange rounded-full h-2"
                style={{ width: "28%" }}
              ></div>
            </div>
          </div>

          {/* Team Meeting */}
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span>Pertemuan Tim</span>
              <span>18%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-secondary-orange rounded-full h-2"
                style={{ width: "18%" }}
              ></div>
            </div>
          </div>

          {/* Sales Pitch */}
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span>Presentasi Penjualan</span>
              <span>12%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-secondary-orange rounded-full h-2"
                style={{ width: "12%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Common Improvement Areas */}
        <div>
          <h3 className="text-lg font-bold mb-4">Area Peningkatan Umum</h3>

          {/* Filler Words */}
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span>
                Kata Isian (<i>Filler Words</i>)
              </span>
              <span>Tinggi</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-secondary-orange rounded-full h-2"
                style={{ width: "90%" }}
              ></div>
            </div>
          </div>

          {/* Pacing */}
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span>Laju Bicara</span>
              <span>Sedang</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-secondary-orange rounded-full h-2"
                style={{ width: "65%" }}
              ></div>
            </div>
          </div>

          {/* Concrete Examples */}
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span>Intonasi</span>
              <span>Sedang</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-secondary-orange rounded-full h-2"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>

          {/* Voice Clarity */}
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span>Artikulasi</span>
              <span>Rendah</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-secondary-orange rounded-full h-2"
                style={{ width: "35%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
