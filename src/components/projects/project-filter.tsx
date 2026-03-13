"use client";

import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

interface ProjectFilterProps {
  filters: { key: string; label: string }[];
}

export function ProjectFilter({ filters }: ProjectFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const activeFilter = searchParams.get("category") ?? "all";

  function handleFilter(key: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (key === "all") {
      params.delete("category");
    } else {
      params.set("category", key);
    }
    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`);
  }

  return (
    <div className="mb-12 flex flex-wrap justify-center gap-2">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => handleFilter(filter.key)}
          className={cn(
            "rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300",
            activeFilter === filter.key
              ? "bg-accent text-white shadow-md shadow-accent/20"
              : "border border-secondary-200 bg-white text-secondary-600 hover:border-accent/30 hover:text-primary-800",
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
