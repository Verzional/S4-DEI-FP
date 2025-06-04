"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faArrowLeft,
  faShieldAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Payment() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Payment form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  // Form validation
  const [formErrors, setFormErrors] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const validateForm = () => {
    const errors = {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    };

    if (!cardNumber || cardNumber.replace(/\s/g, "").length !== 16) {
      errors.cardNumber = "Nomor kartu harus 16 digit";
    }

    if (!cardName) {
      errors.cardName = "Nama pemilik kartu wajib diisi";
    }

    if (!expiryDate || !expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      errors.expiryDate = "Format tanggal harus MM/YY";
    }

    if (!cvv || cvv.length !== 3) {
      errors.cvv = "CVV harus 3 digit";
    }

    setFormErrors(errors);
    return !Object.values(errors).some((error) => error !== "");
  };

  const handleCardNumberChange = (e: { target: { value: string } }) => {
    // Format card number with spaces every 4 digits
    const value = e.target.value.replace(/\s/g, "");
    if (/^\d*$/.test(value)) {
      // Only allow digits
      const formattedValue =
        value
          .replace(/\s/g, "")
          .match(/.{1,4}/g)
          ?.join(" ") || "";
      setCardNumber(formattedValue);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Set premium status in localStorage
      localStorage.setItem("isPremium", "true");
      setPaymentSuccess(true);
      setIsProcessing(false);

      // Redirect after successful payment (after showing success message)
      setTimeout(() => {
        router.push("/scenarios");
      }, 2000); // Redirect after 2 seconds to show success message
    }, 3000); // Simulate 3 seconds processing time
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href="/premium"
        className="inline-flex items-center text-gray-600 hover:text-black mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        <span>Kembali ke Halaman Premium</span>
      </Link>

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-black mb-2">Checkout Premium</h1>
      <p className="text-gray-600 mb-8">
        Lengkapi pembayaran untuk mengakses fitur premium
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Payment Form */}
        <div className="w-full md:w-2/3">
          {paymentSuccess ? (
            <div className="bg-green-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-green-600 text-2xl"
                />
              </div>
              <h2 className="text-2xl font-bold text-green-700 mb-2">
                Pembayaran Berhasil!
              </h2>
              <p className="text-green-600 mb-4">
                Terima kasih telah berlangganan Premium Audicia. Anda sekarang
                memiliki akses ke semua fitur premium.
              </p>
              <p className="text-gray-500">
                Anda akan dialihkan ke halaman skenario dalam beberapa detik...
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold mb-4">Detail Pembayaran</h2>

              {/* Card Number */}
              <div className="mb-4">
                <label
                  htmlFor="cardNumber"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Nomor Kartu
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formErrors.cardNumber ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-orange-300`}
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                />
                {formErrors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.cardNumber}
                  </p>
                )}
              </div>

              {/* Card Holder Name */}
              <div className="mb-4">
                <label
                  htmlFor="cardName"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Nama Pemilik Kartu
                </label>
                <input
                  type="text"
                  id="cardName"
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formErrors.cardName ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-orange-300`}
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
                {formErrors.cardName && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.cardName}
                  </p>
                )}
              </div>

              {/* Expiry Date and CVV */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="expiryDate"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    Tanggal Kadaluarsa
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    placeholder="MM/YY"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      formErrors.expiryDate
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-orange-300`}
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    maxLength={5}
                  />
                  {formErrors.expiryDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.expiryDate}
                    </p>
                  )}
                </div>
                <div className="w-full sm:w-1/2">
                  <label
                    htmlFor="cvv"
                    className="block text-gray-700 font-medium mb-1"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="123"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      formErrors.cvv ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-orange-300`}
                    value={cvv}
                    onChange={(e) => {
                      if (/^\d{0,3}$/.test(e.target.value)) {
                        setCvv(e.target.value);
                      }
                    }}
                    maxLength={3}
                  />
                  {formErrors.cvv && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.cvv}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full bg-orange-500 ${
                  !isProcessing && "hover:bg-orange-600"
                } text-white font-bold py-3 px-4 rounded-lg transition-colors ${
                  isProcessing ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isProcessing ? "Memproses..." : "Bayar Rp 200.000"}
              </button>

              {/* Security Info */}
              <div className="mt-4 flex items-center justify-center text-gray-500 text-sm">
                <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
                <span>Pembayaran aman & terenkripsi</span>
              </div>
            </form>
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-1/3">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-bold mb-4">Ringkasan Pembelian</h2>

            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Premium 1 Bulan</span>
              <span className="font-medium">Rp 200.000</span>
            </div>

            <div className="flex justify-between py-3 border-b border-gray-200">
              <span className="text-gray-600">Pajak</span>
              <span className="font-medium">Rp 0</span>
            </div>

            <div className="flex justify-between py-3 mt-2">
              <span className="text-gray-800 font-medium">Total</span>
              <span className="text-orange-600 font-bold">Rp 200.000</span>
            </div>

            {/* What you get */}
            <div className="mt-6">
              <h3 className="text-gray-700 font-medium mb-2">
                Apa yang Anda dapatkan:
              </h3>
              <ul className="space-y-2">
                <li className="flex">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-500 mt-1 mr-2"
                  />
                  <span className="text-gray-600">
                    Akses ke semua skenario latihan
                  </span>
                </li>
                <li className="flex">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-500 mt-1 mr-2"
                  />
                  <span className="text-gray-600">
                    Sesi latihan tak terbatas
                  </span>
                </li>
                <li className="flex">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-500 mt-1 mr-2"
                  />
                  <span className="text-gray-600">
                    Umpan balik AI tingkat lanjut
                  </span>
                </li>
                <li className="flex">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-500 mt-1 mr-2"
                  />
                  <span className="text-gray-600">
                    Analisis mendalam untuk peningkatan
                  </span>
                </li>
              </ul>
            </div>

            {/* Payment Info */}
            <div className="mt-6 flex items-center text-gray-600 text-sm">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              <span>
                Langganan otomatis diperpanjang, dapat dibatalkan kapan saja
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
