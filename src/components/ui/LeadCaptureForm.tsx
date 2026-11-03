"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

interface SubServiceOption {
  id: string;
  title: string;
  dropdownLabel: string;
  startingPrice: number;
}

interface AreaOption {
  id: string;
  name: string;
  pincode?: string | null;
}

interface LeadCaptureFormProps {
  categoryId: string;
  categoryName: string;
  subServices: SubServiceOption[];
  areas: AreaOption[];
}

export function LeadCaptureForm({
  categoryId,
  categoryName,
  subServices,
  areas,
}: LeadCaptureFormProps) {
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedSubService, setSelectedSubService] = useState(
    subServices.length > 0 ? subServices[0].dropdownLabel : ""
  );
  const [gorakhpurArea, setGorakhpurArea] = useState(
    areas.length > 0 ? areas[0].name : "Golghar"
  );
  const [fullAddress, setFullAddress] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!customerName.trim() || customerName.trim().length < 2) {
      setErrorMessage("Please enter your full name (at least 2 characters).");
      return;
    }

    const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
    if (cleanPhone.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!selectedSubService) {
      setErrorMessage("Please select a service option.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerName.trim(),
          phoneNumber: cleanPhone,
          categoryId,
          selectedSubService,
          gorakhpurArea,
          fullAddress: fullAddress.trim() || null,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit booking.");
      }

      router.push(data.redirectUrl || `/thank-you?booking_id=${data.bookingId}`);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div
      id="booking-lead-form"
      className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-7 sticky top-20"
    >
      <div className="mb-5 pb-4 border-b border-slate-100">
        <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
          Instant Gorakhpur Doorstep Booking
        </span>
        <h3 className="text-xl font-extrabold text-slate-900">
          Book {categoryName}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Flat ₹99 Inspection Fee • 100% Waived if repaired
        </p>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Sub-Service Dropdown */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Select Required Service *
          </label>
          <select
            value={selectedSubService}
            onChange={(e) => setSelectedSubService(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          >
            {subServices.map((sub) => (
              <option key={sub.id} value={sub.dropdownLabel}>
                {sub.dropdownLabel}
              </option>
            ))}
          </select>
        </div>

        {/* Customer Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Your Full Name *
          </label>
          <input
            type="text"
            placeholder="e.g. Rahul Verma"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />
        </div>

        {/* 10-Digit Mobile Number */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            10-Digit Mobile Number *
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-600 text-sm font-bold">
              +91
            </span>
            <input
              type="tel"
              maxLength={10}
              placeholder="9876543210"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-r-xl border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>
        </div>

        {/* Gorakhpur Area Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Gorakhpur Area / Colony *
          </label>
          <select
            value={gorakhpurArea}
            onChange={(e) => setGorakhpurArea(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          >
            {areas.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name} {a.pincode ? `(${a.pincode})` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Street / Landmark Address (Optional) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            House No. / Street / Landmark (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Near City Mall, House #12"
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 rounded-xl bg-orange-600 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-orange-700 active:scale-[0.99] shadow-lg shadow-orange-600/20 transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Confirming Booking...</span>
            </>
          ) : (
            <>
              <span>Proceed to Book</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* Trust Badges under Form */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Pay ₹0 now — Pay after service via Cash or UPI</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
          <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span>30-Day Doorstep Guarantee & Genuine Spares</span>
        </div>
      </div>
    </div>
  );
}
