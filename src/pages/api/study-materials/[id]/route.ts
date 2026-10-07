// app/api/study-materials/[id]/route.ts
import { NextResponse } from "next/server";
import { studyMaterials } from "@/data/mock-study-materials";

interface RouteParams {
  params: { id: string};
}
export async function GET(_request: Request, { params }: RouteParams) {
  const material = studyMaterials.find((m) => m.id === params.id);
  if (!material) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(material);
}
export async function PUT(request: Request, { params }: RouteParams) {
  // TODO: require admin auth, validate body against UploadMaterialInput,
  // and persist the update.
  const updates = await request.json();
  return NextResponse.json({ id: params.id, ...updates });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  // TODO: require admin auth and remove the record + underlying file.
  return NextResponse.json({ id: params.id, deleted: true });
}
