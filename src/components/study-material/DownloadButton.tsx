// // components/study-material/DownloadButton.tsx
// "use client";

// import { useState } from "react";
// import { Download, Check, Loader2 } from "lucide-react";
// import { cn } from "../../../lib/utils";
// import type { StudyMaterial } from "@/types/study-material";

// interface DownloadButtonProps {
//   material: StudyMaterial;
//   variant?: "compact" | "full";
// }

// export default function DownloadButton({
//   material,
//   variant = "full",
// }: DownloadButtonProps) {
//   const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

//   async function handleDownload() {
//     if (status === "loading") return;
//     setStatus("loading");
//     try {
//       // Real implementation posts to the download-tracking endpoint, then
//       // triggers the browser download from the returned signed URL.
//       // await fetch(`/api/study-materials/${material.id}/download`, { method: "POST" });
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       const link = document.createElement("a");
//       link.href = material.fileUrl;
//       link.download = `${material.title}.pdf`;
//       link.click();
//       setStatus("done");
//     } catch {
//       setStatus("idle");
//     } finally {
//       setTimeout(() => setStatus("idle"), 1500);
//     }
//   }

//   const Icon = status === "loading" ? Loader2 : status === "done" ? Check : Download;

//   return (
//     <button
//       type="button"
//       onClick={handleDownload}
//       aria-label={`Download ${material.title}`}
//       disabled={status === "loading"}
//       className={cn(
//         "flex items-center justify-center gap-2 rounded-lg font-medium transition-colors",
//         "bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)]",
//         "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
//         "disabled:cursor-not-allowed disabled:opacity-70",
//         variant === "compact" ? "flex-1 px-3 py-2 text-[13px]" : "w-full px-4 py-2.5 text-sm"
//       )}
//     >
//       <Icon
//         className={cn("h-4 w-4", status === "loading" && "animate-spin")}
//         aria-hidden="true"
//       />
//       {variant === "full" && (status === "done" ? "Downloaded" : "Download")}
//     </button>
//   );
// }
