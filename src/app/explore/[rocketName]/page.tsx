

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, CheckCircle, Gauge, Globe, Building, Users, Rocket, XCircle, HelpCircle, Weight, Scaling, Thermometer, ChevronsUp, RefreshCw, ExternalLink, List, BookOpen, Orbit, Star, Loader2 } from 'lucide-react';
import { getRockets, type Rocket as RocketType, type RocketStatus, slugify } from '@/services/rocket-data';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { getCurrentUserId, getUserProfile, toggleExploredRocket } from '@/services/user-data';


const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

const formatNumber = (num: number | undefined): string => {
  if (num === undefined) return 'N/A';
  return num % 1 === 0 ? num.toString() : num.toFixed(1);
};

const getStatusIcon = (status: RocketStatus | undefined) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'past': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'future': return <HelpCircle className="h-4 w-4 text-blue-500" />;
      default: return null;
    }
};

const YoutubeIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 fill-current">
        <title>YouTube</title>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
);

function SpecItem({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number | undefined | null }) {
    if (!value && typeof value !== 'number') return null;
    return (
        <div className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
            <Icon className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
            <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-semibold">{value.toString()}</p>
            </div>
        </div>
    );
}


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
            <Skeleton className="h-96 w-full mb-6 rounded-md" />
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {[...Array(9)].map((_, i) => (
                   <div key={i} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                     <Skeleton className="h-6 w-6 rounded-full mt-1" />
                     <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-5 w-32" />
                     </div>
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
  const { toast } = useToast();
  const [rocket, setRocket] = useState<RocketType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTracked, setIsTracked] = useState(false);
  const [isTogglingTrack, setIsTogglingTrack] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const rocketNameSlug = params?.rocketName as string | undefined;

  // Fetch current user and check their tracked rockets
  useEffect(() => {
    async function fetchUserData() {
      if (!rocket) return;
      try {
        const userId = await getCurrentUserId();
        setCurrentUserId(userId);
        if (userId) {
          const profile = await getUserProfile(userId);
          if (profile?.exploredRocketIds.includes(rocket.id)) {
            setIsTracked(true);
          }
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    }
    fetchUserData();
  }, [rocket]);

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
        const foundRocket = allRockets.find(
          (r) => slugify(r.name) === rocketNameSlug
        );

        if (foundRocket) {
          setRocket(foundRocket);
          
          document.title = `${foundRocket.name} - Details & Specs | Rocketpedia`;
          
          const canonicalUrl = `${siteUrl}/explore/${rocketNameSlug}`;
          const imageUrl = foundRocket.imageUrl ? (foundRocket.imageUrl.startsWith('http') ? foundRocket.imageUrl : `${siteUrl}${foundRocket.imageUrl}`) : `${siteUrl}/og-rocket-default.png`;

          const setMetaTag = (type: 'property' | 'name', key: string, content: string) => {
            let element = document.querySelector(`meta[${type}='${key}']`) as HTMLMetaElement;
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(type, key);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
          };
          
          let canonicalLink = document.querySelector("link[rel='canonical']");
          if (!canonicalLink) {
              canonicalLink = document.createElement('link');
              canonicalLink.setAttribute('rel', 'canonical');
              document.head.appendChild(canonicalLink);
          }
          canonicalLink.setAttribute('href', canonicalUrl);

          setMetaTag('name', 'description', `Explore detailed information, specifications, and history of the ${foundRocket.name} launch vehicle. Operated by ${foundRocket.operator}.`);
          setMetaTag('name', 'keywords', [foundRocket.name, foundRocket.operator, foundRocket.type, foundRocket.country, 'rocket details', 'launch vehicle specs', 'spacecraft'].join(', '));
          
          setMetaTag('property', 'og:title', `${foundRocket.name} - Rocket Details | Rocketpedia`);
          setMetaTag('property', 'og:description', foundRocket.description.substring(0, 160) + '...');
          setMetaTag('property', 'og:url', canonicalUrl);
          setMetaTag('property', 'og:image', imageUrl);
          setMetaTag('property', 'og:type', 'article');
          
          setMetaTag('name', 'twitter:card', 'summary_large_image');
          setMetaTag('name', 'twitter:title', `${foundRocket.name} - Rocket Details | Rocketpedia`);
          setMetaTag('name', 'twitter:description', foundRocket.description.substring(0, 160) + '...');
          setMetaTag('name', 'twitter:image', imageUrl);

          const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            name: foundRocket.name,
            headline: `${foundRocket.name} - Details, Specifications & History`,
            description: foundRocket.summary || foundRocket.description,
            image: imageUrl,
            datePublished: foundRocket.firstLaunchDate,
            author: {
              '@type': 'Organization',
              name: foundRocket.manufacturer || foundRocket.operator,
            },
            keywords: [foundRocket.name, foundRocket.operator, foundRocket.type, foundRocket.country, 'rocket details', 'launch vehicle specs'].join(', '),
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': canonicalUrl,
            },
            additionalProperty: [
                { '@type': 'PropertyValue', name: 'Rocket Type', value: foundRocket.type },
                { '@type': 'PropertyValue', name: 'Country of Origin', value: foundRocket.country },
                { '@type': 'PropertyValue', name: 'Operator', value: foundRocket.operator },
                { '@type': 'PropertyValue', name: 'Stages', value: foundRocket.stages.toString() },
                { '@type': 'PropertyValue', name: 'Payload Capacity to LEO', value: foundRocket.payloadCapacity.LEO },
                { '@type': 'PropertyValue', name: 'Total Launches', value: foundRocket.totalLaunches.toString() },
                { '@type': 'PropertyValue', name: 'Success Rate', value: `${formatNumber(foundRocket.successRate)}%` },
                { '@type': 'PropertyValue', name: 'Status', value: foundRocket.status },
                { '@type': 'PropertyValue', name: 'Height', value: foundRocket.dimensions?.height },
                { '@type': 'PropertyValue', name: 'Diameter', value: foundRocket.dimensions?.diameter },
                { '@type': 'PropertyValue', name: 'Mass', value: foundRocket.dimensions?.mass },
            ].filter(prop => prop.value)
          };

          let script = document.getElementById('rocket-detail-json-ld');
          if (!script) {
            script = document.createElement('script');
            script.id = 'rocket-detail-json-ld';
            script.type = 'application/ld+json';
            document.head.appendChild(script);
          }
          script.textContent = JSON.stringify(jsonLd);

        } else {
          setError(`Rocket "${rocketNameSlug.replace(/-/g, ' ')}" not found.`);
          document.title = 'Rocket Not Found | Rocketpedia';
        }
      } catch (err) {
        console.error("Failed to fetch rocket data:", err);
        setError("Failed to load rocket details. Please try again later.");
        document.title = 'Error | Rocketpedia';
      } finally {
        setLoading(false);
      }
    }

    loadRocketData();
    
    return () => { 
        const ldScript = document.getElementById('rocket-detail-json-ld');
        if (ldScript) {
          ldScript.remove();
        }
    };
  }, [rocketNameSlug]);

  const handleToggleTrack = async () => {
    if (!currentUserId || !rocket) return;
    setIsTogglingTrack(true);
    try {
      await toggleExploredRocket(currentUserId, rocket.id);
      const newTrackedState = !isTracked;
      setIsTracked(newTrackedState);
      toast({
        title: newTrackedState ? "Rocket Tracked!" : "Rocket Untracked",
        description: `${rocket.name} has been ${newTrackedState ? 'added to' : 'removed from'} your profile.`,
      });
    } catch (err) {
      console.error("Failed to toggle rocket tracking:", err);
      toast({
        title: "Error",
        description: "Could not update your tracking status.",
        variant: "destructive",
      });
    } finally {
      setIsTogglingTrack(false);
    }
  };

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
        <CardHeader className="bg-card/50 border-b p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold flex items-center gap-3"> 
                <Rocket className="h-8 w-8 text-primary" />
                {rocket.name}
            </h1>
             <Badge variant={rocket.status === 'active' ? 'default' : rocket.status === 'past' ? 'destructive' : 'secondary'} className="capitalize text-sm px-3 py-1.5">
                {getStatusIcon(rocket.status)}
                <span className="ml-1.5">{rocket.status}</span>
            </Badge>
          </div>
           <CardDescription>{rocket.operator} ({rocket.country}) - {rocket.ownership} Owned</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 p-6">
          <div className="flex justify-end mb-6">
              <Button onClick={handleToggleTrack} disabled={isTogglingTrack || !currentUserId} variant={isTracked ? "default" : "outline"} size="sm">
                  {isTogglingTrack ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                      <Star className={cn("mr-2 h-4 w-4", isTracked && "fill-yellow-400 text-yellow-500")} />
                  )}
                  {isTracked ? 'Tracked' : 'Track this Rocket'}
              </Button>
          </div>
          {rocket.imageUrl && (
            <div className="relative h-64 md:h-96 w-full mb-8 rounded-md overflow-hidden shadow-lg">
              <Image
                src={rocket.imageUrl}
                alt={`Image of ${rocket.name} rocket`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                data-ai-hint={`rocket ${rocket.type} launch`}
                priority
              />
            </div>
          )}

          <article className="mb-8 prose prose-invert max-w-none"> 
            <h2 className="font-semibold text-xl mb-3">About {rocket.name}</h2>
            <p className="text-base text-foreground/90 leading-relaxed">
                {rocket.summary || rocket.description}
            </p>
          </article>
          
          <Separator className="my-8" />

          <section className="mb-8">
            <h2 className="font-semibold text-xl mb-4">Key Specifications</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <SpecItem icon={Scaling} label="Height" value={rocket.dimensions?.height} />
              <SpecItem icon={Orbit} label="Diameter" value={rocket.dimensions?.diameter} />
              <SpecItem icon={Weight} label="Mass" value={rocket.dimensions?.mass} />
              <SpecItem icon={Thermometer} label="Liftoff Thrust" value={rocket.thrust?.seaLevel} />
              <SpecItem icon={ChevronsUp} label="Stages" value={rocket.stages} />
              <SpecItem icon={RefreshCw} label="Reusability" value={rocket.reusability} />
              <SpecItem icon={Gauge} label="Payload to LEO" value={rocket.payloadCapacity?.LEO} />
              <SpecItem icon={Gauge} label="Payload to GTO" value={rocket.payloadCapacity?.GTO} />
              <SpecItem icon={Gauge} label="Payload to Mars" value={rocket.payloadCapacity?.Mars} />
            </div>
          </section>

          <Separator className="my-8" />
          
           <section className="mb-8">
                <h2 className="font-semibold text-xl mb-4">Launch History</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <SpecItem icon={Calendar} label="First Launch" value={rocket.firstLaunchDate} />
                    <SpecItem icon={Calendar} label="Last Launch" value={rocket.lastLaunchDate || 'Present'} />
                    <SpecItem icon={List} label="Total Launches" value={rocket.totalLaunches} />
                    <SpecItem icon={CheckCircle} label="Success Rate" value={`${formatNumber(rocket.successRate)}%`} />
                </div>
           </section>

          <Separator className="my-8" />

          <section className="mb-8">
            <h2 className="font-semibold text-xl mb-4">Propulsion Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rocket.engines?.firstStage && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">First Stage</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Engines:</strong> {rocket.engines.firstStage}</p>
                    {rocket.propellant && <p><strong>Propellant:</strong> {rocket.propellant.split('+')[0].trim()}</p>}
                  </CardContent>
                </Card>
              )}
              {rocket.engines?.secondStage && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Second Stage</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><strong>Engines:</strong> {rocket.engines.secondStage}</p>
                     {rocket.propellant && rocket.propellant.split('+').length > 1 && <p><strong>Propellant:</strong> {rocket.propellant.split('+')[1].trim()}</p>}
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
          
           {rocket.notableMissions && rocket.notableMissions.length > 0 && (
                <>
                <Separator className="my-8" />
                <section className="mb-8">
                    <h2 className="font-semibold text-xl mb-4">Notable Missions</h2>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        {rocket.notableMissions.map((mission, index) => <li key={index}>{mission}</li>)}
                    </ul>
                </section>
                </>
           )}

           {rocket.launchSites && rocket.launchSites.length > 0 && (
                 <>
                <Separator className="my-8" />
                <section className="mb-8">
                    <h2 className="font-semibold text-xl mb-4">Launch Sites</h2>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        {rocket.launchSites.map((site, index) => <li key={index}>{site}</li>)}
                    </ul>
                </section>
                </>
           )}
           
           <Separator className="my-8" />
           <section>
               <h2 className="font-semibold text-xl mb-4">External Links</h2>
               <div className="flex flex-wrap gap-4">
                   <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(rocket.name + ' launch')}`} target="_blank" rel="noopener noreferrer">
                       <Button variant="outline"><YoutubeIcon /> Watch on YouTube</Button>
                   </a>
                   {rocket.links?.official && (
                        <a href={rocket.links.official} target="_blank" rel="noopener noreferrer">
                           <Button variant="outline"><Building className="mr-2" /> Official Site</Button>
                        </a>
                   )}
                    {rocket.links?.wikipedia && (
                        <a href={rocket.links.wikipedia} target="_blank" rel="noopener noreferrer">
                           <Button variant="outline"><BookOpen className="mr-2" /> Wikipedia</Button>
                        </a>
                   )}
                    {rocket.links?.launchManifest && (
                        <a href={rocket.links.launchManifest} target="_blank" rel="noopener noreferrer">
                           <Button variant="outline"><List className="mr-2" /> Launch Manifest</Button>
                        </a>
                   )}
               </div>
           </section>

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
