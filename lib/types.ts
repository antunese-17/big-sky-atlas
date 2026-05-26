export type Expedition = {
  id: string;
  slug: string;
  number: string;
  name: string;
  subtitle: string;
  region: string;
  duration_days: number;
  intensity: number;
  tech_grade: string;
  elevation_max_m: number;
  price_from_usd: number;
  group_size_max: number;
  ideal_for: string[];
  highlights: string[];
  cover_image?: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  aspect?: "landscape" | "portrait" | "square";
  width: number;
  height: number;
};

export type ItineraryDay = {
  number: number;
  title: string;
  narrative: string;
  image?: string;
  elevation_gain_m?: number;
  distance_km?: number;
  hours?: number;
};

export type Testimonial = {
  quote: string;
  author: {
    name: string;
    origin: string;
    expedition_name: string;
    expedition_slug: string;
    photo?: string;
  };
};
