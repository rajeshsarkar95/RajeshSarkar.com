// types/study-material.ts

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Category =
  | "JavaScript"
  | "React"
  | "Next.js"
  | "Node.js"
  | "MongoDB"
  | "MERN"
  | "DSA"
  | "AI/ML"
  | "Interview Preparation";

export type Visibility = "public" | "private" | "unlisted";

export type SortKey = "newest" | "mostViewed" | "alphabetical";

export interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  category: Category;
  technology: string;
  difficulty: Difficulty;
  tags: string[];
  fileUrl: string;
  thumbnailUrl?: string;
  pages?: number;
  fileSize?: string;
  views: number;
  downloads: number;
  featured: boolean;
  visibility: Visibility;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export interface CategorySummary {
  name: Category;
  count: number;
  description: string;
}

export interface MaterialFiltersState {
  query: string;
  category: Category | "All";
  difficulty: Difficulty | "All";
  technology: string | "All";
  sort: SortKey;
}

// Shape returned by the (future) list endpoint. Keeping the frontend
// shaped around this now means swapping mock data for a real fetch
// later is a one-line change (see lib/study-materials-api.ts).
export interface StudyMaterialListResponse {
  items: StudyMaterial[];
  total: number;
  page: number;
  pageSize: number;
}

// Payload accepted by the admin upload form / POST endpoint.
export interface UploadMaterialInput {
  title: string;
  description: string;
  category: Category;
  technology: string;
  difficulty: Difficulty;
  tags: string[];
  visibility: Visibility;
  featured: boolean;
  file: File;
  thumbnail?: File;
}

export type UploadStatus =
  | "idle"
  | "validating"
  | "uploading"
  | "success"
  | "error";
