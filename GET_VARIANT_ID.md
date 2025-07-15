# How to Get Your Shopify Variant ID

## Method 1: From Shopify Admin
1. Log into your Shopify admin at https://cheekoai.myshopify.com/admin
2. Go to Products → Click on your Cheeko AI product
3. Look at the URL - it will contain the product ID
4. Click on the variant (if you have multiple sizes/colors)
5. The variant ID will be in the URL or visible in the inventory section

## Method 2: Using Shopify API (Quick Test)
Open your browser and go to:
```
https://cheekoai.myshopify.com/products/cheeko-ai-toy.json
```
or
```
https://cheekoai.myshopify.com/admin/api/2024-01/products/7648427769879.json
```

This will show you the product data including all variant IDs.

## Method 3: From the Product Page
1. Go to your product page on the live site
2. Right-click → Inspect Element
3. Look for the "Add to Cart" form
4. Find the variant ID in the form data

## Example Variant ID Format
Variant IDs look like this: `42829510598711` (a long number)

## Update Your Environment File
Once you have the variant ID, update your `.env.local` file:
```
NEXT_PUBLIC_SHOPIFY_VARIANT_ID=42829510598711
```

Then restart your development server for the changes to take effect.