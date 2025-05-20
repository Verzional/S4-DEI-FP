"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPremiumButton() {
  const router = useRouter();
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = () => {
    setIsResetting(true);
    localStorage.removeItem("isPremium");
    
    setTimeout(() => {
      router.refresh();
      setIsResetting(false);
      window.location.reload(); 
    }, 1000);
  };

  return (
    <button 
      onClick={handleReset}
      className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-2 rounded"
      disabled={isResetting}
    >
      {isResetting ? 'Resetting...' : 'Reset Premium Status (Demo)'}
    </button>
  );
}