// src/app/explore/compare/page.tsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Scale, AlertTriangle, Check, Plus } from 'lucide-react';
import { getRockets, type Rocket as RocketType } from '@/services/rocket-data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

// Helper to generate slug
const slugify = (name: string): string => name.toLowerCase().replace(/\s+/g, '-');

// Skeleton Loader for Comparison Page
function ComparePageSkeleton() {
  const cols = 3; // Number of skeleton columns
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
                {[...Array(8)].map((_, rowIndex) => (
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
const formatValue = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined) return 'N/A';
  if (typeof value === 'number') {
    // Check if it's a rate/percentage to add '%'
    if (value <= 100 && value >= 0 && !Number.isInteger(value)) {
      return `${value.toFixed(1)}%`;
    }
    return value.toLocaleString();
  }
  // Capitalize status
  if (['active', 'past', 'future'].includes(value)) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  return value;
};


export default function ComparePage() {
  const [allRockets, setAllRockets] = useState<RocketType[]>([]);
  const [selectedRocketSlugs, setSelectedRocketSlugs] = useState<(string | null)[]>([null, null, null]); // Max 3 slots
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const MAX_COMPARISON_ITEMS = 3;

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
    // If the selected value is empty string (clearing selection), set to null
    const newSlug = slug === '' ? null : slug;

    // Prevent selecting the same rocket multiple times if not clearing
    if (newSlug && selectedRocketSlugs.includes(newSlug)) {
       toast({ title: "Already Selected", description: "This rocket is already selected in another slot.", variant: "default" });
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
      .filter((r): r is RocketType => r !== null && r !== undefined); // Filter out null/undefined and ensure type safety
  }, [selectedRocketSlugs, allRockets]);


  // Define the rows for the comparison table
   const comparisonFields: { label: string; key: keyof RocketType }[] = [
    { label: 'Type', key: 'type' },
    { label: 'Operator', key: 'operator' },
    { label: 'Country', key: 'country' },
    { label: 'Ownership', key: 'ownership' },
    { label: 'Status', key: 'status' },
    { label: 'Stages', key: 'stages' },
    { label: 'Payload Capacity', key: 'payloadCapacity' },
    { label: 'Total Launches', key: 'totalLaunches' },
    { label: 'Success Rate', key: 'successRate' }, // Already formatted to include %
    { label: 'First Launch', key: 'firstLaunchDate' },
    { label: 'Last Launch', key: 'lastLaunchDate' },
  ];


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
            Select up to {MAX_COMPARISON_ITEMS} rockets to compare side-by-side.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
            {/* Rocket Selection Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {selectedRocketSlugs.map((selectedSlug, index) => (
                    <div key={index}>
                        <Label htmlFor={`select-rocket-${index}`} className="text-xs text-muted-foreground mb-1 block">
                          Select Rocket {index + 1}
                        </Label>
                        <Select
                            value={selectedSlug ?? ''} // Use empty string for placeholder state
                            onValueChange={(slug) => handleSelectRocket(index, slug)}
                        >
                            <SelectTrigger id={`select-rocket-${index}`} className="w-full">
                                <SelectValue placeholder="Choose a rocket..." />
                            </SelectTrigger>
                            <SelectContent>
                                 <ScrollArea className="h-[300px]"> {/* Make dropdown scrollable */}
                                     {/* Removed <SelectItem value="">- None -</SelectItem> */}
                                    {allRockets.sort((a,b) => a.name.localeCompare(b.name)).map(rocket => (
                                        <SelectItem key={slugify(rocket.name)} value={slugify(rocket.name)} disabled={selectedRocketSlugs.includes(slugify(rocket.name)) && selectedRocketSlugs[index] !== slugify(rocket.name)}>
                                            {rocket.name} ({rocket.operator})
                                        </SelectItem>
                                    ))}
                                </ScrollArea>
                            </SelectContent>
                        </Select>
                    </div>
                ))}
            </div>

            {rocketsToCompare.length > 0 ? (
                 <>
                    {rocketsToCompare.length < 2 && (
                        <div className="text-center text-muted-foreground mb-6">
                            Please select at least 2 rockets to see the comparison table.
                        </div>
                    )}
                    <div className={cn("overflow-x-auto", rocketsToCompare.length < 2 ? 'hidden' : '')}> {/* Hide table if less than 2 selected */}
                        <Table className="min-w-max">
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-[150px] font-semibold text-base align-top sticky left-0 bg-card z-10 shadow-sm">Attribute</TableHead>
                                    {rocketsToCompare.map((rocket) => (
                                        <TableHead key={rocket.name} className="w-[250px] text-center align-top p-4">
                                        <Link href={`/explore/${slugify(rocket.name)}`} passHref>
                                            <div className="relative h-40 w-full mb-2 rounded overflow-hidden group mx-auto max-w-[200px]">
                                                <Image
                                                    src={rocket.imageUrl || 'https://picsum.photos/400/300'}
                                                    alt={`Image of ${rocket.name}`}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="transition-transform duration-300 group-hover:scale-105"
                                                    data-ai-hint={`rocket ${rocket.type}`}
                                                />
                                            </div>
                                            <span className="font-bold text-lg block hover:text-primary transition-colors">{rocket.name}</span>
                                        </Link>
                                        <span className="text-sm text-muted-foreground">{rocket.operator}</span>
                                        </TableHead>
                                    ))}
                                    {/* Add placeholders if fewer than 3 rockets are selected */}
                                    {[...Array(MAX_COMPARISON_ITEMS - rocketsToCompare.length)].map((_, i) => (
                                        <TableHead key={`placeholder-${i}`} className="w-[250px] text-center align-top p-4">
                                            <div className="relative h-40 w-full mb-2 rounded bg-muted/50 flex items-center justify-center mx-auto max-w-[200px]">
                                                <Plus className="h-8 w-8 text-muted-foreground/50" />
                                            </div>
                                            <span className="font-bold text-lg block text-muted-foreground">-</span>
                                            <span className="text-sm text-muted-foreground">-</span>
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {comparisonFields.map((field) => (
                                <TableRow key={field.key}>
                                    <TableCell className="font-medium sticky left-0 bg-card z-10 shadow-sm">{field.label}</TableCell>
                                    {rocketsToCompare.map((rocket) => (
                                    <TableCell key={`${rocket.name}-${field.key}`} className="text-center">
                                        {field.key === 'status' ? (
                                        <Badge
                                            variant={rocket.status === 'active' ? 'default' : rocket.status === 'past' ? 'destructive' : 'secondary'}
                                            className="capitalize"
                                        >
                                            {rocket.status}
                                        </Badge>
                                        ) : field.key === 'successRate' ? (
                                          // Special handling for success rate to add '%'
                                          `${formatValue(rocket[field.key])}`
                                        ) : (
                                        formatValue(rocket[field.key])
                                        )}
                                    </TableCell>
                                    ))}
                                     {/* Add placeholder cells */}
                                    {[...Array(MAX_COMPARISON_ITEMS - rocketsToCompare.length)].map((_, i) => (
                                        <TableCell key={`placeholder-cell-${field.key}-${i}`} className="text-center text-muted-foreground">-</TableCell>
                                    ))}
                                </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell className="font-medium sticky left-0 bg-card z-10 shadow-sm align-top">Description</TableCell>
                                    {rocketsToCompare.map((rocket) => (
                                    <TableCell key={`${rocket.name}-description`} className="text-sm text-left max-w-xs whitespace-normal align-top">
                                        {rocket.description}
                                    </TableCell>
                                    ))}
                                     {/* Add placeholder cells */}
                                     {[...Array(MAX_COMPARISON_ITEMS - rocketsToCompare.length)].map((_, i) => (
                                        <TableCell key={`placeholder-desc-${i}`} className="text-sm text-left max-w-xs whitespace-normal align-top text-muted-foreground">-</TableCell>
                                    ))}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </>
            ) : (
                <div className="text-center py-16 text-muted-foreground">
                     <Scale className="mx-auto h-12 w-12 mb-4" />
                     <p>Select rockets using the dropdowns above to start comparing.</p>
                 </div>
            )}

        </CardContent>
      </Card>
       <div className="text-center mt-8">
            <Link href="/explore" passHref>
                <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Explore
                </Button>
            </Link>
        </div>
    </div>
  );
}
