// src/components/rocket-card.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Rocket, Calendar, Gauge, Globe, Building, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import type { Rocket as RocketType, RocketStatus } from '@/services/rocket-data';
import { Skeleton } from '@/components/ui/skeleton';

// Helper to format numbers
const formatNumber = (num: number | undefined): string => {
  if (num === undefined) return 'N/A';
  return num % 1 === 0 ? num.toString() : num.toFixed(1);
};

// Helper to generate slug
const slugify = (name: string): string => name.toLowerCase().replace(/\s+/g, '-');

// Helper to get status icon
const getStatusIcon = (status: RocketStatus) => {
    switch (status) {
      case 'active': return <CheckCircle className="text-green-500" />;
      case 'past': return <XCircle className="text-red-500" />;
      case 'future': return <HelpCircle className="text-blue-500" />;
      default: return null;
    }
};

// Rocket Card Component
interface RocketCardProps {
  rocket: RocketType;
}

export function RocketCard({ rocket }: RocketCardProps) {
  const slug = slugify(rocket.name);

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200 animate-launch group relative">
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
export function RocketCardSkeleton() {
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
