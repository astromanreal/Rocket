
// src/app/agencies/page.tsx
'use client';

import type { Metadata } from 'next'; // Keep for reference if converting to Server Component
import { useState, useEffect, useMemo } from 'react';
import { getAgencies, type Agency, type AgencyType } from '@/data/agencies-data';
import { AgencyCard } from '@/components/agency-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Building, FilterX, Globe, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'; 

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';
const agenciesPageUrl = `${siteUrl}/agencies`;

function AgencyCardSkeleton() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="p-4 bg-muted/30">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-12 w-24" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-6 w-3/4 mt-4" />
        <Skeleton className="h-4 w-1/2 mt-1" />
      </CardHeader>
      <CardContent className="flex-grow p-4 space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}

export default function AgenciesPage() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<AgencyType | 'all'>('all');
  const { toast } = useToast();

  useEffect(() => {
    document.title = 'Space Agencies Directory | Explore NASA, SpaceX, ISRO & More | Rocketpedia';
    
    // Add canonical link tag
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', agenciesPageUrl);

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

    setMetaTag('property', 'og:title', 'Space Agencies Directory | Rocketpedia');
    setMetaTag('property', 'og:description', 'Discover leading space agencies like NASA, SpaceX, ISRO, ESA. Explore their missions, technologies, and contributions to space exploration.');
    setMetaTag('property', 'og:url', agenciesPageUrl);
    setMetaTag('property', 'og:image', `${siteUrl}/og-agencies.png`); // Placeholder image
    setMetaTag('name', 'twitter:title', 'Space Agencies Directory | Rocketpedia');
    setMetaTag('name', 'twitter:description', 'Explore global space agencies and their impact.');
    setMetaTag('name', 'twitter:image', `${siteUrl}/twitter-agencies.png`); // Placeholder image

  }, []);


  useEffect(() => {
    async function loadAgencies() {
      setLoading(true);
      try {
        const allAgencies = await getAgencies();
        setAgencies(allAgencies);
        setFilteredAgencies(allAgencies); 
      } catch (error) {
        console.error("Failed to fetch agencies:", error);
        toast({
          title: "Error",
          description: "Failed to load agency data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    loadAgencies();
  }, [toast]);

  const availableCountries = useMemo(() => {
    const countries = new Set<string>();
    agencies.forEach(agency => countries.add(agency.country));
    return ['all', ...Array.from(countries).sort()];
  }, [agencies]);

  useEffect(() => {
    let results = agencies;

    if (selectedCountry !== 'all') {
      results = results.filter(agency => agency.country === selectedCountry);
    }

    if (selectedType !== 'all') {
      results = results.filter(agency => agency.type === selectedType);
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      results = results.filter(
        agency =>
          agency.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          agency.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          (agency.notableMissions && agency.notableMissions.some(m => m.toLowerCase().includes(lowerCaseSearchTerm))) ||
          (agency.technologies && agency.technologies.some(t => t.toLowerCase().includes(lowerCaseSearchTerm)))
      );
    }

    setFilteredAgencies(results);
  }, [searchTerm, selectedCountry, selectedType, agencies]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCountry('all');
    setSelectedType('all');
  };

  const hasActiveFilters = searchTerm || selectedCountry !== 'all' || selectedType !== 'all';

  useEffect(() => {
    if (filteredAgencies.length > 0 && !loading) { // Check filteredAgencies and loading state
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Space Agencies Directory',
        description: 'Explore various space agencies like NASA, SpaceX, ISRO, ESA, their missions, technologies, and contributions to space exploration.',
        url: agenciesPageUrl,
        keywords: "space agencies, NASA, SpaceX, ISRO, ESA, Roscosmos, CNSA, JAXA, space exploration, public space agency, private space company",
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: filteredAgencies.map((agency, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': 'Organization',
                    name: agency.name,
                    description: agency.description,
                    url: agency.officialWebsite,
                    logo: agency.logo,
                    knowsAbout: agency.technologies.join(', '), // More specific than just "Space Exploration"
                    location: {
                        '@type': 'Place',
                        address: {
                            '@type': 'PostalAddress',
                            addressCountry: agency.country
                        }
                    },
                    ...(agency.type === 'Public' ? { subOrganizationOf: { '@type': 'GovernmentOrganization', name: `${agency.country} Government` } } : {}),
                     memberOf: agency.type === 'Public' ? { '@type': 'GovernmentOrganization' } : { '@type': 'Organization' } // Simplified memberOf
                }
            }))
        }
      };

      let script = document.getElementById('agencies-json-ld');
      if (!script) {
        script = document.createElement('script');
        script.id = 'agencies-json-ld';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);

      return () => { 
        const ldScript = document.getElementById('agencies-json-ld');
        if (ldScript) {
          ldScript.remove();
        }
      };
    }
  }, [filteredAgencies, loading]);


  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-12 animate-launch">
        <Building className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">
          Rocket Builders & Agencies
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Meet the pioneers of space technology shaping humanity's future beyond Earth.
        </p>
      </section>

       <div className="mb-8 p-4 border rounded-lg bg-card/50 shadow-sm sticky top-[60px] z-40 backdrop-blur supports-[backdrop-filter]:bg-card/70"> 
         <div className="flex flex-col sm:flex-row gap-4 mb-4">
             <div className="relative flex-grow">
                 <Label htmlFor="search-agencies" className="sr-only">Search Agencies</Label>
                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                 <Input
                    id="search-agencies"
                    type="text"
                    placeholder="Search by name, mission, tech..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full"
                />
             </div>
             {hasActiveFilters && (
                 <Button variant="outline" onClick={resetFilters} className="shrink-0">
                    <FilterX className="mr-2 h-4 w-4" /> Reset Filters
                </Button>
             )}
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div>
                <Label htmlFor="filter-country" className="text-xs text-muted-foreground">Country</Label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger id="filter-country" className="w-full">
                        <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableCountries.map(country => (
                            <SelectItem key={country} value={country}>{country === 'all' ? 'All Countries' : country}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
             </div>
             <div>
                <Label htmlFor="filter-type" className="text-xs text-muted-foreground">Type</Label>
                <Select value={selectedType} onValueChange={(value) => setSelectedType(value as AgencyType | 'all')}>
                    <SelectTrigger id="filter-type" className="w-full">
                        <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                         <SelectItem value="all">All Types</SelectItem>
                         <SelectItem value="Public">Public</SelectItem>
                         <SelectItem value="Private">Private</SelectItem>
                    </SelectContent>
                </Select>
             </div>
         </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {[...Array(6)].map((_, i) => <AgencyCardSkeleton key={i} />)}
        </div>
      ) : filteredAgencies.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground pt-4">
          <Building className="mx-auto h-12 w-12 mb-4" />
          <p>No agencies found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredAgencies.map((agency) => (
            <AgencyCard key={agency.id} agency={agency} />
          ))}
        </div>
      )}
    </div>
  );
}
