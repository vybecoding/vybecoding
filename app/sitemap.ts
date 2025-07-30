import { MetadataRoute } from 'next'
import { api } from '@/convex/_generated/api'
import { ConvexHttpClient } from 'convex/browser'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vybecoding.ai'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/apps`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/members`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/featured`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/apps/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  try {
    // Dynamic app pages
    const apps = await convex.query(api.apps.getApprovedApps, { limit: 100 })
    const appPages = apps.apps.map((app) => ({
      url: `${baseUrl}/apps/${app._id}`,
      lastModified: new Date(app._creationTime),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    // Dynamic guide pages (if guides are implemented)
    // const guides = await convex.query(api.guides.getPublishedGuides, { limit: 100 })
    // const guidePages = guides.guides.map((guide) => ({
    //   url: `${baseUrl}/guides/${guide._id}`,
    //   lastModified: new Date(guide._creationTime),
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.6,
    // }))

    return [...staticPages, ...appPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return static pages only if dynamic content fails
    return staticPages
  }
}