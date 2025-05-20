"use client";

import Link from "next/link";
import { useState } from "react";

export default function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const hasNumber = /\d/.test(newPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);
  const isLengthValid = newPassword.length >= 8;

  const isTooWeak = newPassword && (!isLengthValid || !hasNumber || !hasSpecial);
  const isSameAsCurrent = newPassword && currentPassword && newPassword === currentPassword;
  const isMismatch = confirmNewPassword && newPassword !== confirmNewPassword;

  const isValid = !isTooWeak && !isSameAsCurrent && !isMismatch;

  const handleSubmit = () => {
    if (isValid) {
      alert("Kata sandi berhasil diperbarui!");
      // Tambahkan proses update password ke backend di sini
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-black mb-2">Pengaturan Akun</h1>
      <p className="text-gray-600 mb-8">Kelola preferensi dan pengaturan akun Anda</p>

      <div className="flex border-b border-gray-200 mb-8">
        <Link href="/settings" className="px-4 py-2 text-gray-500 hover:text-black">
          Profil
        </Link>
        <Link href="/settings/security" className="px-4 py-2 font-medium text-black border-b-2 border-primary-orange">
          Keamanan
        </Link>
        <Link href="/settings/notifications" className="px-4 py-2 text-gray-500 hover:text-black">
          Notifikasi
        </Link>
        <Link href="/settings/privacy" className="px-4 py-2 text-gray-500 hover:text-black">
          Privasi
        </Link>
      </div>

      <div className="lg:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Ganti Kata Sandi</h2>
        <p className="text-gray-600 mb-6">Perbarui kata sandi untuk menjaga keamanan akun Anda</p>

        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-900 mb-2">
            Kata Sandi Saat Ini
          </label>
          <input type="password" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md mb-6" />
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-900 mb-2">
            Kata Sandi Baru
          </label>
          <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          <p className="text-xs text-gray-400 mt-1">Kata sandi harus memiliki minimal 8 karakter, angka, dan karakter spesial.</p>
          {isTooWeak && <p className="text-sm text-red-500 mt-1">Kata sandi baru kurang dari 8 karakter, tidak memiliki angka, atau karakter spesial.</p>}
          {isSameAsCurrent && <p className="text-sm text-red-500 mt-1">Kata sandi baru sama dengan kata sandi lama.</p>}
        </div>

        <div className="mt-6">
          <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-900 mb-2">
            Konfirmasi Kata Sandi Baru
          </label>
          <input type="password" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          {isMismatch && <p className="text-sm text-red-500 mt-1">Konfirmasi kata sandi tidak cocok dengan kata sandi baru.</p>}
        </div>

        <div className="mt-8">
          <button onClick={handleSubmit} disabled={!isValid} className={`px-5 py-2 rounded-md text-white ${isValid ? "bg-primary-orange hover:bg-secondary-orange" : "bg-gray-300 cursor-not-allowed"}`}>
            Perbarui Kata Sandi
          </button>
        </div>
      </div>
    </>
  );
}
