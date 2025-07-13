
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Rocket as RocketIcon, Star, Search as SearchIcon } from 'lucide-react';
import { getRockets, type Rocket as RocketType } from '@/services/rocket-data';
import { RocketOfTheDayCard } from '@/components/rocket-of-the-day-card';
import { ImageSlider } from '@/components/image-slider';
import { SiteSearch } from '@/components/site-search';

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

export const metadata: Metadata = {
  title: 'Welcome to Rocketpedia - Explore the Cosmos & Rocket Technology',
  description: 'Rocketpedia is your ultimate launchpad to explore rockets, space missions, and the pioneers of space exploration. Discover daily features, rocket anatomy, merchandise, and engage with our community.',
  keywords: ['rocketpedia homepage', 'space exploration guide', 'rocket database', 'daily rocket feature', 'space news', 'rocket merchandise', 'space community'],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'Welcome to Rocketpedia - Explore the Cosmos & Rocket Technology',
    description: 'Your ultimate launchpad to explore rockets, space missions, merchandise, and engage with our community.',
    url: siteUrl,
    images: [{ url: `${siteUrl}/og-home.png`, alt: 'Rocketpedia Homepage Space Theme' }], 
  },
   twitter: {
    title: 'Welcome to Rocketpedia - Explore the Cosmos & Rocket Technology',
    description: 'Your ultimate launchpad to explore rockets, space missions, merchandise, and engage with our community.',
    images: [`${siteUrl}/twitter-home.png`], 
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url: siteUrl,
      name: 'Welcome to Rocketpedia - Explore the Cosmos & Rocket Technology',
      description: 'Rocketpedia is your ultimate launchpad to explore rockets, space missions, and the pioneers of space exploration. Discover daily features, rocket anatomy, merchandise, and engage with our community.',
      isPartOf: {
        '@type': 'WebSite',
        url: siteUrl,
        name: 'Rocketpedia'
      },
      // Potentially add mainContentOfPage if specific sections are key
    }),
  },
};


