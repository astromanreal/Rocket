// src/components/rocket-of-the-day-card.tsx
'use client';

import type { Rocket as RocketType } from '@/services/rocket-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, HelpCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

interface RocketOfTheDayCardProps {
  rocket: RocketType;
}

const getStatusIcon = (status: RocketType['status']) => {
    switch (status) {
      case 'active': return <CheckCircle className="mr-1.5 h-4 w-4 text-green-500" />;
      case 'past': return <XCircle className="mr-1.5 h-4 w-4 text-red-500" />;
      case 'future': return <HelpCircle className="mr-1.5 h-4 w-4 text-blue-500" />;
      default: return null;
    }
};

export function RocketOfTheDayCard({ rocket }: RocketOfTheDayCardProps) {
  const slug = rocket.name.toLowerCase().replace(/\s+/g, '-');
  return (
    <Link href={`/explore/${slug}`} passHref className="block group w-full max-w-lg [perspective:1000px]">
      <Card className="relative bg-card/80 backdrop-blur-sm transition-all duration-500 ease-out group-hover:[transform:rotateX(3deg)_scale(1.02)] group-hover:shadow-2xl group-hover:shadow-primary/30 h-full flex flex-col p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg"></div>

        <CardHeader className="relative z-10 p-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">{rocket.name}</CardTitle>
              <CardDescription>{rocket.operator} ({rocket.country})</CardDescription>
            </div>
             <Badge variant={rocket.status === 'active' ? 'default' : rocket.status === 'past' ? 'destructive' : 'secondary'} className="capitalize text-sm px-3 py-1">
                {getStatusIcon(rocket.status)}
                {rocket.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="relative z-10 p-2 text-sm space-y-2 flex-grow">
            <p className="text-muted-foreground pt-2 line-clamp-3">
                {rocket.summary || rocket.description}
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-2">
              <p><strong>Type:</strong> {rocket.type}</p>
              <p><strong>Payload to LEO:</strong> {rocket.payloadCapacity?.LEO || 'N/A'}</p>
              <p><strong>Stages:</strong> {rocket.stages}</p>
              <p><strong>Total Launches:</strong> {rocket.totalLaunches}</p>
            </div>
        </CardContent>
        <CardFooter className="relative z-10 p-2 flex justify-end mt-auto">
            <span
              className="inline-flex items-center text-primary group-hover:underline transition-colors text-sm font-medium"
              aria-label={`Learn more about ${rocket.name}`}
            >
              Learn More <ArrowRight className="ml-1 h-4 w-4" />
            </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
