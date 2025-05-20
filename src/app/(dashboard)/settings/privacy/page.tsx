"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function PrivacySettings() {
  const [dataCollect, setDataCollect] = useState(true);

  // Load dari localStorage saat pertama kali render
  useEffect(() => {
    const dataCollect = localStorage.getItem("dataCollect");

    if (dataCollect !== null) setDataCollect(dataCollect === "true");
  }, []);

  // Simpan preferensi ke localStorage
  const handleSave = () => {
    localStorage.setItem("dataCollect", dataCollect.toString());
    alert("Pengaturan privasi berhasil disimpan!");
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-black mb-2">Pengaturan Akun</h1>
      <p className="text-gray-600 mb-8">Kelola preferensi dan pengaturan akun Anda</p>

      <div className="flex border-b border-gray-200 mb-8">
        <Link href="/settings" className="px-4 py-2 text-gray-500 hover:text-black">
          Profil
        </Link>
        <Link href="/settings/security" className="px-4 py-2 text-gray-500 hover:text-black">
          Keamanan
        </Link>
        <Link href="/settings/notifications" className="px-4 py-2 text-gray-500 hover:text-black">
          Notifikasi
        </Link>
        <Link href="/settings/privacy" className="px-4 py-2 font-medium text-black border-b-2 border-primary-orange">
          Privasi
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Pengaturan Privasi</h2>
          <p className="text-gray-600 mb-6">Kontrol preferensi privasi Anda</p>

          <div className="mb-6">
            <p className="text-gray-900 font-medium mb-2">Siapa yang dapat melihat profil Anda</p>
            <div className="relative">
              <select id="visibility" value="Privasi" className="w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none bg-white">
                <option disabled value="">
                  Publik (Semua Orang)
                </option>
                <option disabled value="">
                  Hanya Teman
                </option>
                <option value="">Privasi</option>
              </select>

              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 my-4"></hr>

          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Izinkan pengumpulan data</p>
                <p className="text-gray-600 text-sm">Izinkan kami mengumpulkan data penggunaan untuk meningkatkan pengalaman Anda</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <button onClick={() => setDataCollect(!dataCollect)} className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 ${dataCollect ? "bg-orange-500" : "bg-gray-300"}`}>
                  <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ${dataCollect ? "translate-x-5" : "translate-x-1"}`} />
                </button>
              </label>
            </div>
          </div>

          <hr className="border-gray-200 my-4"></hr>

          <div className="mt-8">
            <button onClick={handleSave} className="bg-primary-orange text-white px-5 py-2 rounded-md hover:bg-secondary-orange">
              Simpan Pengaturan Privasi
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-6">
          <h2 className="text-xl font-bold text-red-500 mb-1">Zona Bahaya</h2>
          <p className="text-gray-600 mb-6">Tindakan akun yang tidak dapat diubah</p>

          <div className="mb-6">
            <p className="text-gray-900 font-medium text-lg mb-2">Unduh Data Anda</p>
            <p className="text-gray-600 text-sm mb-4">Dapatkan salinan semua data Anda yang tersimpan di sistem kami</p>
            <button className="bg-primary-orange text-white px-4 py-2 rounded-md hover:bg-secondary-orange">Permintaan Ekspor Data</button>
          </div>

          <hr className="border-gray-200 my-4"></hr>

          <div>
            <p className="text-red-500 font-medium text-lg mb-2">Hapus Akun</p>
            <p className="text-gray-600 text-sm mb-4">Menghapus akun Anda dan semua data terkait secara permanen</p>
            <button
              onClick={() => {
                const confirmed = window.confirm("Apakah Anda yakin ingin menghapus akun Anda secara permanen?");
                if (confirmed) {
                  // Redirect ke halaman login (sign-in)
                  window.location.href = "/auth/sign-in";
                }
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Hapus Akun
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
