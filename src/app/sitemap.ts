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
        {
          url: `${baseUrl}/images/meet-cheeko-img1.png`,
          title: 'CheekoAI - AI Toy for Kids',
          caption: 'CheekoAI smart learning companion toy for children'
        },
        {
          url: `${baseUrl}/images/key-features-child.png`,
          title: 'Child playing with CheekoAI toy',
          caption: 'Interactive AI toy engaging with children'
        },
        {
          url: `${baseUrl}/images/parental-dashboard-parent.jpg`,
          title: 'CheekoAI Parental Dashboard',
          caption: 'Parents monitoring child learning progress'
        }
      ],
      // Note: Videos are referenced but Next.js sitemap doesn't support video directly
      // Consider implementing a separate video sitemap if needed
    },
  ]
}