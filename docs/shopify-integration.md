# Shopify Integration Guide

This project uses the Shopify Storefront API for fetching product prices dynamically.

## Current Implementation

### Storefront API (Active)
The Storefront API is currently being used and is the recommended approach for client-facing applications.

**Pros:**
- Designed for public-facing apps
- Limited scope for security
- Works with existing setup
- No additional configuration needed

**Environment Variables:**
```env
NEXT_PUBLIC_SHOPIFY_DOMAIN=cheekoai.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-storefront-token
NEXT_PUBLIC_SHOPIFY_PRODUCT_ID=7648427769879
NEXT_PUBLIC_SHOPIFY_VARIANT_ID=42409109291031
```

### Admin API (Disabled)
The Admin API implementation has been disabled and commented out. The code structure remains in place for future use if needed.

<!-- Admin API documentation preserved for future reference
**Pros:**
- Access to all product data
- More detailed information
- Can manage inventory, orders, etc.

**Cons:**
- Requires Admin Access Token
- Should only be used server-side
- Higher security requirements

**Additional Environment Variable Needed:**
```env
NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_your_admin_token
```
-->

## How to Get Admin Access Token

1. Go to your Shopify Admin
2. Navigate to Settings → Apps and sales channels
3. Click "Develop apps"
4. Create a new app or use existing
5. Configure Admin API scopes (at minimum: `read_products`)
6. Install the app
7. Copy the Admin API access token

## Usage

### Using Storefront API:
```tsx
import { useShopify } from '@/hooks/useShopify'

const Component = () => {
  const { price, currencySymbol } = useShopify()
  return <span>{currencySymbol}{price}</span>
}
```

## API Endpoints

- **Storefront API**: `/api/shopify` (Active)
- **Admin API**: `/api/shopify-admin` (Disabled)

## Troubleshooting

If Admin API returns errors:
1. Verify the access token is valid
2. Check that the app has `read_products` scope
3. Ensure the product ID is correct
4. Check Shopify API version compatibility

## Security Notes

- Never expose Admin API tokens in client-side code
- Use environment variables prefixed with `NEXT_PUBLIC_` only for public data
- Admin API should only be called from server-side routes