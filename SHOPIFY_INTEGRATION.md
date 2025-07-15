# Shopify Integration Guide

## Setup Instructions

1. **Create a Shopify Store**
   - Sign up at [Shopify.com](https://www.shopify.com)
   - Create your product in the Shopify admin

2. **Get Your Shopify Credentials**
   - Go to your Shopify admin → Settings → Apps and sales channels
   - Create a custom app or use the Shopify Buy Button app
   - Get your store domain (e.g., `your-store.myshopify.com`)
   - Get your product variant ID from the product page URL

3. **Configure Environment Variables**
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Shopify credentials:
   ```
   NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-token
   NEXT_PUBLIC_SHOPIFY_PRODUCT_ID=your-product-id
   NEXT_PUBLIC_SHOPIFY_VARIANT_ID=your-variant-id
   ```

4. **How It Works**
   - The Pre Order button automatically detects user's region
   - Currency symbol updates based on location (USD, EUR, GBP, etc.)
   - Clicking the button opens Shopify checkout in a new tab

## Features

- **Dynamic Currency Display**: Automatically shows the correct currency symbol based on user's location
- **Direct Checkout**: Opens Shopify checkout with the product pre-added to cart
- **Responsive**: Works on both desktop and mobile

## Supported Currencies

- USD ($) - United States
- EUR (€) - Europe
- GBP (£) - United Kingdom
- CAD (C$) - Canada
- AUD (A$) - Australia
- JPY (¥) - Japan
- INR (₹) - India
- CNY (¥) - China

## Alternative Integration Methods

If you need more advanced features, consider:
1. **Shopify Storefront API**: For custom checkout flows
2. **Shopify Buy SDK**: For embedding full product catalogs
3. **Shopify Hydrogen**: For headless commerce solutions