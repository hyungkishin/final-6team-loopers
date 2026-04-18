import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Loopers BE L2 · 6팀 회고",
    short_name: "6팀 회고",
    description: "10주 동안, 우리가 쌓아올린 것. Loopers BE L2 회고 발표자료.",
    start_url: "/",
    display: "standalone",
    orientation: "landscape",
    background_color: "#0a0a0b",
    theme_color: "#0a0a0b",
    lang: "ko",
    categories: ["education", "productivity"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
