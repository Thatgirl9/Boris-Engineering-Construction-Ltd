import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

/**
 * True once NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET
 * are set (see .env.example). Everything that reads from Sanity checks
 * this first and falls back to the local placeholder content in
 * lib/content/*.ts when it's false, so the site always builds and runs
 * even before a Sanity project exists.
 */
export const isSanityConfigured = Boolean(projectId && dataset);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: projectId as string,
      dataset: dataset as string,
      apiVersion: "2025-01-01",
      useCdn: true,
      perspective: "published",
    })
  : null;
