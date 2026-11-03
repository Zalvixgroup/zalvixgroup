import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import {
  Search,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  Check,
  Phone,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let categories: any[] = [];
  let areas: any[] = [];

  try {
    [categories, areas] = await Promise.all([
      prisma.category.findMany({
        where: { isActive: true },
        include: {
          services: {
            where: { isActive: true },
            orderBy: { displayOrder: "asc" },
            take: 2,
          },
        },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.gorakhpurArea.findMany({
        where: { isServiceable: true },
        orderBy: { displayOrder: "asc" },
      }),
    ]);
  } catch (e) {
    console.error("Database connection fallback on HomePage:", e);
  }

  return (
    <div className="space-y-20 pb-20">
      {/* Editorial Monochrome Hero Section */}
      <section className="pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-zinc-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Minimal Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-mono uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-950"></span>
            <span>Doorstep Appliance Engineering • Gorakhpur</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 leading-[1.1] max-w-4xl mx-auto">
            Honest, Transparent Appliance Repair at Your Doorstep.
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Verified local mechanics for AC, Refrigeration, Washers & RO. Flat ₹99 diagnosis fee — 100% waived off on repair. Zero advance payment.
          </p>

          {/* Minimalist Search Bar */}
          <div className="max-w-lg mx-auto pt-2">
            <Link
              href="/services"
              className="flex items-center justify-between p-1.5 pl-4 rounded-full bg-zinc-50 border border-zinc-300 hover:border-zinc-900 transition group shadow-subtle"
            >
              <div className="flex items-center gap-2.5 text-zinc-400 group-hover:text-zinc-700 transition">
                <Search className="w-4 h-4 text-zinc-500" />
                <span className="text-xs sm:text-sm font-normal">
                  Search any repair service...
                </span>
              </div>
              <span className="px-4 py-2 rounded-full bg-zinc-950 text-white font-medium text-xs group-hover:bg-zinc-800 transition">
                Browse
              </span>
            </Link>
          </div>

          {/* 3 Minimal Numbers / Trust Metrics */}
          <div className="pt-8 grid grid-cols-3 max-w-2xl mx-auto divide-x divide-zinc-200 text-center">
            <div className="px-2 sm:px-4">
              <span className="block font-mono text-xl sm:text-2xl font-bold text-zinc-950">
                ₹99
              </span>
              <span className="text-[11px] sm:text-xs text-zinc-500 font-medium">
                Flat Diagnosis (Waived)
              </span>
            </div>
            <div className="px-2 sm:px-4">
              <span className="block font-mono text-xl sm:text-2xl font-bold text-zinc-950">
                10 Mins
              </span>
              <span className="text-[11px] sm:text-xs text-zinc-500 font-medium">
                Coordinator Callback
              </span>
            </div>
            <div className="px-2 sm:px-4">
              <span className="block font-mono text-xl sm:text-2xl font-bold text-zinc-950">
                30 Days
              </span>
              <span className="text-[11px] sm:text-xs text-zinc-500 font-medium">
                Doorstep Warranty
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Appliance Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8 border-b border-zinc-200 pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 block mb-1">
              Directory
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
              Appliance Services
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 hover:underline"
          >
            <span>View all listings</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-card hover:shadow-cardHover transition flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full bg-zinc-100 overflow-hidden border-b border-zinc-100">
                  <Image
                    src={cat.thumbnailImage}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[11px] font-mono text-zinc-900 border border-zinc-200">
                    ★ {cat.rating.toFixed(1)}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <h3 className="text-base font-bold text-zinc-950 group-hover:underline">
                    <Link href={`/services/${cat.slug}`}>
                      {cat.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                    {cat.aboutDescription}
                  </p>

                  <div className="space-y-1 pt-2">
                    {cat.shortBullets?.slice(0, 2).map((bullet: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-zinc-600">
                        <Check className="w-3 h-3 text-zinc-800 flex-shrink-0" />
                        <span className="line-clamp-1">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 mt-3 flex items-center justify-between gap-3 border-t border-zinc-100 pt-3">
                <span className="text-xs font-mono text-zinc-500">
                  ₹{cat.inspectionFee} Diagnosis
                </span>
                <Link
                  href={`/services/${cat.slug}`}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-zinc-950 text-white font-medium text-xs hover:bg-zinc-800 transition"
                >
                  <span>Book</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works — Minimal Numbers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-900 text-white rounded-3xl p-8 sm:p-14 border border-zinc-800">
          <div className="max-w-2xl mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 block mb-1">
              Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Three Steps. Zero Hassle.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <span className="font-mono text-3xl font-bold text-zinc-600 block">
                01
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Book Online or Call
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Pick your appliance and area. Our Gorakhpur coordinator calls within 10 minutes to verify your preferred time slot.
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-3xl font-bold text-zinc-600 block">
                02
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Expert Technician Arrives
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Background-verified technician reaches your address with genuine spares. Diagnosis conducted in front of you.
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-3xl font-bold text-zinc-600 block">
                03
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Fixed, Tested & Pay Post-Service
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Appliance fixed with 30-day warranty. Diagnosis fee waived off. Pay via Cash or UPI only after you are 100% satisfied.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gorakhpur Coverage Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-zinc-200 bg-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 block">
              Gorakhpur Dispatch
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-950">
              Need immediate technician assistance?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-lg">
              Covering Golghar, Taramandal, Medical College Rd, Civil Lines, Gorakhnath, Rustampur, Asuran, and all city sectors.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href="tel:+917307310320"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-zinc-950 text-white font-medium text-xs sm:text-sm hover:bg-zinc-800 transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call +91 73073 10320</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
