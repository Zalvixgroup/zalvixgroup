import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBrevoLeadAlert } from "@/lib/brevo";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      phoneNumber,
      categoryId,
      selectedSubService,
      gorakhpurArea,
      fullAddress,
    } = body;

    // Strict validation
    if (
      !customerName ||
      typeof customerName !== "string" ||
      customerName.trim().length < 2
    ) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid customer name (minimum 2 letters)." },
        { status: 400 }
      );
    }

    const cleanPhone = String(phoneNumber || "").replace(/[^0-9]/g, "");
    if (cleanPhone.length !== 10) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    if (!categoryId || !selectedSubService || !gorakhpurArea) {
      return NextResponse.json(
        { success: false, error: "Service selection and Gorakhpur area are required." },
        { status: 400 }
      );
    }

    // Generate unique human-readable booking ID: GKP-XXXX
    let bookingId = `GKP-${Math.floor(1000 + Math.random() * 9000)}`;
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 5) {
      const existing = await prisma.booking.findUnique({
        where: { bookingId },
        select: { id: true },
      });
      if (!existing) {
        isUnique = true;
      } else {
        bookingId = `GKP-${Math.floor(1000 + Math.random() * 9000)}`;
        attempts++;
      }
    }

    const booking = await prisma.booking.create({
      data: {
        bookingId,
        customerName: customerName.trim(),
        phoneNumber: cleanPhone,
        categoryId,
        selectedSubService,
        gorakhpurArea,
        fullAddress: fullAddress ? String(fullAddress).trim() : null,
        inspectionFee: 99,
        feeStatus: "Pay After Service",
        bookingStatus: "Request Confirmed",
      },
    });

    // Non-blocking Brevo Lead Alert
    sendBrevoLeadAlert({
      bookingId: booking.bookingId,
      customerName: booking.customerName,
      phoneNumber: booking.phoneNumber,
      selectedSubService: booking.selectedSubService,
      gorakhpurArea: booking.gorakhpurArea,
      fullAddress: booking.fullAddress,
      inspectionFee: booking.inspectionFee,
    }).catch((err) => console.error("Brevo notification async failure:", err));

    return NextResponse.json(
      {
        success: true,
        bookingId: booking.bookingId,
        redirectUrl: `/thank-you?booking_id=${booking.bookingId}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking API creation error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error while processing booking." },
      { status: 500 }
    );
  }
}
