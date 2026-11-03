import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import {
  ShieldCheck,
  CheckCircle,
  Clock,
  Star,
  Search,
  ArrowRight,
  Sparkles,
  MapPin,
  ChevronRight,
  PhoneCall,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch dynamic categories and areas directly from Neon DB (Rule 01 Zero Hardcoding)
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
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-10 sm:pt-16 pb-12 sm:pb-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs sm:text-sm font-bold shadow-xs">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Gorakhpur’s #1 Doorstep Appliance Repair Service</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
            Fast, Trusted Home Appliance Repair at Your Doorstep by{" "}
            <span className="text-blue-600">Zalvix Group</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Expert technicians for AC, Refrigerator, Washing Machine, RO & Geyser.
            Flat ₹99 inspection fee — 100% waived off on repair!
          </p>

          {/* Quick Search Bar directly linking to /services */}
          <div className="max-w-xl mx-auto pt-2">
            <Link
              href="/services"
              className="flex items-center justify-between p-2 pl-4 rounded-2xl bg-white border border-slate-300 shadow-md hover:border-blue-500 hover:shadow-lg transition group"
            >
              <div className="flex items-center gap-3 text-slate-400 group-hover:text-slate-600 transition">
                <Search className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">
                  Search any repair service (AC, Fridge, RO...)...
                </span>
              </div>
              <span className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs sm:text-sm group-hover:bg-blue-700 transition">
                Find Service
              </span>
            </Link>
          </div>

          {/* 3 Core Trust Chips */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>30-Day Doorstep Guarantee</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span>Background-Verified Technicians</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Flat ₹99 Inspection (Waived on Repair)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Appliance Services Grid (Rule 01: Loaded from Neon DB) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
              Select Your Appliance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Popular Doorstep Repair Services
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-800 transition"
          >
            <span>View All Services</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={cat.thumbnailImage}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{cat.rating.toFixed(1)}</span>
                    <span className="text-slate-400 font-normal">({cat.reviewCount}+)</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                    <Link href={`/services/${cat.slug}`}>
                      {cat.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {cat.aboutDescription}
                  </p>

                  <div className="space-y-1 pt-1">
                    {cat.shortBullets?.slice(0, 2).map((bullet: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="line-clamp-1">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  ₹{cat.inspectionFee} Inspection
                </span>
                <Link
                  href={`/services/${cat.slug}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section className="bg-slate-100 py-14 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
              Easy 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How Zalvix Group Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center text-xl">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Book Online or Call Us
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Choose your appliance, enter your mobile & area in Gorakhpur. Coordinator calls within 10 minutes to confirm slot.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center text-xl">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Expert Technician Arrives
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our background-verified technician visits your doorstep within 45–90 minutes with genuine tools & parts.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center text-xl">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Fixed with 30-Day Warranty & Pay
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Appliance fixed with genuine spare parts. Inspection fee waived if repaired. Pay securely via Cash or UPI post service!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO Gorakhpur Areas Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
              <MapPin className="w-3.5 h-3.5" />
              <span>100% Gorakhpur City Coverage</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Need Urgent Appliance Repair in Your Area?
            </h3>
            <p className="text-blue-100 text-xs sm:text-sm max-w-xl">
              Serving Golghar, Taramandal, Medical College Road, Civil Lines, Gorakhnath, Rustampur, Asuran, and all surrounding areas.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <a
              href="tel:+917307310320"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-blue-700 font-extrabold text-sm hover:bg-blue-50 transition shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call +91 73073 10320</span>
            </a>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-800 text-white font-extrabold text-sm hover:bg-blue-900 transition border border-blue-500"
            >
              <span>Explore All Services</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
