import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowUpRight } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Minimal City Badge */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-zinc-300 bg-white flex-shrink-0">
              <Image
                src="/logo.jpeg"
                alt="Zalvix Group"
                fill
                sizes="32px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black tracking-tight text-zinc-950">
                Zalvix<span className="text-zinc-500 font-semibold">Group</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest text-zinc-400 pl-1 border-l border-zinc-200">
                Gorakhpur
              </span>
            </div>
          </Link>
        </div>

        {/* Minimal Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="tel:+917307310320"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-zinc-700 hover:text-zinc-950 font-medium text-xs sm:text-sm transition hover:bg-zinc-100"
          >
            <Phone className="w-3.5 h-3.5 text-zinc-900" />
            <span className="hidden md:inline font-mono text-xs">+91 73073 10320</span>
            <span className="md:hidden">Call</span>
          </a>
          <Link
            href="/services"
            className="group flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-950 text-white font-medium text-xs sm:text-sm hover:bg-zinc-800 transition active:scale-[0.98] shadow-sm"
          >
            <span>Book Visit</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </Link>
        </div>
      </div>
    </header>
  );
}
