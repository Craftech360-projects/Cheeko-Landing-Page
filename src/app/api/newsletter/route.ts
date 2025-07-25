import { NextResponse } from 'next/server';

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const SHOPIFY_ADMIN_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    console.log('Attempting to subscribe email to Shopify:', email);

    const response = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2023-10/customers.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
        customer: {
          email: email,
          email_marketing_consent: {
            state: "subscribed",
            opt_in_level: "single_opt_in",
            consent_updated_at: new Date().toISOString(),
          },
          tags: "newsletter, cheeko-landing-page"
        },
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Successfully subscribed to Shopify:', data);
      return NextResponse.json({
        message: 'Thank you for subscribing to Cheeko AI! You will receive exclusive updates, early access to new features, and special offers delivered straight to your inbox.',
      });
    } else {
      // Check if the error is because the customer already exists
      if (data.errors && data.errors.email && data.errors.email[0] === 'has already been taken') {
        console.log('Email already subscribed to Shopify:', email);
        return NextResponse.json({
          message: 'Thank you for subscribing to Cheeko AI! You are already on our list.',
        });
      }
      console.error('Shopify API Error:', data);
      return NextResponse.json(
        { error: 'Subscription failed. Please try again.' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}