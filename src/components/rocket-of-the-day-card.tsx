// src/components/rocket-of-the-day-card.tsx
'use client';

import type { Rocket as RocketType } from '@/services/rocket-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link'; // Optional: If you want to link somewhere

interface RocketOfTheDayCardProps {
  rocket: RocketType;
}

export function RocketOfTheDayCard({ rocket }: RocketOfTheDayCardProps) {
  return (
    // Apply perspective to the container div to enable 3D transforms on children
    <div className="group [perspective:1000px] w-full max-w-md">
       {/* Apply transforms and transitions to the Card */}
      <Card className="relative bg-card/80 backdrop-blur-sm transition-all duration-500 ease-out group-hover:[transform:rotateY(5deg)_rotateX(5deg)_scale(1.02)] group-hover:shadow-2xl group-hover:shadow-primary/30">
        {/* Optional: Add a subtle glare effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg"></div>

        <CardHeader className="relative z-10">
          {rocket.imageUrl && (
            <div className="relative h-56 w-full mb-4 overflow-hidden rounded-t-md">
              <Image
                src={rocket.imageUrl || 'https://picsum.photos/400/300'}
                alt={`Image of ${rocket.name}`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={`rocket ${rocket.type}`}
              />
               {/* Optional: Add subtle inner shadow or overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
          )}
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">{rocket.name}</CardTitle>
              <CardDescription>{rocket.operator} ({rocket.country})</CardDescription>
            </div>
             <Badge variant={rocket.status === 'active' ? 'default' : rocket.status === 'past' ? 'destructive' : 'secondary'} className="capitalize">
                {rocket.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="relative z-10 text-sm space-y-1">
          <p><strong>Type:</strong> {rocket.type}</p>
          <p><strong>Payload:</strong> {rocket.payloadCapacity}</p>
          <p className="text-xs text-muted-foreground pt-2 line-clamp-2">
            {rocket.description}
          </p>
        </CardContent>
        <CardFooter className="relative z-10 flex justify-end">
          {/* Optional: Add a button or link */}
          <Link href={`/explore/${rocket.name.toLowerCase().replace(/\s+/g, '-')}`} passHref>
            <span
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium cursor-pointer"
              aria-label={`Learn more about ${rocket.name}`}
            >
              Learn More <ArrowRight className="ml-1 h-4 w-4" />
            </span>
           </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
