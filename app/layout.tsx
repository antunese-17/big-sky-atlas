import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource/khand/500.css";
import "@fontsource/khand/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@/styles/globals.css";

import { SITE } from "@/lib/config";
import { ReducedMotionProvider } from "@/components/features/ReducedMotionProvider";
import { LenisProvider } from "@/components/features/LenisProvider";
import { ModeTracker } from "@/components/features/ModeTracker";
import { TrailDescentTransition } from "@/components/features/TrailDescentTransition";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US" className="lenis">
      <head>
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=gambarino@400&f[]=khand@400,500,600&display=swap"
        />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-bsa-md focus:bg-bsa-carvao focus:px-4 focus:py-2 focus:text-bsa-papel"
        >
          Skip to content
        </a>
        <ReducedMotionProvider>
          <LenisProvider>
            <ModeTracker />
            <TrailDescentTransition>{children}</TrailDescentTransition>
          </LenisProvider>
        </ReducedMotionProvider>
      </body>
    </html>
  );
}
