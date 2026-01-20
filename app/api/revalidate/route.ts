import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// POST /api/revalidate - Trigger ISR revalidation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, path, tag } = body;

    // Verify the secret
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { success: false, error: "Invalid secret" },
        { status: 401 }
      );
    }

    if (!path && !tag) {
      return NextResponse.json(
        { success: false, error: "Missing path or tag parameter" },
        { status: 400 }
      );
    }

    if (path) {
      revalidatePath(path);
    }

    if (tag) {
      revalidateTag(tag);
    }

    return NextResponse.json({
      success: true,
      revalidated: true,
      path,
      tag,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error revalidating:", error);
    return NextResponse.json(
      { success: false, error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
