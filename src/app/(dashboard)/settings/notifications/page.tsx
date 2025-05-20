"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Notifications() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [practiceNotif, setPracticeNotif] = useState(true);
  const [achievementNotif, setAchievementNotif] = useState(true);

  // Load dari localStorage saat pertama kali render
  useEffect(() => {
    const email = localStorage.getItem("emailNotif");
    const practice = localStorage.getItem("practiceNotif");
    const achievement = localStorage.getItem("achievementNotif");

    if (email !== null) setEmailNotif(email === "true");
    if (practice !== null) setPracticeNotif(practice === "true");
    if (achievement !== null) setAchievementNotif(achievement === "true");
  }, []);

  // Simpan preferensi ke localStorage
  const handleSave = () => {
    localStorage.setItem("emailNotif", emailNotif.toString());
    localStorage.setItem("practiceNotif", practiceNotif.toString());
    localStorage.setItem("achievementNotif", achievementNotif.toString());
    alert("Preferensi berhasil disimpan!");
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
        <Link href="/settings/notifications" className="px-4 py-2 font-medium text-black border-b-2 border-orange-500">
          Notifikasi
        </Link>
        <Link href="/settings/privacy" className="px-4 py-2 text-gray-500 hover:text-black">
          Privasi
        </Link>
      </div>

      <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Preferensi Notifikasi</h2>
        <p className="text-gray-600 mb-6">Pilih bagaimana Anda ingin menerima notifikasi</p>

        {/* Notifikasi Email */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Notifikasi Email</p>
              <p className="text-gray-600 text-sm">Terima Notifikasi Email</p>
            </div>
            <button onClick={() => setEmailNotif(!emailNotif)} className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 ${emailNotif ? "bg-orange-500" : "bg-gray-300"}`}>
              <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ${emailNotif ? "translate-x-5" : "translate-x-1"}`} />
            </button>
          </div>
        </div>

        <hr className="border-gray-200 my-4" />

        {/* Pengingat Latihan */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Pengingat Latihan</p>
              <p className="text-gray-600 text-sm">Dapatkan pengingat untuk sesi latihan terjadwal</p>
            </div>
            <button onClick={() => setPracticeNotif(!practiceNotif)} className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 ${practiceNotif ? "bg-orange-500" : "bg-gray-300"}`}>
              <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ${practiceNotif ? "translate-x-5" : "translate-x-1"}`} />
            </button>
          </div>
        </div>

        <hr className="border-gray-200 my-4" />

        {/* Notifikasi Pencapaian */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Notifikasi Pencapaian</p>
              <p className="text-gray-600 text-sm">Dapatkan pemberitahuan saat Anda memperoleh pencapaian</p>
            </div>
            <button onClick={() => setAchievementNotif(!achievementNotif)} className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 ${achievementNotif ? "bg-orange-500" : "bg-gray-300"}`}>
              <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ${achievementNotif ? "translate-x-5" : "translate-x-1"}`} />
            </button>
          </div>
        </div>

        <hr className="border-gray-200 my-4" />

        {/* Tombol Simpan */}
        <div className="mt-8">
          <button onClick={handleSave} className="bg-primary-orange text-white px-5 py-2 rounded-md hover:bg-secondary-orange">
            Simpan Preferensi
          </button>
        </div>
      </div>
    </>
  );
}
