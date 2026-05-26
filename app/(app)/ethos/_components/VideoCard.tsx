"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster: string;
  label: string;
};

export function VideoCard({ src, poster, label }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video) return;

    const onClick = () => {
      if (video.paused) {
        void video.play();
        card.classList.add("playing");
      } else {
        video.pause();
        card.classList.remove("playing");
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    };
    const onEnded = () => card.classList.remove("playing");

    card.addEventListener("click", onClick);
    card.addEventListener("keydown", onKeyDown);
    video.addEventListener("ended", onEnded);

    return () => {
      card.removeEventListener("click", onClick);
      card.removeEventListener("keydown", onKeyDown);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="hero__video"
      role="button"
      aria-label="Play expedition reel"
      tabIndex={0}
    >
      <video
        ref={videoRef}
        className="hero__video-el"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
      />
      <div className="hero__video-thumb"></div>
      <div className="hero__video-btn">
        <div className="hero__video-btn-inner">
          <div className="hero__video-btn-icon"></div>
        </div>
      </div>
      <p className="hero__video-label">{label}</p>
    </div>
  );
}
