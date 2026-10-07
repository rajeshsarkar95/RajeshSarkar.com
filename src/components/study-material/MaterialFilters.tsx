// // components/study-material/MaterialFilters.tsx
// "use client";

// import { useState } from "react";
// import { SlidersHorizontal, X } from "lucide-react";
// // import { cn } from "@/lib/utils";
// import { cn } from "../../../lib/utils";
// import type {
//   Category,
//   Difficulty,
//   MaterialFiltersState,
//   SortKey,
// } from "@/types/study-material";

// const CATEGORIES: (Category | "All")[] = [
//   "All",
//   "JavaScript",
//   "React",
//   "Next.js",
//   "Node.js",
//   "MongoDB",
//   "MERN",
//   "DSA",
//   "AI/ML",
//   "Interview Preparation",
// ];

// const DIFFICULTIES: (Difficulty | "All")[] = [
//   "All",
//   "Beginner",
//   "Intermediate",
//   "Advanced",
// ];

// const SORTS: { value: SortKey; label: string }[] = [
//   { value: "newest", label: "Newest" },
//   { value: "mostViewed", label: "Most viewed" },
//   { value: "alphabetical", label: "A–Z" },
// ];

// interface MaterialFiltersProps {
//   filters: MaterialFiltersState;
//   technologies: string[];
//   onChange: (filters: MaterialFiltersState) => void;
// }

// function Select({
//   label,
//   value,
//   options,
//   onChange,
// }: {
//   label: string;
//   value: string;
//   options: string[];
//   onChange: (value: string) => void;
// }) {
//   return (
//     <label className="flex flex-col gap-1.5 text-[13px]">
//       <span className="text-[var(--text-muted)]">{label}</span>
//       <select
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
//       >
//         {options.map((opt) => (
//           <option key={opt} value={opt}>
//             {opt}
//           </option>
//         ))}
//       </select>
//     </label>
//   );
// }

// export default function MaterialFilters({
//   filters,
//   technologies,
//   onChange,
// }: MaterialFiltersProps) {
//   const [sheetOpen, setSheetOpen] = useState(false);

//   const controls = (
//     <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
//       <Select
//         label="Category"
//         value={filters.category}
//         options={CATEGORIES}
//         onChange={(v) => onChange({ ...filters, category: v as Category | "All" })}
//       />
//       <Select
//         label="Difficulty"
//         value={filters.difficulty}
//         options={DIFFICULTIES}
//         onChange={(v) => onChange({ ...filters, difficulty: v as Difficulty | "All" })}
//       />
//       <Select
//         label="Technology"
//         value={filters.technology}
//         options={["All", ...technologies]}
//         onChange={(v) => onChange({ ...filters, technology: v })}
//       />
//       <label className="flex flex-col gap-1.5 text-[13px]">
//         <span className="text-[var(--text-muted)]">Sort by</span>
//         <select
//           value={filters.sort}
//           onChange={(e) => onChange({ ...filters, sort: e.target.value as SortKey })}
//           className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
//         >
//           {SORTS.map((s) => (
//             <option key={s.value} value={s.value}>
//               {s.label}
//             </option>
//           ))}
//         </select>
//       </label>
//     </div>
//   );

//   return (
//     <>
//       {/* Desktop / tablet: inline controls */}
//       <div className="hidden sm:block">{controls}</div>

//       {/* Mobile: trigger + sheet */}
//       <div className="sm:hidden">
//         <button
//           type="button"
//           onClick={() => setSheetOpen(true)}
//           className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--text)]"
//         >
//           <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
//           Filters & sort
//         </button>

//         {sheetOpen && (
//           <div className="fixed inset-0 z-40 flex items-end">
//             <div
//               className="absolute inset-0 bg-black/50"
//               onClick={() => setSheetOpen(false)}
//               aria-hidden="true"
//             />
//             <div
//               role="dialog"
//               aria-modal="true"
//               aria-label="Filters and sort"
//               className={cn(
//                 "relative z-50 w-full rounded-t-2xl border-t border-[var(--border)]",
//                 "bg-[var(--surface)] p-5 pb-8"
//               )}
//             >
//               <div className="mb-4 flex items-center justify-between">
//                 <h2 className="text-sm font-semibold text-[var(--text)]">Filters & sort</h2>
//                 <button
//                   type="button"
//                   onClick={() => setSheetOpen(false)}
//                   aria-label="Close filters"
//                   className="rounded-md p-1 text-[var(--text-subtle)] hover:text-[var(--text)]"
//                 >
//                   <X className="h-5 w-5" aria-hidden="true" />
//                 </button>
//               </div>
//               {controls}
//               <button
//                 type="button"
//                 onClick={() => setSheetOpen(false)}
//                 className="mt-5 w-full rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-[var(--accent-foreground)]"
//               >
//                 Show results
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
