import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

export default function ProfileHistory() {
  return (
    <>
      {/* Practice History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          Riwayat Latihan
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Semua sesi latihan Anda sebelumnya
        </p>

        {/* Session Item */}
        <div className="border-b border-gray-100 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-light-orange rounded-full flex items-center justify-center mr-4">
              <FontAwesomeIcon
                icon={faMicrophone}
                className="text-primary-orange"
              />
            </div>
            <div>
              <p className="font-medium hover:underline hover:cursor-pointer">
                Wawancara Pekerjaan
              </p>
              <p className="text-gray-500 text-sm">6/5/2025 • 15:20</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="bg-green-500 text-white text-sm font-medium px-2 py-1 rounded-full mr-4">
              82
            </span>
            <button className="text-gray-700 hover:underline">Lihat</button>
          </div>
        </div>

        {/* Session Item */}
        <div className="border-b border-gray-100 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-light-orange rounded-full flex items-center justify-center mr-4">
              <FontAwesomeIcon
                icon={faMicrophone}
                className="text-primary-orange"
              />
            </div>
            <div>
              <p className="font-medium hover:underline hover:cursor-pointer">
                Presentasi Bisnis
              </p>
              <p className="text-gray-500 text-sm">5/5/2025 • 12:45</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="bg-yellow-500 text-white text-sm font-medium px-2 py-1 rounded-full mr-4">
              78
            </span>
            <button className="text-gray-700 hover:underline">Lihat</button>
          </div>
        </div>

        {/* Session Item */}
        <div className="border-b border-gray-100 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-light-orange rounded-full flex items-center justify-center mr-4">
              <FontAwesomeIcon
                icon={faMicrophone}
                className="text-primary-orange"
              />
            </div>
            <div>
              <p className="font-medium hover:underline hover:cursor-pointer">
                Pertemuan Tim
              </p>
              <p className="text-gray-500 text-sm">4/5/2025 • 10:30</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="bg-green-500 text-white text-sm font-medium px-2 py-1 rounded-full mr-4">
              85
            </span>
            <button className="text-gray-700 hover:underline">Lihat</button>
          </div>
        </div>

        {/* Session Item */}
        <div className="border-b border-gray-100 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-light-orange rounded-full flex items-center justify-center mr-4">
              <FontAwesomeIcon
                icon={faMicrophone}
                className="text-primary-orange"
              />
            </div>
            <div>
              <p className="font-medium hover:underline hover:cursor-pointer">
                Presentasi Penjualan
              </p>
              <p className="text-gray-500 text-sm">22/4/2025 • 14:15</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="bg-yellow-500 text-white text-sm font-medium px-2 py-1 rounded-full mr-4">
              73
            </span>
            <button className="text-gray-700 hover:underline">Lihat</button>
          </div>
        </div>
      </div>
    </>
  );
}
