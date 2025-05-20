"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Masuk ke Audicia</h1>
          <p className="text-gray-400">Masukkan email dan kata sandi Anda untuk mengakses akun Anda</p>
        </div>

        <form className="space-y-4 mb-4">
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
              Kata Sandi
            </label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="remember" className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded" />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
              Ingat saya
            </label>
          </div>

          <Link href="/start">
            <button type="submit" disabled={!isFormValid} className={`w-full py-2 px-4 rounded-md transition-colors ${isFormValid ? "bg-primary-orange text-white hover:bg-secondary-orange" : "bg-gray-300 text-white cursor-not-allowed"}`}>
              Masuk
            </button>
          </Link>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Tidak memiliki akun?{" "}
            <Link href="/auth/register" className="text-black font-medium hover:underline">
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
