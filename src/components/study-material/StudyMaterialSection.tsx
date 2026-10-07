// // components/study-material/StudyMaterialSection.tsx
// "use client";

// import { useMemo, useState } from "react";
// import type {
//   CategorySummary,
//   MaterialFiltersState,
//   StudyMaterial,
// } from "@/types/study-material";
// import { defaultFilters,filterAndSortMaterials } from "../../../lib/study-materials-api";
// import MaterialSearch from "./MaterialSearch";
// import MaterialFilters from "./MaterialFilters";
// import MaterialCategories from "./MaterialCategories";
// import StudyMaterialCard from "./StudyMaterialCard";
// import FeaturedMaterial from "./FeaturedMaterial";
// import MaterialDetailsModal from "./MaterialDetailsModal";
// import EmptyState from "./EmptyState";
// import SkeletonCard from "./SkeletonCard";

// interface StudyMaterialSectionProps {
//   materials: StudyMaterial[];
//   categories: CategorySummary[];
//   technologies: string[];
//   /** Pass true while the initial fetch is in flight, if fetching client-side. */
//   isLoading?: boolean;
// }

// export default function StudyMaterialSection({
//   materials,
//   categories,
//   technologies,
//   isLoading = false,
// }: StudyMaterialSectionProps) {
//   const [filters, setFilters] = useState<MaterialFiltersState>(defaultFilters);
//   const [activeMaterial, setActiveMaterial] = useState<StudyMaterial | null>(null);

//   const featured = useMemo(
//     () => materials.filter((m) => m.featured).slice(0, 3),
//     [materials]
//   );

//   const visible = useMemo(
//     () => filterAndSortMaterials(materials, filters),
//     [materials, filters]
//   );

//   const hasActiveFilters =
//     filters.query !== "" ||
//     filters.category !== "All" ||
//     filters.difficulty !== "All" ||
//     filters.technology !== "All";

//   return (
//     <section aria-labelledby="study-material-heading" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
//       {/* Hero */}
//       <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[linear-gradient(160deg,var(--surface-raised)_0%,var(--surface)_70%)] px-6 py-12 sm:px-10 sm:py-16">
//         <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--accent)]">
//           Study Material
//         </p>
//         <h1
//           id="study-material-heading"
//           className="mt-3 max-w-xl text-3xl font-semibold leading-tight text-[var(--text)] sm:text-4xl"
//         >
//           My Study Material
//         </h1>
//         <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--text-muted)]">
//           Curated technical notes and interview-preparation resources I've
//           written while building and studying — free to preview and download.
//         </p>

//         <div className="mt-8 flex flex-col gap-3 sm:flex-row">
//           <MaterialSearch
//             value={filters.query}
//             onChange={(query) => setFilters((f) => ({ ...f, query }))}
//           />
//         </div>
//       </div>

//       {/* Categories */}
//       <div className="mt-10">
//         <h2 className="mb-4 text-sm font-semibold text-[var(--text)]">Browse by category</h2>
//         <MaterialCategories
//           categories={categories}
//           activeCategory={filters.category}
//           onSelect={(category) => setFilters((f) => ({ ...f, category }))}
//         />
//       </div>

//       {/* Featured */}
//       {featured.length > 0 && (
//         <div className="mt-12">
//           <h2 className="mb-4 text-sm font-semibold text-[var(--text)]">Featured resources</h2>
//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//             {featured.map((m) => (
//               <FeaturedMaterial key={m.id} material={m} onPreview={setActiveMaterial} />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Filters + grid */}
//       <div className="mt-12">
//         <div className="mb-5 flex items-center justify-between">
//           <h2 className="text-sm font-semibold text-[var(--text)]">All materials</h2>
//           <span className="font-mono text-[12px] text-[var(--text-subtle)]">
//             {visible.length} {visible.length === 1 ? "result" : "results"}
//           </span>
//         </div>
//         <MaterialFilters filters={filters} technologies={technologies} onChange={setFilters} />
//         <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {isLoading
//             ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
//             : visible.map((m) => (
//                 <StudyMaterialCard key={m.id} material={m} onPreview={setActiveMaterial} />
//               ))}
//         </div>
//         {!isLoading && visible.length === 0 && (
//           <div className="mt-6">
//             <EmptyState
//               onReset={hasActiveFilters ? () => setFilters(defaultFilters) : undefined}
//             />
//           </div>
//         )}
//       </div>
//       <MaterialDetailsModal material={activeMaterial} onClose={() => setActiveMaterial(null)} />
//     </section>
//   );
// }
