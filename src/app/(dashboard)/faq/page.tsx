"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const faqs = [
  {
    question: "Apa itu Audicia dan bagaimana cara kerjanya?",
    answer:
      "Audicia adalah aplikasi latihan public speaking dengan AI yang membantu Anda meningkatkan keterampilan berbicara melalui simulasi peran dengan skenario nyata. Pendamping AI kami memberikan umpan balik atas performa Anda, membantu Anda mengidentifikasi kekuatan dan area yang perlu ditingkatkan.",
  },
  {
    question: "Apakah data latihan saya bersifat pribadi dan aman?",
    answer:
      "Ya, data latihan Anda sepenuhnya bersifat pribadi dan aman. Kami menggunakan enkripsi standar industri untuk melindungi informasi Anda, dan kami tidak pernah membagikan sesi latihan atau data pribadi Anda dengan pihak ketiga. Anda memiliki kendali penuh atas data Anda dan dapat menghapusnya kapan saja dari pengaturan akun Anda.",
  },
  {
    question: "Dapatkah saya mempraktikkan skenario khusus untuk industri saya?",
    answer:
      "Audicia menawarkan berbagai macam skenario khusus industri untuk latihan. Baik Anda bekerja di bidang teknologi, kesehatan, pendidikan, keuangan, atau bidang lainnya, Anda dapat memilih skenario yang relevan dengan konteks profesional Anda. Anda juga dapat membuat skenario khusus yang disesuaikan dengan kebutuhan spesifik Anda.",
  },
  {
    question: "Seberapa akurat umpan balik AI?",
    answer:
      "Sistem umpan balik AI kami telah dilatih dengan ribuan contoh public speaking dan evaluasi ahli. Sistem ini memberikan umpan balik yang sangat akurat pada aspek-aspek seperti kecepatan, kejelasan, kata-kata pengisi, dan keterlibatan. Meskipun tidak ada AI yang sempurna, sistem kami terus berkembang melalui pembelajaran mesin dan pembaruan rutin berdasarkan umpan balik pengguna dan masukan dari para ahli.",
  },
  {
    question: "Dapatkah saya menggunakan Audicia tanpa koneksi internet?",
    answer:
      "Audicia membutuhkan koneksi internet untuk fungsionalitas penuh, karena pemrosesan AI kami dilakukan di cloud. Namun, kami menawarkan mode offline terbatas yang memungkinkan Anda merekam sesi latihan saat Anda tidak terhubung. Sesi ini akan dianalisis dan umpan balik akan diberikan setelah Anda terhubung kembali ke internet.",
  },
  {
    question: "Apakah ada batasan berapa banyak sesi latihan yang dapat saya lakukan?",
    answer:
      "Jumlah sesi latihan yang tersedia tergantung pada paket langganan Anda. Pengguna gratis dapat mengakses hingga 5 sesi latihan per bulan. Pelanggan premium memiliki akses tak terbatas ke sesi latihan, bersama dengan fitur tambahan seperti analitik tingkat lanjut, rencana peningkatan yang dipersonalisasi, dan akses prioritas ke skenario baru.",
  },
  {
    question: "Bagaimana cara melacak kemajuan saya dari waktu ke waktu?",
    answer:
      "Audicia menyediakan pelacakan kemajuan yang komprehensif melalui dasbor pribadi Anda. Anda dapat melihat analitik terperinci tentang kinerja berbicara Anda dari waktu ke waktu, termasuk peningkatan dalam hal kecepatan, kejelasan, kepercayaan diri, dan metrik utama lainnya. Dasbor juga menyoroti kekuatan Anda dan menyarankan area spesifik untuk peningkatan berdasarkan riwayat latihan Anda.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      {/* Main Content */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Pertanyaan yang Sering Diajukan</h2>
        <p className="text-gray-600">Temukan jawaban atas pertanyaan umum tentang Audicia</p>
      </div>

      <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
        {faqs.map((faq, index) => {
          const isActive = activeIndex === index;
          return (
            <div key={index} className={`p-6 transition-colors ${isActive ? "bg-orange-100" : "hover:bg-orange-100 hover:underline"}`}>
              <button className="w-full flex justify-between items-center text-left focus:outline-none" onClick={() => toggleFAQ(index)} aria-expanded={isActive}>
                <h4 className="font-medium">{faq.question}</h4>
                <span className={`text-gray-400 transform transition-transform ${isActive ? "rotate-180" : ""}`}>
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${isActive ? "max-h-screen mt-4 opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
