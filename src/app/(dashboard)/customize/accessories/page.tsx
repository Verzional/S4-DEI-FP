import Image from "next/image";
import Link from "next/link";

type Accessory = {
  id: number;
  name: string;
  image: string;
  requiredLevel: number | null;
};

const accessories: Accessory[] = [
  {
    id: 1,
    name: "Kacamata Bulat",
    image: "/image/accessories-1.png",
    requiredLevel: null,
  },
  {
    id: 2,
    name: "Kacamata Hitam",
    image: "/image/accessories-2.png",
    requiredLevel: null,
  },
  {
    id: 3,
    name: "Pita Merah",
    image: "/image/accessories-3.png",
    requiredLevel: null,
  },
  {
    id: 4,
    name: "Mikrofon",
    image: "/image/accessories-4.png",
    requiredLevel: null,
  },
  {
    id: 5,
    name: "Dasi Kupu-Kupu",
    image: "/image/accessories-5.png",
    requiredLevel: null,
  },
  { id: 6, name: "Terkunci", image: "/image/locked.png", requiredLevel: 10 },
  { id: 7, name: "Terkunci", image: "/image/locked.png", requiredLevel: 15 },
  { id: 8, name: "Terkunci", image: "/image/locked.png", requiredLevel: 20 },
  { id: 9, name: "Terkunci", image: "/image/locked.png", requiredLevel: 25 },
  { id: 10, name: "Terkunci", image: "/image/locked.png", requiredLevel: 30 },
];

export default function Accessories() {
  return (
    <>
      <div className="flex border-b border-gray-200 mb-8">
        <Link
          href="/customize/outfits"
          className="px-4 py-2 text-gray-500 hover:text-black"
        >
          Pakaian
        </Link>

        <Link
          href="/customize/accessories"
          className="px-4 py-2 font-medium text-black border-b-2 border-primary-orange"
        >
          Aksesoris
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {accessories.map((accessory) => {
          const isLocked = accessory.image === "/image/locked.png";

          return (
            <div
              key={accessory.id}
              className={`aspect-square border-2 border-gray-200 rounded-lg relative ${
                isLocked ? "cursor-not-allowed" : "cursor-pointer hoverable-box"
              }`}
            >
              {accessory.requiredLevel && (
                <div className="absolute top-2 right-2 bg-primary-orange text-white text-xs px-2 py-1 rounded-full">
                  Lvl {accessory.requiredLevel}
                </div>
              )}
              <div className="flex items-center justify-center">
                <Image
                  src={accessory.image}
                  alt="My Tiger"
                  width={150}
                  height={150}
                />
              </div>
              <p
                className={`text-center font-medium ${
                  isLocked ? "text-gray-300" : "text-black"
                }`}
              >
                {accessory.name}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
