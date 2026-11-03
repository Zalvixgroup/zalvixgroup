import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  const seedFilePath = path.join(process.cwd(), "prisma", "seed.json");
  const rawData = fs.readFileSync(seedFilePath, "utf8");
  const data = JSON.parse(rawData);

  console.log("🌱 Starting Gorakhpur Repairs database seed...");

  // 1. Seed Areas
  console.log("Seeding Gorakhpur Service Areas...");
  for (const area of data.gorakhpurAreas) {
    await prisma.gorakhpurArea.upsert({
      where: { name: area.name },
      update: {
        pincode: area.pincode,
        displayOrder: area.displayOrder,
        isServiceable: true,
      },
      create: {
        name: area.name,
        pincode: area.pincode,
        displayOrder: area.displayOrder,
        isServiceable: true,
      },
    });
  }

  // 2. Seed Categories & SubServices
  console.log("Seeding Appliance Categories and SubServices...");
  for (const cat of data.categories) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        iconUrl: cat.iconUrl,
        thumbnailImage: cat.thumbnailImage,
        galleryImages: cat.galleryImages,
        rating: cat.rating,
        reviewCount: cat.reviewCount,
        inspectionFee: cat.inspectionFee,
        isFeeWaivedOnRepair: cat.isFeeWaivedOnRepair,
        coverageText: cat.coverageText,
        shortBullets: cat.shortBullets,
        aboutTitle: cat.aboutTitle,
        aboutDescription: cat.aboutDescription,
        displayOrder: cat.displayOrder,
        isActive: true,
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        iconUrl: cat.iconUrl,
        thumbnailImage: cat.thumbnailImage,
        galleryImages: cat.galleryImages,
        rating: cat.rating,
        reviewCount: cat.reviewCount,
        inspectionFee: cat.inspectionFee,
        isFeeWaivedOnRepair: cat.isFeeWaivedOnRepair,
        coverageText: cat.coverageText,
        shortBullets: cat.shortBullets,
        aboutTitle: cat.aboutTitle,
        aboutDescription: cat.aboutDescription,
        displayOrder: cat.displayOrder,
        isActive: true,
      },
    });

    // Delete existing services for clean re-seed
    await prisma.service.deleteMany({
      where: { categoryId: category.id },
    });

    // Insert subservices
    for (const sub of cat.subServices) {
      await prisma.service.create({
        data: {
          categoryId: category.id,
          title: sub.title,
          dropdownLabel: sub.dropdownLabel,
          startingPrice: sub.startingPrice,
          estimatedDuration: sub.estimatedDuration,
          displayOrder: sub.displayOrder,
          isActive: true,
        },
      });
    }
  }

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
