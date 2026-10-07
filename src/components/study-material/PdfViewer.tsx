// "use client";
// import { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// // @ts-expect-error react-pdf stylesheet has no TypeScript module declaration.
// import "react-pdf/dist/Page/AnnotationLayer.css";
// // @ts-expect-error react-pdf stylesheet has no TypeScript module declaration.
// import "react-pdf/dist/Page/TextLayer.css";
// import {
//   ChevronLeft,
//   ChevronRight,
//   ZoomIn,
//   ZoomOut,
//   Maximize2,
//   Minimize2,
//   Loader2,
// } from "lucide-react";
// // import { cn } from "@/lib/utils";
// import { cn } from "../../../lib/utils";
// pdfjs.GlobalWorkerOptions.workerSrc = "";
// const MIN_SCALE = 0.6;
// const MAX_SCALE = 2.2;

// interface PdfViewerProps {
//   fileUrl: string;
//   title: string;
// }

// export default function PdfViewer({ fileUrl, title }: PdfViewerProps) {
//   const [numPages, setNumPages] = useState<number>(0);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [scale, setScale] = useState(1);
//   const [fullscreen, setFullscreen] = useState(false);
//   const [loadError, setLoadError] = useState(false);

//   function goToPage(delta: number) {
//     setPageNumber((p) => Math.min(Math.max(p + delta, 1), numPages || 1));
//   }

//   function zoom(delta: number) {
//     setScale((s) => Math.min(Math.max(s + delta, MIN_SCALE), MAX_SCALE));
//   }

//   return (
//     <div
//       className={cn(
//         "flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-raised)]",
//         fullscreen && "fixed inset-2 z-[60] sm:inset-6"
//       )}
//     >
//       <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] bg-[var(--surface)] px-3 py-2">
//         <div className="flex items-center gap-1">
//           <button
//             type="button"
//             onClick={() => goToPage(-1)}
//             disabled={pageNumber <= 1}
//             aria-label="Previous page"
//             className="rounded-md p-1.5 text-[var(--text-muted)] hover:bg-[var(--surface-raised)] disabled:opacity-40"
//           >
//             <ChevronLeft className="h-4 w-4" aria-hidden="true" />
//           </button>
//           <span className="min-w-[64px] text-center font-mono text-[12px] text-[var(--text-muted)]">
//             {numPages ? `${pageNumber} / ${numPages}` : "–"}
//           </span>
//           <button
//             type="button"
//             onClick={() => goToPage(1)}
//             disabled={pageNumber >= numPages}
//             aria-label="Next page"
//             className="rounded-md p-1.5 text-[var(--text-muted)] hover:bg-[var(--surface-raised)] disabled:opacity-40"
//           >
//             <ChevronRight className="h-4 w-4" aria-hidden="true" />
//           </button>
//         </div>

//         <div className="flex items-center gap-1">
//           <button
//             type="button"
//             onClick={() => zoom(-0.2)}
//             aria-label="Zoom out"
//             className="rounded-md p-1.5 text-[var(--text-muted)] hover:bg-[var(--surface-raised)]"
//           >
//             <ZoomOut className="h-4 w-4" aria-hidden="true" />
//           </button>
//           <span className="min-w-[42px] text-center font-mono text-[12px] text-[var(--text-muted)]">
//             {Math.round(scale * 100)}%
//           </span>
//           <button
//             type="button"
//             onClick={() => zoom(0.2)}
//             aria-label="Zoom in"
//             className="rounded-md p-1.5 text-[var(--text-muted)] hover:bg-[var(--surface-raised)]"
//           >
//             <ZoomIn className="h-4 w-4" aria-hidden="true" />
//           </button>
//           <button
//             type="button"
//             onClick={() => setFullscreen((f) => !f)}
//             aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
//             className="rounded-md p-1.5 text-[var(--text-muted)] hover:bg-[var(--surface-raised)]"
//           >
//             {fullscreen ? (
//               <Minimize2 className="h-4 w-4" aria-hidden="true" />
//             ) : (
//               <Maximize2 className="h-4 w-4" aria-hidden="true" />
//             )}
//           </button>
//         </div>
//       </div>

//       <div className="flex flex-1 justify-center overflow-auto p-4">
//         {loadError ? (
//           <p className="self-center text-sm text-[var(--text-muted)]">
//             Couldn&apos;t load a preview for &quot;{title}&quot;. Try downloading it instead.
//           </p>
//         ) : (
//           <Document
//             file={fileUrl}
//             onLoadSuccess={({ numPages: n }) => setNumPages(n)}
//             onLoadError={() => setLoadError(true)}
//             loading={
//               <div className="flex items-center gap-2 self-center py-16 text-sm text-[var(--text-muted)]">
//                 <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
//                 Loading document…
//               </div>
//             }
//           >
//             <Page
//               pageNumber={pageNumber}
//               scale={scale}
//               className="!bg-transparent"
//               renderAnnotationLayer
//               renderTextLayer
//             />
//           </Document>
//         )}
//       </div>
//     </div>
//   );
// }

