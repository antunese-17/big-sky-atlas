"use client";

import "swiper/css";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperClass } from "swiper";
import { FreeMode, Mousewheel, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ExpeditionCard } from "@/components/blocks/ExpeditionCard";
import { Body, Display, Overline } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { Expedition } from "@/lib/types";

type FeaturedExpeditionsProps = {
  expeditions: Expedition[];
};

export function FeaturedExpeditions({
  expeditions,
}: FeaturedExpeditionsProps) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <header className="max-w-[1440px]">
        <Overline color="musgo">Featured · Five expeditions</Overline>
        <Display size="l" as="h2" className="mt-6">
          Choose your route
        </Display>
        <Body size="large" className="mt-6 max-w-[560px]">
          Five technical routes across Montana and Wyoming, each designed
          around the terrain that shaped it.
        </Body>
      </header>

      <div className="mt-12">
        <Swiper
          data-cursor="drag"
          onSwiper={setSwiper}
          onSlideChange={(instance) => setActiveIndex(instance.activeIndex)}
          modules={[Navigation, Pagination, Mousewheel, FreeMode]}
          slidesPerView="auto"
          spaceBetween={24}
          centeredSlides
          grabCursor
          mousewheel={{ forceToAxis: true }}
          freeMode={false}
          loop={false}
          className="w-full py-8"
        >
          {expeditions.map((expedition) => (
            <SwiperSlide key={expedition.slug} className="!w-auto">
              <ExpeditionCard expedition={expedition} variant="featured" />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-6 flex items-center justify-between">
          <ol
            aria-label="Slide progress"
            className="flex items-center gap-2 font-mono text-[11px] tracking-[0.04em]"
          >
            {expeditions.map((expedition, index) => {
              const isActive = index === activeIndex;
              return (
                <li
                  key={expedition.slug}
                  className="flex items-center gap-2"
                  aria-current={isActive ? "true" : undefined}
                >
                  <span
                    className={cn(
                      "transition-colors duration-[400ms] ease-[cubic-bezier(0.165,0.84,0.44,1)]",
                      isActive
                        ? "font-bold text-bsa-brasa"
                        : "text-bsa-carvao/50",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {index < expeditions.length - 1 ? (
                    <span aria-hidden="true" className="text-bsa-carvao/30">
                      ·
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous expedition"
              data-cursor="link"
              onClick={() => swiper?.slidePrev()}
              disabled={activeIndex === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bsa-carvao/30 transition-opacity duration-200 hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next expedition"
              data-cursor="link"
              onClick={() => swiper?.slideNext()}
              disabled={activeIndex === expeditions.length - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bsa-carvao/30 transition-opacity duration-200 hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