export default async function Home() {
  const rockets = await getRockets();
  
  let rocketOfTheDay: RocketType | undefined = undefined;
  if (rockets.length > 0) {
    const currentDate = new Date();
    const dayOfYear = getDayOfYear(currentDate);
    const rocketIndex = dayOfYear % rockets.length;
    rocketOfTheDay = rockets[rocketIndex];
  }
  

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16 animate-launch">
        <RocketIcon className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">
          Rocketpedia
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          Everything You Need to Know About Rockets & Space Exploration
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/explore" passHref>
              <Button size="lg" className="w-full sm:w-auto group relative overflow-hidden shadow-lg transition-all duration-300 ease-out hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md">
                <span className="relative z-10 flex items-center">
                    Explore Rockets <ArrowRight className="ml-2 h-5 w-5" />
                </span>
                 <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1.5 bg-primary/70 transition-transform duration-300 ease-out group-hover:scale-y-150"
                 ></span>
              </Button>
            </Link>
        </div>
      </section>

      <section className="mb-16 flex flex-col items-center animate-launch" style={{ animationDelay: '0.05s' }}>
        <Link href="/search" passHref className="group">
          <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2 hover:text-primary transition-colors">
            <SearchIcon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" /> Search Rocketpedia
          </h2>
        </Link>
        <SiteSearch searchScope="all" />
      </section>

      {rocketOfTheDay && (
        <section className="mb-16 animate-launch" style={{ animationDelay: '0.1s' }}>
           <h2 className="text-3xl font-bold text-center mb-4 flex items-center justify-center gap-2">
            <Star className="text-secondary h-7 w-7" /> Rocket of the Day <Star className="text-secondary h-7 w-7" />
          </h2>
          <p className="text-center text-muted-foreground mb-8">Check out today's featured launch vehicle!</p>
          <div className="flex justify-center">
             <RocketOfTheDayCard rocket={rocketOfTheDay} />
          </div>
        </section>
      )}

      <section className="mb-16 animate-launch" style={{ animationDelay: '0.15s' }}>
        <h2 className="text-3xl font-bold text-center mb-8">Gallery</h2>
        <ImageSlider />
      </section>


      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card className="animate-launch" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle>What are Rockets?</CardTitle>
            <CardDescription>And how do they defy gravity?</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Rockets are vehicles or projectiles that obtain thrust from a rocket engine. Rocket engine exhaust is formed entirely from propellant carried within the rocket. They work based on Newton's Third Law of Motion: for every action, there is an equal and opposite reaction.
            </p>
            <Image
              src="https://i.pinimg.com/736x/bb/b1/29/bbb12906fb28717de83f891939de47e3.jpg"
              alt="Rocket launching from a pad illustrating Newton's Third Law in action"
              width={600}
              height={400}
              className="rounded-md object-cover w-full h-auto"
              data-ai-hint="rocket launch diagram physics"
            />
          </CardContent>
        </Card>
        <Card className="animate-launch" style={{ animationDelay: '0.25s' }}>
          <CardHeader>
            <CardTitle>History & Evolution</CardTitle>
            <CardDescription>From ancient fireworks to modern marvels</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              The story of rockets spans centuries, starting with early gunpowder experiments in China, advancing through pioneers like Tsiolkovsky, Goddard, and Oberth, culminating in the Space Race and today's reusable launch systems.
            </p>
            <Accordion type="single" collapsible className="w-full mt-4">
              <AccordionItem value="item-1">
                <AccordionTrigger>Early Concepts</AccordionTrigger>
                <AccordionContent>
                  Gunpowder rockets were used in warfare and celebrations in Asia as early as the 13th century.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Modern Pioneers</AccordionTrigger>
                <AccordionContent>
                  Konstantin Tsiolkovsky, Robert Goddard, and Hermann Oberth laid the theoretical and practical foundations for modern rocketry in the early 20th century.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Space Race & Beyond</AccordionTrigger>
                <AccordionContent>
                  The Cold War fueled rapid development, leading to the V-2, Sputnik, Apollo missions, and eventually commercial spaceflight with companies like SpaceX.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>

      <section className="mb-16 animate-launch" style={{ animationDelay: '0.3s' }}>
        <Card>
          <CardHeader>
            <CardTitle>Rocket Anatomy & Propulsion</CardTitle>
            <CardDescription>Understanding the key parts and power</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-primary">Components & Stages</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>First Stage: Provides initial thrust.</li>
                  <li>Boosters: Additional thrust for heavy lifts.</li>
                  <li>Interstage: Connects stages.</li>
                  <li>Second/Upper Stage: Pushes payload to final orbit.</li>
                  <li>Payload Fairing: Protects the satellite/spacecraft.</li>
                  <li>Guidance System: Brains of the rocket.</li>
                </ul>
              </div>
               <div>
                <h3 className="font-semibold mb-2 text-secondary">Propulsion Systems</h3>
                 <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Liquid-fueled: Precise control (e.g., LOX/RP-1).</li>
                  <li>Solid-fueled: High thrust, simple (e.g., SRBs).</li>
                  <li>Hybrid: Combines liquid oxidizer & solid fuel.</li>
                  <li>Electric/Ion: High efficiency for deep space.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-accent">Launch & Tracking</h3>
                 <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Vertical launch from pads.</li>
                  <li>Controlled ascent trajectory.</li>
                  <li>Stage separation events.</li>
                  <li>Global tracking networks monitor flight.</li>
                  <li>Recovery of reusable components.</li>
                </ul>
              </div>
            </div>
             <Image
              src="https://cdn.pixabay.com/photo/2015/03/26/18/45/hangar-693277_1280.jpg"
              alt="Rocket assembly hangar showing multiple rocket components"
              width={800}
              height={300}
              className="rounded-md object-cover w-full h-auto mt-6"
              data-ai-hint="rocket cutaway schematic diagram"
            />
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-launch" style={{ animationDelay: '0.35s' }}>
        <Card>
          <CardHeader>
            <CardTitle>Famous Launches & Milestones</CardTitle>
            <CardDescription>Iconic moments in space exploration</CardDescription>
          </CardHeader>
          <CardContent>
             <ul className="list-disc list-inside space-y-2">
                <li>Sputnik 1 (1957): First artificial satellite.</li>
                <li>Vostok 1 (1961): Yuri Gagarin, first human in space.</li>
                <li>Apollo 11 (1969): First humans on the Moon.</li>
                <li>Space Shuttle Program (1981-2011): Reusable orbiter.</li>
                <li>Falcon 9 Landing (2015): First orbital booster landing.</li>
                <li>James Webb Space Telescope (2021): Advanced space observatory.</li>
              </ul>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Private vs. Government</CardTitle>
            <CardDescription>The changing landscape of space access</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Historically dominated by government agencies like NASA and Roscosmos, the space launch industry now sees significant involvement from private companies like SpaceX, Blue Origin, and Rocket Lab, driving innovation and reducing costs.
            </p>
             <div className="flex justify-around">
               <div className="text-center">
                 <span className="text-sm text-muted-foreground">Government</span>
                 <p className="font-semibold">NASA, ESA, Roscosmos</p>
               </div>
                <div className="text-center">
                 <span className="text-sm text-muted-foreground">Private</span>
                 <p className="font-semibold">SpaceX, Blue Origin, ULA</p>
               </div>
             </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
