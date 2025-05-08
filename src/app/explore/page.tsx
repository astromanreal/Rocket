// src/app/explore/page.tsx
'use client'; // Mark as client component for state and effects

import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket, Calendar, Gauge, Globe, Building, CheckCircle, XCircle, HelpCircle, Search, FilterX } from 'lucide-react';
import Image from 'next/image';
import { getRockets, type Rocket as RocketType, type RocketStatus } from '@/services/rocket-data'; // Adjust path as needed
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link'; // Import Link for navigation
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast'; // Import useToast

// Helper to format numbers (e.g., success rate)
const formatNumber = (num: number | undefined): string => {
  if (num === undefined) return 'N/A';
  return num % 1 === 0 ? num.toString() : num.toFixed(1);
};

// Helper to generate slug
const slugify = (name: string): string => name.toLowerCase().replace(/\s+/g, '-');


// Rocket Card Component
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

  const slug = slugify(rocket.name);

  return (
    <Card className={`flex flex-col h-full hover:shadow-lg transition-shadow duration-200 animate-launch group relative`}>
      <CardHeader>
        {rocket.imageUrl && (
          <Link href={`/explore/${slug}`} passHref className="block relative h-48 w-full mb-4 overflow-hidden rounded-t-md">
              <Image
                src={rocket.imageUrl || 'https://picsum.photos/400/300'}
                alt={`Image of ${rocket.name}`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={`rocket ${rocket.type}`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority // Prioritize images in the initial viewport if applicable
              />
          </Link>
        )}
        <CardTitle className="flex items-center justify-between">
          <Link href={`/explore/${slug}`} passHref className="hover:text-primary transition-colors">
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
        <div className="flex items-center"><Globe className="mr-2 h-4 w-4 text-muted-foreground" /> Payload: {rocket.payloadCapacity}</div>
        <div className="flex items-center"><Building className="mr-2 h-4 w-4 text-muted-foreground" /> Ownership: {rocket.ownership}</div>
         <p className="text-xs text-muted-foreground pt-2 line-clamp-3">{rocket.description}</p>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground justify-between">
         <div className="flex items-center" title={`First Launch: ${rocket.firstLaunchDate}`}>
             <Calendar className="mr-1 h-3 w-3" /> {rocket.firstLaunchDate.substring(0, 4)} - {rocket.lastLaunchDate ? rocket.lastLaunchDate.substring(0, 4) : 'Present'}
        </div>
         <div className="flex items-center" title={`Success Rate: ${formatNumber(rocket.successRate)}%`}>
           <CheckCircle className="mr-1 h-3 w-3" /> {formatNumber(rocket.successRate)}% ({rocket.totalLaunches})
         </div>
      </CardFooter>
        <CardFooter>
            <Link href={`/explore/${slug}`} passHref className="w-full">
               <Button variant="outline" size="sm" className="w-full">View Details</Button>
           </Link>
         </CardFooter>
    </Card>
  );
}

// Skeleton Loader for Rocket Card
function RocketCardSkeleton() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <Skeleton className="h-48 w-full mb-4" />
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
      <CardFooter className="justify-between">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </CardFooter>
       <CardFooter>
          <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}


// Main Explore Page Component
export default function ExplorePage() {
  const [rockets, setRockets] = useState<RocketType[]>([]);
  const [filteredRockets, setFilteredRockets] = useState<RocketType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<RocketStatus | 'all'>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedLiftType, setSelectedLiftType] = useState<string>('all');
  const { toast } = useToast();

  // Fetch rockets on mount
  useEffect(() => {
    async function loadRockets() {
      setLoading(true);
      try {
        const allRockets = await getRockets();
        setRockets(allRockets);
        setFilteredRockets(allRockets); // Initialize filtered list
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

  // Memoize extraction of filter options
  const { availableYears, availableCountries, availableLiftTypes } = useMemo(() => {
    const years = new Set<string>();
    const countries = new Set<string>();
    const liftTypes = new Set<string>();

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
        else liftTypes.add(rocket.type); // Add original type if not categorized
      }
    });

    return {
      availableYears: ['all', ...Array.from(years).sort((a, b) => parseInt(b) - parseInt(a))],
      availableCountries: ['all', ...Array.from(countries).sort()],
      availableLiftTypes: ['all', ...Array.from(liftTypes).sort()],
    };
  }, [rockets]);


 // Filter rockets based on all criteria
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
           default: return rocket.type === selectedLiftType; // Match exact type for uncategorized
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


  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedYear('all');
    setSelectedCountry('all');
    setSelectedLiftType('all');
  };

  const hasActiveFilters = searchTerm || selectedStatus !== 'all' || selectedYear !== 'all' || selectedCountry !== 'all' || selectedLiftType !== 'all';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Rockets</h1>

      {/* Search and Filter Controls */}
      {/* Removed sticky top-16 z-40 */}
      <div className="mb-8 p-4 border rounded-lg bg-card/50 shadow-sm">
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

         {/* Filter Dropdowns */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
      </div>

       {/* Rocket Grid */}
       <RocketGrid
         loading={loading}
         rockets={filteredRockets}
        />

    </div>
  );
}

// Extracted Rocket Grid component for clarity
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
          key={rocket.name}
          rocket={rocket}
        />
      ))}
    </div>
  );
}
