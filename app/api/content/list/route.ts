/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { PageModel } from "@/lib/db/models/Page";
import dbConnect from "@/lib/db/mongodb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // Optional filter: draft, published, archived
    const generatedBy = searchParams.get("generatedBy"); // Optional filter: agent, manual
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Connect to database
    await dbConnect();

    // Build query
    const query: any = {};

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    // Filter by generated source if provided
    if (generatedBy === "agent") {
      query["agentWorkflow.generatedBy"] = "agent";
    } else if (generatedBy === "manual") {
      query.$or = [
        { "agentWorkflow.generatedBy": "manual" },
        { agentWorkflow: { $exists: false } },
      ];
    }

    // Fetch pages with pagination
    const pages = await PageModel.find(query)
      .sort({ createdAt: -1 }) // Newest first
      .limit(limit)
      .skip(offset)
      .lean();

    // Get total count for pagination
    const totalCount = await PageModel.countDocuments(query);

    // Return response
    return NextResponse.json(
      {
        success: true,
        articles: pages,
        pagination: {
          total: totalCount,
          limit,
          offset,
          hasMore: offset + pages.length < totalCount,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
