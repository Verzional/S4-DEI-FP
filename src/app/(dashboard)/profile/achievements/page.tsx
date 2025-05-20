import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";

export default function ProfileAchievements() {
  return (
    <>
      {/* Achievements Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Pencapaian</h2>
        <p className="text-gray-600 text-sm mb-6">
          Lacak kemajuan Anda dan buka hadiah
        </p>

        {/* First Practice Achievement */}
        <div className="border-b border-gray-100 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-light-orange rounded-full flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faAward} className="text-primary-orange" />
            </div>
            <div>
              <p className="font-medium">Latihan Pertama</p>
              <p className="text-gray-500 text-sm">
                Selesaikan sesi latihan pertama Anda
              </p>
            </div>
          </div>
          <div>
            <span className="bg-primary-orange text-white text-sm font-medium px-3 py-1 rounded-full">
              Selesai
            </span>
          </div>
        </div>

        {/* Perfect Score Achievement */}
        <div className="border-b border-gray-100 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-light-orange rounded-full flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faAward} className="text-primary-orange" />
            </div>
            <div>
              <p className="font-medium">Skor Sempurna</p>
              <p className="text-gray-500 text-sm">
                Dapatkan nilai 90+ dalam sesi latihan
              </p>
            </div>
          </div>
          <div>
            <span className="bg-primary-orange text-white text-sm font-medium px-3 py-1 rounded-full">
              Selesai
            </span>
          </div>
        </div>

        {/* Practice Streak Achievement */}
        <div className="py-2 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
              <FontAwesomeIcon icon={faAward} className="text-gray-500" />
            </div>
            <div>
              <p className="font-medium">Streak Latihan</p>
              <p className="text-gray-500 text-sm">
                Berlatih selama 5 hari berturut-turut
              </p>
            </div>
          </div>
          <div>
            <span className="text-gray-500 border border-gray-500 text-sm font-medium px-3 py-1 rounded-full">
              Dalam Proses
            </span>
          </div>
        </div>
        <div className="ml-11">
          <div className="flex justify-between text-sm mb-1">
            <span>Kemajuan: 3/5</span>
            <span>60%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-secondary-orange rounded-full h-2"
              style={{ width: "60%" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
