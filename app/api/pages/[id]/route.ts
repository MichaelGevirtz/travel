import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import { PageModel } from "@/lib/db/models";

interface RouteParams {
  params: { id: string };
}

// GET /api/pages/[id] - Get a single page by ID or slug
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();

    const { id } = params;

    // Try to find by ID first, then by slug
    let page = await PageModel.findById(id).lean();

    if (!page) {
      page = await PageModel.findOne({ slug: id }).lean();
    }

    if (!page) {
      return NextResponse.json(
        { success: false, error: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch page" },
      { status: 500 }
    );
  }
}

// PUT /api/pages/[id] - Update a page
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();

    const { id } = params;
    const body = await request.json();

    // Don't allow changing the slug if it would create a duplicate
    if (body.slug) {
      const existingPage = await PageModel.findOne({
        slug: body.slug,
        _id: { $ne: id },
      });

      if (existingPage) {
        return NextResponse.json(
          { success: false, error: "A page with this slug already exists" },
          { status: 409 }
        );
      }
    }

    const page = await PageModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!page) {
      return NextResponse.json(
        { success: false, error: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update page" },
      { status: 500 }
    );
  }
}

// DELETE /api/pages/[id] - Delete a page
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();

    const { id } = params;

    const page = await PageModel.findByIdAndDelete(id);

    if (!page) {
      return NextResponse.json(
        { success: false, error: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Page deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete page" },
      { status: 500 }
    );
  }
}

// PATCH /api/pages/[id] - Partial update (e.g., publish/unpublish)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();

    const { id } = params;
    const body = await request.json();

    // Handle status changes
    if (body.status === "published" && !body.publishedAt) {
      body.publishedAt = new Date();
    }

    const page = await PageModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!page) {
      return NextResponse.json(
        { success: false, error: "Page not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update page" },
      { status: 500 }
    );
  }
}
