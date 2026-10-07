// // components/study-material/UploadMaterialForm.tsx
// "use client";

// import { useRef, useState, type FormEvent } from "react";
// import { UploadCloud, ImagePlus } from "lucide-react";
// import type {
//   Category,
//   Difficulty,
//   UploadStatus,
//   Visibility,
// } from "@/types/study-material";
// import UploadProgress from "./UploadProgress";

// const CATEGORIES: Category[] = [
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
// const DIFFICULTIES: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];
// const MAX_FILE_MB = 25;

// interface FormErrors {
//   [field: string]: string | undefined;
// }

// export default function UploadMaterialForm() {
//   const [status, setStatus] = useState<UploadStatus>("idle");
//   const [progress, setProgress] = useState(0);
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [file, setFile] = useState<File | null>(null);
//   const [thumbnail, setThumbnail] = useState<File | null>(null);
//   const formRef = useRef<HTMLFormElement>(null);

//   function validate(formData: FormData): FormErrors {
//     const next: FormErrors = {};
//     const title = String(formData.get("title") || "").trim();
//     const description = String(formData.get("description") || "").trim();

//     if (!title) next.title = "Title is required.";
//     if (!description) next.description = "Description is required.";
//     if (!file) next.file = "A PDF file is required.";
//     else {
//       if (file.type !== "application/pdf") {
//         next.file = "Only PDF files are supported.";
//       } else if (file.size > MAX_FILE_MB * 1024 * 1024) {
//         next.file = `File must be under ${MAX_FILE_MB}MB.`;
//       }
//     }
//     if (thumbnail && !thumbnail.type.startsWith("image/")) {
//       next.thumbnail = "Thumbnail must be an image file.";
//     }
//     return next;
//   }

//   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);

//     setStatus("validating");
//     const validationErrors = validate(formData);
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length > 0) {
//       setStatus("error");
//       return;
//     }

//     setStatus("uploading");
//     setProgress(0);

//     // Real implementation: POST formData to /api/study-materials and track
//     // upload progress via XMLHttpRequest's `upload.onprogress`, or use a
//     // presigned-URL flow for direct-to-storage uploads.
//     try {
//       for (let p = 0; p <= 100; p += 20) {
//         await new Promise((resolve) => setTimeout(resolve, 150));
//         setProgress(p);
//       }
//       setStatus("success");
//       formRef.current?.reset();
//       setFile(null);
//       setThumbnail(null);
//     } catch {
//       setStatus("error");
//       setErrors({ form: "Something went wrong. Please try again." });
//     }
//   }

//   return (
//     <form
//       ref={formRef}
//       onSubmit={handleSubmit}
//       className="mx-auto flex max-w-xl flex-col gap-5"
//       noValidate
//     >
//       <div>
//         <h1 className="text-lg font-semibold text-[var(--text)]">Upload study material</h1>
//         <p className="mt-1 text-[13px] text-[var(--text-muted)]">
//           Visible only to admins. Published items appear once visibility is set to Public.
//         </p>
//       </div>

//       <Field label="Title" htmlFor="title" error={errors.title}>
//         <input
//           id="title"
//           name="title"
//           type="text"
//           required
//           className="input"
//           aria-invalid={Boolean(errors.title)}
//         />
//       </Field>

//       <Field label="Description" htmlFor="description" error={errors.description}>
//         <textarea
//           id="description"
//           name="description"
//           required
//           rows={3}
//           className="input resize-none"
//           aria-invalid={Boolean(errors.description)}
//         />
//       </Field>

//       <div className="grid grid-cols-2 gap-4">
//         <Field label="Category" htmlFor="category">
//           <select id="category" name="category" required className="input">
//             {CATEGORIES.map((c) => (
//               <option key={c} value={c}>
//                 {c}
//               </option>
//             ))}
//           </select>
//         </Field>
//         <Field label="Difficulty" htmlFor="difficulty">
//           <select id="difficulty" name="difficulty" required className="input">
//             {DIFFICULTIES.map((d) => (
//               <option key={d} value={d}>
//                 {d}
//               </option>
//             ))}
//           </select>
//         </Field>
//       </div>

//       <Field label="Technology" htmlFor="technology">
//         <input
//           id="technology"
//           name="technology"
//           type="text"
//           placeholder="e.g. React, Node.js"
//           required
//           className="input"
//         />
//       </Field>

//       <Field label="Tags (comma-separated)" htmlFor="tags">
//         <input
//           id="tags"
//           name="tags"
//           type="text"
//           placeholder="Interview, ES6+, Advanced"
//           className="input"
//         />
//       </Field>

//       <Field label="PDF file" htmlFor="file" error={errors.file}>
//         <label
//           htmlFor="file"
//           className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[var(--border)] px-4 py-3 text-[13px] text-[var(--text-muted)] hover:border-[var(--border-hover)]"
//         >
//           <UploadCloud className="h-4 w-4 shrink-0" aria-hidden="true" />
//           {file ? file.name : `Choose a PDF (max ${MAX_FILE_MB}MB)`}
//         </label>
//         <input
//           id="file"
//           name="file"
//           type="file"
//           accept="application/pdf"
//           required
//           className="sr-only"
//           onChange={(e) => setFile(e.target.files?.[0] ?? null)}
//         />
//       </Field>

//       <Field label="Cover thumbnail (optional)" htmlFor="thumbnail" error={errors.thumbnail}>
//         <label
//           htmlFor="thumbnail"
//           className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[var(--border)] px-4 py-3 text-[13px] text-[var(--text-muted)] hover:border-[var(--border-hover)]"
//         >
//           <ImagePlus className="h-4 w-4 shrink-0" aria-hidden="true" />
//           {thumbnail ? thumbnail.name : "Choose an image"}
//         </label>
//         <input
//           id="thumbnail"
//           name="thumbnail"
//           type="file"
//           accept="image/*"
//           className="sr-only"
//           onChange={(e) => setThumbnail(e.target.files?.[0] ?? null)}
//         />
//       </Field>

//       <div className="grid grid-cols-2 gap-4">
//         <Field label="Visibility" htmlFor="visibility">
//           <select id="visibility" name="visibility" defaultValue="public" className="input">
//             {(["public", "unlisted", "private"] as Visibility[]).map((v) => (
//               <option key={v} value={v}>
//                 {v[0].toUpperCase() + v.slice(1)}
//               </option>
//             ))}
//           </select>
//         </Field>
//         <label className="flex items-end gap-2 pb-2.5 text-[13px] text-[var(--text)]">
//           <input type="checkbox" name="featured" className="h-4 w-4 rounded border-[var(--border)]" />
//           Feature this resource
//         </label>
//       </div>

//       <UploadProgress
//         status={status}
//         progress={progress}
//         errorMessage={errors.form}
//         fileName={file?.name}
//       />

//       <button
//         type="submit"
//         disabled={status === "uploading"}
//         className="rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-70"
//       >
//         {status === "uploading" ? "Uploading…" : "Upload material"}
//       </button>
//     </form>
//   );
// }

// function Field({
//   label,
//   htmlFor,
//   error,
//   children,
// }: {
//   label: string;
//   htmlFor: string;
//   error?: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex flex-col gap-1.5">
//       <label htmlFor={htmlFor} className="text-[13px] font-medium text-[var(--text)]">
//         {label}
//       </label>
//       {children}
//       {error && (
//         <p className="text-[12px] text-[var(--level-advanced)]" role="alert">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }
