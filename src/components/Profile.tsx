"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat, faCog, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const Profile = () => {
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("fullName");
    if (storedName) setFullName(storedName);
  }, []);

  return (
    <>
      {/* Left Column - Profile */}
      <div className="w-full lg:w-1/4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Profil</h2>
          <p className="text-gray-600 text-sm mb-6">Informasi personal Anda</p>

          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-light-orange rounded-full flex items-center justify-center mb-4">
              <FontAwesomeIcon icon={faUser} className="text-primary-orange text-4xl" />
            </div>
            <h3 className="text-lg font-bold">{fullName || "Angela Melia"}</h3>
            <p className="text-gray-500 text-sm">angela.melia@example.com</p>
          </div>

          <div className="flex items-center mb-4">
            <div className="w-7 h-7 rounded-full bg-semi-light-orange mr-2">
              <span className="w-7 h-7 text-primary-orange flex items-center justify-center">
                <FontAwesomeIcon icon={faCat} className="" />
              </span>
            </div>

            <span className="flex-grow">Harimau Saya</span>
            <span className="bg-secondary-orange text-white text-xs px-2 py-1 rounded-full">Lvl 5</span>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Level 5</span>
              <span>350/500</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-secondary-orange rounded-full h-2" style={{ width: "70%" }}></div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-6">Total Poin: 1850</p>

          <Link href="/settings">
            <button className="w-full bg-white text-gray-800 py-3 mb-3 rounded-md border border-gray-200 flex items-center justify-center hover:bg-gray-100">
              <FontAwesomeIcon icon={faCog} className="mr-2" />
              Pengaturan Akun
            </button>
          </Link>
          <Link href="/auth/sign-in">
            <button className="w-full bg-primary-orange text-white py-3 rounded-md flex items-center justify-center hover:bg-secondary-orange">Keluar</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
