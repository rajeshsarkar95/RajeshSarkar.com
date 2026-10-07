// // components/study-material/FeaturedMaterial.tsx
// "use client";
// import { Sparkles } from "lucide-react";
// import { formatCount } from "../../../lib/utils"
// import type { StudyMaterial } from "@/types/study-material";
// import DownloadButton from "./DownloadButton";

// interface FeaturedMaterialProps {
//   material: StudyMaterial;
//   onPreview: (material: StudyMaterial) => void;
// }

// export default function FeaturedMaterial({
//   material,
//   onPreview,
// }: FeaturedMaterialProps) {
//   return (
//     <article className="relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[linear-gradient(155deg,var(--surface-raised)_0%,var(--surface)_65%)] p-6">
//       <div className="flex items-center justify-between">
//         <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-soft)] px-2.5 py-1 font-mono text-[11px] text-[var(--accent)]">
//           <Sparkles className="h-3 w-3" aria-hidden="true" />
//           Featured
//         </span>
//         <span className="font-mono text-[11px] text-[var(--text-subtle)]">
//           {material.technology}
//         </span>
//       </div>

//       <h3 className="mt-5 text-lg font-semibold leading-snug text-[var(--text)]">
//         {material.title}
//       </h3>
//       <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[var(--text-muted)]">
//         {material.description}
//       </p>

//       <div className="mt-4 flex items-center gap-3 font-mono text-[11px] text-[var(--text-subtle)]">
//         <span>{material.difficulty}</span>
//         <span aria-hidden="true">·</span>
//         <span>{material.pages} pages</span>
//         <span aria-hidden="true">·</span>
//         <span>{formatCount(material.views)} views</span>
//       </div>

//       <div className="mt-5 flex gap-2">
//         <button
//           type="button"
//           onClick={() => onPreview(material)}
//           className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--border-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
//         >
//           Preview
//         </button>
//         <div className="flex-1">
//           <DownloadButton material={material} />
//         </div>
//       </div>
//     </article>
//   );
// }
