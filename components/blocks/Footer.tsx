import Link from "next/link";

import { EXPEDITIONS, SITE } from "@/lib/config";

const COMPANY_LINKS = [
  { href: "/ethos", label: "Our Ethos" },
  { href: "/ethos#team", label: "Guides" },
  { href: "/ethos#principles", label: "Sustainability" },
  { href: "/press", label: "Press" },
] as const;

const LINK_CLASS =
  "font-body text-sm transition-opacity duration-200 hover:opacity-70";
const HEADER_CLASS =
  "font-technical text-[11px] uppercase tracking-[0.22em] text-bsa-lanterna";

export function Footer() {
  const phoneHref = `tel:+${SITE.whatsapp}`;
  const emailHref = `mailto:${SITE.email}`;

  return (
    <footer className="bg-[#040a12] px-10 py-[96px] text-bsa-papel">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-technical text-[16px] uppercase tracking-[0.22em]">
            BIG SKY ATLAS
          </p>
          <p className="mt-4 font-display text-[20px] italic leading-tight">
            Expeditions in the Northern Rockies
          </p>
          <p className="mt-6 font-body text-sm opacity-70">
            {SITE.hq.line1} · {SITE.hq.city} {SITE.hq.state} {SITE.hq.zip}
          </p>
        </div>

        <div>
          <h3 className={HEADER_CLASS}>Expeditions</h3>
          <ul className="mt-4 space-y-2">
            {EXPEDITIONS.map((expedition) => (
              <li key={expedition.slug}>
                <Link
                  href={`/expeditions/${expedition.slug}`}
                  className={LINK_CLASS}
                >
                  {expedition.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={HEADER_CLASS}>Company</h3>
          <ul className="mt-4 space-y-2">
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={LINK_CLASS}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={HEADER_CLASS}>Connect</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <a href={phoneHref} className={LINK_CLASS}>
                +1 406 555 0142
              </a>
            </li>
            <li>
              <a href={emailHref} className={LINK_CLASS}>
                {SITE.email}
              </a>
            </li>
            <li className="font-body text-sm opacity-70">
              Mon–Fri 08:00–18:00 MST
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-4 border-t border-bsa-papel/20 pt-8 md:flex-row md:items-center md:justify-between">
        <p className="text-[11px] opacity-70">
          © 2026 Big Sky Atlas · All rights reserved · Leave No Trace certified
          · AMGA accredited
        </p>
        <p className="text-[10px] opacity-40">EOSYS portfolio</p>
      </div>
    </footer>
  );
}
