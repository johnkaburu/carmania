import type { ImageLoader } from "next/image";

/**
 * Unsplash resizes on its own CDN, so let the browser fetch the right size directly
 * instead of routing every photo through Next's server-side optimizer.
 */
export const unsplashLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  return url.toString();
};
