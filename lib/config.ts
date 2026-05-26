import {
  expeditions,
  getExpedition,
  getAllExpeditions,
} from "./expeditions";
import type { Expedition } from "./types";

export const SITE = {
  name: "Big Sky Atlas",
  tagline: "Expeditions in the Northern Rockies",
  description:
    "A boutique agency running five technical expeditions across Montana and Wyoming. Small groups. Local guides. No shortcuts.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  hq: {
    line1: "214 W Main",
    city: "Bozeman",
    state: "MT",
    zip: "59715",
  },
  hours: "Mon–Fri 08:00–18:00 MST · By appointment",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "14065550142",
  email: "hello@bigskyatlas.co",
  responseWindow: "Response within 4 hours · Mon–Fri",
} as const;

export type { Expedition };

export const EXPEDITIONS: readonly Expedition[] = expeditions;

export function getExpeditionBySlug(slug: string): Expedition | undefined {
  return getExpedition(slug);
}

export { expeditions, getExpedition, getAllExpeditions };
