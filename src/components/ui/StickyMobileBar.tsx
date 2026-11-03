"use client";

import { MessageCircle, Phone, CalendarCheck } from "lucide-react";

interface StickyMobileBarProps {
  onBookClick?: () => void;
  bookingUrl?: string;
}

export function StickyMobileBar({ onBookClick, bookingUrl = "/services" }: StickyMobileBarProps) {
  const handleScrollToBooking = (e: React.MouseEvent) => {
    if (onBookClick) {
      e.preventDefault();
      onBookClick();
    } else {
      const formEl = document.getElementById("booking-lead-form");
      if (formEl) {
        e.preventDefault();
        formEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-zinc-200 px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-3 gap-2">
        {/* WhatsApp */}
        <a
          href="https://wa.me/917307310320?text=Hello%20Zalvix%20Group,%20I%20need%20doorstep%20appliance%20service."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-zinc-100 text-zinc-900 font-semibold text-xs hover:bg-zinc-200 transition active:scale-95 border border-zinc-200"
        >
          <MessageCircle className="w-4 h-4 mb-0.5 text-zinc-800" />
          <span>WhatsApp</span>
        </a>

        {/* Call Now */}
        <a
          href="tel:+917307310320"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-zinc-100 text-zinc-900 font-semibold text-xs hover:bg-zinc-200 transition active:scale-95 border border-zinc-200"
        >
          <Phone className="w-4 h-4 mb-0.5 text-zinc-800" />
          <span>Call Now</span>
        </a>

        {/* Book Service */}
        <a
          href={bookingUrl}
          onClick={handleScrollToBooking}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-zinc-950 text-white font-semibold text-xs hover:bg-zinc-800 transition active:scale-95 shadow-sm"
        >
          <CalendarCheck className="w-4 h-4 mb-0.5 text-zinc-300" />
          <span>Book Visit</span>
        </a>
      </div>
    </div>
  );
}
