import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Check,
  Phone,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Booking Confirmed | Zalvix Group",
  description: "Your doorstep appliance service request has been received.",
};

export const dynamic = "force-dynamic";

interface ThankYouPageProps {
  searchParams: {
    booking_id?: string;
  };
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const bookingId = searchParams.booking_id;

  let booking: any = null;
  if (bookingId) {
    try {
      booking = await prisma.booking.findUnique({
        where: { bookingId },
        include: {
          category: {
            select: { name: true },
          },
        },
      });
    } catch (e) {
      console.error("Error retrieving booking in /thank-you:", e);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-8">
      {/* Top Status */}
      <div className="text-center space-y-3">
        <div className="w-12 h-12 mx-auto rounded-full bg-zinc-950 text-white flex items-center justify-center font-bold">
          <Check className="w-6 h-6 text-white" />
        </div>
        <div className="space-y-1">
          <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 block">
            Booking Received
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950">
            Thank You, {booking ? booking.customerName : "Customer"}!
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-sm mx-auto">
            Our Gorakhpur coordinator will call your mobile within{" "}
            <span className="font-semibold text-zinc-950">10 minutes</span> to confirm your doorstep appointment.
          </p>
        </div>
      </div>

      {/* 3-Stage Progress */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-subtle">
        <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400 block mb-6 text-center">
          Dispatch Timeline
        </span>
        <div className="grid grid-cols-3 gap-2 relative text-center">
          <div className="space-y-1.5">
            <div className="w-8 h-8 mx-auto rounded-full bg-zinc-950 text-white flex items-center justify-center font-bold text-xs">
              ✓
            </div>
            <p className="text-xs font-bold text-zinc-950">Received</p>
            <span className="text-[10px] text-zinc-400 font-mono">Done</span>
          </div>

          <div className="space-y-1.5">
            <div className="w-8 h-8 mx-auto rounded-full border-2 border-zinc-950 text-zinc-950 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <p className="text-xs font-bold text-zinc-950">Assigning</p>
            <span className="text-[10px] text-zinc-500 font-mono">&lt; 10 Mins</span>
          </div>

          <div className="space-y-1.5">
            <div className="w-8 h-8 mx-auto rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <p className="text-xs font-semibold text-zinc-500">Doorstep Pay</p>
            <span className="text-[10px] text-zinc-400 font-mono">Post-Service</span>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      {booking && (
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400">
              Receipt Details
            </span>
            <span className="font-mono text-xs font-bold text-zinc-950 px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200">
              #{booking.bookingId}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-zinc-400 block">Customer</span>
              <span className="font-semibold text-zinc-900">{booking.customerName}</span>
            </div>
            <div>
              <span className="text-zinc-400 block">Mobile</span>
              <span className="font-mono font-semibold text-zinc-900">+91 {booking.phoneNumber}</span>
            </div>
            <div>
              <span className="text-zinc-400 block">Selected Service</span>
              <span className="font-semibold text-zinc-900">{booking.selectedSubService}</span>
            </div>
            <div>
              <span className="text-zinc-400 block">Gorakhpur Area</span>
              <span className="font-semibold text-zinc-900">{booking.gorakhpurArea}</span>
            </div>
            <div className="sm:col-span-2 pt-2 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-zinc-500">Inspection Fee:</span>
              <span className="font-mono font-bold text-zinc-950">
                ₹{booking.inspectionFee} (Waived on repair • Pay after service)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Contact Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={`https://wa.me/917307310320?text=Hi%20Zalvix%20Group,%20my%20Booking%20ID%20is%20${booking?.bookingId || "NEW"}.%20Please%20confirm%20my%20time%20slot.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-zinc-950 text-white font-medium text-xs hover:bg-zinc-800 transition"
        >
          <MessageCircle className="w-4 h-4 text-zinc-300" />
          <span>WhatsApp Coordinator</span>
        </a>
        <a
          href="tel:+917307310320"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-zinc-300 text-zinc-900 font-medium text-xs hover:bg-zinc-100 transition"
        >
          <Phone className="w-4 h-4 text-zinc-600" />
          <span>Call Support</span>
        </a>
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-950 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
