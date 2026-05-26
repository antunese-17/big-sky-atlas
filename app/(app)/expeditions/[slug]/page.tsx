import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EXPEDITIONS, getExpedition } from "@/lib/expeditions-data";
import { ExpeditionDetail } from "./ExpeditionDetail";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return EXPEDITIONS.map((expedition) => ({ slug: expedition.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const expedition = getExpedition(slug);
  if (!expedition) return { title: "Expedition not found" };
  return {
    title: { absolute: `${expedition.name} · Big Sky Atlas` },
    description: expedition.days[0]?.desc,
  };
}

export default async function ExpeditionDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const expedition = getExpedition(slug);
  if (!expedition) notFound();
  return <ExpeditionDetail expedition={expedition} />;
}
