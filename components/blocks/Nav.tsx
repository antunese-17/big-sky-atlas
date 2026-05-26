"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/expeditions", label: "Expeditions" },
  { href: "/ethos", label: "Ethos" },
  { href: "/contact", label: "Contact" },
] as const;

const PRECISE_EASE = [0.4, 0, 0.2, 1] as const;

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mode, setMode] = useState<string>("papel");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setMode(root.getAttribute("data-mode") ?? "papel");
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-mode"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const isLinkActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  let chromeClasses: string;
  if (open) {
    chromeClasses = "bg-transparent text-bsa-papel";
  } else if (scrolled) {
    chromeClasses =
      "bg-bsa-papel/90 text-bsa-carvao backdrop-blur-sm";
  } else if (mode === "noite") {
    chromeClasses = "bg-transparent text-bsa-papel";
  } else {
    chromeClasses = "bg-transparent text-bsa-carvao";
  }

  return (
    <>
      <nav
        aria-label="Primary"
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-16",
          "flex items-center justify-between px-6 md:px-10",
          "transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          chromeClasses,
        )}
      >
        <Link
          href="/"
          data-cursor="link"
          className="font-technical text-[13px] font-bold uppercase tracking-[0.22em]"
        >
          BIG SKY ATLAS
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                data-cursor="link"
                className={cn(
                  "font-body text-[13px] font-medium transition-opacity duration-200 hover:opacity-70",
                  isLinkActive(link.href) &&
                    "underline decoration-bsa-brasa decoration-[1px] underline-offset-4",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          data-cursor="link"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-10 w-10 flex-col items-center justify-center md:hidden"
        >
          <motion.span
            className="absolute block h-[1.5px] w-6 bg-current"
            animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -7 }}
            transition={{ duration: 0.3, ease: PRECISE_EASE }}
          />
          <motion.span
            className="absolute block h-[1.5px] w-6 bg-current"
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="absolute block h-[1.5px] w-6 bg-current"
            animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 7 }}
            transition={{ duration: 0.3, ease: PRECISE_EASE }}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: PRECISE_EASE }}
            onClick={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
            className="fixed inset-0 z-40 bg-bsa-noite-alpina text-bsa-papel md:hidden"
          >
            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.4, delay: 0.1, ease: PRECISE_EASE }}
              className="flex h-full flex-col items-start justify-center gap-8 px-6"
            >
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-cursor="link"
                    onClick={() => setOpen(false)}
                    className={cn(
                      "font-display text-[40px] leading-none transition-opacity duration-200 hover:opacity-70",
                      isLinkActive(link.href) &&
                        "underline decoration-bsa-brasa decoration-[1px] underline-offset-[6px]",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
