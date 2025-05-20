import Tiger from "@/components/Tiger";
import Link from "next/link";

export default function CustomizeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Sesuaikan Harimau Anda</h2>
          <p className="text-gray-600">Pilih pakaian dan aksesoris baru saat Anda naik level dan menyelesaikan tantangan</p>
        </div>
        <div className="flex flex-col lg:flex-row items-stretch gap-6">
          <Tiger />
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              {children}
              <div className="flex justify-end">
                <Link href="/scenarios">
                  <button className="bg-primary-orange text-white rounded-lg px-4 py-2 hover:bg-secondary-orange">Simpan</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
