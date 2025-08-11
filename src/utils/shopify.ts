export interface ShopifyConfig {
  domain: string
  storefrontAccessToken: string
  productId: string
  variantId: string
}

export const shopifyConfig: ShopifyConfig = {
  domain: process.env['NEXT_PUBLIC_SHOPIFY_DOMAIN'] || 'your-store.myshopify.com',
  storefrontAccessToken: process.env['NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN'] || 'your-storefront-access-token',
  productId: process.env['NEXT_PUBLIC_SHOPIFY_PRODUCT_ID'] || 'your-product-id',
  variantId: process.env['NEXT_PUBLIC_SHOPIFY_VARIANT_ID'] || 'your-variant-id'
}

export const getShopifyCheckoutUrl = (variantId: string, quantity: number = 1): string => {
  // Check if we have a valid variant ID
  if (!variantId || variantId === 'your-variant-id') {
    console.error('Invalid variant ID. Please update your .env.local file with the correct variant ID.')
    // Return empty string to prevent invalid checkout URLs
    return ''
  }
  
  // Use Shopify's standard checkout URL format with line items
  return `https://${shopifyConfig.domain}/cart/${variantId}:${quantity}`
}

export interface ShopifyProductData {
  price: string
  currencyCode: string
  title: string
  available: boolean
}

export const fetchProductData = async (): Promise<ShopifyProductData | null> => {
  try {
    // Use the API route to avoid CORS issues
    const response = await fetch('/api/shopify')
    
    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText)
      return null
    }

    const data = await response.json()
    // console.log('Product data from API:', data)
    
    return data
  } catch (error) {
    console.error('Failed to fetch product data:', error)
    return null
  }
}

export const getCurrencyByRegion = (): { symbol: string; code: string } => {
  if (typeof window === 'undefined') {
    return { symbol: '$', code: 'USD' }
  }
  
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const locale = navigator.language || 'en-US'
  
  const currencyMap: Record<string, { symbol: string; code: string }> = {
    'US': { symbol: '$', code: 'USD' },
    'GB': { symbol: '£', code: 'GBP' },
    'EU': { symbol: '€', code: 'EUR' },
    'CA': { symbol: 'C$', code: 'CAD' },
    'AU': { symbol: 'A$', code: 'AUD' },
    'JP': { symbol: '¥', code: 'JPY' },
    'IN': { symbol: '₹', code: 'INR' },
    'CN': { symbol: '¥', code: 'CNY' }
  }

  // Check for India first (more specific checks before generic ones)
  if (locale.startsWith('hi') || locale.startsWith('en-IN') || 
      timezone.includes('Kolkata') || timezone.includes('Asia/Kolkata') || 
      timezone.includes('Asia/Calcutta') || timezone.includes('Delhi') || 
      timezone.includes('Mumbai') || timezone.includes('Chennai') || 
      timezone.includes('Bangalore')) return currencyMap['IN']!
  
  if (locale.startsWith('en-US') || timezone.includes('America')) return currencyMap['US']!
  if (locale.startsWith('en-GB') || timezone.includes('London')) return currencyMap['GB']!
  if (locale.startsWith('en-CA') || timezone.includes('Toronto')) return currencyMap['CA']!
  if (locale.startsWith('en-AU') || timezone.includes('Sydney')) return currencyMap['AU']!
  if (locale.startsWith('ja') || timezone.includes('Tokyo')) return currencyMap['JP']!
  if (locale.startsWith('zh') || timezone.includes('Shanghai')) return currencyMap['CN']!
  
  // Check for Europe last to avoid false positives
  if (timezone.includes('Europe/') || locale.startsWith('de') || 
      locale.startsWith('fr') || locale.startsWith('es') || 
      locale.startsWith('it') || locale.startsWith('nl')) return currencyMap['EU']!
  
  return currencyMap['US']!
}