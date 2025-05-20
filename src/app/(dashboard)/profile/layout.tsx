import Profile from "@/components/Profile";
import ProfileTabs from "@/components/ProfileTabs";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Profil Saya</h2>
          <p className="text-gray-600">
            Lihat dan kelola profil serta kemajuan Anda
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <Profile />
          <div className="w-full lg:w-3/4">
            <ProfileTabs />
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
