import { NextResponse } from "next/server";

const SHOPIFY_DOMAIN = process.env["NEXT_PUBLIC_SHOPIFY_DOMAIN"];
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env["NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN"];
const SHOPIFY_API_VERSION = "2025-07";

// Storefront API mutation for customer creation
const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customerUserErrors {
        field
        message
        code
      }
      customer {
        id
        email
        acceptsMarketing
      }
    }
  }
`;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate environment variables
    if (!SHOPIFY_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
      console.error("Missing Shopify Storefront configuration");
      return NextResponse.json(
        { error: "Server configuration error. Please contact support." },
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

    // Ensure we're using the correct domain format
    const shopifyDomain = SHOPIFY_DOMAIN?.includes(".myshopify.com")
      ? SHOPIFY_DOMAIN
      : `${SHOPIFY_DOMAIN}.myshopify.com`;

    const storefrontEndpoint = `https://${shopifyDomain}/api/${SHOPIFY_API_VERSION}/graphql.json`;

    // Create customer through Storefront API
    const response = await fetch(storefrontEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: CUSTOMER_CREATE_MUTATION,
        variables: {
          input: {
            email: email,
            acceptsMarketing: true,
          },
        },
      }),
    });

    const data = await response.json();

    // Check for errors
    if (data.errors) {
      console.error("Shopify GraphQL Error:", data.errors);
      return NextResponse.json(
        { error: "Subscription failed. Please try again." },
        { status: 500 }
      );
    }

    // Check for user errors
    if (data.data?.customerCreate?.customerUserErrors?.length > 0) {
      const errors = data.data.customerCreate.customerUserErrors;
      
      // Check if email already exists
      const emailTakenError = errors.find(
        (error: any) =>
          error.code === "TAKEN" ||
          error.message?.toLowerCase().includes("taken") ||
          error.message?.toLowerCase().includes("already")
      );

      if (emailTakenError) {
        return NextResponse.json({
          message:
            "Thank you! You are already subscribed to our newsletter.",
        });
      }

      // Other validation errors
      return NextResponse.json(
        { error: errors[0].message || "Invalid email address." },
        { status: 400 }
      );
    }

    // Success - customer created
    if (data.data?.customerCreate?.customer) {
      return NextResponse.json({
        message:
          "Thank you for subscribing! Please check your email to confirm your subscription.",
      });
    }

    // Unexpected response
    console.error("Unexpected Shopify response:", data);
    return NextResponse.json(
      { error: "Subscription failed. Please try again." },
      { status: 500 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}