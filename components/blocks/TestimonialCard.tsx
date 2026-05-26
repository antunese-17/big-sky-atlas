"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/types";
import { Overline } from "@/components/ui/typography";

type TestimonialCardVariant = "horizontal" | "vertical" | "inline";

type TestimonialCardProps = {
  testimonial: Testimonial;
  variant?: TestimonialCardVariant;
  className?: string;
};

const PLACEHOLDER_STYLE: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(135deg, rgba(168,173,167,0.3) 0%, rgba(168,173,167,0.1) 100%)",
};

function Portrait({
  testimonial,
  sizes,
  className,
}: {
  testimonial: Testimonial;
  sizes: string;
  className?: string;
}) {
  const { photo, name } = testimonial.author;
  return (
    <div
      className={cn(
        "relative aspect-[3/4] overflow-hidden rounded-[16px]",
        className,
      )}
    >
      {photo ? (
        <Image
          src={photo}
          alt={name}
          fill
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={PLACEHOLDER_STYLE}
        />
      )}
    </div>
  );
}

function Attribution({ testimonial }: { testimonial: Testimonial }) {
  const { name, origin, expedition_name } = testimonial.author;
  return (
    <footer className="mt-6">
      <p className="font-body text-[16px] font-[500] text-bsa-carvao">
        {"\u2014 "}
        {name}
      </p>
      <div className="mt-1">
        <Overline color="granito">
          {origin} · On the {expedition_name}
        </Overline>
      </div>
    </footer>
  );
}

export function TestimonialCard({
  testimonial,
  variant = "horizontal",
  className,
}: TestimonialCardProps) {
  if (variant === "horizontal") {
    return (
      <figure
        className={cn(
          "grid grid-cols-1 items-center gap-8 md:grid-cols-[40%_60%]",
          className,
        )}
      >
        <Portrait
          testimonial={testimonial}
          sizes="(min-width: 768px) 40vw, 100vw"
        />
        <div>
          <blockquote className="font-display text-[28px] font-normal italic leading-[1.3] tracking-[-0.01em] text-bsa-carvao">
            {testimonial.quote}
          </blockquote>
          <Attribution testimonial={testimonial} />
        </div>
      </figure>
    );
  }

  if (variant === "vertical") {
    return (
      <figure className={cn("flex flex-col", className)}>
        <Portrait
          testimonial={testimonial}
          sizes="(min-width: 768px) 280px, 80vw"
          className="mx-auto w-full max-w-[280px]"
        />
        <blockquote className="mt-8 font-display text-[36px] font-normal italic leading-[1.25] tracking-[-0.015em] text-bsa-carvao">
          {testimonial.quote}
        </blockquote>
        <Attribution testimonial={testimonial} />
      </figure>
    );
  }

  return (
    <figure className={className}>
      <blockquote className="font-display text-[28px] font-normal italic leading-[1.3] tracking-[-0.01em] text-bsa-carvao">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-4">
        <Overline color="granito">
          {"\u2014 "}
          {testimonial.author.name}, {testimonial.author.origin}
        </Overline>
      </figcaption>
    </figure>
  );
}
