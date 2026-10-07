// "use client"
// import type { Metadata } from "next";
// import StudyMaterialSection from "@/components/study-material/StudyMaterialSection";
// import { getStudyMaterials } from "../../../lib/study-materials-api";
// import { categorySummaries, technologies } from "@/data/mock-study-materials";

// export const metadata: Metadata = {
//   title: "Study Material | Your Name",
//   description:
//     "Curated JavaScript, React, Next.js, Node.js, MongoDB, DSA, and interview-preparation notes — free to preview and download.",
//   openGraph: {
//     title: "Study Material | Your Name",
//     description:
//       "Curated technical notes and interview-preparation resources.",
//     type: "website",
//   },
// };

// export default async function StudyMaterialPage() {
//   const materials = await getStudyMaterials();

//   const publicMaterials = materials.filter(
//     (m) => m.visibility === "public"
//   );

//   return (
//     <StudyMaterialSection
//       materials={publicMaterials}
//       categories={categorySummaries}
//       technologies={technologies}
//     />
//   );
// }