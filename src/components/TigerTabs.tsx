import Link from "next/link";

const TigerTabs = () => {
  return (
    <>
      <h2 className="text-xl font-bold text-gray-900 mb-1">Sesuaikan Harimau Anda</h2>
      <p className="text-gray-600 text-sm mb-6">Buka item baru dengan naik level</p>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 py-0">
        <Link href="/customize/outfits">
          <button className="px-4 py-2 pt-0 text-gray-500">Pakaian</button>
        </Link>

        <Link href="/customize/accessories">
          <button className="px-4 py-2 pt-0 border-b-2 border-primary-orange font-medium text-gray-900">Aksesoris</button>
        </Link>
      </div>
    </>
  );
};

export default TigerTabs;
