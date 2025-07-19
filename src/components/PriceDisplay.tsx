'use client'

import { useShopify } from '@/hooks/useShopify'

interface PriceDisplayProps {
  // useAdminApi?: boolean // Commented out - Admin API disabled
  showSource?: boolean
}

export function PriceDisplay({ showSource = false }: PriceDisplayProps) {
  const { price, currencySymbol, loading, source } = useShopify()
  
  if (loading) {
    return <span className="animate-pulse">Loading price...</span>
  }
  
  if (price <= 0) {
    return <span>Price not available</span>
  }
  
  return (
    <span>
      {currencySymbol}{price.toFixed(2)}
      {showSource && source && (
        <span className="text-xs text-gray-500 ml-2">
          (from {source})
        </span>
      )}
    </span>
  )
}