"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBriefcase,
  faDesktop,
  faTrophy,
  faUsers,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

export default function Scenarios() {
  const [isPremium, setIsPremium] = useState(false);

  // Check premium status on component mount
  useEffect(() => {
    const premiumStatus = localStorage.getItem("isPremium") === "true";
    setIsPremium(premiumStatus);
  }, []);

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
          className="px-4 py-2 font-medium text-black border-b-2 border-primary-orange"
        >
          Skenario
        </Link>

        <Link
          href="/sessions"
          className="px-4 py-2 text-gray-500 hover:text-black"
        >
          Sesi Terbaru
        </Link>
      </div>

      {/* Premium Banner (shown if not premium) */}
      {!isPremium && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h3 className="font-bold text-lg text-orange-700">
              Dapatkan Akses ke Semua Skenario
            </h3>
            <p className="text-orange-600">
              Upgrade ke Premium untuk membuka semua skenario latihan
            </p>
          </div>
          <Link href="/premium" className="mt-3 sm:mt-0">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors duration-200">
              Dapatkan Premium
            </button>
          </Link>
        </div>
      )}

      {/* Scenario Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Interview Card - Always Available */}
        <div className="bg-gray-100 rounded-xl p-8">
          <div className="mb-6">
            <div className="w-16 h-16 flex items-center justify-center">
              <FontAwesomeIcon icon={faBriefcase} className="text-2xl" />
            </div>
          </div>

          <h2 className="text-2xl text-black font-bold mb-1">
            Wawancara Pekerjaan
          </h2>
          <p className="text-gray-600 mb-6">
            Berlatih menjawab pertanyaan wawancara umum dengan pewawancara AI
          </p>

          <div className="flex justify-between mb-6">
            <div className="text-sm text-gray-600">
              <span>Tingkat Kesulitan: Pemula hingga Mahir</span>
            </div>
            <div className="text-sm text-gray-600">
              <span>Durasi: 10-20 menit</span>
            </div>
          </div>

          <Link href="/practice">
            <button className="w-full bg-primary-orange hover:bg-secondary-orange text-white py-3 px-4 rounded-lg flex items-center justify-center">
              <span className="mr-2">Mulai Latihan</span>
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Business Presentation Card - Always Available */}
        <div className="bg-gray-100 rounded-xl p-8">
          <div className="mb-6">
            <div className="w-16 h-16 flex items-center justify-center">
              <FontAwesomeIcon icon={faDesktop} className="text-2xl" />
            </div>
          </div>

          <h2 className="text-2xl text-black font-bold mb-1">
            Presentasi Bisnis
          </h2>
          <p className="text-gray-600 mb-6">
            Berlatih menyampaikan presentasi yang menarik kepada pemangku
            kepentingan
          </p>

          <div className="flex justify-between mb-6">
            <div className="text-sm text-gray-600">
              <span>Tingkat Kesulitan: Menengah</span>
            </div>
            <div className="text-sm text-gray-600">
              <span>Durasi: 15-25 menit</span>
            </div>
          </div>

          <Link href="/practice">
            <button className="w-full bg-primary-orange hover:bg-secondary-orange text-white py-3 px-4 rounded-lg flex items-center justify-center">
              <span className="mr-2">Mulai Latihan</span>
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Team Meeting Card - Premium Only */}
        <div
          className={`bg-gray-100 rounded-xl p-8 relative ${
            !isPremium ? "opacity-70" : ""
          }`}
        >
          {!isPremium && (
            <div className="absolute inset-0 bg-gray-100 bg-opacity-50 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-10">
              <FontAwesomeIcon
                icon={faLock}
                className="text-4xl text-orange-500 mb-2"
              />
              <p className="text-orange-600 font-medium text-center px-6">
                Upgrade ke Premium untuk Membuka
              </p>
              <Link href="/payment" className="mt-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded-lg text-sm transition-colors duration-200">
                  Dapatkan Premium
                </button>
              </Link>
            </div>
          )}
          <div className="mb-6">
            <div className="w-16 h-16 flex items-center justify-center">
              <FontAwesomeIcon icon={faUsers} className="text-2xl" />
            </div>
          </div>

          <h2 className="text-2xl text-black font-bold mb-1">Pertemuan tim</h2>
          <p className="text-gray-600 mb-6">
            Pimpin rapat tim dan berlatih menangani pertanyaan dan keberatan
          </p>

          <div className="flex justify-between mb-6">
            <div className="text-sm text-gray-600">
              <span>Tingkat Kesulitan: Menengah</span>
            </div>
            <div className="text-sm text-gray-600">
              <span>Durasi: 15-25 menit</span>
            </div>
          </div>

          {isPremium ? (
            <Link href="/practice">
              <button className="w-full bg-primary-orange hover:bg-secondary-orange text-white py-3 px-4 rounded-lg flex items-center justify-center">
                <span className="mr-2">Mulai Latihan</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </button>
            </Link>
          ) : (
            <button
              disabled
              className="w-full bg-gray-400 text-white py-3 px-4 rounded-lg flex items-center justify-center cursor-not-allowed"
            >
              <span className="mr-2">Mulai Latihan</span>
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sales Pitch Card - Premium Only */}
        <div
          className={`bg-gray-100 rounded-xl p-8 relative ${
            !isPremium ? "opacity-70" : ""
          }`}
        >
          {!isPremium && (
            <div className="absolute inset-0 bg-gray-100 bg-opacity-50 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-10">
              <FontAwesomeIcon
                icon={faLock}
                className="text-4xl text-orange-500 mb-2"
              />
              <p className="text-orange-600 font-medium text-center px-6">
                Upgrade ke Premium untuk Membuka
              </p>
              <Link href="/payment" className="mt-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded-lg text-sm transition-colors duration-200">
                  Dapatkan Premium
                </button>
              </Link>
            </div>
          )}
          <div className="mb-6">
            <div className="w-16 h-16 flex items-center justify-center">
              <FontAwesomeIcon icon={faTrophy} className="text-2xl" />
            </div>
          </div>

          <h2 className="text-2xl text-black font-bold mb-1">
            Presentasi Penjualan
          </h2>
          <p className="text-gray-600 mb-6">
            Menyampaikan presentasi penjualan yang meyakinkan dan menangani
            keberatan
          </p>

          <div className="flex justify-between mb-6">
            <div className="text-sm text-gray-600">
              <span>Tingkat Kesulitan: Mahir</span>
            </div>
            <div className="text-sm text-gray-600">
              <span>Durasi: 10-15 menit</span>
            </div>
          </div>

          {isPremium ? (
            <Link href="/practice">
              <button className="w-full bg-primary-orange hover:bg-secondary-orange text-white py-3 px-4 rounded-lg flex items-center justify-center">
                <span className="mr-2">Mulai Latihan</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </button>
            </Link>
          ) : (
            <button
              disabled
              className="w-full bg-gray-400 text-white py-3 px-4 rounded-lg flex items-center justify-center cursor-not-allowed"
            >
              <span className="mr-2">Mulai Latihan</span>
              <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
