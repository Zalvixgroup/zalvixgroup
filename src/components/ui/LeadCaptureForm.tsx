"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Check } from "lucide-react";

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
      className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-card sticky top-24"
    >
      <div className="mb-6 pb-5 border-b border-zinc-100">
        <span className="inline-block px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-900 text-[10px] font-mono uppercase tracking-widest mb-2 border border-zinc-200">
          Gorakhpur Doorstep Dispatch
        </span>
        <h3 className="text-xl font-bold tracking-tight text-zinc-950">
          Book {categoryName}
        </h3>
        <p className="text-xs text-zinc-500 mt-1">
          ₹99 flat inspection fee • 100% Waived if service taken
        </p>
      </div>

      {errorMessage && (
        <div className="mb-5 p-3 rounded-xl bg-zinc-100 border border-zinc-300 text-zinc-900 text-xs font-medium">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Sub-Service Dropdown */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Service Required *
          </label>
          <select
            value={selectedSubService}
            onChange={(e) => setSelectedSubService(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition"
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
          <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            placeholder="e.g. Rahul Verma"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition"
          />
        </div>

        {/* 10-Digit Mobile Number */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Mobile Number *
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-zinc-200 bg-zinc-100 text-zinc-700 text-xs sm:text-sm font-mono">
              +91
            </span>
            <input
              type="tel"
              maxLength={10}
              placeholder="7307310320"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-r-xl border border-zinc-200 bg-white text-zinc-900 text-xs sm:text-sm font-mono focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition"
            />
          </div>
        </div>

        {/* Gorakhpur Area Selector */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Area / Colony in Gorakhpur *
          </label>
          <select
            value={gorakhpurArea}
            onChange={(e) => setGorakhpurArea(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition"
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
          <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
            House / Landmark (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Near City Mall, House #12"
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 rounded-xl bg-zinc-950 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-zinc-800 active:scale-[0.99] transition shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
              <span>Confirming Booking...</span>
            </>
          ) : (
            <>
              <span>Proceed to Book</span>
              <ArrowRight className="w-4 h-4 text-zinc-400" />
            </>
          )}
        </button>
      </form>

      {/* Trust Badges */}
      <div className="mt-6 pt-5 border-t border-zinc-100 space-y-2 text-xs text-zinc-600">
        <div className="flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-zinc-900 flex-shrink-0" />
          <span>Pay ₹0 now — Pay after service via Cash or UPI</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-zinc-900 flex-shrink-0" />
          <span>30-Day Doorstep Guarantee & Genuine Spares</span>
        </div>
      </div>
    </div>
  );
}
