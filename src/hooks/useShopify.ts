'use client'

import { useState, useEffect } from 'react'
import { shopifyConfig, getShopifyCheckoutUrl, getCurrencyByRegion, fetchProductData } from '@/utils/shopify'

export interface ShopifyProduct {
  price: number
  currencySymbol: string
  currencyCode: string
  checkoutUrl: string
  loading: boolean
}

export const useShopify = () => {
  const fallbackPrice = process.env.NEXT_PUBLIC_PRODUCT_PRICE ? parseFloat(process.env.NEXT_PUBLIC_PRODUCT_PRICE) : 499
  
  const [product, setProduct] = useState<ShopifyProduct>({
    price: fallbackPrice,
    currencySymbol: '$',
    currencyCode: 'USD',
    checkoutUrl: '',
    loading: true
  })

  useEffect(() => {
    const loadProductData = async () => {
      const currency = getCurrencyByRegion()
      const checkoutUrl = getShopifyCheckoutUrl(shopifyConfig.variantId)
      
      // Fetch actual product data from Shopify
      const productData = await fetchProductData()
      console.log('Fetched product data in hook:', productData)
      
      if (productData) {
        // Parse the price string to a number
        const priceValue = parseFloat(productData.price)
        console.log('Parsed price:', priceValue)
        
        setProduct({
          price: priceValue,
          currencySymbol: currency.symbol,
          currencyCode: productData.currencyCode,
          checkoutUrl,
          loading: false
        })
      } else {
        // Fallback to default values if fetch fails
        console.log('Using fallback values')
        setProduct({
          price: fallbackPrice,
          currencySymbol: currency.symbol,
          currencyCode: currency.code,
          checkoutUrl,
          loading: false
        })
      }
    }

    loadProductData()
  }, [])

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