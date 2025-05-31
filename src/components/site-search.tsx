
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor } from '@/components/ui/popover';
import { Search, Rocket, Building, Loader2, Frown } from 'lucide-react';
import { getRockets, type Rocket as RocketType } from '@/services/rocket-data';
import { getAgencies, type Agency } from '@/data/agencies-data';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';

// Define a combined result type
type SearchResult =
  | ({ type: 'rocket' } & RocketType)
  | ({ type: 'agency' } & Agency);

// Helper to generate slug (consistent with other components)
const slugify = (name: string): string => name.toLowerCase().replace(/\s+/g, '-');

interface SiteSearchProps {
  searchScope?: 'all' | 'rockets' | 'agencies'; // New prop to control search scope
}

export function SiteSearch({ searchScope = 'all' }: SiteSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [allRockets, setAllRockets] = useState<RocketType[]>([]);
  const [allAgencies, setAllAgencies] = useState<Agency[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Initially false, true during fetch/filter
  const [dataLoading, setDataLoading] = useState(true); // For initial data fetch
  const [error, setError] = useState<string | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);


  // Fetch initial data on mount
  useEffect(() => {
    async function loadData() {
      setDataLoading(true);
      setError(null);
      try {
        const fetchPromises: Promise<any>[] = [];
        if (searchScope === 'all' || searchScope === 'rockets') {
          fetchPromises.push(getRockets());
        } else {
          fetchPromises.push(Promise.resolve([])); // Placeholder if rockets not needed
        }
        if (searchScope === 'all' || searchScope === 'agencies') {
          fetchPromises.push(getAgencies());
        } else {
          fetchPromises.push(Promise.resolve([])); // Placeholder if agencies not needed
        }

        const [rockets, agencies] = await Promise.all(fetchPromises);
        setAllRockets(rockets);
        setAllAgencies(agencies);

      } catch (err) {
        console.error("Error loading search data:", err);
        setError("Could not load data for search.");
      } finally {
        setDataLoading(false);
      }
    }
    loadData();
  }, [searchScope]);

  // Filter results when query changes
  useEffect(() => {
    if (!query) {
      setResults([]);
      setIsPopoverOpen(false);
      setIsLoading(false);
      return;
    }

    if (dataLoading) {
        setIsLoading(true); 
        return;
    }

    setIsLoading(true);
    // Ensure popover opens as soon as there's a query and data is not loading.
    // This prevents opening it while initial data is still being fetched.
    if (!dataLoading) {
        setIsPopoverOpen(true);
    }


    const debounceTimeout = setTimeout(() => {
        const lowerCaseQuery = query.toLowerCase();
        let combinedResults: SearchResult[] = [];

        if (searchScope === 'all' || searchScope === 'rockets') {
            const filteredRockets = allRockets
            .filter(
                (rocket) =>
                rocket.name.toLowerCase().includes(lowerCaseQuery) ||
                rocket.operator.toLowerCase().includes(lowerCaseQuery) ||
                rocket.type.toLowerCase().includes(lowerCaseQuery) ||
                rocket.country.toLowerCase().includes(lowerCaseQuery)
            )
            .map(rocket => ({ ...rocket, type: 'rocket' as const }));
            combinedResults = [...combinedResults, ...filteredRockets];
        }


        if (searchScope === 'all' || searchScope === 'agencies') {
            const filteredAgencies = allAgencies
            .filter(
                (agency) =>
                agency.name.toLowerCase().includes(lowerCaseQuery) ||
                agency.description.toLowerCase().includes(lowerCaseQuery) ||
                agency.country.toLowerCase().includes(lowerCaseQuery) ||
                agency.type.toLowerCase().includes(lowerCaseQuery)
            )
            .map(agency => ({ ...agency, type: 'agency' as const }));
            combinedResults = [...combinedResults, ...filteredAgencies];
        }


        combinedResults.sort((a, b) => a.name.localeCompare(b.name));
        setResults(combinedResults);
        setIsLoading(false);
    }, 150); 

    return () => clearTimeout(debounceTimeout);

  }, [query, allRockets, allAgencies, dataLoading, searchScope]);


   useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            popoverContentRef.current &&
            !popoverContentRef.current.contains(event.target as Node) &&
            inputRef.current &&
            !inputRef.current.contains(event.target as Node)
          ) {
            setIsPopoverOpen(false);
          }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


  return (
     <div className="w-full max-w-xl">
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
         <PopoverAnchor asChild>
             <div className="relative flex-grow">
                 <Search
                 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
                 />
                 <Input
                    ref={inputRef}
                    type="search"
                    placeholder={
                      searchScope === 'rockets' ? "Search rockets..." :
                      searchScope === 'agencies' ? "Search agencies..." :
                      "Search rockets, agencies..."
                    }
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => { if (query && !dataLoading) setIsPopoverOpen(true)}}
                    className="pl-10 w-full"
                    aria-label="Search Rocketpedia"
                    disabled={dataLoading}
                 />
                 {dataLoading && (
                    <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground animate-spin" />
                 )}
             </div>
         </PopoverAnchor>

         <PopoverContent
            ref={popoverContentRef}
            className="w-[--radix-popover-trigger-width] max-h-[400px] overflow-hidden p-0"
            align="start"
            sideOffset={8}
            onOpenAutoFocus={(e) => e.preventDefault()}
         >
            <ScrollArea className="h-full max-h-[390px]">
             <div className="p-2">
                 {isLoading && !dataLoading && (
                     <div className="flex items-center justify-center p-4 text-muted-foreground">
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Searching...
                     </div>
                 )}
                 {!isLoading && error && (
                     <div className="p-4 text-center text-destructive text-sm">{error}</div>
                 )}
                 {!isLoading && !error && results.length === 0 && query && (
                     <div className="flex items-center justify-center p-4 text-muted-foreground text-sm">
                     <Frown className="mr-2 h-4 w-4" /> No results found for "{query}".
                     </div>
                 )}
                {!isLoading && !error && results.length > 0 && (
                <div className="space-y-0.5"> {/* Reduced space for tighter list */}
                    {results.slice(0, 10).map((item) => (
                    <Link
                        key={`${item.type}-${item.id || item.name}`}
                        href={item.type === 'rocket' ? `/explore/${slugify(item.name)}` : `/agencies#${slugify(item.name)}`}
                        passHref
                        onClick={() => {
                            setQuery(''); // Clear query on selection
                            setIsPopoverOpen(false);
                        }}
                        className="block p-2 rounded-md hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none transition-colors" // Make whole item focusable/hoverable
                    >
                        <div className="flex items-center gap-3 text-sm">
                            {item.type === 'rocket' ? (
                                <Rocket className="h-4 w-4 text-primary flex-shrink-0" />
                            ) : (
                                <Building className="h-4 w-4 text-secondary flex-shrink-0" />
                            )}
                            <div className="flex-grow overflow-hidden">
                                <span className="font-medium truncate block">{item.name}</span>
                                {item.type === 'rocket' && 'operator' in item && (
                                    <span className="text-xs text-muted-foreground truncate block">{item.operator} ({item.country})</span>
                                )}
                                {item.type === 'agency' && 'country' in item && (
                                    <span className="text-xs text-muted-foreground truncate block">{item.country} ({item.type === 'Public' || item.type === 'Private' ? item.type : 'N/A' })</span>
                                )}
                            </div>
                        </div>
                    </Link>
                    ))}
                </div>
                )}
             </div>
             </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}
