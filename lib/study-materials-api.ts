// lib/study-materials-api.ts
//
// Every screen reads materials through the functions below instead of
// importing mock data directly. That is the seam: when a real backend
// exists, replace the bodies of these two functions with `fetch` calls
// against /api/study-materials (see app/api/study-materials/route.ts)
// and nothing in components/ has to change.

import { studyMaterials } from "@/data/mock-study-materials";
import type {
  MaterialFiltersState,
  StudyMaterial,
} from "@/types/study-material";

export async function getStudyMaterials(): Promise<StudyMaterial[]> {
  // Real implementation:
  // const res = await fetch("/api/study-materials", { cache: "no-store" });
  // const { items } = await res.json();
  // return items;
  return studyMaterials;
}

export async function getStudyMaterialById(
  id: string
): Promise<StudyMaterial | undefined> {
  // Real implementation:
  // const res = await fetch(`/api/study-materials/${id}`);
  // if (!res.ok) return undefined;
  // return res.json();
  return studyMaterials.find((m) => m.id === id);
}

export function filterAndSortMaterials(
  materials: StudyMaterial[],
  filters: MaterialFiltersState
): StudyMaterial[] {
  const query = filters.query.trim().toLowerCase();

  const filtered = materials.filter((m) => {
    const matchesQuery =
      query.length === 0 ||
      m.title.toLowerCase().includes(query) ||
      m.description.toLowerCase().includes(query) ||
      m.tags.some((t) => t.toLowerCase().includes(query));

    const matchesCategory =
      filters.category === "All" || m.category === filters.category;
    const matchesDifficulty =
      filters.difficulty === "All" || m.difficulty === filters.difficulty
    const matchesTechnology =
      filters.technology === "All" || m.technology === filters.technology;
    return (
      matchesQuery && matchesCategory && matchesDifficulty && matchesTechnology
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (filters.sort) {
      case "mostViewed":
        return b.views - a.views;
      case "alphabetical":
        return a.title.localeCompare(b.title);
      case "newest":
      default:
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
    }
  });

  return sorted;
}

export const defaultFilters: MaterialFiltersState = {
  query: "",
  category: "All",
  difficulty: "All",
  technology: "All",
  sort: "newest",
};
