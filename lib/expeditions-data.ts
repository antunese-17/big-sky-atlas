export type ExpeditionTrailId = "bighorn" | "beartooth" | "teton";

export type ExpeditionDay = {
  step: number;
  overline: string;
  title: string;
  desc: string;
};

export type ExpeditionMeta = {
  duration: string;
  distance: string;
  effort: string;
  season: string;
  price: string;
};

export type ExpeditionVideo = {
  src: string;
  poster: string;
};

export type Expedition = {
  slug: string;
  id: ExpeditionTrailId;
  name: string;
  sectionLabel: string;
  days: ExpeditionDay[];
  meta: ExpeditionMeta;
  video: ExpeditionVideo;
};

export const EXPEDITIONS: Expedition[] = [
  {
    slug: "bighorn-sanctuary",
    id: "bighorn",
    name: "Bighorn Sanctuary",
    sectionLabel: "Bighorn Sanctuary",
    days: [
      {
        step: 0,
        overline: "Bighorn Sanctuary · Day 01",
        title: "The approach",
        desc: "Dawn in Buffalo, Wyoming. Coffee black as basalt. The trailhead is forty minutes on dirt road — you won't find it without a guide who's been there before.",
      },
      {
        step: 1,
        overline: "Bighorn Sanctuary · Day 02",
        title: "Mirror lake",
        desc: "Twelve miles in, the sanctuary opens. Mornings are glass. Afternoons are wind. The camp sits on a granite shelf above water that holds the range upside-down.",
      },
      {
        step: 2,
        overline: "Bighorn Sanctuary · Day 03",
        title: "The walk out",
        desc: "Down through the pines the way we came. Different light. Different legs. You won't forget the quiet — it's what the walk was for.",
      },
    ],
    meta: {
      duration: "3",
      distance: "48",
      effort: "Moderate",
      season: "Jun—Sep",
      price: "$1,890",
    },
    video: {
      src: "/videos/BIGHORN.mp4",
      poster: "/images/Calm_alpine_lake_202604192136.png",
    },
  },
  {
    slug: "beartooth-summits",
    id: "beartooth",
    name: "Beartooth Summits",
    sectionLabel: "Beartooth Summits",
    days: [
      {
        step: 0,
        overline: "Beartooth Summits · Day 01",
        title: "Above the treeline",
        desc: "We cross Beartooth Pass at 10,900 feet. The last tree falls behind us by noon. Weather is the plan — we adjust, we don't push.",
      },
      {
        step: 1,
        overline: "Beartooth Summits · Day 02",
        title: "The plateau",
        desc: "A full day on high ground. Wildflowers where the snow pulled back last month. Alpine lakes you can see the bottom of. The air thins. You learn to notice it.",
      },
      {
        step: 2,
        overline: "Beartooth Summits · Day 03",
        title: "Twin lakes descent",
        desc: "Down through glacial cirques. Optional summit in the morning for those who want it. By evening, we're back to cell signal — the part of the trip you haven't missed.",
      },
    ],
    meta: {
      duration: "3",
      distance: "52",
      effort: "Challenging",
      season: "Jul—Sep",
      price: "$2,340",
    },
    video: {
      src: "/videos/BEARTOOTH.mp4",
      poster: "/images/Vast_alpine_plateau_202604192136.png",
    },
  },
  {
    slug: "teton-traverse",
    id: "teton",
    name: "Teton Traverse",
    sectionLabel: "Teton Traverse",
    days: [
      {
        step: 0,
        overline: "Teton Traverse · Day 01",
        title: "The saddle",
        desc: "From Jenny Lake up to the first saddle at 9,400 feet. The Cathedral Group grows closer with every switchback. First night at String Lake.",
      },
      {
        step: 1,
        overline: "Teton Traverse · Day 02",
        title: "Granite alley",
        desc: "The traverse day. Between the Middle and the Grand, you walk where only the weather and the light change. Lunch above Cascade Canyon.",
      },
      {
        step: 2,
        overline: "Teton Traverse · Day 03",
        title: "Paintbrush divide",
        desc: "One more pass before the walk out. The Tetons go quiet behind you. Leigh Lake to close. Cold beer in Moose by dinner.",
      },
    ],
    meta: {
      duration: "3",
      distance: "38",
      effort: "Moderate",
      season: "Jun—Sep",
      price: "$2,180",
    },
    video: {
      src: "/videos/ethos-hero.mp4",
      poster: "/images/Dramatic_granite_peaks_202604192136.png",
    },
  },
];

export function getExpedition(slug: string): Expedition | undefined {
  return EXPEDITIONS.find((e) => e.slug === slug);
}
