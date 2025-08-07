import { NextResponse } from "next/server";

const SHOPIFY_DOMAIN = process.env["NEXT_PUBLIC_SHOPIFY_DOMAIN"];
const SHOPIFY_ADMIN_ACCESS_TOKEN =
  process.env["NEXT_PUBLIC_SHOPIFY_NEWSLETTER_ADMIN_API_ACCESS_TOKEN"];
const SHOPIFY_API_KEY =
  process.env["NEXT_PUBLIC_SHOPIFY_NEWSLETTER_APP_API_KEY"];
const SHOPIFY_API_SECRET =
  process.env["NEXT_PUBLIC_SHOPIFY_NEWSLETTER_APP_API_SECRET_KEY"];
const SHOPIFY_API_VERSION = "2025-07";

// Query to fetch store locations
const LOCATIONS_QUERY = `
  query getLocations {
    locations(first: 1) {
      edges {
        node {
          id
          name
          isActive
        }
      }
    }
  }
`;

const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      userErrors {
        field
        message
      }
      customer {
        id
        email
        emailMarketingConsent {
          marketingState
          marketingOptInLevel
          consentUpdatedAt
        }
      }
    }
  }
`;

// const CUSTOMER_UPDATE_CONSENT_MUTATION = `
//   mutation customerEmailMarketingConsentUpdate($input: CustomerEmailMarketingConsentUpdateInput!) {
//     customerEmailMarketingConsentUpdate(input: $input) {
//       userErrors {
//         field
//         message
//       }
//       customer {
//         id
//         email
//         emailMarketingConsent {
//           marketingState
//           marketingOptInLevel
//           consentUpdatedAt
//         }
//       }
//     }
//   }
// `;

// Cache location ID to avoid repeated queries
let cachedLocationId: string | null = null;

async function getStoreLocationId(
  graphqlEndpoint: string,
  accessToken: string
): Promise<string | null> {
  if (cachedLocationId) {
    return cachedLocationId;
  }

  try {
    const response = await fetch(graphqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: LOCATIONS_QUERY,
      }),
    });

    const data = await response.json();
    
    if (data.data?.locations?.edges?.[0]?.node?.id) {
      cachedLocationId = data.data.locations.edges[0].node.id;
      // console.log("Fetched store location:", {
      //   id: cachedLocationId,
      //   name: data.data.locations.edges[0].node.name,
      // });
      return cachedLocationId;
    }
    
    console.warn("No active locations found in store");
    return null;
  } catch (error) {
    console.error("Error fetching store location:", error);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate environment variables
    if (!SHOPIFY_DOMAIN || !SHOPIFY_ADMIN_ACCESS_TOKEN) {
      console.error("Missing Shopify configuration:", {
        domain: !!SHOPIFY_DOMAIN,
        token: !!SHOPIFY_ADMIN_ACCESS_TOKEN,
        apiKey: !!SHOPIFY_API_KEY,
        apiSecret: !!SHOPIFY_API_SECRET,
      });
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

    // console.log("Attempting to subscribe email to Shopify:", email);

    // Ensure we're using the correct domain format
    const shopifyDomain = SHOPIFY_DOMAIN?.includes(".myshopify.com")
      ? SHOPIFY_DOMAIN
      : `${SHOPIFY_DOMAIN}.myshopify.com`;

    const graphqlEndpoint = `https://${shopifyDomain}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;
    // console.log("GraphQL Endpoint:", graphqlEndpoint);
    // console.log("Access Token present:", !!SHOPIFY_ADMIN_ACCESS_TOKEN);
    // console.log(
    //   "Access Token first 10 chars:",
    //   SHOPIFY_ADMIN_ACCESS_TOKEN?.substring(0, 10)
    // );
    
    // Fetch store location ID
    const locationId = await getStoreLocationId(graphqlEndpoint, SHOPIFY_ADMIN_ACCESS_TOKEN!);
    // console.log("Using location ID:", locationId);

    // Create customer with email marketing consent
    const response = await fetch(graphqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ADMIN_ACCESS_TOKEN!,
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: CUSTOMER_CREATE_MUTATION,
        variables: {
          input: {
            email: email,
            emailMarketingConsent: {
              marketingOptInLevel: "CONFIRMED_OPT_IN",
              marketingState: "SUBSCRIBED",
              consentUpdatedAt: new Date().toISOString(),
              ...(locationId && { sourceLocationId: locationId }),
            },
            tags: ["newsletter", "cheeko-landing-page"],
          },
        },
      }),
    });

    const responseText = await response.text();
    // console.log("Response status:", response.status);
    // console.log(
    //   "Response headers:",
    //   Object.fromEntries(response.headers.entries())
    // );

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error(
        "Failed to parse response. Response text:",
        responseText.substring(0, 500)
      );
      console.error(
        "This might be a 404 HTML page. Check the API endpoint URL."
      );
      return NextResponse.json(
        {
          error:
            "Invalid response from Shopify. Please check API configuration.",
        },
        { status: 500 }
      );
    }

    // Check if we got a 404 or other error status
    if (response.status === 404) {
      console.error("404 Not Found - API endpoint does not exist");
      console.error("Tried endpoint:", graphqlEndpoint);
      return NextResponse.json(
        {
          error: "Shopify API endpoint not found. Please check configuration.",
        },
        { status: 500 }
      );
    }

    // Check for GraphQL errors (but not ACCESS_DENIED for PII)
    if (data.errors) {
      console.error("Shopify GraphQL Error:", data.errors);
      console.error("Full response data:", JSON.stringify(data, null, 2));
      
      // Check if it's just a PII access error but customer was created
      const isPIIError = data.errors.some((error: any) => 
        error.extensions?.code === "ACCESS_DENIED" && 
        error.path?.includes("email")
      );
      
      if (isPIIError && data.data?.customerCreate?.customer?.id) {
        // Customer was created successfully, just can't read back the email
        // console.log("Customer created successfully despite PII access restriction");
        return NextResponse.json({
          message:
            "Thank you for subscribing to Cheeko AI! You will receive exclusive updates, early access to new features, and special offers delivered straight to your inbox.",
        });
      }
      
      // Other errors should still fail
      return NextResponse.json(
        { error: "Subscription failed. Please try again." },
        { status: 500 }
      );
    }

    // Check for user errors (including duplicate email)
    if (data.data?.customerCreate?.userErrors?.length > 0) {
      const errors = data.data.customerCreate.userErrors;
      // console.log("Customer creation user errors:", errors);

      // Check if email already exists
      const emailTakenError = errors.find(
        (error: any) =>
          error.field?.includes("email") &&
          (error.message?.toLowerCase().includes("taken") ||
            error.message?.toLowerCase().includes("already"))
      );

      if (emailTakenError) {
        // console.log("Email already subscribed, returning success");
        return NextResponse.json({
          message:
            "Thank you for subscribing to Cheeko AI! You are already on our list.",
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
      // console.log(
      //   "Successfully subscribed to Shopify:",
      //   data.data.customerCreate.customer
      // );
      return NextResponse.json({
        message:
          "Thank you for subscribing to Cheeko AI! You will receive exclusive updates, early access to new features, and special offers delivered straight to your inbox.",
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
