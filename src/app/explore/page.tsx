// src/app/explore/page.tsx
'use client'; 

import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket, Calendar, Gauge, Globe, Building, CheckCircle, XCircle, HelpCircle, Search, FilterX, History, Zap, Filter } from 'lucide-react';
import { getRockets, type Rocket as RocketType, type RocketStatus, slugify } from '@/services/rocket-data';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link'; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useCountUp } from '@/hooks/use-count-up';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';
const explorePageUrl = `${siteUrl}/explore`;


const formatNumber = (num: number | undefined): string => {
  if (num === undefined) return 'N/A';
  return num % 1 === 0 ? num.toString() : num.toFixed(1);
};

interface RocketCardProps {
  rocket: RocketType;
}

function RocketCard({ rocket }: RocketCardProps) {
  const getStatusIcon = (status: RocketStatus) => {
    switch (status) {
      case 'active': return <CheckCircle className="text-green-500" />;
      case 'past': return <XCircle className="text-red-500" />;
      case 'future': return <HelpCircle className="text-blue-500" />;
      default: return null;
    }
  };

  const rocketSlug = slugify(rocket.name);

  return (
    <Card className={`flex flex-col h-full hover:shadow-lg transition-shadow duration-200 animate-launch group relative`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Link href={`/explore/${rocketSlug}`} passHref className="hover:text-primary transition-colors">
            {rocket.name}
          </Link>
          <Badge variant={rocket.status === 'active' ? 'default' : rocket.status === 'past' ? 'destructive' : 'secondary'} className="capitalize ml-2 shrink-0">
             {getStatusIcon(rocket.status)}
             <span className='ml-1.5'>{rocket.status}</span>
          </Badge>
        </CardTitle>
        <CardDescription>{rocket.operator} ({rocket.country})</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2 text-sm">
        <div className="flex items-center"><Rocket className="mr-2 h-4 w-4 text-muted-foreground" /> Type: {rocket.type}</div>
        <div className="flex items-center"><Gauge className="mr-2 h-4 w-4 text-muted-foreground" /> Stages: {rocket.stages}</div>
        <div className="flex items-center"><Globe className="mr-2 h-4 w-4 text-muted-foreground" /> Payload to LEO: {rocket.payloadCapacity?.LEO || 'N/A'}</div>
        <div className="flex items-center"><Building className="mr-2 h-4 w-4 text-muted-foreground" /> Ownership: {rocket.ownership}</div>
         <p className="text-xs text-muted-foreground pt-2 line-clamp-3">{rocket.description}</p>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground justify-between mt-auto">
         <div className="flex items-center" title={`First Launch: ${rocket.firstLaunchDate}`}>
             <Calendar className="mr-1 h-3 w-3" /> {rocket.firstLaunchDate.substring(0, 4)} - {rocket.lastLaunchDate ? rocket.lastLaunchDate.substring(0, 4) : 'Present'}
        </div>
         <div className="flex items-center" title={`Success Rate: ${formatNumber(rocket.successRate)}%`}>
           <CheckCircle className="mr-1 h-3 w-3" /> {formatNumber(rocket.successRate)}% ({rocket.totalLaunches})
         </div>
      </CardFooter>
        <CardFooter>
            <Link href={`/explore/${rocketSlug}`} passHref className="w-full">
               <Button variant="outline" size="sm" className="w-full">View Details</Button>
           </Link>
         </CardFooter>
    </Card>
  );
}

function RocketCardSkeleton() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
         <Skeleton className="h-10 w-full mt-2" />
      </CardContent>
      <CardFooter className="justify-between mt-auto">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </CardFooter>
       <CardFooter>
          <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}

function AnimatedStatCard({ count, title, icon: Icon }: { count: number; title: string; icon: React.ElementType }) {
    const displayCount = useCountUp(count);
    return (
        <Card className="text-center p-4 bg-muted/30">
            <Icon className="h-8 w-8 mx-auto text-primary mb-2"/>
            <p className="text-3xl font-bold">{displayCount}</p>
            <p className="text-sm text-muted-foreground">{title}</p>
        </Card>
    );
}

