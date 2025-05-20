"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/profile", label: "Ringkasan" },
  { href: "/profile/history", label: "Riwayat Latihan" },
  { href: "/profile/achievements", label: "Pencapaian" },
  { href: "/profile/statistics", label: "Statistik" },
];

const ProfileTabs = () => {
  const pathname = usePathname();

  return (
    <div className="flex border-b border-gray-200 mb-6 py-0">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link key={tab.href} href={tab.href}>
            <button className={`px-4 py-2 pt-0 ${isActive ? "border-b-2 border-primary-orange font-medium text-gray-900" : "text-gray-500"}`}>{tab.label}</button>
          </Link>
        );
      })}
    </div>
  );
};

export default ProfileTabs;
