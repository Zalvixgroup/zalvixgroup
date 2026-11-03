import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ServiceSearchFilter } from "@/components/ui/ServiceSearchFilter";

export const metadata: Metadata = {
  title: "All Home Appliance Repair Services | Zalvix Group",
  description:
    "Explore complete listing of AC, Refrigerator, Washing Machine, RO, Geyser & Smart TV repairs by Zalvix Group in Gorakhpur. ₹99 inspection, 30-day warranty.",
};

export const dynamic = "force-dynamic";

export default async function ServicesListingPage() {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 block">
          Gorakhpur Service Directory
        </span>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-950">
          Appliance Repair Catalog
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600">
          Doorstep technicians across all Gorakhpur sectors. Flat ₹99 diagnosis fee, waived if you proceed with repair.
        </p>
      </div>

      {/* Filter Component */}
      <ServiceSearchFilter categories={categories} />

      {/* Clean Monochrome Guarantee Strip */}
      <div className="rounded-2xl bg-white border border-zinc-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-zinc-950">
            30-Day Doorstep Guarantee
          </h4>
          <p className="text-xs text-zinc-500 mt-0.5">
            If the same defect resurfaces within 30 days, re-inspection and resolution is free.
          </p>
        </div>
        <a
          href="tel:+917307310320"
          className="px-4 py-2 rounded-full bg-zinc-950 text-white font-medium text-xs hover:bg-zinc-800 transition flex-shrink-0"
        >
          Call Dispatch: +91 73073 10320
        </a>
      </div>
    </div>
  );
}
