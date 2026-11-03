import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileBar } from "@/components/ui/StickyMobileBar";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: {
    default: "Zalvix Group | Doorstep Home Appliance Repair in Gorakhpur",
    template: "%s | Zalvix Group",
  },
  description:
    "Fast, reliable doorstep repair for AC, Refrigerator, Washing Machine, RO, Geyser, and Smart TV in Gorakhpur. Flat ₹99 diagnosis (waived on repair), 30-day warranty, pay after service.",
  metadataBase: new URL("https://www.zalvixgroup.in"),
  openGraph: {
    title: "Zalvix Group | Doorstep Appliance Repair in Gorakhpur",
    description: "Flat ₹99 inspection (waived on repair), 30-day warranty, 10-minute callback, and verified doorstep mechanics across Gorakhpur.",
    url: "https://www.zalvixgroup.in",
    siteName: "Zalvix Group",
    images: [
      {
        url: "https://www.zalvixgroup.in/logo.png",
        width: 512,
        height: 512,
        alt: "Zalvix Group - Gorakhpur Doorstep Appliance Repair",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zalvix Group | Doorstep Appliance Repair in Gorakhpur",
    description: "Flat ₹99 inspection (waived on repair), 30-day warranty, 10-minute callback across Gorakhpur.",
    images: ["https://www.zalvixgroup.in/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch real areas & categories for dynamic footer
  let areas: { name: string }[] = [];
  let categories: { name: string; slug: string }[] = [];

  try {
    const [fetchedAreas, fetchedCategories] = await Promise.all([
      prisma.gorakhpurArea.findMany({
        where: { isServiceable: true },
        select: { name: true },
        orderBy: { displayOrder: "asc" },
      }),
      prisma.category.findMany({
        where: { isActive: true },
        select: { name: true, slug: true },
        orderBy: { displayOrder: "asc" },
      }),
    ]);
    areas = fetchedAreas;
    categories = fetchedCategories;
  } catch (err) {
    console.warn("DB connection for layout footer pending:", err);
  }

  // JSON-LD Local Business Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Zalvix Group",
    "image": "http://zalvixgroup.in/logo.jpeg",
    "telephone": "+917307310320",
    "priceRange": "₹99 - ₹2500",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, UPI",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Gorakhpur",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "273001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "26.7606",
      "longitude": "83.3732"
    },
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "20:00"
    }]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer areas={areas} categories={categories} />
        <StickyMobileBar />
      </body>
    </html>
  );
}
