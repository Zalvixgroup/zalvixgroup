import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowUpRight } from "lucide-react";

interface FooterProps {
  areas?: { name: string }[];
  categories?: { name: string; slug: string }[];
}

export function Footer({ areas = [], categories = [] }: FooterProps) {
  return (
    <footer className="bg-zinc-950 text-zinc-400 pt-16 pb-20 md:pb-14 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-zinc-900">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white border border-zinc-700">
                <Image
                  src="/logo.png"
                  alt="Zalvix Group"
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                Zalvix<span className="text-zinc-500 font-normal">Group</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Precision doorstep home appliance service in Gorakhpur. Verified technicians, flat ₹99 inspection (waived on repair), and 30-day guarantee.
            </p>
            <div className="text-[11px] font-mono text-zinc-500 space-y-1">
              <div>SLA: 10-Minute Slot Confirmation</div>
              <div>Terms: 100% Pay Post-Service</div>
            </div>
          </div>

          {/* Appliances Services */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-200 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/services/${cat.slug}`}
                      className="hover:text-white transition flex items-center justify-between group"
                    >
                      <span>{cat.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li><Link href="/services/ac-repair" className="hover:text-white transition">AC Repair</Link></li>
                  <li><Link href="/services/refrigerator-repair" className="hover:text-white transition">Refrigerator Repair</Link></li>
                  <li><Link href="/services/washing-machine-repair" className="hover:text-white transition">Washing Machine Repair</Link></li>
                  <li><Link href="/services/ro-water-purifier" className="hover:text-white transition">RO Purifier Service</Link></li>
                  <li><Link href="/services/geyser-repair" className="hover:text-white transition">Geyser Repair</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-200 mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-zinc-500 block mb-1">Helpline & Dispatch</span>
                <a
                  href="tel:+917307310320"
                  className="font-mono text-sm text-white hover:underline flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  +91 73073 10320
                </a>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1">Official Email</span>
                <a
                  href="mailto:noreply@zalvixgroup.in"
                  className="text-zinc-300 hover:text-white transition"
                >
                  noreply@zalvixgroup.in
                </a>
              </div>
              <div className="text-[11px] text-zinc-500 pt-1">
                Hours: 08:00 — 20:00 (All 7 Days)
              </div>
            </div>
          </div>

          {/* Gorakhpur Coverage */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-200 mb-4">
              Gorakhpur Coverage
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(areas.length > 0 ? areas : [
                { name: "Golghar" },
                { name: "Taramandal" },
                { name: "Medical College Rd" },
                { name: "Civil Lines" },
                { name: "Gorakhnath" },
                { name: "Rustampur" },
                { name: "Asuran" },
                { name: "Shahpur" }
              ]).map((a) => (
                <span
                  key={a.name}
                  className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400"
                >
                  {a.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Rights */}
        <div className="pt-8 text-xs text-zinc-600 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Zalvix Group. Pure & Transparent Service.</span>
          <span className="font-mono text-[11px] text-zinc-500">
            ZERO ADVANCE • PAY POST-SERVICE
          </span>
        </div>
      </div>
    </footer>
  );
}
