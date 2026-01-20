import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import { AnalyticsDailyModel, PageModel } from "@/lib/db/models";

// POST /api/analytics/track - Track page view or event
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { event, pageSlug, data } = body;

    if (!event || !pageSlug) {
      return NextResponse.json(
        { success: false, error: "Missing event or pageSlug" },
        { status: 400 }
      );
    }

    // Get the page
    const page = await PageModel.findOne({ slug: pageSlug });

    if (!page) {
      return NextResponse.json(
        { success: false, error: "Page not found" },
        { status: 404 }
      );
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Upsert daily analytics
    const updateData: Record<string, unknown> = {};

    switch (event) {
      case "pageview":
        updateData.$inc = { pageViews: 1 };
        // Also update page analytics
        await PageModel.findByIdAndUpdate(page._id, {
          $inc: { "analytics.views": 1 },
        });
        break;

      case "affiliate_click":
        updateData.$inc = {
          affiliateClicks: 1,
          [`affiliateClicksByProvider.${data?.provider || "unknown"}`]: 1,
        };
        // Also update page affiliate link stats
        if (data?.linkIndex !== undefined) {
          await PageModel.findByIdAndUpdate(page._id, {
            $inc: { [`affiliateLinks.${data.linkIndex}.clicks`]: 1 },
          });
        }
        break;

      case "scroll_depth":
        if (data?.depth) {
          const depthIndex = [25, 50, 75, 100].indexOf(data.depth);
          if (depthIndex !== -1) {
            updateData.$inc = { [`scrollDepth.${depthIndex}`]: 1 };
          }
        }
        break;

      case "time_on_page":
        if (data?.seconds) {
          let bucket: string;
          if (data.seconds < 10) bucket = "0-10";
          else if (data.seconds < 30) bucket = "10-30";
          else if (data.seconds < 60) bucket = "30-60";
          else if (data.seconds < 180) bucket = "60-180";
          else bucket = "180+";
          updateData.$inc = { [`timeOnPageBuckets.${bucket}`]: 1 };
        }
        break;

      default:
        return NextResponse.json(
          { success: false, error: "Unknown event type" },
          { status: 400 }
        );
    }

    await AnalyticsDailyModel.findOneAndUpdate(
      { date: today, pageId: page._id },
      updateData,
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking analytics:", error);
    return NextResponse.json(
      { success: false, error: "Failed to track event" },
      { status: 500 }
    );
  }
}

// GET /api/analytics/track - Get analytics for a page
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const pageSlug = searchParams.get("page");
    const startDate = searchParams.get("start");
    const endDate = searchParams.get("end");

    if (!pageSlug) {
      return NextResponse.json(
        { success: false, error: "Missing page parameter" },
        { status: 400 }
      );
    }

    const page = await PageModel.findOne({ slug: pageSlug });

    if (!page) {
      return NextResponse.json(
        { success: false, error: "Page not found" },
        { status: 404 }
      );
    }

    const query: Record<string, unknown> = { pageId: page._id };

    if (startDate && endDate) {
      query.date = { $gte: startDate, $lte: endDate };
    }

    const analytics = await AnalyticsDailyModel.find(query)
      .sort({ date: -1 })
      .limit(30)
      .lean();

    return NextResponse.json({
      success: true,
      data: {
        page: {
          slug: page.slug,
          title: page.title,
          analytics: page.analytics,
          searchConsole: page.searchConsole,
        },
        daily: analytics,
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
