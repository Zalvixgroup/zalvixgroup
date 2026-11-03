import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { LeadCaptureForm } from "@/components/ui/LeadCaptureForm";
import { ImageGallerySlider } from "@/components/ui/ImageGallerySlider";
import { ReviewSection } from "@/components/ui/ReviewSection";
import { Check, Phone, ArrowUpRight } from "lucide-react";

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
      title: `${category.name} in Gorakhpur | ₹99 Inspection | Zalvix Group`,
      description: category.aboutDescription || "Doorstep appliance repair in Gorakhpur with 30-day warranty.",
    };
  } catch (e) {
    return { title: "Zalvix Group Service" };
  }
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
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
          reviews: {
            orderBy: { createdAt: "desc" },
            take: 10,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Breadcrumb Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 mb-2">
          <span>Catalog</span>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">{category.name}</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="text-2xl sm:text-4xl font-black text-zinc-950 tracking-tight">
            {category.name}
          </h1>
          <span className="font-mono text-xs text-zinc-500">
            ★ {category.rating.toFixed(1)} ({category.reviewCount}+ verified)
          </span>
        </div>
      </div>

      {/* Main 2-Column Funnel: Visuals Left, Sticky Form Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column (7 cols): Gallery + Specs */}
        <div className="lg:col-span-7 space-y-8">
          <ImageGallerySlider
            images={category.galleryImages || [category.thumbnailImage]}
            title={category.name}
          />

          {/* About Service and Specs */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-4 shadow-subtle">
            <h2 className="text-lg font-bold text-zinc-950">
              {category.aboutTitle || "About Service & Pricing"}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {category.aboutDescription}
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {category.shortBullets?.map((bullet: string, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs font-medium text-zinc-700 bg-zinc-50 p-2.5 rounded-xl border border-zinc-100"
                >
                  <Check className="w-3.5 h-3.5 text-zinc-900 flex-shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Specs Bar */}
          <div className="bg-zinc-900 text-white rounded-2xl p-6 grid grid-cols-3 gap-4 text-center border border-zinc-800">
            <div>
              <span className="block text-[11px] font-mono text-zinc-400 mb-1">Diagnosis</span>
              <span className="text-lg sm:text-xl font-bold font-mono">₹{category.inspectionFee}</span>
              <span className="block text-[10px] text-zinc-400 mt-0.5">Waived on repair</span>
            </div>
            <div className="border-x border-zinc-800">
              <span className="block text-[11px] font-mono text-zinc-400 mb-1">Guarantee</span>
              <span className="text-lg sm:text-xl font-bold font-mono">30 Days</span>
              <span className="block text-[10px] text-zinc-400 mt-0.5">Doorstep warranty</span>
            </div>
            <div>
              <span className="block text-[11px] font-mono text-zinc-400 mb-1">SLA Callback</span>
              <span className="text-lg sm:text-xl font-bold font-mono">10 Mins</span>
              <span className="block text-[10px] text-zinc-400 mt-0.5">Quick confirmation</span>
            </div>
          </div>

          {/* Direct Support */}
          <div className="p-4 rounded-xl border border-zinc-200 bg-white flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Direct Support</p>
              <p className="text-xs sm:text-sm font-semibold text-zinc-900">Have questions before booking?</p>
            </div>
            <a
              href="tel:+917307310320"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-zinc-300 text-zinc-900 font-medium text-xs hover:bg-zinc-100 transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 73073 10320</span>
            </a>
          </div>

          {/* Customer Reviews Section */}
          <ReviewSection
            categoryId={category.id}
            categoryName={category.name}
            initialReviews={category.reviews || []}
          />
        </div>

        {/* Right Column (5 cols): Sticky Lead Form */}
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
