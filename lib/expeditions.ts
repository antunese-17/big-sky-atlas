import type {
  Expedition,
  GalleryImage,
  ItineraryDay,
  Testimonial,
} from "./types";

export const expeditions: Expedition[] = [
  {
    id: "teton-traverse",
    slug: "teton-traverse",
    number: "04",
    name: "Teton Traverse",
    subtitle: "Seven days across granite, three nights above timberline",
    region: "Grand Teton NP, Wyoming",
    duration_days: 7,
    intensity: 4,
    tech_grade: "4/5",
    elevation_max_m: 3842,
    price_from_usd: 11800,
    group_size_max: 6,
    ideal_for: ["experienced-adventurers", "couples-premium"],
    highlights: [
      "Technical ridge walking",
      "Three alpine camps",
      "Sunrise from 12,000ft",
      "Optional summit day",
    ],
  },
  {
    id: "wind-river-high-route",
    slug: "wind-river-high-route",
    number: "03",
    name: "Wind River High Route",
    subtitle: "Nine days off the map",
    region: "Wind River Range, Wyoming",
    duration_days: 9,
    intensity: 5,
    tech_grade: "3/5",
    elevation_max_m: 3950,
    price_from_usd: 14500,
    group_size_max: 5,
    ideal_for: ["experienced-adventurers"],
    highlights: [
      "True backcountry",
      "Continental Divide",
      "Glacier crossings",
      "Wildlife",
    ],
  },
  {
    id: "beartooth-summits",
    slug: "beartooth-summits",
    number: "02",
    name: "Beartooth Summits",
    subtitle: "Six days on the plateau",
    region: "Beartooth Plateau, Montana",
    duration_days: 6,
    intensity: 4,
    tech_grade: "3/5",
    elevation_max_m: 3750,
    price_from_usd: 9600,
    group_size_max: 8,
    ideal_for: ["couples-premium", "experienced-adventurers"],
    highlights: [
      "Alpine lakes",
      "Three summits",
      "Wildflower season",
      "Montana roof",
    ],
  },
  {
    id: "snake-river-whitewater",
    slug: "snake-river-whitewater",
    number: "05",
    name: "Snake River Whitewater",
    subtitle: "Four days of moving water",
    region: "Snake River, Wyoming",
    duration_days: 4,
    intensity: 3,
    tech_grade: "3/5",
    elevation_max_m: 2100,
    price_from_usd: 5400,
    group_size_max: 10,
    ideal_for: ["high-end-families", "corporate-groups"],
    highlights: [
      "Class III-IV rapids",
      "Riverside camping",
      "Bald eagles",
      "Moose",
    ],
  },
  {
    id: "bighorn-sanctuary",
    slug: "bighorn-sanctuary",
    number: "01",
    name: "Bighorn Sanctuary",
    subtitle: "Five days of slow water",
    region: "Bighorn Mountains, Wyoming",
    duration_days: 5,
    intensity: 2,
    tech_grade: "2/5",
    elevation_max_m: 2800,
    price_from_usd: 7200,
    group_size_max: 8,
    ideal_for: ["couples-premium", "high-end-families"],
    highlights: [
      "Trout streams",
      "High meadows",
      "Dark sky stargazing",
      "Lodge-based",
    ],
  },
];

export function getExpedition(slug: string): Expedition | undefined {
  return expeditions.find((e) => e.slug === slug);
}

export function getAllExpeditions(): Expedition[] {
  return expeditions;
}

