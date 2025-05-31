
'use client'; 

import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FlaskConical, Atom, Infinity as InfinityIcon, Shapes, DraftingCompass, Settings2, Fuel } from 'lucide-react'; 
import Image from 'next/image';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';
const rocketSciencePageUrl = `${siteUrl}/rocket-science`;


export default function RocketSciencePage() {
  useEffect(() => {
    document.title = 'The Science of Rockets - Physics, Engineering & Chemistry | Rocketpedia';
    
    // Add canonical link tag
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', rocketSciencePageUrl);

    // Add OpenGraph and Twitter meta tags
    const setMetaTag = (type: 'property' | 'name', key: string, content: string) => {
        let element = document.querySelector(`meta[${type}='${key}']`) as HTMLMetaElement;
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute(type, key);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    };

    setMetaTag('property', 'og:title', 'The Science of Rockets | Rocketpedia');
    setMetaTag('property', 'og:description', 'Delve into the core concepts that make spaceflight possible: propulsion, orbital mechanics, materials science, and more.');
    setMetaTag('property', 'og:url', rocketSciencePageUrl);
    setMetaTag('property', 'og:type', 'article');
    setMetaTag('property', 'og:image', `${siteUrl}/og-rocket-science.png`); // Placeholder image
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', 'The Science of Rockets | Rocketpedia');
    setMetaTag('name', 'twitter:description', 'Learn about the physics and engineering behind rockets and spaceflight.');
    setMetaTag('name', 'twitter:image', `${siteUrl}/twitter-rocket-science.png`); // Placeholder image


    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': rocketSciencePageUrl,
      },
      headline: 'The Science of Rockets - Physics, Engineering & Chemistry',
      name: 'The Science of Rockets - Physics, Engineering & Chemistry', // Often same as headline for articles
      description: 'Explore the fundamental principles of rocket science, including propulsion, orbital mechanics, materials science, aerodynamics, and Guidance, Navigation, and Control (GNC) systems.',
      image: 'https://i.pinimg.com/736x/bb/b1/29/bbb12906fb28717de83f891939de47e3.jpg', // Main representative image
      keywords: "rocket science, physics of rockets, rocket engineering, propulsion systems, orbital mechanics, aerodynamics, spaceflight principles, GNC systems, rocket materials, Tsiolkovsky rocket equation",
      author: {
        '@type': 'Organization',
        name: 'Rocketpedia',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Rocketpedia',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/rocketpedia-logo.png`,
        },
      },
      datePublished: '2024-05-10', // Set an appropriate publication date
      dateModified: new Date().toISOString().split('T')[0], 
      articleSection: ['Rocket Propulsion', 'Orbital Mechanics', 'Materials Science', 'Aerodynamics', 'GNC Systems', 'Rocket Design'], // Key sections
    };

    let script = document.getElementById('rocket-science-json-ld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'rocket-science-json-ld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    return () => {
      const ldScript = document.getElementById('rocket-science-json-ld');
      if (ldScript) {
        ldScript.remove();
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto animate-launch">
        <CardHeader className="text-center">
          <FlaskConical className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold">The Science of Rockets</CardTitle>
          <CardDescription>
            Delving into the physics, engineering, and chemistry that make spaceflight possible.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">

          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
              <Atom className="h-6 w-6 text-secondary" /> Fundamental Principles
            </h2>
            <p className="text-muted-foreground mb-4">
              A rocket is a vehicle using jet propulsion that accelerates without surrounding air, generating thrust by expelling exhaust at high speed according to Newton's Third Law. This allows rockets to operate efficiently in the vacuum of space, though they incur some thrust loss due to atmospheric pressure. Multistage rockets can achieve Earth escape velocity. Originating in 13th-century China, rockets became crucial in the 20th century for the Space Age, enabling satellite launches, human spaceflight, and exploration. The most common type, chemical rockets, uses propellants (like liquid oxygen/kerosene, solid fuel, or hypergolic mixtures) for combustion to create high-speed exhaust.
            </p>
            <Image
              src="https://i.pinimg.com/736x/bb/b1/29/bbb12906fb28717de83f891939de47e3.jpg"
              alt="Diagram illustrating Newton's Third Law of Motion with a rocket"
              width={800}
              height={300}
              className="rounded-md object-cover w-full h-auto shadow-md"
              data-ai-hint="newtons third law rocket propulsion diagram"
            />
          </section>

          <section>
             <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
              <Shapes className="h-6 w-6 text-primary" /> Vehicle Configurations
            </h2>
            <p className="text-muted-foreground mb-4">
                While often pictured as tall, thin structures launching vertically, rockets come in many forms:
            </p>
             <ul className="list-disc list-inside space-y-1 text-sm mb-4 pl-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4">
                <li>Tiny models (hobby rockets, water rockets)</li>
                <li>Missiles</li>
                <li>Large space rockets (e.g., Saturn V)</li>
                <li>Rocket cars & bikes</li>
                <li>Rocket-powered aircraft (incl. RATO)</li>
                <li>Rocket sleds & trains</li>
                <li>Rocket torpedoes</li>
                <li>Rocket-powered jet packs</li>
                <li>Ejection seats & launch escape systems</li>
                <li>Space probes</li>
            </ul>
             <Image
              src="https://i.pinimg.com/736x/6d/47/67/6d476718e49681d2155dc2a7f80faa09.jpg"
              alt="Collage showing various types of rocket configurations and vehicles"
              width={800}
              height={300}
              className="rounded-md object-cover w-full h-auto shadow-md"
              data-ai-hint="various rocket types missile satellite launch vehicle"
            />
          </section>

           <section>
             <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
              <DraftingCompass className="h-6 w-6 text-accent" /> Rocket Design
            </h2>
            <p className="text-muted-foreground mb-4">
                While a basic rocket can be simple, creating efficient and accurate rockets or missiles involves solving complex challenges. Key difficulties include managing the intense heat within the combustion chamber, efficiently pumping fuel (especially for liquid-fueled rockets), and precisely controlling the rocket's direction and trajectory during flight.
            </p>
          </section>

           <section>
             <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
              <Settings2 className="h-6 w-6 text-secondary" /> Key Components
            </h2>
            <p className="text-muted-foreground mb-2">
                Rockets typically consist of several core parts:
            </p>
             <ul className="list-disc list-inside space-y-1 text-sm mb-4 pl-4">
                <li><strong>Propellant:</strong> The fuel and oxidizer providing energy.</li>
                <li><strong>Propellant Tank(s):</strong> Containers to store the propellant.</li>
                <li><strong>Nozzle:</strong> Directs the exhaust gases to generate thrust.</li>
                <li><strong>Rocket Engine(s):</strong> Where combustion occurs and thrust is generated.</li>
                <li><strong>Stabilization System:</strong> Devices like fins, vernier engines, gimbals, or gyroscopes to control orientation.</li>
                <li><strong>Structure:</strong> The framework (often monocoque) holding everything together.</li>
                <li><strong>Payload System:</strong> Typically includes an aerodynamic fairing (like a nose cone) to protect the payload (satellite, spacecraft, etc.).</li>
             </ul>
             <p className="text-muted-foreground mb-2">
                Depending on the mission and design, rockets might also include:
             </p>
              <ul className="list-disc list-inside space-y-1 text-sm mb-4 pl-4">
                 <li>Wings (for rocket planes)</li>
                 <li>Parachutes (for recovery)</li>
                 <li>Wheels (for rocket cars)</li>
                 <li>Navigation and Guidance Systems (using satellite or inertial navigation)</li>
              </ul>
             <Image
              src="https://placehold.co/800x300.png" 
              alt="Diagram showing different components of a typical rocket"
              width={800}
              height={300}
              className="rounded-md object-cover w-full h-auto shadow-md"
              data-ai-hint="rocket components diagram cutaway engine nozzle"
            />
          </section>

          <section>
             <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
               <InfinityIcon className="h-6 w-6 text-primary" /> Advanced Topics
             </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg flex items-center gap-2">
                    <Settings2 className="h-5 w-5 text-secondary" /> Rocket Propulsion
                 </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">Explores how rocket engines generate thrust by expelling mass at high velocity. Covers different types of propellants (liquid, solid, hybrid), engine cycles (gas-generator, staged combustion), and performance metrics like specific impulse (Isp).</p>
                  <p className="text-sm text-muted-foreground"><em>(Full article coming soon)</em></p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7"> 
                <AccordionTrigger className="text-lg flex items-center gap-2">
                    <Fuel className="h-5 w-5 text-accent" /> Propellant
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">Rocket propellant is mass stored (in tanks or casings) and ejected as a fluid jet to produce thrust. Chemical rockets commonly use fuel (like liquid hydrogen or kerosene) burned with an oxidizer (like liquid oxygen or nitric acid) to create hot gas. Propellants can be stored separately and mixed, or premixed (solid rockets).</p>
                  <p className="mb-2">Some propellants don't burn but still undergo a chemical reaction, and can be a 'monopropellant' such as hydrazine, nitrous oxide or hydrogen peroxide that can be catalytically decomposed to hot gas. Others are inert and heated externally (steam, solar thermal, nuclear thermal rockets). Smaller thrusters might simply expel pressurized fluid.</p>
                   <Image
                     src="https://placehold.co/800x300.png" 
                     alt="Illustration of different types of rocket propellants or fuel tanks"
                     width={800}
                     height={300}
                     className="rounded-md object-cover w-full h-auto shadow-md mt-4"
                     data-ai-hint="rocket fuel tank propellant types diagram"
                   />
                  <p className="text-sm text-muted-foreground mt-2"><em>(Full article coming soon)</em></p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg flex items-center gap-2">
                  <Settings2 className="h-5 w-5 text-secondary" /> Rocket Engines
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">Rocket engines utilize jet propulsion. Most current rockets are chemically powered, emitting hot exhaust gas from the combustion of propellants (solid, liquid, or hybrid). The reaction occurs in the combustion chamber, and gases accelerate out the nozzle, generating thrust based on Newton's Third Law. The nozzle shape also contributes to thrust. Non-chemical rockets (like steam or nuclear thermal) also exist.</p>
                  <Image
                     src="https://placehold.co/800x300.png" 
                     alt="Detailed diagram of a rocket engine with combustion chamber and nozzle"
                     width={800}
                     height={300}
                     className="rounded-md object-cover w-full h-auto shadow-md mt-4"
                     data-ai-hint="rocket engine diagram nozzle combustion chamber"
                   />
                  <p className="text-sm text-muted-foreground mt-2"><em>(Full article coming soon)</em></p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg">Orbital Mechanics</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">The science of how objects move in space under the influence of gravity. Discusses orbits (LEO, MEO, GEO, HEO), Hohmann transfers, gravitational assists, inclination changes, and the challenges of achieving and maintaining specific orbits.</p>
                  <p className="text-sm text-muted-foreground"><em>(Full article coming soon)</em></p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg">Materials Science</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">Investigates the advanced materials needed to withstand the extreme temperatures, pressures, and stresses involved in rocketry. Covers composites, alloys, thermal protection systems (heat shields), and cryogenics.</p>
                  <p className="text-sm text-muted-foreground"><em>(Full article coming soon)</em></p>
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg">Aerodynamics & Ascent</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">Focuses on how a rocket interacts with the atmosphere during launch. Includes concepts like drag, Max Q (maximum dynamic pressure), atmospheric pressure effects on engine performance, and trajectory optimization for ascent.</p>
                  <p className="text-sm text-muted-foreground"><em>(Full article coming soon)</em></p>
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg">Guidance, Navigation & Control (GNC)</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">The "brains" of the rocket. Explains how sensors (IMUs, star trackers, GPS), actuators (engine gimbaling, reaction control systems), and onboard computers work together to keep the rocket on its intended path.</p>
                  <p className="text-sm text-muted-foreground"><em>(Full article coming soon)</em></p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

           <section className="text-center text-muted-foreground pt-4">
                <p>More in-depth articles on various rocket science topics will be added here soon. Stay tuned!</p>
           </section>

        </CardContent>
      </Card>
    </div>
  );
}
