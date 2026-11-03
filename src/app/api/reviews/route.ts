import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, rating, comment, gorakhpurArea, categoryId } = body;

    if (!customerName || typeof customerName !== "string" || customerName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name (at least 2 letters)." },
        { status: 400 }
      );
    }

    if (!comment || typeof comment !== "string" || comment.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Please write a brief feedback comment (at least 5 characters)." },
        { status: 400 }
      );
    }

    const starRating = Math.min(5, Math.max(1, parseInt(rating, 10) || 5));

    const review = await prisma.review.create({
      data: {
        customerName: customerName.trim(),
        rating: starRating,
        comment: comment.trim(),
        gorakhpurArea: (gorakhpurArea && gorakhpurArea.trim()) || "Gorakhpur",
        categoryId: categoryId || null,
      },
    });

    return NextResponse.json(
      { success: true, reviewId: review.id, message: "Thank you for your review!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Review creation error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error while saving review." },
      { status: 500 }
    );
  }
}
