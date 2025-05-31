
// src/components/agency-card.tsx
'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Globe, Rocket, CheckCircle, Calendar, ChevronRight, ExternalLink } from 'lucide-react';
import type { Agency, AgencyTimelineEntry } from '@/data/agencies-data';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

interface AgencyCardProps {
  agency: Agency;
}

export function AgencyCard({ agency }: AgencyCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-out hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.02] animate-launch group">
      <CardHeader className="relative p-4 bg-muted/30">
        <div className="flex items-center justify-between gap-4">
            <div className="relative w-24 h-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Image
                    src={agency.logo}
                    alt={`${agency.name} logo`}
                    layout="fill"
                    objectFit="contain"
                    data-ai-hint={`${agency.name} logo space agency`}
                />
            </div>
          <Badge variant={agency.type === 'Public' ? 'secondary' : 'default'}>{agency.type}</Badge>
        </div>
        <CardTitle className="mt-4 text-xl font-bold group-hover:text-primary">{agency.name}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-xs">
            <Globe className="h-3 w-3" /> {agency.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-4 space-y-3 text-sm">
        <p className="text-muted-foreground line-clamp-3">{agency.description}</p>
        <div>
          <h4 className="font-semibold mb-1 flex items-center gap-1"><CheckCircle className="h-4 w-4 text-secondary" /> Notable Missions:</h4>
          <div className="flex flex-wrap gap-1">
            {agency.notableMissions.slice(0, 3).map((mission) => (
              <Badge key={mission} variant="outline" className="text-xs">{mission}</Badge>
            ))}
            {agency.notableMissions.length > 3 && <Badge variant="outline" className="text-xs">...</Badge>}
          </div>
        </div>
         <div>
          <h4 className="font-semibold mb-1 flex items-center gap-1"><Rocket className="h-4 w-4 text-accent" /> Key Technologies:</h4>
          <div className="flex flex-wrap gap-1">
            {agency.technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
            ))}
             {agency.technologies.length > 3 && <Badge variant="outline" className="text-xs">...</Badge>}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              View Details <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                     <div className="relative w-24 h-12 flex-shrink-0">
                        <Image
                            src={agency.logo}
                            alt={`${agency.name} logo`}
                            layout="fill"
                            objectFit="contain"
                            data-ai-hint={`${agency.name} logo space agency detail`}
                        />
                    </div>
                    <div>
                        <DialogTitle className="text-2xl">{agency.name}</DialogTitle>
                        <DialogDescription>{agency.country} - {agency.type}</DialogDescription>
                    </div>
                </div>
              <p className="text-sm text-muted-foreground pt-2">{agency.description}</p>
            </DialogHeader>

             <ScrollArea className="max-h-[50vh] pr-6 mt-4">
                 <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-base">Notable Missions</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {agency.notableMissions.map((mission) => <li key={mission}>{mission}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-base">Key Technologies</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {agency.technologies.map((tech) => <li key={tech}>{tech}</li>)}
                      </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2 text-base flex items-center gap-1"><Calendar className="h-4 w-4"/> Timeline</h4>
                        <ul className="space-y-2 text-sm border-l-2 border-primary pl-4 py-2">
                            {agency.timeline.sort((a, b) => a.year - b.year).map((entry) => (
                            <li key={entry.year + entry.milestone} className="relative before:absolute before:left-[-1.15rem] before:top-[0.1rem] before:h-3 before:w-3 before:rounded-full before:bg-primary">
                                <span className="font-semibold">{entry.year}:</span> {entry.milestone}
                            </li>
                            ))}
                        </ul>
                    </div>
                 </div>
             </ScrollArea>
             <DialogFooter className="pt-6 mt-4 border-t">
                <a
                    href={agency.officialWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                        buttonVariants({ variant: "default", size: "lg" }),
                        "group/3d relative overflow-hidden shadow-lg transition-all duration-300 ease-out",
                        "hover:shadow-primary/50 hover:-translate-y-0.5", 
                        "active:translate-y-0 active:shadow-md" 
                    )}
                    style={{
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <span className="relative z-10 flex items-center">
                         Visit Official Site <ExternalLink className="ml-2 h-4 w-4" />
                    </span>
                     <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-1.5 bg-primary/70 transition-transform duration-300 ease-out group-hover/3d:scale-y-150"
                    ></span>
                </a>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

export function AgencyCardSkeleton() {
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
