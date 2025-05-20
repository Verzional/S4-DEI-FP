"use client";

import { useState } from "react";
import Image from "next/image";

const Tiger = () => {
  const [name, setName] = useState("Lantaro");
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(name);

  const handleSave = () => {
    setName(tempName);
    setIsEditing(false);
  };

  return (
    <div className="w-full lg:w-1/4">
      <div className="bg-white rounded-lg border border-gray-200 p-6 h-full">
        {isEditing ? (
          <div className="mb-2">
            <input value={tempName} onChange={(e) => setTempName(e.target.value)} className="text-xl font-bold text-gray-900 bg-white border rounded px-2 py-1 w-full mb-2" placeholder="Enter tiger name" />
            <button onClick={handleSave} className="bg-primary-orange text-white text-sm px-3 py-1 rounded hover:bg-blue-700">
              Simpan
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center mb-2">
            <h2 id="tigerName" className="text-xl font-bold text-gray-900">
              {name}
            </h2>
            <button onClick={() => setIsEditing(true)} className="text-orange-500 border border-gray-200 hover:bg-orange-200 transition-colors px-3 py-1 text-sm rounded">
              Edit
            </button>
          </div>
        )}

        <p className="text-gray-600 text-sm mb-4">Pendamping latihan public speaking Anda</p>

        <Image src="/image/audicia-custom.png" alt="My Tiger" width={480} height={480} className="rounded-lg mb-4 mt-4" />

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Level 5</span>
            <span>350/500</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-secondary-orange rounded-full h-2" style={{ width: "70%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tiger;
