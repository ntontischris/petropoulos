import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Group 110 Real Estate & Consulting",
    short_name: "Group 110",
    description: "Smart Real Estate Investments",
    start_url: "/el",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1b2a4a",
  };
}
