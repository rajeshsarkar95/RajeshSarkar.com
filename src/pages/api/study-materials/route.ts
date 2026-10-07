// app/api/study-materials/route.ts
//
// Example route handlers. Wire these to a real database or storage
// bucket (Postgres + S3/R2, Mongo + GridFS, etc.) and gate POST behind
// admin auth before use. Shapes match StudyMaterial / StudyMaterialListResponse
// in types/study-material.ts so the frontend needs no changes when this
// goes live.

import { NextResponse } from "next/server";
import { studyMaterials } from "@/data/mock-study-materials";
import type { StudyMaterialListResponse } from "@/types/study-material";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = Number(searchParams.get("pageSize") ?? "12");

  const start = (page - 1) * pageSize;
  const items = studyMaterials
    .filter((m) => m.visibility === "public")
    .slice(start, start + pageSize);

  const body: StudyMaterialListResponse = {
    items,
    total: studyMaterials.length,
    page,
    pageSize,
  };

  return NextResponse.json(body);
}

export async function POST(request: Request) {
  // TODO: require an authenticated admin session before accepting uploads.
  const formData = await request.formData();
  const title = formData.get("title");
  const file = formData.get("file");

  if (!title || !file) {
    return NextResponse.json(
      { error: "title and file are required" },
      { status: 400 }
    );
  }

  // TODO: stream `file` to object storage, persist metadata to the database,
  // and return the created record.
  return NextResponse.json({ status: "accepted" }, { status: 202 });
}
