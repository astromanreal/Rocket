// src/app/explore/compare/page.tsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Scale, AlertTriangle, Plus, Info as InfoIcon } from 'lucide-react';
import { getRockets, type Rocket as RocketType, slugify } from '@/services/rocket-data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';
const comparePageUrl = `${siteUrl}/explore/compare`;

// Skeleton Loader for Comparison Page
function ComparePageSkeleton() {
  const cols = 3;
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="w-full mx-auto">
        <CardHeader className="text-center">
          <Scale className="mx-auto h-12 w-12 text-primary mb-4 animate-pulse" />
          <Skeleton className="h-8 w-1/2 mx-auto mb-2" />
          <Skeleton className="h-5 w-3/4 mx-auto" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[...Array(3)].map((_, i) => (
               <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
          <div className="overflow-x-auto">
            <Table className="min-w-max">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px] sticky left-0 bg-card z-10"></TableHead>
                  {[...Array(cols)].map((_, i) => (
                    <TableHead key={i} className="text-center w-[250px]">
                       <Skeleton className="h-40 w-full mb-2" />
                       <Skeleton className="h-6 w-3/4 mx-auto" />
                       <Skeleton className="h-4 w-1/2 mx-auto mt-1" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(12)].map((_, rowIndex) => (
                   <TableRow key={rowIndex}>
                      <TableCell className="font-medium sticky left-0 bg-card z-10">
                        <Skeleton className="h-5 w-24" />
                      </TableCell>
                      {[...Array(cols)].map((_, colIndex) => (
                        <TableCell key={colIndex} className="text-center">
                          <Skeleton className="h-5 w-3/4 mx-auto" />
                        </TableCell>
                      ))}
                   </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
           <div className="text-center mt-8">
             <Skeleton className="h-10 w-32 mx-auto" />
           </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper to format various values consistently
const formatValue = (value: any): string => {
  if (value === null || value === undefined || value === '') return 'N/A';
  if (typeof value === 'object') {
    let parts: string[] = [];
    if ('LEO' in value && value.LEO) parts.push(`LEO: ${value.LEO}`);
    if ('GTO' in value && value.GTO) parts.push(`GTO: ${value.GTO}`);
    if ('Mars' in value && value.Mars) parts.push(`Mars: ${value.Mars}`);
    if (parts.length > 0) return parts.join('\n');
    return 'N/A';
  }
  if (typeof value === 'number') {
    if (value % 1 !== 0 && (value > 0 && value < 1000)) {
      return value.toFixed(1);
    }
    return value.toLocaleString();
  }
  if (typeof value === 'string' && ['active', 'past', 'future'].includes(value.toLowerCase())) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return String(value);
};


export default function ComparePage() {
  const [allRockets, setAllRockets] = useState<RocketType[]>([]);
  const [selectedRocketSlugs, setSelectedRocketSlugs] = useState<(string | null)[]>([null, null, null]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const MAX_COMPARISON_ITEMS = 3;

  useEffect(() => {
    document.title = 'Compare Rockets - Side-by-Side Specifications | Rocketpedia';

    // Add canonical link tag
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', comparePageUrl);

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

    setMetaTag('property', 'og:title', 'Compare Rockets Side-by-Side | Rocketpedia');
    setMetaTag('property', 'og:description', 'Select and compare different rockets to see their specifications, performance, and history side-by-side.');
    setMetaTag('property', 'og:url', comparePageUrl);
    setMetaTag('property', 'og:image', `${siteUrl}/og-compare.png`); // Placeholder image
    setMetaTag('name', 'twitter:title', 'Compare Rockets Side-by-Side | Rocketpedia');
    setMetaTag('name', 'twitter:description', 'Select and compare different rockets to see their specifications, performance, and history side-by-side.');
    setMetaTag('name', 'twitter:image', `${siteUrl}/twitter-compare.png`); // Placeholder image
    
    // JSON-LD for WebPage (or SearchResultsPage if more appropriate later)
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebPage', // Could be SearchResultsPage if the selection feels like a search
      name: 'Compare Rockets - Side-by-Side Specifications',
      description: 'Select and compare different rockets to see their specifications, performance, and history side-by-side. Make informed comparisons with Rocketpedia.',
      url: comparePageUrl,
      keywords: ['compare rockets', 'rocket comparison', 'launch vehicle comparison', 'rocket specs', 'SpaceX vs NASA', 'rocket features'],
       isPartOf: {
        '@type': 'WebSite',
        url: siteUrl,
        name: 'Rocketpedia'
      }
    };

    let script = document.getElementById('compare-page-json-ld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'compare-page-json-ld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    return () => { // Cleanup JSON-LD script
        const ldScript = document.getElementById('compare-page-json-ld');
        if (ldScript) ldScript.remove();
    };

  }, []);

  useEffect(() => {
    async function loadRocketData() {
      setLoading(true);
      setError(null);
      try {
        const rockets = await getRockets();
        setAllRockets(rockets);
      } catch (err) {
        console.error("Failed to fetch rocket data:", err);
        setError("Failed to load rocket data. Please try again later.");
        toast({ title: "Error", description: "Failed to load rocket data.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    }
    loadRocketData();
  }, [toast]);

  const handleSelectRocket = (index: number, slug: string | null) => {
    const newSlug = slug === '' ? null : slug;

    if (newSlug && selectedRocketSlugs.includes(newSlug) && selectedRocketSlugs[index] !== newSlug) {
       toast({ title: "Already Selected", description: "This rocket is already chosen in another slot.", variant: "default" });
       return;
    }

    setSelectedRocketSlugs(prevSlugs => {
      const newSlugs = [...prevSlugs];
      newSlugs[index] = newSlug;
      return newSlugs;
    });
  };

  const rocketsToCompare = useMemo(() => {
    return selectedRocketSlugs
      .map(slug => slug ? allRockets.find(r => slugify(r.name) === slug) : null)
      .filter((r): r is RocketType => r !== null && r !== undefined);
  }, [selectedRocketSlugs, allRockets]);


   const comparisonFields: { label: string; key: keyof RocketType | `dimensions.${'height' | 'diameter' | 'mass'}` | `thrust.${'seaLevel' | 'vacuum'}` | `engines.${'firstStage' | 'secondStage'}` }[] = [
    { label: 'Status', key: 'status' },
    { label: 'Type', key: 'type' },
    { label: 'Country', key: 'country' },
    { label: 'First Launch', key: 'firstLaunchDate' },
    { label: 'Total Launches', key: 'totalLaunches' },
    { label: 'Success Rate', key: 'successRate' },
    { label: 'Height', key: 'dimensions.height' },
    { label: 'Diameter', key: 'dimensions.diameter' },
    { label: 'Mass', key: 'dimensions.mass' },
    { label: 'Liftoff Thrust', key: 'thrust.seaLevel' },
    { label: 'Payload Capacity', key: 'payloadCapacity' },
    { label: 'Reusability', key: 'reusability' },
    { label: '1st Stage Engines', key: 'engines.firstStage' },
    { label: '2nd Stage Engines', key: 'engines.secondStage' },
  ];

  // Helper to get nested properties
  const getNestedValue = (obj: any, path: string) => {
      return path.split('.').reduce((o, key) => (o && o[key] !== 'undefined' ? o[key] : undefined), obj);
  };


  if (loading) {
    return <ComparePageSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Card className="max-w-md mx-auto bg-destructive/10 border-destructive/30">
            <CardHeader>
                 <CardTitle className="text-destructive flex items-center justify-center gap-2">
                    <AlertTriangle className="h-6 w-6"/> Error
                 </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-6">{error}</p>
                 <Link href="/explore" passHref>
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Explore
                    </Button>
                 </Link>
            </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-launch">
      <Card className="w-full mx-auto overflow-hidden">
        <CardHeader className="text-center border-b pb-6">
          <Scale className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold">Rocket Comparison</CardTitle>
          <CardDescription>
            Select up to {MAX_COMPARISON_ITEMS} rockets to compare their specifications side-by-side.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {selectedRocketSlugs.map((selectedSlug, index) => (
                    <div key={index}>
                        <Label htmlFor={`select-rocket-${index}`} className="text-xs text-muted-foreground mb-1 block">
                          Rocket Slot {index + 1}
                        </Label>
                        <Select
                            value={selectedSlug ?? ''}
                            onValueChange={(slug) => handleSelectRocket(index, slug === '##NONE##' ? null : slug)}
                        >
                            <SelectTrigger id={`select-rocket-${index}`} className="w-full">
                                <SelectValue placeholder="Choose a rocket..." />
                            </SelectTrigger>
                            <SelectContent>
                                 <ScrollArea className="h-[300px]">
                                    <SelectItem value="##NONE##" className="text-muted-foreground italic">Clear selection</SelectItem>
                                    {allRockets.sort((a,b) => a.name.localeCompare(b.name)).map(rocket => (
                                        <SelectItem
                                          key={slugify(rocket.name)}
                                          value={slugify(rocket.name)}
                                          disabled={selectedRocketSlugs.includes(slugify(rocket.name)) && selectedRocketSlugs[index] !== slugify(rocket.name)}
                                        >
                                            {rocket.name} ({rocket.operator})
                                        </SelectItem>
                                    ))}
                                </ScrollArea>
                            </SelectContent>
                        </Select>
                    </div>
                ))}
            </div>

            {rocketsToCompare.length === 0 && (
                <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg bg-card/30">
                     <Scale className="mx-auto h-10 w-10 mb-3 text-primary" />
                     <p className="font-semibold text-lg">Start Comparing Rockets</p>
                     <p className="text-sm">Use the dropdowns above to select up to {MAX_COMPARISON_ITEMS} rockets.</p>
                 </div>
            )}

            {rocketsToCompare.length > 0 && rocketsToCompare.length < 2 && (
                <div className="text-center py-12 text-muted-foreground border border-blue-500/30 bg-blue-500/10 rounded-lg">
                    <InfoIcon className="mx-auto h-10 w-10 mb-3 text-blue-500" />
                     <p className="font-semibold text-lg">Select More Rockets</p>
                    <p className="text-sm">Please select at least one more rocket to see the comparison table.</p>
                </div>
            )}

            {rocketsToCompare.length >= 2 && (
                <div className="overflow-x-auto mt-6">
                    <Table className="min-w-[calc(180px+250px*2)]">
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="w-[180px] font-semibold text-base align-top sticky left-0 bg-card z-10 shadow-sm">Attribute</TableHead>
                                {selectedRocketSlugs.map((slug, index) => {
                                    const rocket = slug ? allRockets.find(r => slugify(r.name) === slug) : null;
                                    if (rocket) {
                                        return (
                                            <TableHead key={rocket.id || rocket.name} className="w-[250px] text-center align-top p-4 border-l">
                                            <Link href={`/explore/${slugify(rocket.name)}`} passHref>
                                                <div className="relative h-40 w-full mb-2 rounded overflow-hidden group mx-auto max-w-[200px] shadow-md">
                                                    <Image
                                                        src={rocket.imageUrl || 'https://placehold.co/400x300.png'}
                                                        alt={`Official image of ${rocket.name}`}
                                                        fill
                                                        style={{ objectFit: 'cover' }}
                                                        className="transition-transform duration-300 group-hover:scale-105"
                                                        data-ai-hint={`rocket ${rocket.type}`}
                                                        sizes="(max-width: 768px) 100vw, 200px"
                                                    />
                                                </div>
                                                <span className="font-bold text-lg block hover:text-primary transition-colors">{rocket.name}</span>
                                            </Link>
                                            <span className="text-sm text-muted-foreground">{rocket.operator}</span>
                                            </TableHead>
                                        );
                                    } else {
                                        if (index < MAX_COMPARISON_ITEMS && rocketsToCompare.length < MAX_COMPARISON_ITEMS) {
                                             return (
                                                <TableHead key={`placeholder-col-${index}`} className="w-[250px] text-center align-top p-4 border-l">
                                                    <div className="relative h-40 w-full mb-2 rounded bg-muted/30 flex items-center justify-center mx-auto max-w-[200px] border border-dashed">
                                                        <Plus className="h-8 w-8 text-muted-foreground/40" />
                                                    </div>
                                                    <span className="font-bold text-lg block text-muted-foreground/60">Select Rocket</span>
                                                    <span className="text-sm text-muted-foreground/60">-</span>
                                                </TableHead>
                                             );
                                        }
                                        return null;
                                    }
                                })}
                                {Array.from({ length: Math.max(0, MAX_COMPARISON_ITEMS - Math.max(2, rocketsToCompare.length)) }).map((_, i) => (
                                   rocketsToCompare.length >=2 &&
                                    <TableHead key={`fill-placeholder-${i}`} className="w-[250px] text-center align-top p-4 border-l">
                                        <div className="relative h-40 w-full mb-2 rounded bg-muted/30 flex items-center justify-center mx-auto max-w-[200px] border border-dashed">
                                            <Plus className="h-8 w-8 text-muted-foreground/40" />
                                        </div>
                                        <span className="font-bold text-lg block text-muted-foreground/60">Select Rocket</span>
                                        <span className="text-sm text-muted-foreground/60">-</span>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {comparisonFields.map((field) => (
                            <TableRow key={field.key}>
                                <TableCell className="font-medium sticky left-0 bg-card z-10 shadow-sm">{field.label}</TableCell>
                                {selectedRocketSlugs.map((slug, index) => {
                                     const rocket = slug ? allRockets.find(r => slugify(r.name) === slug) : null;
                                     if (rocket) {
                                        const value = getNestedValue(rocket, field.key);
                                        return (
                                            <TableCell key={`${slug}-${field.key}`} className="text-center border-l text-sm whitespace-pre-wrap">
                                                {field.key === 'status' ? (
                                                <Badge
                                                    variant={rocket.status === 'active' ? 'default' : rocket.status === 'past' ? 'destructive' : 'secondary'}
                                                    className="capitalize"
                                                >
                                                    {formatValue(rocket.status)}
                                                </Badge>
                                                ) : field.key === 'successRate' ? (
                                                  `${formatValue(value)}${typeof value === 'number' ? '%' : ''}`
                                                ) : (
                                                formatValue(value)
                                                )}
                                            </TableCell>
                                        );
                                     } else {
                                        if (index < MAX_COMPARISON_ITEMS && rocketsToCompare.length < MAX_COMPARISON_ITEMS) {
                                          return <TableCell key={`placeholder-cell-${index}-${field.key}`} className="text-center text-muted-foreground/60 border-l">-</TableCell>;
                                        }
                                        return null;
                                     }
                                })}
                                {Array.from({ length: Math.max(0, MAX_COMPARISON_ITEMS - Math.max(2, rocketsToCompare.length)) }).map((_, i) => (
                                    rocketsToCompare.length >=2 &&
                                    <TableCell key={`fill-placeholder-cell-${field.key}-${i}`} className="text-center text-muted-foreground/60 border-l">-</TableCell>
                                ))}
                            </TableRow>
                            ))}
                            <TableRow>
                                <TableCell className="font-medium sticky left-0 bg-card z-10 shadow-sm align-top">Summary</TableCell>
                                {selectedRocketSlugs.map((slug, index) => {
                                     const rocket = slug ? allRockets.find(r => slugify(r.name) === slug) : null;
                                     if (rocket) {
                                        return (
                                            <TableCell key={`${slug}-summary`} className="text-sm text-left max-w-xs whitespace-normal align-top border-l">
                                                {rocket.summary || rocket.description}
                                            </TableCell>
                                        );
                                     } else {
                                         if (index < MAX_COMPARISON_ITEMS && rocketsToCompare.length < MAX_COMPARISON_ITEMS) {
                                          return <TableCell key={`placeholder-desc-${index}`} className="text-sm text-left max-w-xs whitespace-normal align-top text-muted-foreground/60 border-l">-</TableCell>;
                                         }
                                         return null;
                                     }
                                })}
                                {Array.from({ length: Math.max(0, MAX_COMPARISON_ITEMS - Math.max(2, rocketsToCompare.length)) }).map((_, i) => (
                                    rocketsToCompare.length >=2 &&
                                    <TableCell key={`fill-placeholder-desc-${i}`} className="text-sm text-left max-w-xs whitespace-normal align-top text-muted-foreground/60 border-l">-</TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            )}
        </CardContent>
      </Card>
       <div className="text-center mt-8">
            <Link href="/explore" passHref>
                <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Explore Rockets
                </Button>
            </Link>
        </div>
    </div>
  );
}
