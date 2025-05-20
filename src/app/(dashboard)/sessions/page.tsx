import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

export default function Sessions() {
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

      {/* Recent Practice Sessions */}
      <div className="text-center">
        <div className="mb-4">
          <FontAwesomeIcon icon={faMicrophone} className="text-6xl" />
        </div>
        <h2 className="text-xl font-semibold text-black mb-1">
          Tidak ada sesi latihan terbaru
        </h2>
        <p className="text-gray-500 mb-8">
          Sesi latihan terbaru Anda akan muncul di sini setelah Anda
          menyelesaikannya
        </p>
        <Link href="/scenarios">
          <button className="bg-primary-orange text-white py-2 px-4 rounded-md hover:bg-secondary-orange transition">
            Pilih Skenario
          </button>
        </Link>
      </div>
    </>
  );
}
