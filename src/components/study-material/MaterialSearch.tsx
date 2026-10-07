// // components/study-material/MaterialSearch.tsx
// "use client";

// import { Search, X } from "lucide-react";

// interface MaterialSearchProps {
//   value: string;
//   onChange: (value: string) => void;
// }

// export default function MaterialSearch({ value, onChange }: MaterialSearchProps) {
//   return (
//     <div className="relative flex-1">
//       <Search
//         className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-subtle)]"
//         aria-hidden="true"
//       />
//       <input
//         type="search"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder="Search notes, topics, tags…"
//         aria-label="Search study materials"
//         className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] py-3 pl-10 pr-10 text-sm text-[var(--text)] placeholder:text-[var(--text-subtle)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
//       />
//       {value.length > 0 && (
//         <button
//           type="button"
//           onClick={() => onChange("")}
//           aria-label="Clear search"
//           className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[var(--text-subtle)] hover:text-[var(--text)]"
//         >
//           <X className="h-4 w-4" aria-hidden="true" />
//         </button>
//       )}
//     </div>
//   );
// }
