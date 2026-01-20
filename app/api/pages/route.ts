import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import { PageModel } from "@/lib/db/models";

// GET /api/pages - List all pages with optional filters
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const region = searchParams.get("region");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = parseInt(searchParams.get("skip") || "0");

    // Build query
    const query: Record<string, unknown> = {};

    if (status) {
      query.status = status;
    }

    if (type) {
      query.destinationType = type;
    }

    if (region) {
      query.region = region;
    }

    const [pages, total] = await Promise.all([
      PageModel.find(query)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      PageModel.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: pages,
      pagination: {
        total,
        limit,
        skip,
        hasMore: skip + pages.length < total,
      },
    });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch pages" },
      { status: 500 }
    );
  }
}

// POST /api/pages - Create a new page
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Validate required fields
    const requiredFields = ["slug", "title", "excerpt", "content", "metaTitle", "metaDescription", "author"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Check for duplicate slug
    const existingPage = await PageModel.findOne({ slug: body.slug });
    if (existingPage) {
      return NextResponse.json(
        { success: false, error: "A page with this slug already exists" },
        { status: 409 }
      );
    }

    // Generate canonical URL if not provided
    if (!body.canonicalUrl) {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      body.canonicalUrl = `${baseUrl}/vietnam/destinations/${body.slug}`;
    }

    const page = await PageModel.create(body);

    return NextResponse.json(
      { success: true, data: page },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create page" },
      { status: 500 }
    );
  }
}
