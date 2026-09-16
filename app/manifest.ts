import type { MetadataRoute } from "next";
import { SITE_METADATA } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_METADATA.title,
    short_name: "THPT 2027",
    description: SITE_METADATA.description,
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    orientation: "portrait",
    categories: ["education", "utilities"],
    icons: [
      {
        src: "/favicon/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/favicon/android-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/favicon/android-icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/favicon/android-icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
    ],
  };
}
