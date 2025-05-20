import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Start() {
  return (
    <div className="welcome-body">
      <div className="gradient-background items-center justify-center flex flex-col min-h-dvh">
        <div className="text-center max-w-2xl mx-auto mt-14">
          <h1 className="text-5xl font-bold text-black mb-2">
            Selamat Datang di Audicia
          </h1>
          <p className="text-2xl text-black mb-14">
            Apakah Anda siap latihan hari ini?
          </p>

          {/* Tiger Icon */}
          <div className="relative flex items-center justify-center">
            <Image
              src="/image/audicia-body.png"
              alt=""
              width={360}
              height={360}
            />
          </div>

          {/* Button */}
          <div className="flex justify-center mt-14">
            <Link href="/customize/outfits">
              <button className="hover:bg-secondary-orange text-white bg-primary-orange font-bold py-4 px-10 rounded-lg text-xl flex items-center gap-2">
                <span>Ayo Mulai</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
