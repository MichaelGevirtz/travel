import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import { PageModel } from "@/lib/db/models";

// GET /api/destinations - Get all destination pages
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const region = searchParams.get("region");
    const featured = searchParams.get("featured") === "true";
    const limit = parseInt(searchParams.get("limit") || "20");

    // Build query - only get published destination pages
    const query: Record<string, unknown> = {
      status: "published",
      destinationType: { $exists: true },
    };

    if (type) {
      query.destinationType = type;
    }

    if (region) {
      query.region = region;
    }

    let destinationsQuery = PageModel.find(query)
      .select("slug title excerpt metaDescription ogImage destinationType region analytics searchConsole")
      .sort({ "searchConsole.impressions": -1, publishedAt: -1 });

    if (featured) {
      // For featured destinations, sort by SEO opportunity (high impressions, low CTR)
      destinationsQuery = destinationsQuery.limit(8);
    } else {
      destinationsQuery = destinationsQuery.limit(limit);
    }

    const destinations = await destinationsQuery.lean();

    return NextResponse.json({
      success: true,
      data: destinations,
      count: destinations.length,
    });
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch destinations" },
      { status: 500 }
    );
  }
}
