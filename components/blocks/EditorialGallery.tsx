"use client";

import "photoswipe/style.css";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";

import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/lib/types";
import { useReducedMotion } from "@/components/features/ReducedMotionProvider";

type EditorialGalleryProps = {
  images: GalleryImage[];
  className?: string;
};

const NATURAL_EASE = [0.165, 0.84, 0.44, 1] as const;

export function EditorialGallery({
  images,
  className,
}: EditorialGalleryProps) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let lightbox: { destroy: () => void } | null = null;
    let cancelled = false;

    (async () => {
      const { default: PhotoSwipeLightbox } = await import(
        "photoswipe/lightbox"
      );
      if (cancelled) return;

      const instance = new PhotoSwipeLightbox({
        gallery: "#bsa-gallery",
        children: "a",
        pswpModule: () => import("photoswipe"),
      });

      instance.on("uiRegister", () => {
        instance.pswp?.ui?.registerElement({
          name: "bsa-caption",
          order: 9,
          isButton: false,
          appendTo: "root",
          onInit: (el, pswp) => {
            pswp.on("change", () => {
              const element = pswp.currSlide?.data.element;
              const caption =
                element?.getAttribute("data-caption") ?? "";
              el.innerHTML = caption;
              el.style.color = "#FAF8F4";
              el.style.fontFamily = "'Satoshi', system-ui, sans-serif";
              el.style.fontSize = "13px";
              el.style.lineHeight = "1.5";
              el.style.position = "absolute";
              el.style.bottom = "24px";
              el.style.left = "50%";
              el.style.transform = "translateX(-50%)";
              el.style.maxWidth = "640px";
              el.style.padding = "0 16px";
              el.style.textAlign = "center";
              el.style.pointerEvents = "none";
            });
          },
        });
      });

      instance.init();
      lightbox = instance;
    })();

    return () => {
      cancelled = true;
      lightbox?.destroy();
    };
  }, []);

  return (
    <div
      id="bsa-gallery"
      className={cn("columns-2 gap-3 md:columns-3", className)}
    >
      {images.map((image, index) => {
        const content = (
          <a
            href={image.src}
            data-pswp-width={image.width}
            data-pswp-height={image.height}
            data-cropped="true"
            data-caption={image.caption ?? ""}
            data-cursor="image"
            aria-label={image.alt}
            className="group relative block w-full overflow-hidden rounded-[8px] ring-[0.5px] ring-bsa-carvao/10 transition-[transform,box-shadow] duration-[400ms] ease-[cubic-bezier(0.165,0.84,0.44,1)] hover:scale-[1.02] hover:ring-bsa-carvao/20"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 768px) 50vw, 33vw"
              className="h-auto w-full object-cover"
            />
          </a>
        );

        const wrapperClasses = "mb-3 break-inside-avoid";

        if (reducedMotion) {
          return (
            <div key={`${image.src}-${index}`} className={wrapperClasses}>
              {content}
            </div>
          );
        }

        return (
          <motion.div
            key={`${image.src}-${index}`}
            className={wrapperClasses}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
              ease: NATURAL_EASE,
            }}
          >
            {content}
          </motion.div>
        );
      })}
    </div>
  );
}
