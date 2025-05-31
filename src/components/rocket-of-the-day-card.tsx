
// src/components/rocket-of-the-day-card.tsx
'use client';

import type { Rocket as RocketType } from '@/services/rocket-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link'; 

interface RocketOfTheDayCardProps {
  rocket: RocketType;
}

export function RocketOfTheDayCard({ rocket }: RocketOfTheDayCardProps) {
  const slug = rocket.name.toLowerCase().replace(/\s+/g, '-');
  return (
    <Link href={`/explore/${slug}`} passHref className="block group w-full max-w-md [perspective:1000px]">
      <Card className="relative bg-card/80 backdrop-blur-sm transition-all duration-500 ease-out group-hover:[transform:rotateY(5deg)_rotateX(5deg)_scale(1.02)] group-hover:shadow-2xl group-hover:shadow-primary/30 h-full flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg"></div>

        <CardHeader className="relative z-10">
          {rocket.imageUrl && (
            <div className="relative h-56 w-full mb-4 overflow-hidden rounded-t-md">
              <Image
                src={rocket.imageUrl || 'https://placehold.co/400x300.png'}
                alt={`Image of ${rocket.name}`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={`rocket ${rocket.type}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
          )}
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">{rocket.name}</CardTitle>
              <CardDescription>{rocket.operator} ({rocket.country})</CardDescription>
            </div>
             <Badge variant={rocket.status === 'active' ? 'default' : rocket.status === 'past' ? 'destructive' : 'secondary'} className="capitalize">
                {rocket.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="relative z-10 text-sm space-y-1 flex-grow">
          <p><strong>Type:</strong> {rocket.type}</p>
          <p><strong>Payload:</strong> {rocket.payloadCapacity}</p>
          <p className="text-xs text-muted-foreground pt-2 line-clamp-3">
            {rocket.description}
          </p>
        </CardContent>
        <CardFooter className="relative z-10 flex justify-end mt-auto">
            <span
              className="inline-flex items-center text-primary group-hover:text-primary/80 transition-colors text-sm font-medium"
              aria-label={`Learn more about ${rocket.name}`}
            >
              Learn More <ArrowRight className="ml-1 h-4 w-4" />
            </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
