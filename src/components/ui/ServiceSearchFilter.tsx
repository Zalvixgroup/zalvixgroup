"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Star, Phone, ArrowRight, ShieldCheck, MapPin } from "lucide-react";

interface SubServiceItem {
  id: string;
  title: string;
  startingPrice: number;
}

interface CategoryWithServices {
  id: string;
  name: string;
  slug: string;
  thumbnailImage: string;
  rating: number;
  reviewCount: number;
  inspectionFee: number;
  coverageText: string;
  shortBullets: string[];
  services: SubServiceItem[];
}

interface ServiceSearchFilterProps {
  categories: CategoryWithServices[];
}

export function ServiceSearchFilter({ categories }: ServiceSearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((cat) => {
    const q = searchTerm.toLowerCase();
    const matchesCategoryName = cat.name.toLowerCase().includes(q);
    const matchesSubServices = cat.services.some((s) =>
      s.title.toLowerCase().includes(q)
    );
    return matchesCategoryName || matchesSubServices;
  });

  return (
    <div className="space-y-6">
      {/* Search Input Bar */}
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by appliance (e.g. AC, Fridge, Washing Machine, RO, Geyser)..."
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-semibold text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Justdial-style Vertical Listing Cards */}
      <div className="space-y-4">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition flex flex-col md:flex-row gap-5 items-start md:items-center justify-between"
            >
              {/* Left Column: Image */}
              <div className="relative w-full md:w-48 h-48 md:h-36 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                <Image
                  src={cat.thumbnailImage}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 192px"
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Verified
                </span>
              </div>

              {/* Middle Column: Details & Ratings */}
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    <Link
                      href={`/services/${cat.slug}`}
                      className="hover:text-blue-600 transition"
                    >
                      {cat.name}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md text-xs font-bold border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{cat.rating.toFixed(1)}</span>
                    <span className="text-slate-400 font-normal">
                      ({cat.reviewCount}+ reviews)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>{cat.coverageText}</span>
                </div>

                {/* Subservice chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.services.slice(0, 3).map((sub) => (
                    <span
                      key={sub.id}
                      className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                    >
                      {sub.title} (From ₹{sub.startingPrice})
                    </span>
                  ))}
                  {cat.services.length > 3 && (
                    <span className="inline-block px-2 py-1 text-xs text-slate-500 font-semibold">
                      +{cat.services.length - 3} more
                    </span>
                  )}
                </div>

                {/* Fee and Guarantee */}
                <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Flat ₹{cat.inspectionFee} Inspection Fee (Waived if repaired)</span>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="w-full md:w-auto flex flex-row md:flex-col gap-2 pt-2 md:pt-0">
                <a
                  href="tel:+919876543210"
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-blue-600 text-blue-600 font-bold text-xs sm:text-sm hover:bg-blue-50 transition active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
                <Link
                  href={`/services/${cat.slug}`}
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs sm:text-sm hover:bg-blue-700 transition active:scale-95 shadow-sm"
                >
                  <span>Book Visit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
            <p className="text-slate-600 font-medium">
              No services found matching &quot;{searchTerm}&quot;.
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-3 text-sm text-blue-600 font-bold hover:underline"
            >
              Reset Search & View All Services
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
