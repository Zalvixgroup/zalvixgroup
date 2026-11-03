import Link from "next/link";
import { Wrench, Phone, ShieldCheck, Clock } from "lucide-react";

interface FooterProps {
  areas?: { name: string }[];
  categories?: { name: string; slug: string }[];
}

export function Footer({ areas = [], categories = [] }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-14 pb-20 md:pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Gorakhpur<span className="text-blue-500">Repairs</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Gorakhpur’s premier doorstep appliance repair service. Verified technicians, flat ₹99 inspection (waived on repair), and 30-day warranty.
            </p>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>30-Day Doorstep Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>10-Minute SLA Call Back</span>
              </div>
            </div>
          </div>

          {/* Appliances Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3">
              Appliance Services
            </h4>
            <ul className="space-y-2 text-sm">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/services/${cat.slug}`}
                      className="hover:text-blue-400 transition"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li><Link href="/services/ac-repair" className="hover:text-blue-400">AC Repair Gorakhpur</Link></li>
                  <li><Link href="/services/refrigerator-repair" className="hover:text-blue-400">Refrigerator Repair</Link></li>
                  <li><Link href="/services/washing-machine-repair" className="hover:text-blue-400">Washing Machine Repair</Link></li>
                  <li><Link href="/services/ro-water-purifier" className="hover:text-blue-400">RO Water Purifier Service</Link></li>
                  <li><Link href="/services/geyser-repair" className="hover:text-blue-400">Geyser Repair Gorakhpur</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Quick Links & Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3">
              Quick Support
            </h4>
            <div className="space-y-3 text-sm">
              <p className="text-slate-400">
                Direct Dispatch & Helpline:
              </p>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600/20 text-blue-400 font-bold hover:bg-blue-600 hover:text-white transition"
              >
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </a>
              <p className="text-xs text-slate-500">
                Operational Hours: 8:00 AM – 8:00 PM (All 7 Days)
              </p>
            </div>
          </div>

          {/* Local Gorakhpur SEO Tag Cloud */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3">
              Service Areas
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {areas.length > 0 ? (
                areas.map((a) => (
                  <span
                    key={a.name}
                    className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300"
                  >
                    {a.name}
                  </span>
                ))
              ) : (
                ["Golghar", "Taramandal", "Medical College Road", "Civil Lines", "Gorakhnath", "Rustampur", "Asuran Chowk", "Shahpur"].map((name) => (
                  <span
                    key={name}
                    className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300"
                  >
                    {name}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Gorakhpur Repairs. All rights reserved.</span>
          <span>Zero Advance Payment • 100% Pay After Doorstep Service</span>
        </div>
      </div>
    </footer>
  );
}
