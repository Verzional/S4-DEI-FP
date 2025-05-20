"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Settings() {
  const [fullName, setFullName] = useState("Angela Melia");
  const [phone, setPhone] = useState("+62 812 3030 0020");

  // Ambil dari localStorage saat pertama kali load
  useEffect(() => {
    const storedName = localStorage.getItem("fullName");
    const storedPhone = localStorage.getItem("phone");

    if (storedName !== null) setFullName(storedName);
    if (storedPhone !== null) setPhone(storedPhone);
  }, []);

  // Simpan ke localStorage saat user klik "Simpan Perubahan"
  const handleSave = () => {
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("phone", phone);
    alert("Perubahan berhasil disimpan!");
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-black mb-2">Pengaturan Akun</h1>
      <p className="text-gray-600 mb-8">Kelola preferensi dan pengaturan akun Anda</p>

      <div className="flex border-b border-gray-200 mb-8">
        <Link href="/settings" className="px-4 py-2 font-medium text-black border-b-2 border-primary-orange">
          Profil
        </Link>
        <Link href="/settings/security" className="px-4 py-2 text-gray-500 hover:text-black">
          Keamanan
        </Link>
        <Link href="/settings/notifications" className="px-4 py-2 text-gray-500 hover:text-black">
          Notifikasi
        </Link>
        <Link href="/settings/privacy" className="px-4 py-2 text-gray-500 hover:text-black">
          Privasi
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Informasi Personal</h2>
          <p className="text-gray-600 mb-6">Perbarui detail personal Anda</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-900 mb-2">
                Nama Lengkap
              </label>
              <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Alamat Email
              </label>
              <input disabled type="email" id="email" value="angela.melia@example.com" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                Nomor Telepon
              </label>
              <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>

            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-900 mb-2">
                Preferensi Bahasa
              </label>
              <div className="relative">
                <select id="language" className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none pr-10">
                  <option value="">Bahasa Indonesia</option>
                  <option disabled value="">
                    Bahasa Inggris
                  </option>
                </select>

                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button onClick={handleSave} className="bg-primary-orange text-white px-5 py-2 rounded-md hover:bg-secondary-orange">
              Simpan Perubahan
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Foto Profil</h2>
          <p className="text-gray-600 mb-6">Perbarui foto profil Anda</p>

          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-light-orange rounded-full flex items-center justify-center mb-6">
              <div className="w-24 h-24 bg-light-orange rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="text-primary-orange text-8xl" />
              </div>
            </div>

            <button className="flex items-center gap-2 bg-primary-orange text-white px-4 py-2 rounded-md mb-3 w-full justify-center hover:bg-secondary-orange">Unggah Foto Baru</button>

            <button className="flex items-center gap-2 text-red-500 px-4 py-2 border border-gray-200 rounded-md mb-3 w-full justify-center hover:bg-gray-100">Hapus Foto</button>
          </div>
        </div>
      </div>
    </>
  );
}