export default function ExplorePage() {
  const [rockets, setRockets] = useState<RocketType[]>([]);
  const [filteredRockets, setFilteredRockets] = useState<RocketType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<RocketStatus | 'all'>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedLiftType, setSelectedLiftType] = useState<string>('all');
  const [showFilterFab, setShowFilterFab] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = 'Explore All Rockets - Launch Vehicles Database | Rocketpedia';
    
    // Add canonical link tag
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', explorePageUrl);

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

    setMetaTag('property', 'og:title', 'Explore All Rockets | Rocketpedia');
    setMetaTag('property', 'og:description', 'Browse our comprehensive database of rockets and launch vehicles.');
    setMetaTag('property', 'og:url', explorePageUrl);
    setMetaTag('property', 'og:image', `${siteUrl}/og-explore.png`);
    setMetaTag('name', 'twitter:title', 'Explore All Rockets | Rocketpedia');
    setMetaTag('name', 'twitter:description', 'Browse our comprehensive database of rockets and launch vehicles.');
    setMetaTag('name', 'twitter:image', `${siteUrl}/twitter-explore.png`);

  }, []);

  useEffect(() => {
    async function loadRockets() {
      setLoading(true);
      try {
        const allRockets = await getRockets();
        setRockets(allRockets);
        setFilteredRockets(allRockets); 
      } catch (error) {
        console.error("Failed to fetch rockets:", error);
        toast({
            title: "Error",
            description: "Failed to load rocket data. Please try again later.",
            variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    loadRockets();
  }, [toast]);

  const { availableYears, availableCountries, availableLiftTypes, counts } = useMemo(() => {
    const years = new Set<string>();
    const countries = new Set<string>();
    const liftTypes = new Set<string>();
    const statusCounts = { active: 0, past: 0, future: 0 };


    rockets.forEach(rocket => {
      if (rocket.firstLaunchDate) {
        years.add(rocket.firstLaunchDate.substring(0, 4));
      }
      if (rocket.country) {
        countries.add(rocket.country);
      }
       if (rocket.type) {
        const typeLower = rocket.type.toLowerCase();
        if (typeLower.includes('small')) liftTypes.add('Small-lift');
        else if (typeLower.includes('medium')) liftTypes.add('Medium-lift');
        else if (typeLower.includes('heavy') && !typeLower.includes('super')) liftTypes.add('Heavy-lift');
        else if (typeLower.includes('super heavy')) liftTypes.add('Super heavy-lift');
        else liftTypes.add(rocket.type); 
      }
      statusCounts[rocket.status]++;
    });

    return {
      availableYears: ['all', ...Array.from(years).sort((a, b) => parseInt(b) - parseInt(a))],
      availableCountries: ['all', ...Array.from(countries).sort()],
      availableLiftTypes: ['all', ...Array.from(liftTypes).sort()],
      counts: {
          total: rockets.length,
          ...statusCounts
      }
    };
  }, [rockets]);

 useEffect(() => {
    let results = rockets;

    if (selectedStatus !== 'all') {
      results = results.filter(rocket => rocket.status === selectedStatus);
    }

    if (selectedYear !== 'all') {
        results = results.filter(rocket => rocket.firstLaunchDate.startsWith(selectedYear));
    }

    if (selectedCountry !== 'all') {
        results = results.filter(rocket => rocket.country === selectedCountry);
    }

     if (selectedLiftType !== 'all') {
       results = results.filter(rocket => {
         const typeLower = rocket.type.toLowerCase();
         switch (selectedLiftType) {
           case 'Small-lift': return typeLower.includes('small');
           case 'Medium-lift': return typeLower.includes('medium');
           case 'Heavy-lift': return typeLower.includes('heavy') && !typeLower.includes('super');
           case 'Super heavy-lift': return typeLower.includes('super heavy');
           default: return rocket.type === selectedLiftType; 
         }
       });
     }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      results = results.filter(
        rocket =>
          rocket.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          rocket.operator.toLowerCase().includes(lowerCaseSearchTerm) ||
          rocket.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    setFilteredRockets(results);
  }, [searchTerm, selectedStatus, selectedYear, selectedCountry, selectedLiftType, rockets]);

  useEffect(() => {
    if (filteredRockets.length > 0 && !loading) {
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Explore All Rockets - Launch Vehicles Database',
        description: 'Browse and filter a comprehensive database of rockets and launch vehicles from around the world. Discover specifications, history, and operators.',
        url: explorePageUrl,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: filteredRockets.map((rocket, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Product', // Or TechArticle if more appropriate and you have detail pages
              name: rocket.name,
              description: rocket.description,
              image: rocket.imageUrl,
              url: `${siteUrl}/explore/${slugify(rocket.name)}`,
              category: rocket.type,
              manufacturer: {
                '@type': 'Organization',
                name: rocket.operator,
              },
              countryOfOrigin: {
                '@type': 'Country',
                name: rocket.country,
              },
              // Add more properties like SKU, offers if they were actual products for sale
            },
          })),
        },
      };

      let script = document.getElementById('explore-rockets-json-ld');
      if (!script) {
        script = document.createElement('script');
        script.id = 'explore-rockets-json-ld';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);

      return () => {
        const ldScript = document.getElementById('explore-rockets-json-ld');
        if (ldScript) {
          ldScript.remove();
        }
      };
    }
  }, [filteredRockets, loading]);


  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedYear('all');
    setSelectedCountry('all');
    setSelectedLiftType('all');
  };

  const hasActiveFilters = searchTerm || selectedStatus !== 'all' || selectedYear !== 'all' || selectedCountry !== 'all' || selectedLiftType !== 'all';

  const totalCount = useCountUp(counts.total);

  // Scroll listener for FAB
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) { // Show FAB after scrolling 350px
        setShowFilterFab(true);
      } else {
        setShowFilterFab(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const FilterControls = ({ inDialog = false }: { inDialog?: boolean }) => (
     <div className={cn(inDialog ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4")}>
        <div>
            <Label htmlFor="filter-status" className="text-xs text-muted-foreground">Status</Label>
            <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as RocketStatus | 'all')}>
                <SelectTrigger id="filter-status" className="w-full">
                    <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="past">Past</SelectItem>
                    <SelectItem value="future">Future</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div>
            <Label htmlFor="filter-year" className="text-xs text-muted-foreground">First Launch Year</Label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger id="filter-year" className="w-full">
                    <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                    {availableYears.map(year => (
                        <SelectItem key={year} value={year}>{year === 'all' ? 'All Years' : year}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
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
            <Label htmlFor="filter-lift-type" className="text-xs text-muted-foreground">Lift Type</Label>
            <Select value={selectedLiftType} onValueChange={setSelectedLiftType}>
                <SelectTrigger id="filter-lift-type" className="w-full">
                    <SelectValue placeholder="Select Lift Type" />
                </SelectTrigger>
                <SelectContent>
                    {availableLiftTypes.map(type => (
                        <SelectItem key={type} value={type}>{type === 'all' ? 'All Types' : type}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-8 animate-launch">
        <Rocket className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold">Explore the Fleet</h1>
        <p className="text-lg text-muted-foreground mt-2">Discover launch vehicles from past, present, and future.</p>
      </section>

      {!loading && (
        <section className="mb-10 animate-launch" style={{animationDelay: '0.1s'}}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="md:col-span-3 p-6 rounded-lg bg-card border shadow-lg">
                    <h3 className="text-2xl font-semibold text-primary">Total Rockets in Database</h3>
                    <p className="text-6xl font-bold tracking-tighter my-2">{totalCount}</p>
                </div>
                <AnimatedStatCard count={counts.active} title="Active Rockets" icon={Zap} />
                <AnimatedStatCard count={counts.past} title="Historic Rockets" icon={History} />
                <AnimatedStatCard count={counts.future} title="Future Rockets" icon={HelpCircle} />
            </div>
        </section>
      )}
      
       <div className="mb-8 p-4 border rounded-lg bg-card/50 shadow-sm animate-launch" style={{animationDelay: '0.2s'}}>
         <div className="flex flex-col sm:flex-row gap-4 mb-4">
             <div className="relative flex-grow">
                 <Label htmlFor="search" className="sr-only">Search Rockets</Label>
                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                 <Input
                    id="search"
                    type="text"
                    placeholder="Search by name, operator..."
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
         <div className="hidden lg:block">
            <FilterControls />
         </div>
      </div>

       <RocketGrid
         loading={loading}
         rockets={filteredRockets}
        />
        
        {/* Floating Action Button for Filters */}
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className={cn(
                        "fixed bottom-6 right-6 lg:hidden h-14 w-14 rounded-full shadow-2xl transition-all duration-300 ease-in-out",
                        showFilterFab ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
                    )}
                    size="icon"
                    aria-label="Open filters"
                >
                    <Filter className="h-6 w-6" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Filter Rockets</DialogTitle>
                    <DialogDescription>
                        Narrow down the list of rockets using the filters below.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <FilterControls inDialog={true} />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button">Apply Filters</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    </div>
  );
}

interface RocketGridProps {
  loading: boolean;
  rockets: RocketType[];
}

function RocketGrid({ loading, rockets }: RocketGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
        {[...Array(8)].map((_, i) => <RocketCardSkeleton key={i} />)}
      </div>
    );
  }

  if (rockets.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground pt-4">
        <Rocket className="mx-auto h-12 w-12 mb-4" />
        <p>No rockets found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
      {rockets.map((rocket) => (
        <RocketCard
          key={rocket.id} 
          rocket={rocket}
        />
      ))}
    </div>
  );
}
