

'use client'; // Can be server or client, depending on future needs

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FlaskConical, Atom, Infinity as InfinityIcon, Shapes, DraftingCompass, Settings2, Fuel } from 'lucide-react'; // Removed Engine, kept Settings2 and Fuel
import Image from 'next/image';

export default function RocketSciencePage() {
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

          {/* Introduction Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
              <Atom className="h-6 w-6 text-secondary" /> Fundamental Principles
            </h2>
            <p className="text-muted-foreground mb-4">
              A rocket is a vehicle using jet propulsion that accelerates without surrounding air, generating thrust by expelling exhaust at high speed according to Newton's Third Law. This allows rockets to operate efficiently in the vacuum of space, though they incur some thrust loss due to atmospheric pressure. Multistage rockets can achieve Earth escape velocity. Originating in 13th-century China, rockets became crucial in the 20th century for the Space Age, enabling satellite launches, human spaceflight, and exploration. The most common type, chemical rockets, uses propellants (like liquid oxygen/kerosene, solid fuel, or hypergolic mixtures) for combustion to create high-speed exhaust.
            </p>
            <Image
              src="https://i.pinimg.com/736x/bb/b1/29/bbb12906fb28717de83f891939de47e3.jpg"
              alt="Diagram illustrating Newton's Third Law"
              width={800}
              height={300}
              className="rounded-md object-cover w-full h-auto shadow-md"
              data-ai-hint="newtons third law rocket propulsion diagram"
            />
          </section>

          {/* Vehicle Configurations Section */}
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
              alt="Collage of different rocket types"
              width={800}
              height={300}
              className="rounded-md object-cover w-full h-auto shadow-md"
              data-ai-hint="various rocket types missile satellite launch vehicle"
            />
          </section>

          {/* Design Section */}
           <section>
             <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
              <DraftingCompass className="h-6 w-6 text-accent" /> Rocket Design
            </h2>
            <p className="text-muted-foreground mb-4">
                While a basic rocket can be simple, creating efficient and accurate rockets or missiles involves solving complex challenges. Key difficulties include managing the intense heat within the combustion chamber, efficiently pumping fuel (especially for liquid-fueled rockets), and precisely controlling the rocket's direction and trajectory during flight.
            </p>
             {/* Optional: Add an image related to rocket design/blueprints */}
             {/* <Image
              src="https://picsum.photos/seed/rocketdesign/800/300"
              alt="Rocket blueprint or CAD model"
              width={800}
              height={300}
              className="rounded-md object-cover w-full h-auto shadow-md"
               data-ai-hint="rocket blueprint schematic design"
            /> */}
          </section>

          {/* Components Section */}
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
              src="https://picsum.photos/seed/rocketparts/800/300"
              alt="Diagram showing rocket components"
              width={800}
              height={300}
              className="rounded-md object-cover w-full h-auto shadow-md"
              data-ai-hint="rocket components diagram cutaway engine nozzle"
            />
          </section>

          {/* Accordion for Key Topics */}
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
              <AccordionItem value="item-7"> {/* New Item for Propellant */}
                <AccordionTrigger className="text-lg flex items-center gap-2">
                    <Fuel className="h-5 w-5 text-accent" /> Propellant
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">Rocket propellant is mass stored (in tanks or casings) and ejected as a fluid jet to produce thrust. Chemical rockets commonly use fuel (like liquid hydrogen or kerosene) burned with an oxidizer (like liquid oxygen or nitric acid) to create hot gas. Propellants can be stored separately and mixed, or premixed (solid rockets).</p>
                  <p className="mb-2">Some propellants don't burn but still undergo a chemical reaction, and can be a 'monopropellant' such as hydrazine, nitrous oxide or hydrogen peroxide that can be catalytically decomposed to hot gas. Others are inert and heated externally (steam, solar thermal, nuclear thermal rockets). Smaller thrusters might simply expel pressurized fluid.</p>
                   <Image
                     src="https://picsum.photos/seed/propellant/800/300"
                     alt="Rocket fuel tanks or propellant types"
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
                     src="https://picsum.photos/seed/rocketengine/800/300"
                     alt="Rocket engine diagram or photo"
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
                  <p className="mb-2">The "brains" of the rocket. Explains how sensors (IMUs, star trackers, GPS), computers, and actuators (engine gimbaling, reaction control systems) work together to keep the rocket on its intended path.</p>
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



