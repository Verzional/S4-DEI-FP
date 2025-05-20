import Header from "@/components/Header";

export default function FeatureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-6">
          {children}
        </main>
      </div>
    </>
  );
}
        