import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & City Badge */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white">
              <Image
                src="/logo.jpeg"
                alt="Zalvix Group Logo"
                fill
                sizes="36px"
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 block leading-tight">
                Zalvix<span className="text-blue-600">Group</span>
              </span>
            </div>
          </Link>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Gorakhpur, UP</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="tel:+917307310320"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:text-blue-600 font-semibold text-sm transition"
          >
            <Phone className="w-4 h-4 text-blue-600" />
            <span className="hidden md:inline">+91 73073 10320</span>
            <span className="md:hidden">Call</span>
          </a>
          <Link
            href="/services"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs sm:text-sm shadow-sm hover:bg-blue-700 transition"
          >
            Book Doorstep Service
          </Link>
        </div>
      </div>
    </header>
  );
}
