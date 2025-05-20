"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const isFormValid = firstName.trim() !== "" && lastName.trim() !== "" && email.trim() !== "" && password.trim().length >= 8 && confirmPassword === password && termsAccepted;

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 max-w-md w-full p-8">
        <h1 className="text-2xl font-bold text-center mb-2">Buat Akun Baru</h1>
        <p className="text-gray-400 text-center mb-6">Masukkan informasi Anda untuk membuat akun Audicia</p>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">
                Nama depan
              </label>
              <input type="text" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" />
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">
                Nama belakang
              </label>
              <input type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Kata sandi
            </label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" />
            <p className="text-xs text-gray-400 mt-1">Kata sandi harus setidaknya memiliki panjang 8 karakter dan terdiri dari angka serta karakter spesial.</p>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
              Konfirmasi kata sandi
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="flex items-start">
            <input type="checkbox" id="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-1 h-4 w-4 text-gray-900 focus:ring-gray-400 border-gray-300 rounded" />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              Saya setuju dengan{" "}
              <a href="#" className="text-gray-900 font-medium">
                Persyaratan Layanan
              </a>{" "}
              dan{" "}
              <a href="#" className="text-gray-900 font-medium">
                Kebijakan Privasi
              </a>
            </label>
          </div>

          <Link href="/auth/login">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors ${
                isFormValid ? "bg-primary-orange text-white hover:bg-secondary-orange" : "bg-gray-300 text-white cursor-not-allowed"
              }`}
            >
              Buat akun
            </button>
          </Link>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Sudah memiliki akun?{" "}
          <Link href="/auth/login" className="text-black font-medium hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
