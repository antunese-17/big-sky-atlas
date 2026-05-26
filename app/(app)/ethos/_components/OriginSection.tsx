"use client";

import { useEffect, useRef } from "react";

export function OriginSection() {
  const photoColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = photoColRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -48px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="origin" aria-label="Our origin">
      {/* LEFT — photo card */}
      <div ref={photoColRef} className="origin__photo-col">
        <p className="origin__section-label reveal">The Story</p>
        <div className="origin__card">
          <div className="origin__photo-grid">
            <div
              className="origin__photo origin__photo--large"
              role="img"
              aria-label="Rocky mountain trail descending to a glacial lake, Glacier N.P."
            >
              <img
                src="/images/origin-lake.jpg"
                alt="Rocky trail leading down to a turquoise glacial lake, surrounded by spruce forest and mountains"
              />
            </div>

            <div
              className="origin__photo origin__photo--sm-top"
              role="img"
              aria-label="Mountain guide looking out at the Montana landscape"
            >
              <img
                src="/images/origin-guide.jpg"
                alt="Guide from behind, looking at mountain range under blue sky"
              />
            </div>

            <div
              className="origin__photo origin__photo--sm-bottom"
              role="img"
              aria-label="Worn hiking boots and folded topographic map on grey granite"
            >
              <img
                src="/images/origin-boots.jpg"
                alt="Worn leather hiking boots next to a topographic map on granite rock with lichen"
              />
            </div>
          </div>

          <div className="origin__photo-caption">
            <span className="origin__photo-caption-text">
              Whitefish Range · Montana
            </span>
            <span
              className="origin__photo-caption-dot"
              aria-hidden="true"
            ></span>
          </div>
        </div>
      </div>

      {/* RIGHT — story text */}
      <div className="origin__text">
        <p className="origin__est reveal">Est. 2019</p>

        <h2 className="origin__h2 reveal">
          <span className="dim">It starts with</span> a question
          <br />
          <span className="dim">in the middle of</span> the snow.
        </h2>

        <p className="origin__body reveal reveal-delay-1">
          In 2019, two guides who met on an ice wall in{" "}
          <em className="kw">Whitefish</em> had the same question at the same
          time: why is it so hard to find someone who truly knows this{" "}
          <em className="kw">terrain</em>?
        </p>
        <p className="origin__body reveal reveal-delay-2">
          Not the map. The <em className="kw">terrain</em>.
        </p>
        <p className="origin__body reveal reveal-delay-3">
          <em className="kw">Big Sky Atlas</em> grew out of that conversation.
          Not as a tourism company — but as an answer to a gap that frustrates
          any traveler who has tried to go beyond the obvious in{" "}
          <em className="kw">Montana</em>.
        </p>

        <div className="origin__pull reveal reveal-delay-4">
          <blockquote>
            &ldquo;The land decides,
            <br />
            the itinerary follows.&rdquo;
          </blockquote>
          <cite>— Founding principle, Whitefish, Winter 2019</cite>
        </div>
      </div>
    </section>
  );
}
