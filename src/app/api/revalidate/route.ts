import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type Request = {
  tags: string[] | null;
  paths: string[] | null;
};

export async function POST(req: NextRequest) {
  try {
    const data: Request = await req.json();
    if (data.tags?.length) {
      for (const tag of data.tags) {
        revalidateTag(tag, { expire: 0 });
      }
    }
    if (data.paths?.length) {
      for (const path of data.paths) {
        revalidatePath(path);
      }
    }
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return NextResponse.json(
      { revalidated: false, error: String(error) },
      { status: 500 },
    );
  }
}
