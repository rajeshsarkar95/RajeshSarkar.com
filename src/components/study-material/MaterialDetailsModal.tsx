// // components/study-material/MaterialDetailsModal.tsx
// "use client";

// import { useEffect } from "react";
// import dynamic from "next/dynamic";
// import { X, Loader2 } from "lucide-react";
// import type { StudyMaterial } from "@/types/study-material";
// import DownloadButton from "./DownloadButton";

// const PdfViewer = dynamic(() => import("./PdfViewer"), {
//   ssr: false,
//   loading: () => (
//     <div className="flex h-[60vh] items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-raised)]">
//       <Loader2 className="h-5 w-5 animate-spin text-[var(--text-muted)]" aria-hidden="true" />
//     </div>
//   ),
// });

// interface MaterialDetailsModalProps {
//   material: StudyMaterial | null;
//   onClose: () => void;
// }

// export default function MaterialDetailsModal({
//   material,
//   onClose,
// }: MaterialDetailsModalProps) {
//   useEffect(() => {
//     if (!material) return;
//     function onKeyDown(e: KeyboardEvent) {
//       if (e.key === "Escape") onClose();
//     }
//     document.addEventListener("keydown", onKeyDown);
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.removeEventListener("keydown", onKeyDown);
//       document.body.style.overflow = "";
//     };
//   }, [material, onClose]);

//   if (!material) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
//       <div
//         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//         onClick={onClose}
//         aria-hidden="true"
//       />
//       <div
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="material-modal-title"
//         className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl"
//       >
//         <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] p-5">
//           <div>
//             <h2
//               id="material-modal-title"
//               className="text-base font-semibold text-[var(--text)]"
//             >
//               {material.title}
//             </h2>
//             <p className="mt-1 font-mono text-[11px] text-[var(--text-subtle)]">
//               {material.category} · {material.difficulty} · {material.pages} pages
//             </p>
//           </div>
//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close preview"
//             className="rounded-md p-1.5 text-[var(--text-subtle)] hover:bg-[var(--surface-raised)] hover:text-[var(--text)]"
//           >
//             <X className="h-5 w-5" aria-hidden="true" />
//           </button>
//         </div>

//         <div className="flex-1 overflow-auto p-5">
//           <PdfViewer fileUrl={material.fileUrl} title={material.title} />
//         </div>

//         <div className="flex items-center justify-between gap-3 border-t border-[var(--border)] p-5">
//           <p className="hidden text-[13px] text-[var(--text-muted)] sm:block">
//             {material.description}
//           </p>
//           <div className="w-full sm:w-48">
//             <DownloadButton material={material} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
