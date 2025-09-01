import { NextResponse } from "next/server";

const SHOPIFY_DOMAIN = process.env["NEXT_PUBLIC_SHOPIFY_DOMAIN"];

// This endpoint returns the native Shopify form URL for newsletter signup
// which will trigger the double opt-in email when configured in Shopify admin
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!SHOPIFY_DOMAIN) {
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const shopifyDomain = SHOPIFY_DOMAIN?.includes(".myshopify.com")
      ? SHOPIFY_DOMAIN
      : `${SHOPIFY_DOMAIN}.myshopify.com`;

    // Create form data for native Shopify submission
    const formData = new URLSearchParams();
    formData.append("contact[email]", email);
    formData.append("contact[tags]", "newsletter,cheeko-landing-page");
    formData.append("form_type", "customer");
    formData.append("utf8", "✓");

    // Submit to Shopify's native contact form endpoint
    const response = await fetch(`https://${shopifyDomain}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
      },
      body: formData.toString(),
    });

    if (response.ok) {
      return NextResponse.json({
        message: "Thank you for subscribing! Please check your email to confirm your subscription.",
      });
    } else {
      return NextResponse.json(
        { error: "Subscription failed. Please try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}