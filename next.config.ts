import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local placeholder art is SVG; swap in real photography (jpg/webp)
    // before launch and this can be removed along with dangerouslyAllowSVG.
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
