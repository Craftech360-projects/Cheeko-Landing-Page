import { NextResponse } from 'next/server'

export async function GET() {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
  const productId = process.env.NEXT_PUBLIC_SHOPIFY_PRODUCT_ID
  
  console.log('API Route - Domain:', domain)
  console.log('API Route - Token:', token ? 'Present' : 'Missing')
  console.log('API Route - Product ID:', productId)
  
  if (!domain || !token || !productId) {
    console.log('Missing required environment variables')
    return NextResponse.json({ 
      price: '0', // No fallback price
      currencyCode: 'USD',
      title: 'Cheeko AI Toy',
      available: true,
      error: 'Missing required environment variables'
    })
  }

  try {
    const graphqlEndpoint = `https://${domain}/api/2024-10/graphql.json`
    console.log('Fetching from:', graphqlEndpoint)
    
    const requestBody = {
      query: `
        query getProduct($id: ID!) {
          product(id: $id) {
            title
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      `,
      variables: {
        id: `gid://shopify/Product/${productId}`
      }
    }
    
    console.log('Request body:', JSON.stringify(requestBody, null, 2))
    
    const response = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify(requestBody)
    })

    console.log('Response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Shopify API Error:', response.status, response.statusText)
      console.error('Error details:', errorText)
      return NextResponse.json({ 
        price: '0', // No fallback price
        currencyCode: 'USD',
        title: 'Cheeko AI Toy',
        available: true,
        error: `API Error: ${response.status} ${response.statusText}`
      })
    }

    const data = await response.json()
    console.log('Shopify API Response:', JSON.stringify(data, null, 2))
    
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors)
      return NextResponse.json({ 
        price: '0', // No fallback price
        currencyCode: 'USD',
        title: 'Cheeko AI Toy',
        available: true,
        error: 'GraphQL errors: ' + JSON.stringify(data.errors)
      })
    }
    
    if (data.data?.product) {
      const product = data.data.product
      console.log('Product found:', product.title)
      return NextResponse.json({
        price: product.priceRange.minVariantPrice.amount,
        currencyCode: product.priceRange.minVariantPrice.currencyCode,
        title: product.title,
        available: product.availableForSale
      })
    }
    
    console.log('No product data found in response')
    return NextResponse.json({ 
      price: '0', // No fallback price
      currencyCode: 'USD',
      title: 'Cheeko AI Toy',
      available: true,
      error: 'No product data found'
    })
  } catch (error) {
    console.error('Shopify API error:', error)
    return NextResponse.json({ 
      price: '0', // No fallback price
      currencyCode: 'USD',
      title: 'Cheeko AI Toy',
      available: true,
      error: 'Exception: ' + error.message
    })
  }
}