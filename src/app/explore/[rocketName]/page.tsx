'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, CheckCircle, Gauge, Globe, Building, Users, Rocket, XCircle, HelpCircle } from 'lucide-react';
import { getRockets, type Rocket as RocketType, type RocketStatus } from '@/services/rocket-data';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

// Helper to format numbers (e.g., success rate)
const formatNumber = (num: number | undefined): string => {
  if (num === undefined) return 'N/A';
  return num % 1 === 0 ? num.toString() : num.toFixed(1);
};

// Helper to get status icon
const getStatusIcon = (status: RocketStatus | undefined) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'past': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'future': return <HelpCircle className="h-4 w-4 text-blue-500" />;
      default: return null;
    }
};

// Skeleton Loader for Rocket Detail Page
function RocketDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
            <div className="flex justify-between items-start mb-4">
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-6 w-20 rounded-full" />
            </div>
             <Skeleton className="h-5 w-1/3" />
        </CardHeader>
        <CardContent>
            <Skeleton className="h-64 w-full mb-6 rounded-md" />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                {[...Array(6)].map((_, i) => (
                   <div key={i} className="flex items-center space-x-2">
                     <Skeleton className="h-5 w-5 rounded-full" />
                     <Skeleton className="h-5 w-3/4" />
                   </div>
                ))}
             </div>
            <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
       <div className="text-center mt-8">
            <Skeleton className="h-10 w-32 mx-auto" />
        </div>
    </div>
  );
}


export default function RocketDetailPage() {
  const params = useParams();
  const [rocket, setRocket] = useState<RocketType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const rocketNameSlug = params?.rocketName as string | undefined;

  useEffect(() => {
    async function loadRocketData() {
      if (!rocketNameSlug) {
        setError("Rocket name not provided in URL.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const allRockets = await getRockets();
        // Find the rocket by comparing the slugified name
        const foundRocket = allRockets.find(
          (r) => r.name.toLowerCase().replace(/\s+/g, '-') === rocketNameSlug
        );

        if (foundRocket) {
          setRocket(foundRocket);
        } else {
          setError(`Rocket "${rocketNameSlug.replace(/-/g, ' ')}" not found.`);
        }
      } catch (err) {
        console.error("Failed to fetch rocket data:", err);
        setError("Failed to load rocket details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadRocketData();
  }, [rocketNameSlug]);

  if (loading) {
    return <RocketDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Card className="max-w-md mx-auto bg-destructive/10 border-destructive/30">
            <CardHeader>
                 <CardTitle className="text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{error}</p>
                 <Link href="/explore" passHref>
                    <Button variant="outline" className="mt-6">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Explore
                    </Button>
                 </Link>
            </CardContent>
        </Card>
      </div>
    );
  }

  if (!rocket) {
    // This case should ideally be handled by the error state, but included for safety
     return (
      <div className="container mx-auto px-4 py-12 text-center text-muted-foreground">
        <p>Rocket data not available.</p>
         <Link href="/explore" passHref>
            <Button variant="outline" className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Explore
            </Button>
         </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-launch">
      <Card className="max-w-4xl mx-auto overflow-hidden">
        <CardHeader className="bg-card/50 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
            <CardTitle className="text-3xl font-bold flex items-center gap-2">
                <Rocket className="h-7 w-7 text-primary" />
                {rocket.name}
            </CardTitle>
             <Badge variant={rocket.status === 'active' ? 'default' : rocket.status === 'past' ? 'destructive' : 'secondary'} className="capitalize text-sm px-3 py-1">
                {getStatusIcon(rocket.status)}
                <span className="ml-1.5">{rocket.status}</span>
            </Badge>
          </div>
           <CardDescription>{rocket.operator} ({rocket.country})</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {rocket.imageUrl && (
            <div className="relative h-64 md:h-96 w-full mb-8 rounded-md overflow-hidden shadow-md">
              <Image
                src={rocket.imageUrl || 'https://picsum.photos/800/600'}
                alt={`Image of ${rocket.name}`}
                layout="fill"
                objectFit="cover"
                 data-ai-hint={`rocket ${rocket.type} launch`}
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 mb-8 text-sm">
             <div className="flex items-center"><Rocket className="mr-2 h-4 w-4 text-muted-foreground" /> <strong>Type:</strong> <span className="ml-1">{rocket.type}</span></div>
             <div className="flex items-center"><Gauge className="mr-2 h-4 w-4 text-muted-foreground" /> <strong>Stages:</strong> <span className="ml-1">{rocket.stages}</span></div>
             <div className="flex items-center"><Globe className="mr-2 h-4 w-4 text-muted-foreground" /> <strong>Payload:</strong> <span className="ml-1">{rocket.payloadCapacity}</span></div>
             <div className="flex items-center"><Building className="mr-2 h-4 w-4 text-muted-foreground" /> <strong>Ownership:</strong> <span className="ml-1">{rocket.ownership}</span></div>
             <div className="flex items-center"><Users className="mr-2 h-4 w-4 text-muted-foreground" /> <strong>Operator:</strong> <span className="ml-1">{rocket.operator}</span></div>
             <div className="flex items-center"><Globe className="mr-2 h-4 w-4 text-muted-foreground" /> <strong>Country:</strong> <span className="ml-1">{rocket.country}</span></div>
             <div className="flex items-center col-span-1 sm:col-span-2 lg:col-span-1"><Calendar className="mr-2 h-4 w-4 text-muted-foreground" /> <strong>Operational:</strong> <span className="ml-1">{rocket.firstLaunchDate} – {rocket.lastLaunchDate || 'Present'}</span></div>
             <div className="flex items-center"><CheckCircle className="mr-2 h-4 w-4 text-muted-foreground" /> <strong>Launches:</strong> <span className="ml-1">{rocket.totalLaunches}</span></div>
             <div className="flex items-center"><CheckCircle className="mr-2 h-4 w-4 text-muted-foreground" /> <strong>Success Rate:</strong> <span className="ml-1">{formatNumber(rocket.successRate)}%</span></div>
          </div>

          <h3 className="font-semibold text-lg mb-2 mt-6">Description</h3>
          <p className="text-base text-foreground/90 leading-relaxed">
            {rocket.description}
          </p>

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
