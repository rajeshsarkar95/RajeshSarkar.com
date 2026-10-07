// // components/study-material/UploadProgress.tsx
// import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
// import type { UploadStatus } from "@/types/study-material";

// interface UploadProgressProps {
//   status: UploadStatus;
//   progress: number; // 0–100
//   errorMessage?: string;
//   fileName?: string;
// }

// export default function UploadProgress({
//   status,
//   progress,
//   errorMessage,
//   fileName,
// }: UploadProgressProps) {
//   if (status === "idle") return null;

//   return (
//     <div
//       role="status"
//       aria-live="polite"
//       className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] p-3"
//     >
//       {status === "success" ? (
//         <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--level-beginner)]" aria-hidden="true" />
//       ) : status === "error" ? (
//         <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--level-advanced)]" aria-hidden="true" />
//       ) : (
//         <Loader2 className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-[var(--accent)]" aria-hidden="true" />
//       )}

//       <div className="flex-1">
//         <p className="text-[13px] text-[var(--text)]">
//           {status === "validating" && "Validating file…"}
//           {status === "uploading" && `Uploading${fileName ? ` ${fileName}` : ""}…`}
//           {status === "success" && "Upload complete."}
//           {status === "error" && (errorMessage || "Upload failed. Try again.")}
//         </p>

//         {status === "uploading" && (
//           <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
//             <div
//               className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-200"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
