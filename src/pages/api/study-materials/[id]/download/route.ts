// app/api/study-materials/[id]/download/route.ts
import { NextResponse } from "next/server";
import { studyMaterials } from "@/data/mock-study-materials";

interface RouteParams {
  params: { id: string };
}

// Called right before the browser download starts, so `downloads` can be
// incremented server-side and (if files are private) a short-lived signed
// URL can be minted and returned instead of a static fileUrl.
export async function POST(_request: Request, { params }: RouteParams) {
  const material = studyMaterials.find((m) => m.id === params.id);
  if (!material) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // TODO: increment `downloads` in the database and, if using private
  // storage, generate a signed URL here instead of returning fileUrl as-is.
  return NextResponse.json({ url: material.fileUrl });
}
