import { NextRequest, NextResponse } from "next/server";
import { PageModel } from "@/lib/db/models/Page";
import dbConnect from "@/lib/db/mongodb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get("destination");

    if (!destination) {
      return NextResponse.json(
        { error: "Missing 'destination' query parameter" },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Find published articles where slug contains the destination name
    // or where the slug matches common patterns like "hanoi-travel-guide"
    const articles = await PageModel.find({
      status: "published",
      $or: [
        { slug: new RegExp(`^${destination}-`, "i") }, // Matches "hanoi-travel-guide"
        { slug: new RegExp(`-${destination}$`, "i") }, // Matches "travel-guide-hanoi"
        { slug: new RegExp(`-${destination}-`, "i") }, // Matches "complete-hanoi-guide"
        { slug: destination }, // Exact match
      ],
    })
      .select("_id slug title excerpt contentMeta agentWorkflow createdAt publishedAt")
      .sort({ publishedAt: -1 })
      .limit(5)
      .lean();

    return NextResponse.json(
      {
        success: true,
        destination,
        articles,
        count: articles.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching articles by destination:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
