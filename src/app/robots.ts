
import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*', // Applies to all user-agents (web crawlers)
        allow: '/', // Allow crawling of all pages by default
        disallow: [
            '/profile', // User-specific profile pages
            '/settings', // User-specific settings pages
            // '/api/', // Disallow crawling of API routes if any are public
            // Add other paths you want to disallow, e.g., '/admin/', '/cart/'
        ],
      },
      // Example: Specific rules for Googlebot
      // {
      //   userAgent: 'Googlebot',
      //   allow: ['/important-for-google/'],
      //   disallow: ['/not-for-google/'],
      // },
      // Example: Disallow a specific bot
      // {
      //   userAgent: 'BadBot',
      //   disallow: ['/'],
      // }
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    // host: siteUrl, // Optional: Specifies the preferred domain (less common now)
  };
}
