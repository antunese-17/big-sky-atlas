"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Expedition } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { MetadataStrip } from "@/components/ui/MetadataStrip";
import { Overline } from "@/components/ui/typography";

type ExpeditionCardVariant = "featured" | "grid" | "compact";

type ExpeditionCardProps = {
  expedition: Expedition;
  variant?: ExpeditionCardVariant;
  index?: number;
  className?: string;
};

export function ExpeditionCard({
  expedition,
  variant = "featured",
  className,
}: ExpeditionCardProps) {
  if (variant === "featured") {
    return <FeaturedCard expedition={expedition} className={className} />;
  }
  if (variant === "grid") {
    return <GridCard expedition={expedition} className={className} />;
  }
  return <CompactCard expedition={expedition} className={className} />;
}

function ImageArea({
  expedition,
  sizes,
  className,
}: {
  expedition: Expedition;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-bsa-pinheiro", className)}>
      {expedition.cover_image ? (
        <Image
          src={expedition.cover_image}
          alt={expedition.name}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.75,0,0.25,1)] group-hover:scale-[1.05]"
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-[1000ms] ease-[cubic-bezier(0.75,0,0.25,1)] group-hover:scale-[1.05]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #2A3820 0%, #1A2638 100%)",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

function FeaturedCard({
  expedition,
  className,
}: {
  expedition: Expedition;
  className?: string;
}) {
  return (
    <Link
      href={`/expeditions/${expedition.slug}`}
      data-cursor="image"
      className={cn(
        "group relative block aspect-[3/4] w-[340px] flex-shrink-0 overflow-hidden rounded-[24px_0_24px_0]",
        className,
      )}
    >
      <ImageArea
        expedition={expedition}
        sizes="340px"
        className="absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-bsa-carvao/70 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-6 text-bsa-papel">
        <p className="font-technical text-[14px] uppercase tracking-[0.22em] text-bsa-lanterna">
          {expedition.number}
        </p>
        <h3 className="mt-2 font-display text-[32px] leading-none text-bsa-papel">
          {expedition.name}
        </h3>
        <div className="mt-3">
          <MetadataStrip
            animate={false}
            size="small"
            color="papel"
            items={[
              { label: `${expedition.duration_days} days` },
              { label: expedition.region },
              { label: `Intensity ${expedition.intensity}/5` },
            ]}
          />
        </div>
        <p
          aria-hidden="true"
          className="mt-4 translate-y-full font-technical text-[12px] uppercase tracking-[0.22em] text-bsa-lanterna opacity-0 transition-all duration-[400ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:translate-y-0 group-hover:opacity-100"
        >
          View expedition →
        </p>
      </div>
    </Link>
  );
}

function GridCard({
  expedition,
  className,
}: {
  expedition: Expedition;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex w-full flex-col transition-shadow duration-[600ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:shadow-[0_40px_80px_-10px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      <Link
        href={`/expeditions/${expedition.slug}`}
        data-cursor="image"
        className="block"
      >
        <ImageArea
          expedition={expedition}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="aspect-[16/10] rounded-[16px]"
        />
      </Link>
      <div className="mt-5">
        <Overline color="granito">
          {expedition.number} · {expedition.region}
        </Overline>
        <h3 className="mt-2 font-display text-[40px] leading-[1.05] text-bsa-carvao">
          {expedition.name}
        </h3>
        <div className="mt-2">
          <MetadataStrip
            animate={false}
            size="small"
            color="musgo"
            items={[
              { label: `${expedition.duration_days} days` },
              { label: `Intensity ${expedition.intensity}/5` },
              {
                label: `From $${expedition.price_from_usd.toLocaleString(
                  "en-US",
                )}`,
                accent: true,
              },
            ]}
          />
        </div>
        <div className="mt-4">
          <Button variant="ghost" href={`/expeditions/${expedition.slug}`}>
            View expedition →
          </Button>
        </div>
      </div>
    </article>
  );
}

function CompactCard({
  expedition,
  className,
}: {
  expedition: Expedition;
  className?: string;
}) {
  return (
    <Link
      href={`/expeditions/${expedition.slug}`}
      data-cursor="link"
      className={cn(
        "flex items-center gap-3 transition-opacity duration-200 hover:opacity-70",
        className,
      )}
    >
      <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded-[4px] bg-bsa-pinheiro">
        {expedition.cover_image ? (
          <Image
            src={expedition.cover_image}
            alt=""
            fill
            sizes="48px"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #2A3820 0%, #1A2638 100%)",
            }}
          />
        )}
      </div>
      <div className="min-w-0">
        <p className="truncate font-body text-[14px] font-medium">
          {expedition.name}
        </p>
        <p className="truncate font-technical text-[11px] uppercase tracking-[0.22em] text-bsa-granito">
          {expedition.region}
        </p>
      </div>
    </Link>
  );
}
