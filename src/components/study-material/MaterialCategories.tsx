
// "use client";

// import { cn } from "../../../lib/utils";
// import type { Category, CategorySummary } from "@/types/study-material";

// interface MaterialCategoriesProps {
//   categories: CategorySummary[];
//   activeCategory: Category | "All";
//   onSelect: (category: Category | "All") => void;
// }

// export default function MaterialCategories({
//   categories,
//   activeCategory,
//   onSelect,
// }: MaterialCategoriesProps) {
//   return (
//     <div
//       className="flex gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-5"
//       role="list"
//       aria-label="Browse by category"
//     >
//       {categories.map((cat) => {
//         const active = activeCategory === cat.name;
//         return (
//           <button
//             key={cat.name}
//             type="button"
//             role="listitem"
//             onClick={() => onSelect(active ? "All" : cat.name)}
//             aria-pressed={active}
//             className={cn(
//               "flex min-w-[168px] shrink-0 flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors sm:min-w-0",
//               active
//                 ? "border-[var(--accent)] bg-[var(--accent-soft)]"
//                 : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)]"
//             )}
//           >
//             <span className="text-[13px] font-medium text-[var(--text)]">
//               {cat.name}
//             </span>
//             <span className="font-mono text-[11px] text-[var(--text-subtle)]">
//               {cat.count} {cat.count === 1 ? "resource" : "resources"}
//             </span>
//           </button>
//         );
//       })}
//     </div>
//   );
// }
