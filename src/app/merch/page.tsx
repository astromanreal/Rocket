
// src/app/merch/page.tsx
'use client';

import type { Metadata } from 'next'; // Keep for reference
import { useState, useEffect, useMemo } from 'react';
import { getMerchItems, type MerchItem, type MerchType } from '@/data/merch-data';
import { MerchCard } from '@/components/merch-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ShoppingCart, FilterX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card'; 
import { Button } from '@/components/ui/button';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';
const merchPageUrl = `${siteUrl}/merch`;


function MerchCardSkeleton() {
  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <div className="relative aspect-square w-full bg-muted animate-pulse"></div>
      <div className="p-4 space-y-2 flex-grow">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-8 w-full mt-1" />
      </div>
      <div className="p-4 flex justify-between items-center border-t">
        <Skeleton className="h-7 w-1/3" />
        <Skeleton className="h-9 w-1/4" />
      </div>
    </Card>
  );
}

export default function MerchPage() {
  const [merchItems, setMerchItems] = useState<MerchItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MerchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<MerchType | 'all'>('all');
  const { toast } = useToast();

  useEffect(() => {
    document.title = 'Rocket Merch & Collectibles Store | Rocketpedia';
    
    // Add canonical link tag
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', merchPageUrl);

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

    setMetaTag('property', 'og:title', 'Rocket Merch & Collectibles Store | Rocketpedia');
    setMetaTag('property', 'og:description', 'Shop exclusive rocket-themed merchandise, collectibles, apparel, posters, and engineering art. Perfect gifts for space enthusiasts!');
    setMetaTag('property', 'og:url', merchPageUrl);
    setMetaTag('property', 'og:image', `${siteUrl}/og-merch.png`); // Placeholder image
    setMetaTag('name', 'twitter:title', 'Rocket Merch & Collectibles Store | Rocketpedia');
    setMetaTag('name', 'twitter:description', 'Find unique space-themed gifts and collectibles.');
    setMetaTag('name', 'twitter:image', `${siteUrl}/twitter-merch.png`); // Placeholder image

  }, []);

  useEffect(() => {
    async function loadMerch() {
      setLoading(true);
      try {
        const allItems = await getMerchItems();
        setMerchItems(allItems);
        setFilteredItems(allItems); 
      } catch (error) {
        console.error("Failed to fetch merch items:", error);
        toast({
          title: "Error",
          description: "Failed to load merchandise data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    loadMerch();
  }, [toast]);

  const availableTypes = useMemo(() => {
    const types = new Set<MerchType>();
    merchItems.forEach(item => types.add(item.type));
    return ['all', ...Array.from(types).sort()];
  }, [merchItems]);

  useEffect(() => {
    let results = merchItems;

    if (selectedType !== 'all') {
      results = results.filter(item => item.type === selectedType);
    }

    setFilteredItems(results);
  }, [selectedType, merchItems]);

  const resetFilters = () => {
    setSelectedType('all');
  };

  const hasActiveFilters = selectedType !== 'all';

  useEffect(() => {
    if (filteredItems.length > 0 && !loading) {
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage', // Signifies a page listing multiple items
        name: 'Rocketpedia Merchandise Store - Collectibles, Apparel, Posters',
        description: 'Browse exclusive rocket-themed collectibles, apparel, posters, and engineering art. Perfect gifts for space enthusiasts and science lovers.',
        url: merchPageUrl,
        keywords: "rocket merchandise, space collectibles, astronaut apparel, space posters, engineering blueprints, NASA merch, SpaceX gifts, science gifts",
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: filteredItems.map((item, index) => ({
            '@type': 'Product',
            name: item.name,
            description: item.description,
            image: item.image.startsWith('http') ? item.image : `${siteUrl}${item.image}`,
            sku: item.id,
            category: item.type, // Category of the product
            ...(item.techDetails && { additionalProperty: { '@type': 'PropertyValue', name: 'Technical Details', value: item.techDetails } }),
            offers: {
              '@type': 'Offer',
              priceCurrency: 'USD', // Assuming USD, adjust if different
              price: (item.price / 100).toFixed(2), // Convert cents to dollars
              availability: 'https://schema.org/InStock', // Or InStoreOnly, PreOrder, etc.
              url: item.buyNowLink !== '#' ? item.buyNowLink : `${merchPageUrl}#item-${item.id}`, // Link to product
              seller: { // Seller information
                '@type': 'Organization',
                name: 'Rocketpedia Store'
              }
            },
            brand: { // Brand of the product (if applicable, otherwise can be Rocketpedia)
              '@type': 'Organization',
              name: 'Rocketpedia Store', 
            }
          })),
        },
      };

      let script = document.getElementById('merch-json-ld');
      if (!script) {
        script = document.createElement('script');
        script.id = 'merch-json-ld';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
      
      return () => {
        const ldScript = document.getElementById('merch-json-ld');
        if (ldScript) {
          ldScript.remove();
        }
      };
    }
  }, [filteredItems, loading]);


  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-12 animate-launch">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mx-auto h-16 w-16 text-primary mb-4">
           <path d="M17.283 1.036a1 1 0 0 0-1.047.06L4.5 11.25l.92.92a3.75 3.75 0 0 0 5.304 0l7.81-7.81a1 1 0 0 0 .06-1.047Zm0-1.036a2 2 0 0 1 2.094-.12L24 3.75V1.5a.75.75 0 0 0-1.5 0v.44L17.283.001ZM11.78 11.03a.75.75 0 1 0 1.06-1.06L6.47 3.6H3.75a.75.75 0 0 0 0 1.5h2.076l5.954 5.93Zm4.44 2.95a.75.75 0 0 0-1.06 1.06l-2.97 2.97H9.75a.75.75 0 0 0 0 1.5h2.076l-1.52 1.52a.75.75 0 0 0 1.06 1.06l1.52-1.52v2.076a.75.75 0 0 0 1.5 0v-2.72l2.97-2.97ZM4.5 15.75a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"/>
         </svg>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">
          Explore. Collect. Celebrate Space Technology.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Get exclusive rocket collectibles and engineering art.
        </p>
      </section>

       <div className="mb-8 p-4 border rounded-lg bg-card/50 shadow-sm sticky top-[60px] z-40 backdrop-blur supports-[backdrop-filter]:bg-card/70 flex flex-col sm:flex-row gap-4 items-center">
         <div className="flex-grow w-full sm:w-auto">
            <Label htmlFor="filter-type" className="sr-only">Filter by Type</Label>
            <Select value={selectedType} onValueChange={(value) => setSelectedType(value as MerchType | 'all')}>
                <SelectTrigger id="filter-type" className="w-full">
                    <SelectValue placeholder="Filter by Type..." />
                </SelectTrigger>
                <SelectContent>
                    {availableTypes.map(type => (
                        <SelectItem key={type} value={type}>{type === 'all' ? 'All Types' : type}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
         </div>
         {hasActiveFilters && (
             <Button variant="outline" onClick={resetFilters} className="shrink-0 w-full sm:w-auto">
                <FilterX className="mr-2 h-4 w-4" /> Reset Filter
            </Button>
         )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
          {[...Array(8)].map((_, i) => <MerchCardSkeleton key={i} />)}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground pt-4">
          <ShoppingCart className="mx-auto h-12 w-12 mb-4" />
          <p>No merchandise found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
          {filteredItems.map((item) => (
            <MerchCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
