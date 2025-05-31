
import { MetadataRoute } from 'next';
import { getRockets, slugify as slugifyRocketName } from '@/services/rocket-data';
import { getTopics } from '@/services/forum-data';
import { getAgencies } from '@/data/agencies-data';
import { getMerchItems } from '@/data/merch-data'; // Import merch data

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '', // Homepage
    '/explore',
    '/explore/compare',
    '/agencies',
    '/merch',
    '/ai-expert',
    '/forum',
    '/rocket-science',
    '/contact',
    '/search', // Added search page
    // '/profile', // User-specific, typically not in sitemap unless public profiles
    // '/settings', // User-specific, typically not in sitemap
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 
        route === '' ? 'daily' :
        ['/explore', '/forum', '/merch', '/agencies'].includes(route) ? 'weekly' : // Content listing pages
        'monthly', // Other static pages
    priority: 
        route === '' ? 1.0 :
        ['/explore', '/forum', '/merch', '/agencies'].includes(route) ? 0.9 :
        0.7,
  }));

  // Dynamic rocket detail pages
  const rockets = await getRockets();
  const rocketRoutes = rockets.map((rocket) => ({
    url: `${siteUrl}/explore/${slugifyRocketName(rocket.name)}`,
    lastModified: new Date().toISOString(), // Or a lastUpdated field from your data
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Dynamic forum topic pages
  const topics = await getTopics();
  const forumTopicRoutes = topics.map((topic) => ({
    url: `${siteUrl}/forum/topic/${topic.id}`,
    lastModified: topic.lastPostTimestamp ? new Date(topic.lastPostTimestamp).toISOString() : new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.7,
  }));
  
  // Dynamic merch item pages (if they existed - for now, /merch is a list)
  // If individual merch pages were added, they'd look like this:
  // const merchItems = await getMerchItems();
  // const merchItemRoutes = merchItems.map((item) => ({
  //   url: `${siteUrl}/merch/${item.id}`, // Assuming item.id is a slug or part of URL
  //   lastModified: new Date().toISOString(),
  //   changeFrequency: 'monthly',
  //   priority: 0.6,
  // }));

  // Dynamic agency detail pages (if they existed)
  // const agencies = await getAgencies();
  // const agencyRoutes = agencies.map((agency) => ({
  //   url: `${siteUrl}/agencies/${agency.id}`, // Assuming agency.id is a slug
  //   lastModified: new Date().toISOString(),
  //   changeFrequency: 'monthly',
  //   priority: 0.7,
  // }));

  return [
    ...staticRoutes,
    ...rocketRoutes,
    ...forumTopicRoutes,
    // ...merchItemRoutes, // Add if individual merch pages exist
    // ...agencyRoutes,    // Add if individual agency pages exist
  ] as MetadataRoute.Sitemap;
}
