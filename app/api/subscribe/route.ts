import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongodb";
import { SubscriberModel } from "@/lib/db/models";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";

// Rate limit: 5 requests per minute per IP
const RATE_LIMIT_CONFIG = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 5,
};

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Sanitize input to prevent NoSQL injection
 * Removes $ characters that could be used for MongoDB operators
 * Dots are allowed in emails but not at the start of field names
 */
function sanitizeInput(input: string): string {
  if (typeof input !== "string") {
    return "";
  }
  // Remove $ which is used for MongoDB operators like $gt, $where, etc.
  // Keep dots as they're valid in email addresses
  return input.replace(/\$/g, "").trim().toLowerCase();
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP, RATE_LIMIT_CONFIG);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
            ),
          },
        }
      );
    }

    // Parse request body
    const body = await request.json().catch(() => null);

    if (!body || typeof body.email !== "string") {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Sanitize and validate email
    const email = sanitizeInput(body.email);

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Check for existing subscriber
    const existingSubscriber = await SubscriberModel.findOne({ email });

    if (existingSubscriber) {
      // Return success to prevent email enumeration
      // If they were unsubscribed, reactivate them
      if (existingSubscriber.status === "unsubscribed") {
        existingSubscriber.status = "active";
        await existingSubscriber.save();
      }
      return NextResponse.json({ success: true });
    }

    // Create new subscriber
    await SubscriberModel.create({ email });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
