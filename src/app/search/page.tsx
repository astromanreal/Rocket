
// src/app/search/page.tsx
'use client';

import { useEffect } from 'react';
import { SiteSearch } from '@/components/site-search';
import { Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';
const searchPageUrl = `${siteUrl}/search`;

export default function SearchPage() {
  useEffect(() => {
    document.title = 'Search Rocketpedia - Find Rockets, Agencies, Merch & More';

    // Add canonical link tag
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', searchPageUrl);

    // Add OpenGraph and Twitter meta tags
    const setMetaTag = (type: 'property' | 'name', key: string, content: string) => {
        let element = document.querySelector(`meta[${type}='${key}']`) as HTMLMetaElement;
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute(type, key);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    };

    setMetaTag('property', 'og:title', 'Search Rocketpedia - Find Information Fast');
    setMetaTag('property', 'og:description', 'Use the Rocketpedia search to find detailed information about rockets, space agencies, missions, merchandise, and the science of spaceflight.');
    setMetaTag('property', 'og:url', searchPageUrl);
    setMetaTag('property', 'og:image', `${siteUrl}/og-search.png`); 
    setMetaTag('name', 'twitter:title', 'Search Rocketpedia - Your Space Information Hub');
    setMetaTag('name', 'twitter:description', 'Find information about rockets, space agencies, missions, merchandise, and more on Rocketpedia.');
    setMetaTag('name', 'twitter:image', `${siteUrl}/twitter-search.png`); 

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebPage', // Could also be 'SearchResultsPage' if results are displayed on this page after query param
      url: searchPageUrl,
      name: 'Search Rocketpedia - Find Rockets, Agencies, Merch & More',
      description: 'Search for rockets, space agencies, merchandise, and space exploration topics on Rocketpedia.',
      keywords: "search rocketpedia, find rockets, space agency search, rocket information query, space exploration search, rocket merch search, space forum search",
      mainEntity: { // For a search page, this describes the search functionality
        '@type': 'SearchAction',
        target: `${siteUrl}/search?q={search_term_string}`, // How the search is performed
        'query-input': 'required name=search_term_string',
      },
      isPartOf: {
        '@type': 'WebSite',
        url: siteUrl,
        name: 'Rocketpedia'
      }
    };

    let script = document.getElementById('search-page-json-ld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'search-page-json-ld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    return () => {
      const ldScript = document.getElementById('search-page-json-ld');
      if (ldScript) {
        ldScript.remove();
      }
    };

  }, []);


  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto animate-launch">
        <CardHeader className="text-center">
          <Search className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold">Search Rocketpedia</CardTitle>
          <CardDescription>
            Enter keywords to find information about rockets, space agencies, merch, and more.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <SiteSearch searchScope="all" />
           <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Try searching for "Falcon 9", "NASA", "Lunar Missions", "Rocket Engines", or "Posters".</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
