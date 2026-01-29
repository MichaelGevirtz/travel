/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { PageModel } from "@/lib/db/models/Page";
import dbConnect from "@/lib/db/mongodb";
import mongoose from "mongoose";

interface ApproveRequest {
  pageId: string;
  action: "approve" | "reject" | "publish";
  notes?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: ApproveRequest = await request.json();

    // Validate required fields
    if (!body.pageId || typeof body.pageId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'pageId' field" },
        { status: 400 }
      );
    }

    if (!body.action || !["approve", "reject", "publish"].includes(body.action)) {
      return NextResponse.json(
        { error: "Invalid 'action' field. Must be 'approve', 'reject', or 'publish'" },
        { status: 400 }
      );
    }

    // Validate pageId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(body.pageId)) {
      return NextResponse.json(
        { error: "Invalid page ID format" },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Find the page
    const page = await PageModel.findById(body.pageId);

    if (!page) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      );
    }

    // Handle different actions
    let updateData: any = {};
    let message = "";

    switch (body.action) {
      case "approve":
        // Approve the draft (keep as draft but mark as approved by human)
        updateData = {
          status: "draft",
          // You could add a field here to track manual approval if needed
        };
        message = "Article approved and remains as draft. You can publish it when ready.";
        break;

      case "reject":
        // Reject the draft (mark as archived or delete)
        updateData = {
          status: "archived",
        };
        message = "Article rejected and archived.";
        break;

      case "publish":
        // Publish the article
        updateData = {
          status: "published",
          publishedAt: new Date(),
        };
        message = "Article published successfully!";
        break;
    }

    // Add notes if provided
    if (body.notes) {
      // You could add a notes field to the schema or append to agent workflow
      // For now, we'll just log it
      console.log(`Admin notes for ${body.pageId}: ${body.notes}`);
    }

    // Update the page
    const updatedPage = await PageModel.findByIdAndUpdate(
      body.pageId,
      { $set: updateData },
      { new: true }
    );

    console.log(`✓ Page ${body.action} action completed: ${updatedPage?.slug}`);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        action: body.action,
        message,
        page: {
          id: updatedPage?._id,
          slug: updatedPage?.slug,
          title: updatedPage?.title,
          status: updatedPage?.status,
          publishedAt: updatedPage?.publishedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in content approval API:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve a specific page for review
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get("id");

    if (!pageId) {
      return NextResponse.json(
        { error: "Missing 'id' query parameter" },
        { status: 400 }
      );
    }

    // Validate pageId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(pageId)) {
      return NextResponse.json(
        { error: "Invalid page ID format" },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Find the page
    const page = await PageModel.findById(pageId).lean();

    if (!page) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      );
    }

    // Return the page
    return NextResponse.json(
      {
        success: true,
        page,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
