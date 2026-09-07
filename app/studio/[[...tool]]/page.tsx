"use client";

// This route embeds the Sanity Studio directly in the Next.js app at
// /studio. It's a client-only editing surface, isn't linked from the
// public nav, and is excluded from search indexing in robots.ts.
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
