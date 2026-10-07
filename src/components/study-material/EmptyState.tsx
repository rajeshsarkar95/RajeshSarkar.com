// // components/study-material/EmptyState.tsx
// "use client";

// import { FileSearch } from "lucide-react";

// interface EmptyStateProps {
//   title?: string;
//   description?: string;
//   onReset?: () => void;
// }

// export default function EmptyState({
//   title = "No materials match your filters",
//   description = "Try a different search term, or clear the category and difficulty filters.",
//   onReset,
// }: EmptyStateProps) {
//   return (
//     <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-[var(--border)] px-6 py-16 text-center">
//       <FileSearch
//         className="h-8 w-8 text-[var(--text-subtle)]"
//         strokeWidth={1.5}
//         aria-hidden="true"
//       />
//       <h3 className="text-sm font-semibold text-[var(--text)]">{title}</h3>
//       <p className="max-w-xs text-[13px] text-[var(--text-muted)]">{description}</p>
//       {onReset && (
//         <button
//           type="button"
//           onClick={onReset}
//           className="mt-2 rounded-lg border border-[var(--border)] px-4 py-2 text-[13px] font-medium text-[var(--text)] hover:border-[var(--border-hover)]"
//         >
//           Clear filters
//         </button>
//       )}
//     </div>
//   );
// }
