'use client'

import { useState, useEffect } from 'react'
import { shopifyConfig, getShopifyCheckoutUrl, getCurrencyByRegion, fetchProductData } from '@/utils/shopify'
// import { fetchAdminProductData } from '@/utils/shopify-admin' // Admin API commented out for now

export interface ShopifyProduct {
  price: number
  currencySymbol: string
  currencyCode: string
  checkoutUrl: string
  loading: boolean
  source?: 'storefront' | 'admin' | 'fallback'
}

export const useShopify = (useAdminApi = false) => { // Admin API parameter kept for future use
  const fallbackPrice = process.env.NEXT_PUBLIC_PRODUCT_PRICE ? parseFloat(process.env.NEXT_PUBLIC_PRODUCT_PRICE) : 499
  
  const [product, setProduct] = useState<ShopifyProduct>({
    price: 0, // Don't show fallback price initially
    currencySymbol: '$',
    currencyCode: 'USD',
    checkoutUrl: '',
    loading: true, // Start with loading state
    source: undefined
  })

  useEffect(() => {
    const loadProductData = async () => {
      // Check sessionStorage for cached data first
      const cacheKey = 'shopify_product_data'
      const cachedData = typeof window !== 'undefined' ? sessionStorage.getItem(cacheKey) : null
      
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData)
          // Check if cache is less than 5 minutes old
          if (parsed.timestamp && Date.now() - parsed.timestamp < 5 * 60 * 1000) {
            setProduct({
              ...parsed.data,
              loading: false
            })
            return
          }
        } catch (e) {
          // Invalid cache, continue to fetch
        }
      }
      
      const currency = getCurrencyByRegion()
      const checkoutUrl = getShopifyCheckoutUrl(shopifyConfig.variantId)
      
      let productData = null
      let source: ShopifyProduct['source'] = 'fallback'
      
      // Admin API implementation commented out for now
      // if (useAdminApi) {
      //   // Try Admin API first
      //   const adminData = await fetchAdminProductData()
      //   if (adminData) {
      //     productData = {
      //       price: adminData.price,
      //       currencyCode: adminData.currencyCode,
      //       title: adminData.title,
      //       available: adminData.available
      //     }
      //     source = 'admin'
      //     console.log('Using Admin API data:', productData)
      //   }
      // }
      
      // Use Storefront API (primary method)
      if (!productData) {
        productData = await fetchProductData()
        if (productData) {
          source = 'storefront'
          console.log('Using Storefront API data:', productData)
        }
      }
      
      if (productData) {
        // Parse the price string to a number
        const priceValue = parseFloat(productData.price)
        console.log('Parsed price:', priceValue, 'from', source)
        
        const productState = {
          price: priceValue,
          currencySymbol: currency.symbol,
          currencyCode: productData.currencyCode,
          checkoutUrl,
          loading: false,
          source
        }
        
        setProduct(productState)
        
        // Cache the successful response
        if (typeof window !== 'undefined' && source === 'storefront') {
          sessionStorage.setItem('shopify_product_data', JSON.stringify({
            data: productState,
            timestamp: Date.now()
          }))
        }
      } else {
        // No fallback price - just show "Pre Order Now" without price
        console.log('Shopify API failed - not showing price')
        setProduct({
          price: 0, // No price shown when API fails
          currencySymbol: currency.symbol,
          currencyCode: currency.code,
          checkoutUrl,
          loading: false,
          source: 'fallback'
        })
      }
    }

    loadProductData()
  }, [useAdminApi, fallbackPrice])

  const openCheckout = () => {
    if (product.checkoutUrl) {
      window.open(product.checkoutUrl, '_blank')
    }
  }

  return {
    ...product,
    openCheckout
  }
}