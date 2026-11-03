"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Phone, ArrowUpRight } from "lucide-react";

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
      <div className="relative max-w-xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-zinc-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search appliance (AC, Fridge, Washing Machine, RO...)"
          className="w-full pl-11 pr-4 py-3 rounded-full border border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 shadow-subtle transition"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-mono text-zinc-400 hover:text-zinc-900"
          >
            Clear
          </button>
        )}
      </div>

      {/* Monochrome Vertical Listing Cards */}
      <div className="space-y-4">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6 shadow-card hover:shadow-cardHover transition flex flex-col md:flex-row gap-6 items-start md:items-center justify-between group"
            >
              {/* Left Column: Image */}
              <div className="relative w-full md:w-44 h-44 md:h-32 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0 border border-zinc-200">
                <Image
                  src={cat.thumbnailImage}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 176px"
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Middle Column: Details */}
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-zinc-950">
                    <Link
                      href={`/services/${cat.slug}`}
                      className="hover:underline"
                    >
                      {cat.name}
                    </Link>
                  </h3>
                  <span className="font-mono text-xs text-zinc-500">
                    ★ {cat.rating.toFixed(1)} ({cat.reviewCount}+ verified)
                  </span>
                </div>

                <div className="text-xs text-zinc-500 font-mono">
                  Coverage: {cat.coverageText}
                </div>

                {/* Subservice chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.services.slice(0, 3).map((sub) => (
                    <span
                      key={sub.id}
                      className="inline-block px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-800 text-[11px] font-medium border border-zinc-200"
                    >
                      {sub.title} • ₹{sub.startingPrice}
                    </span>
                  ))}
                  {cat.services.length > 3 && (
                    <span className="inline-block px-2 py-1 text-[11px] text-zinc-400 font-mono">
                      +{cat.services.length - 3} more
                    </span>
                  )}
                </div>

                <div className="text-xs text-zinc-600 font-medium pt-1">
                  ₹{cat.inspectionFee} Inspection Fee (Waived if repaired) • 30-Day Guarantee
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="w-full md:w-auto flex flex-row md:flex-col gap-2 pt-2 md:pt-0">
                <a
                  href="tel:+917307310320"
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-300 text-zinc-900 font-medium text-xs hover:bg-zinc-100 transition active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
                <Link
                  href={`/services/${cat.slug}`}
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-950 text-white font-medium text-xs hover:bg-zinc-800 transition active:scale-95 shadow-sm"
                >
                  <span>Book Visit</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-zinc-200">
            <p className="text-zinc-600 text-sm">
              No services found matching &quot;{searchTerm}&quot;.
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-3 text-xs font-semibold text-zinc-950 underline hover:text-zinc-700"
            >
              Reset Search & View All Services
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
