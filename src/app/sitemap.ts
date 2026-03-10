import type { MetadataRoute } from "next";
import { createSupabaseServer } from "@/lib/supabase/server";

const BASE_URL = "https://group110.gr";
const LOCALES = ["el", "en"];

const STATIC_PAGES = [
  { path: "", priority: 1.0 },
  { path: "/services", priority: 0.9 },
  { path: "/projects", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/booking", priority: 0.8 },
  { path: "/contact", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const page of STATIC_PAGES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page.priority,
        alternates: {
          languages: {
            el: `${BASE_URL}/el${page.path}`,
            en: `${BASE_URL}/en${page.path}`,
          },
        },
      });
    }
  }

  // Dynamic project pages (only when Supabase is configured)
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabase = await createSupabaseServer();
      const { data: projects } = await supabase
        .from("projects")
        .select("slug, updated_at");

      if (projects) {
        for (const project of projects) {
          for (const locale of LOCALES) {
            entries.push({
              url: `${BASE_URL}/${locale}/projects/${project.slug}`,
              lastModified: new Date(project.updated_at),
              changeFrequency: "monthly",
              priority: 0.6,
              alternates: {
                languages: {
                  el: `${BASE_URL}/el/projects/${project.slug}`,
                  en: `${BASE_URL}/en/projects/${project.slug}`,
                },
              },
            });
          }
        }
      }
    } catch {
      // Supabase not configured yet - skip dynamic pages
    }
  }

  return entries;
}
