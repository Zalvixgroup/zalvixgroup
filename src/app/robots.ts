import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zalvixgroup.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/thank-you"], // Search engines should crawl services, but ignore internal API & private order receipts
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
