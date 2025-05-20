import { InfinityIcon } from "lucide-react";
import Link from "next/link";

export default function Premium() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 md:py-8">
      {/* Header Text */}
      <div className="text-center mb-6 sm:mb-8 md:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
          Latihan lebih cepat, percaya diri lebih kuat.
        </h1>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Upgrade ke Premium!
        </h1>
      </div>

      {/* Comparison Table */}
      <div className="bg-orange-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-md">
        {/* Desktop and Tablet Layout */}
        <div className="hidden sm:grid grid-cols-3 gap-2 md:gap-4">
          {/* Empty top-left cell */}
          <div className="col-span-1"></div>

          {/* Free Column Header */}
          <div className="col-span-1 text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-500">
              GRATIS
            </h3>
          </div>

          {/* Premium Column Header */}
          <div className="col-span-1">
            <div className="text-center">
              <div className="flex justify-center">
                <div className="bg-orange-500 text-white px-2 sm:px-3 md:px-4 py-1 rounded-lg font-bold text-base sm:text-lg md:text-xl">
                  ✨ Premium ✨
                </div>
              </div>
              <p className="text-orange-700 mt-1 md:mt-2 font-medium text-sm md:text-base">
                Rp 200.000/bulan
              </p>
            </div>
          </div>

          {/* Row 1 */}
          <div className="col-span-1 border-t border-orange-200 py-3 md:py-4 text-orange-700 font-medium text-sm sm:text-base md:text-lg">
            Sesi latihan dalam sehari
          </div>
          <div className="col-span-1 border-t border-orange-200 py-3 md:py-4 text-center text-base sm:text-lg md:text-xl font-bold">
            5
          </div>
          <div className="col-span-1 border-t border-orange-200 py-3 md:py-4 text-center">
            <InfinityIcon className="mx-auto text-orange-500" size={20} />
          </div>

          {/* Row 2 */}
          <div className="col-span-1 border-t border-orange-200 py-3 md:py-4 text-orange-700 font-medium text-sm sm:text-base md:text-lg">
            Skenario AI + Skenario Khusus
          </div>
          <div className="col-span-1 border-t border-orange-200 py-3 md:py-4 text-center text-base sm:text-lg md:text-xl font-bold">
            5
          </div>
          <div className="col-span-1 border-t border-orange-200 py-3 md:py-4 text-center">
            <div className="flex justify-center">
              <svg
                className="h-5 w-5 md:h-6 md:w-6 text-primary-orange"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Row 3 */}
          <div className="col-span-1 border-t border-orange-200 py-3 md:py-4 text-orange-700 font-medium text-sm sm:text-base md:text-lg">
            Umpan balik AI tingkat lanjut
          </div>
          <div className="col-span-1 border-t border-orange-200 py-3 md:py-4 text-center text-base sm:text-lg md:text-xl font-bold">
            -
          </div>
          <div className="col-span-1 border-t border-orange-200 py-3 md:py-4 text-center">
            <div className="flex justify-center">
              <svg
                className="h-5 w-5 md:h-6 md:w-6 text-primary-orange"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Row 4 */}
          <div className="col-span-1 border-t border-orange-200 py-3 md:py-4 text-orange-700 font-medium text-sm sm:text-base md:text-lg">
            Analisis lebih dalam
          </div>
          <div className="col-span-1 border-t border-orange-200 py-3 md:py-4 text-center text-base sm:text-lg md:text-xl font-bold">
            -
          </div>
          <div className="col-span-1 border-t border-orange-200 py-3 md:py-4 text-center">
            <div className="flex justify-center">
              <svg
                className="h-5 w-5 md:h-6 md:w-6 text-primary-orange"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Row 5 */}
          <div className="col-span-1 border-t border-orange-200 py-3 md:py-4 text-orange-700 font-medium text-sm sm:text-base md:text-lg">
            ???
          </div>
          <div className="col-span-1 border-t border-orange-200 py-3 md:py-4 text-center text-base sm:text-lg md:text-xl font-bold">
            -
          </div>
          <div className="col-span-1 border-t border-orange-200 py-3 md:py-4 text-center">
            <div className="flex justify-center">
              <svg
                className="h-5 w-5 md:h-6 md:w-6 text-primary-orange"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="sm:hidden">
          {/* Headers */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="col-span-1"></div>
            <div className="col-span-1 text-center">
              <h3 className="text-md font-bold text-orange-500">GRATIS</h3>
            </div>
            <div className="col-span-1 text-center">
              <div className="flex justify-center">
                <div className="bg-orange-500 text-white py-1 px-1 rounded-lg font-bold text-xs">
                  ✨ Premium ✨
                </div>
              </div>
              <p className="text-orange-700 mt-1 font-medium text-xs">
                Rp 200.000/bulan
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            {/* Feature 1 */}
            <div className="border-t border-orange-200 pt-3">
              <div className="font-medium text-orange-700 mb-2">
                Sesi latihan dalam sehari
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center font-bold">5</div>
                <div className="text-center">
                  <InfinityIcon className="mx-auto text-orange-500" size={18} />
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="border-t border-orange-200 pt-3">
              <div className="font-medium text-orange-700 mb-2">
                Skenario AI + Skenario Khusus
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center font-bold">5</div>
                <div className="text-center">
                  <svg
                    className="h-5 w-5 mx-auto text-primary-orange"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="border-t border-orange-200 pt-3">
              <div className="font-medium text-orange-700 mb-2">
                Umpan balik AI tingkat lanjut
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center font-bold">-</div>
                <div className="text-center">
                  <svg
                    className="h-5 w-5 mx-auto text-primary-orange"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="border-t border-orange-200 pt-3">
              <div className="font-medium text-orange-700 mb-2">
                Analisis lebih dalam
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center font-bold">-</div>
                <div className="text-center">
                  <svg
                    className="h-5 w-5 mx-auto text-primary-orange"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="border-t border-orange-200 pt-3">
              <div className="font-medium text-orange-700 mb-2">???</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center font-bold">-</div>
                <div className="text-center">
                  <svg
                    className="h-5 w-5 mx-auto text-primary-orange"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-6 sm:mt-7 md:mt-8 flex justify-center">
        <Link href="/payment">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 sm:py-3.5 md:py-4 px-6 sm:px-7 md:px-8 rounded-xl text-lg sm:text-xl transition-colors duration-200 w-full sm:w-auto">
            Dapatkan Premium Sekarang!
          </button>
        </Link>
      </div>
    </div>
  );
}
