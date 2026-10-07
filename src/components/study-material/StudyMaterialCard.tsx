// // components/study-material/StudyMaterialCard.tsx
// "use client";

// import { FileText, Eye } from "lucide-react";
// import { cn,formatCount,formatRelativeDate } from "../../../lib/utils";
// import type { StudyMaterial } from "@/types/study-material";
// import DownloadButton from "./DownloadButton";

// const DIFFICULTY_DOT: Record<StudyMaterial["difficulty"], string> = {
//   Beginner: "bg-[var(--level-beginner)]",
//   Intermediate: "bg-[var(--level-intermediate)]",
//   Advanced: "bg-[var(--level-advanced)]",
// };

// interface StudyMaterialCardProps {
//   material: StudyMaterial;
//   onPreview: (material: StudyMaterial) => void;
// }

// export default function StudyMaterialCard({
//   material,
//   onPreview,
// }: StudyMaterialCardProps) {
//   return (
//     <article
//       className={cn(
//         "group flex h-full flex-col rounded-xl border border-[var(--border)]",
//         "bg-[var(--surface)] p-5 transition-colors duration-150",
//         "hover:border-[var(--border-hover)] focus-within:border-[var(--border-hover)]"
//       )}
//     >
//       <div className="flex items-start justify-between gap-3">
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-raised)] text-[var(--accent)]">
//           <FileText className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
//         </div>
//         <span className="rounded-full border border-[var(--border)] px-2.5 py-1 font-mono text-[11px] tracking-tight text-[var(--text-muted)]">
//           {material.category}
//         </span>
//       </div>

//       <h3 className="mt-4 text-[15px] font-semibold leading-snug text-[var(--text)]">
//         {material.title}
//       </h3>
//       <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-[var(--text-muted)]">
//         {material.description}
//       </p>

//       <dl className="mt-4 grid grid-cols-3 gap-2 font-mono text-[11px] text-[var(--text-muted)]">
//         <div className="flex items-center gap-1.5">
//           <span
//             className={cn("h-1.5 w-1.5 rounded-full", DIFFICULTY_DOT[material.difficulty])}
//             aria-hidden="true"
//           />
//           <span>{material.difficulty}</span>
//         </div>
//         {material.pages !== undefined && (
//           <div>{material.pages}pg</div>
//         )}
//         {material.fileSize && <div>{material.fileSize}</div>}
//       </dl>

//       <div className="mt-3 flex flex-wrap gap-1.5">
//         {material.tags.slice(0, 3).map((tag) => (
//           <span
//             key={tag}
//             className="rounded-md bg-[var(--surface-raised)] px-2 py-0.5 text-[11px] text-[var(--text-subtle)]"
//           >
//             {tag}
//           </span>
//         ))}
//       </div>

//       <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4 text-[11px] text-[var(--text-subtle)]">
//         <span className="flex items-center gap-1">
//           <Eye className="h-3.5 w-3.5" aria-hidden="true" />
//           {formatCount(material.views)} views
//         </span>
//         <span>Updated {formatRelativeDate(material.updatedAt)}</span>
//       </div>

//       <div className="mt-4 flex gap-2">
//         <button
//           type="button"
//           onClick={() => onPreview(material)}
//           className="flex-1 rounded-lg border border-[var(--border)] px-3 py-2 text-[13px] font-medium text-[var(--text)] transition-colors hover:border-[var(--border-hover)] hover:bg-[var(--surface-raised)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
//         >
//           Preview
//         </button>
//         <DownloadButton material={material} variant="compact" />
//       </div>
//     </article>
//   );
// }
