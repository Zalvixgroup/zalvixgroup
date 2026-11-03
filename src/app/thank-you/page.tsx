import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  ShieldCheck,
  MapPin,
  Wrench,
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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      {/* Top Success Badge */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-md">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Booking Request Received
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 pt-2">
            Thank You, {booking ? booking.customerName : "Customer"}!
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Our Gorakhpur service coordinator will call your mobile number within{" "}
            <span className="font-bold text-slate-900">10 minutes</span> to confirm the technician appointment.
          </p>
        </div>
      </div>

      {/* 3-Stage Progress Tracker */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 text-center">
          Doorstep Service Tracker
        </h3>
        <div className="grid grid-cols-3 gap-2 sm:gap-4 relative text-center">
          {/* Step 1: Request Confirmed (Done) */}
          <div className="space-y-2">
            <div className="w-9 h-9 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              ✓
            </div>
            <p className="text-xs sm:text-sm font-bold text-emerald-700">
              Request Received
            </p>
            <span className="text-[10px] text-slate-400 block">Completed</span>
          </div>

          {/* Step 2: Technician Assigned (In Progress) */}
          <div className="space-y-2">
            <div className="w-9 h-9 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm animate-pulse">
              2
            </div>
            <p className="text-xs sm:text-sm font-bold text-blue-700">
              Technician Assigning
            </p>
            <span className="text-[10px] text-slate-400 block">Within 10 Mins</span>
          </div>

          {/* Step 3: Repair & Pay (Pending) */}
          <div className="space-y-2">
            <div className="w-9 h-9 mx-auto rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-600">
              Repair & Pay
            </p>
            <span className="text-[10px] text-slate-400 block">Pay After Service</span>
          </div>
        </div>
      </div>

      {/* Booking Summary Card */}
      {booking && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Booking Details
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold font-mono">
              #{booking.bookingId}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-slate-400 block">Customer Name:</span>
              <span className="font-bold text-slate-800">{booking.customerName}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Mobile Number:</span>
              <span className="font-bold text-slate-800">+91 {booking.phoneNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Selected Service:</span>
              <span className="font-bold text-slate-800">{booking.selectedSubService}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Gorakhpur Area:</span>
              <span className="font-bold text-slate-800">{booking.gorakhpurArea}</span>
            </div>
            {booking.fullAddress && (
              <div className="sm:col-span-2">
                <span className="text-slate-400 block">Address:</span>
                <span className="font-bold text-slate-800">{booking.fullAddress}</span>
              </div>
            )}
            <div className="sm:col-span-2 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="font-semibold text-slate-600">Inspection Fee:</span>
              <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                ₹{booking.inspectionFee} (Waived on Repair • Pay Post Service)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contact & WhatsApp Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={`https://wa.me/917307310320?text=Hi%20Zalvix%20Group,%20my%20Booking%20ID%20is%20${booking?.bookingId || "NEW"}.%20Please%20confirm%20my%20time%20slot.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition shadow-md"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Chat on WhatsApp</span>
        </a>
        <a
          href="tel:+917307310320"
          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition shadow-md"
        >
          <Phone className="w-5 h-5" />
          <span>Call Service Manager</span>
        </a>
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
