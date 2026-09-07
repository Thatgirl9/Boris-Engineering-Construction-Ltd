import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "./client";

interface SanityImageSource {
  asset?: { _ref: string; _type: string };
  [key: string]: unknown;
}

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

/** Returns a ready-to-use image URL, or null if Sanity isn't configured
 *  or the field is empty (callers should fall back to a placeholder). */
export function urlForImage(source: SanityImageSource | undefined | null): string | null {
  if (!builder || !source?.asset) return null;
  return builder.image(source).width(1200).fit("max").auto("format").url();
}
