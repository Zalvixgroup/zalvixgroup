import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { LeadCaptureForm } from "@/components/ui/LeadCaptureForm";
import { ImageGallerySlider } from "@/components/ui/ImageGallerySlider";
import {
  Star,
  MapPin,
  ShieldCheck,
  CheckCircle,
  Clock,
  Sparkles,
  Phone,
} from "lucide-react";

interface ServiceDetailPageProps {
  params: {
    category: string;
  };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  try {
    const category = await prisma.category.findUnique({
      where: { slug: params.category },
      select: { name: true, aboutDescription: true },
    });

    if (!category) return { title: "Service Not Found" };

    return {
      title: `${category.name} in Gorakhpur | ₹99 Inspection Doorstep Service`,
      description: category.aboutDescription || "Doorstep appliance repair in Gorakhpur with 30-day warranty.",
    };
  } catch (e) {
    return { title: "Gorakhpur Repairs Service" };
  }
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  // Fetch Category, SubServices and Serviceable Gorakhpur Areas
  let category: any = null;
  let areas: any[] = [];

  try {
    [category, areas] = await Promise.all([
      prisma.category.findUnique({
        where: { slug: params.category },
        include: {
          services: {
            where: { isActive: true },
            orderBy: { displayOrder: "asc" },
          },
        },
      }),
      prisma.gorakhpurArea.findMany({
        where: { isServiceable: true },
        orderBy: { displayOrder: "asc" },
      }),
    ]);
  } catch (e) {
    console.error("DB error on /services/[category]:", e);
  }

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Breadcrumb Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
          <span>Home</span>
          <span>/</span>
          <span>Services</span>
          <span>/</span>
          <span className="text-blue-600 font-bold">{category.name}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
            {category.name} in Gorakhpur
          </h1>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Technicians</span>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-2 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-1 font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{category.rating.toFixed(1)}</span>
            <span className="font-normal text-slate-500">
              ({category.reviewCount}+ verified reviews)
            </span>
          </div>
          <div className="flex items-center gap-1 font-medium">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>{category.coverageText}</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Funnel: Visuals on Left, Sticky Lead Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Gallery + About + Subservices preview + Trust */}
        <div className="lg:col-span-7 space-y-8">
          {/* Image Slider Component */}
          <ImageGallerySlider
            images={category.galleryImages || [category.thumbnailImage]}
            title={category.name}
          />

          {/* About Service and Pricing */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-4 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              {category.aboutTitle || "About Service & Pricing"}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {category.aboutDescription}
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category.shortBullets?.map((bullet: string, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Guarantee Details */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl border border-blue-100 p-6 space-y-4">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>Transparent Pricing & Gorakhpur Doorstep SLA</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="bg-white p-3.5 rounded-xl shadow-xs border border-blue-100">
                <span className="block text-xs text-slate-500 font-semibold mb-1">Inspection Fee</span>
                <span className="text-xl font-extrabold text-blue-600">₹{category.inspectionFee}</span>
                <span className="block text-[11px] text-emerald-600 font-bold mt-0.5">100% Waived if repaired</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl shadow-xs border border-blue-100">
                <span className="block text-xs text-slate-500 font-semibold mb-1">Warranty</span>
                <span className="text-xl font-extrabold text-emerald-600">30 Days</span>
                <span className="block text-[11px] text-slate-500 font-medium mt-0.5">Doorstep guarantee</span>
              </div>
              <div className="bg-white p-3.5 rounded-xl shadow-xs border border-blue-100">
                <span className="block text-xs text-slate-500 font-semibold mb-1">Response Time</span>
                <span className="text-xl font-extrabold text-amber-600">10 Mins</span>
                <span className="block text-[11px] text-slate-500 font-medium mt-0.5">Coordinator callback</span>
              </div>
            </div>
          </div>

          {/* Direct Call Banner */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Need Immediate Help?</p>
              <p className="text-sm font-bold text-slate-900">Talk to our Gorakhpur Service Coordinator</p>
            </div>
            <a
              href="tel:+917307310320"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs sm:text-sm hover:bg-blue-700 transition"
            >
              <Phone className="w-4 h-4" />
              <span>+91 73073 10320</span>
            </a>
          </div>
        </div>

        {/* Right Column (5 cols): Sticky Lead Capture Form (Rule 03 Dropdown architecture) */}
        <div className="lg:col-span-5">
          <LeadCaptureForm
            categoryId={category.id}
            categoryName={category.name}
            subServices={category.services}
            areas={areas}
          />
        </div>
      </div>
    </div>
  );
}
