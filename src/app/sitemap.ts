import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.zalvixgroup.in";

  // Ensure https and www matching canonical domain
  const canonicalBase = baseUrl.replace("http://", "https://").replace("https://zalvixgroup.in", "https://www.zalvixgroup.in");

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${canonicalBase}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${canonicalBase}/services`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Fetch all dynamic appliance categories from Neon DB
  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: { displayOrder: "asc" },
    });

    categoryRoutes = categories.map((cat) => ({
      url: `${canonicalBase}/services/${cat.slug}`,
      lastModified: cat.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error generating dynamic sitemap from database:", error);
  }

  return [...staticRoutes, ...categoryRoutes];
}