export const tetonTraverseGallery: GalleryImage[] = [
  {
    src: "/images/placeholder-landscape.jpg",
    alt: "Ridge at dawn, Grand Teton",
    aspect: "landscape",
    width: 1600,
    height: 1000,
  },
  {
    src: "/images/placeholder-portrait.jpg",
    alt: "Climber on granite face",
    aspect: "portrait",
    width: 800,
    height: 1200,
  },
  {
    src: "/images/placeholder-landscape.jpg",
    alt: "Lake Solitude at sunrise",
    aspect: "landscape",
    width: 1600,
    height: 1000,
  },
  {
    src: "/images/placeholder-portrait.jpg",
    alt: "Camp above timberline",
    aspect: "portrait",
    width: 800,
    height: 1200,
  },
  {
    src: "/images/placeholder-landscape.jpg",
    alt: "Paintbrush Divide panorama",
    aspect: "landscape",
    width: 1600,
    height: 1000,
  },
  {
    src: "/images/placeholder-portrait.jpg",
    alt: "Guide checking route",
    aspect: "portrait",
    width: 800,
    height: 1200,
  },
];

export const tetonTraverseItinerary: ItineraryDay[] = [
  {
    number: 1,
    title: "Trailhead to Cascade Canyon",
    narrative:
      "We meet at the Jenny Lake trailhead at 0600. The first miles are deceptive — flat through lodgepole forest before the canyon walls close in and the real climbing starts. Camp at the canyon fork, elevation 7,200ft.",
    elevation_gain_m: 580,
    distance_km: 11,
    hours: 5,
  },
  {
    number: 2,
    title: "Lake Solitude",
    narrative:
      "The hardest day comes early. A sustained 2,000ft climb through switchbacks to the high country. Lake Solitude earns its name — you'll likely have it to yourselves.",
    elevation_gain_m: 850,
    distance_km: 14,
    hours: 7,
  },
  {
    number: 3,
    title: "Paintbrush Divide",
    narrative:
      "The traverse begins. Paintbrush Divide at 10,700ft is where the Tetons reveal themselves completely — 360° of granite and sky. First technical section: hands-on scrambling for 200 meters.",
    elevation_gain_m: 620,
    distance_km: 12,
    hours: 6,
  },
  {
    number: 4,
    title: "Above Timberline",
    narrative:
      "First camp above timberline, at 11,200ft. The guides set up while you explore the boulder fields. Dinner as the alpenglow hits the peaks — this is the moment most guests photograph.",
    elevation_gain_m: 480,
    distance_km: 9,
    hours: 5,
  },
  {
    number: 5,
    title: "Optional Summit Day",
    narrative:
      "For those who want it: a 0400 start for the summit attempt. Non-technical but serious — full exposure, grades to 3rd class. Back at camp by noon. Those who rest here are not wrong.",
    elevation_gain_m: 940,
    distance_km: 8,
    hours: 6,
  },
  {
    number: 6,
    title: "The Long Descent",
    narrative:
      "Everything changes on the way down. Different light, different muscles, different conversation. The valley appears in sections as the trail unwinds through aspen groves and meadows.",
    elevation_gain_m: 120,
    distance_km: 16,
    hours: 6,
  },
  {
    number: 7,
    title: "Return to Jenny Lake",
    narrative:
      "The last morning is always quiet. Gear packed by 0700, on the trail by 0730. The trailhead appears without ceremony. Three hours later you're at the airport, already planning the next one.",
    elevation_gain_m: 40,
    distance_km: 10,
    hours: 4,
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Three nights above 11,000 feet. I stopped checking my phone after day two. That's when the trip actually started.",
    author: {
      name: "Marcus Webb",
      origin: "Denver, CO",
      expedition_name: "Teton Traverse",
      expedition_slug: "teton-traverse",
    },
  },
  {
    quote:
      "We've done Patagonia, Nepal, the Dolomites. The Wind River route is the only place that made us feel genuinely small.",
    author: {
      name: "Sarah & Tom Elliot",
      origin: "Portland, OR",
      expedition_name: "Wind River High Route",
      expedition_slug: "wind-river-high-route",
    },
  },
  {
    quote:
      "The guides knew the terrain the way most people know their neighborhood. That's not something you manufacture.",
    author: {
      name: "James Okafor",
      origin: "Chicago, IL",
      expedition_name: "Beartooth Summits",
      expedition_slug: "beartooth-summits",
    },
  },
];
