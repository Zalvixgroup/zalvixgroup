import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ServiceSearchFilter } from "@/components/ui/ServiceSearchFilter";
import { ShieldCheck, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "All Home Appliance Repair Services in Gorakhpur | Gorakhpur Repairs",
  description:
    "Explore complete listing of AC, Refrigerator, Washing Machine, RO, Geyser & Smart TV repairs in Gorakhpur. ₹99 inspection, 30-day warranty.",
};

export const dynamic = "force-dynamic";

export default async function ServicesListingPage() {
  // Fetch all active categories with sub-services from Neon DB
  let categories: any[] = [];

  try {
    categories = await prisma.category.findMany({
      where: { isActive: true },
      include: {
        services: {
          where: { isActive: true },
          orderBy: { displayOrder: "asc" },
        },
      },
      orderBy: { displayOrder: "asc" },
    });
  } catch (e) {
    console.error("Error fetching services in /services:", e);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
          <MapPin className="w-3.5 h-3.5" />
          <span>Gorakhpur Doorstep Services Directory</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          All Appliance Repair & Maintenance Services
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Find verified doorstep technicians across Gorakhpur. Flat ₹99 inspection fee, waived if you proceed with repair.
        </p>
      </div>

      {/* Instant Search & Vertical Justdial-style Listings */}
      <ServiceSearchFilter categories={categories} />

      {/* Trust Banner */}
      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-950">
              30-Day Doorstep Guarantee on All Repairs
            </h4>
            <p className="text-xs text-emerald-800">
              If the same issue reoccurs within 30 days, we fix it free of charge. No questions asked.
            </p>
          </div>
        </div>
        <a
          href="tel:+919876543210"
          className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs sm:text-sm hover:bg-emerald-700 transition flex-shrink-0"
        >
          Call Helpline: +91 98765 43210
        </a>
      </div>
    </div>
  );
}
