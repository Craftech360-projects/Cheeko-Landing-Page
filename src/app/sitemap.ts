import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cheekoai.in'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
      images: [
        `${baseUrl}/images/meet-cheeko-img1.png`,
        `${baseUrl}/images/key-features-child.png`,
        `${baseUrl}/images/parental-dashboard-parent.jpg`
      ],
      // Note: Videos are referenced but Next.js sitemap doesn't support video directly
      // Consider implementing a separate video sitemap if needed
    },
  ]
}