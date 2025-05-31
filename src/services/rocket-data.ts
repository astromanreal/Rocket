
/**
 * Represents the status of a rocket.
 */
export type RocketStatus = 'active' | 'past' | 'future';

/**
 * Represents a rocket.
 */
export interface Rocket {
  /**
   * The unique identifier for the rocket, often a slugified version of its name.
   */
  id: string; 
  /**
   * The title/name of the rocket.
   */
  name: string;
  /**
   * URL of the rocket image or media.
   */
  imageUrl?: string;
  /**
   * The type of rocket (orbital, suborbital, heavy-lift, etc.).
   * Examples: 'Small-lift orbital', 'Medium-lift orbital', 'Heavy-lift orbital', 'Super heavy-lift'
   */
  type: string;
  /**
   * The number of stages the rocket has.
   */
  stages: number;
  /**
   * The payload capacity of the rocket.
   */
  payloadCapacity: string;
  /**
   * The country of origin of the rocket.
   */
  country: string;
  /**
   * The operator of the rocket (e.g., SpaceX, NASA, Roscosmos).
   */
  operator: string;
  /**
   * The ownership type of the rocket (Private or Government).
   */
  ownership: 'Private' | 'Government';
  /**
   * The total number of launches of the rocket.
   */
  totalLaunches: number;
  /**
   * The success rate of the rocket launches.
   */
  successRate: number;
  /**
   * The first launch date of the rocket (YYYY-MM-DD).
   */
  firstLaunchDate: string;
  /**
   * The last launch date of the rocket (YYYY-MM-DD or null if still active/future).
   */
  lastLaunchDate: string | null;
  /**
   * The description of the rocket and notable missions.
   */
  description: string;
  /**
   * The status of the rocket (active, past, future).
   */
  status: RocketStatus;
}

export const slugify = (name: string): string => name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

export async function getRockets(
  status?: RocketStatus,
  query?: string
): Promise<Rocket[]> {
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate delay

  const stubbedData: Rocket[] = [
    {
      id: 'falcon-9',
      name: 'Falcon 9',
      imageUrl: 'https://i.pinimg.com/736x/32/d4/01/32d40169267d171d0dcaec308b9b630e.jpg',
      type: 'Medium-lift orbital',
      stages: 2,
      payloadCapacity: '22,800 kg to LEO',
      country: 'USA',
      operator: 'SpaceX',
      ownership: 'Private',
      totalLaunches: 350, 
      successRate: 99.1, 
      firstLaunchDate: '2010-06-04',
      lastLaunchDate: null, 
      description: 'Partially reusable two-stage-to-orbit launch vehicle. Known for booster landings and frequent launches of Starlink satellites and crewed missions.',
      status: 'active',
    },
    {
      id: 'saturn-v',
      name: 'Saturn V',
      imageUrl: 'https://i.pinimg.com/736x/86/dd/6c/86dd6c5c3572f53dbf4b5496e8cb67d5.jpg',
      type: 'Super heavy-lift',
      stages: 3,
      payloadCapacity: '140,000 kg to LEO',
      country: 'USA',
      operator: 'NASA',
      ownership: 'Government',
      totalLaunches: 13,
      successRate: 92.3, 
      firstLaunchDate: '1967-11-09',
      lastLaunchDate: '1973-05-14',
      description: 'The rocket that took humans to the Moon during the Apollo program. Remains the most powerful rocket ever successfully flown, enabling historic lunar landings.',
      status: 'past',
    },
    {
      id: 'ariane-5',
      name: 'Ariane 5',
      imageUrl: 'https://i.pinimg.com/736x/ce/8f/73/ce8f7386e5a3c9a734ced6e9ac945ebb.jpg',
      type: 'Heavy-lift orbital',
      stages: 2,
      payloadCapacity: '21,000 kg to GTO',
      country: 'Europe (ESA)',
      operator: 'Arianespace',
      ownership: 'Government', 
      totalLaunches: 117,
      successRate: 95.7,
      firstLaunchDate: '1996-06-04',
      lastLaunchDate: '2023-07-05',
      description: 'Workhorse European launcher, known for launching heavy telecommunication satellites and the James Webb Space Telescope. A symbol of European collaboration in space.',
      status: 'past', 
    },
    {
      id: 'electron',
      name: 'Electron',
      imageUrl: 'https://i.pinimg.com/736x/50/51/7a/50517ab1de77867117451b187f0e4eb7.jpg',
      type: 'Small-lift orbital',
      stages: 2,
      payloadCapacity: '300 kg to LEO',
      country: 'USA/New Zealand',
      operator: 'Rocket Lab',
      ownership: 'Private',
      totalLaunches: 45, 
      successRate: 93.3, 
      firstLaunchDate: '2017-05-25',
      lastLaunchDate: null,
      description: 'Dedicated small satellite launch vehicle featuring innovative electric pump-fed Rutherford engines and attempts at booster recovery via helicopter capture.',
      status: 'active',
    },
    {
      id: 'soyuz-2',
      name: 'Soyuz-2',
      imageUrl: 'https://i.pinimg.com/736x/d7/ba/e9/d7bae927e816f190d3a42b0ba301199b.jpg',
      type: 'Medium-lift orbital',
      stages: 3, 
      payloadCapacity: '8,200 kg to LEO',
      country: 'Russia',
      operator: 'Roscosmos',
      ownership: 'Government',
      totalLaunches: 150, 
      successRate: 97.3, 
      firstLaunchDate: '2004-11-08', 
      lastLaunchDate: null,
      description: 'Modern iteration of the legendary Soyuz rocket family, a cornerstone of Russian spaceflight, used for crewed missions to the ISS and diverse satellite launches.',
      status: 'active',
    },
     {
      id: 'starship',
      name: 'Starship',
      imageUrl: 'https://i.pinimg.com/736x/0c/09/a7/0c09a74ad198905e22d1e770b6d86767.jpg',
      type: 'Super heavy-lift',
      stages: 2,
      payloadCapacity: '>100,000 kg to LEO (reusable)',
      country: 'USA',
      operator: 'SpaceX',
      ownership: 'Private',
      totalLaunches: 4, 
      successRate: 50.0, 
      firstLaunchDate: '2023-04-20', 
      lastLaunchDate: null,
      description: 'Fully reusable next-generation launch system by SpaceX, designed for Mars colonization, lunar missions, and potentially point-to-point Earth travel. Aims to revolutionize space access.',
      status: 'future', 
    },
     {
      id: 'new-glenn',
      name: 'New Glenn',
      imageUrl: 'https://i.pinimg.com/736x/47/ab/24/47ab244a5ef87962428b1f5e72df3533.jpg',
      type: 'Heavy-lift orbital',
      stages: 2,
      payloadCapacity: '45,000 kg to LEO (reusable)',
      country: 'USA',
      operator: 'Blue Origin',
      ownership: 'Private',
      totalLaunches: 0,
      successRate: 0, 
      firstLaunchDate: '2024-12-31', // Tentative
      lastLaunchDate: null,
      description: 'Large reusable launch vehicle under development by Blue Origin, featuring powerful BE-4 methane engines and aiming for significant payload capacity.',
      status: 'future',
    },
    {
      id: 'space-shuttle',
      name: 'Space Shuttle',
      imageUrl: 'https://i.pinimg.com/736x/ff/44/89/ff44897195edbc2da1a4451c169069c8.jpg',
      type: 'Heavy-lift orbital (reusable orbiter)', 
      stages: 2, 
      payloadCapacity: '27,500 kg to LEO',
      country: 'USA',
      operator: 'NASA',
      ownership: 'Government',
      totalLaunches: 135,
      successRate: 98.5, 
      firstLaunchDate: '1981-04-12',
      lastLaunchDate: '2011-07-08',
      description: 'Iconic partially reusable system that launched the Hubble Space Telescope, assembled the International Space Station, but suffered two tragic accidents (Challenger and Columbia).',
      status: 'past',
    },
     {
      id: 'long-march-5',
      name: 'Long March 5',
      imageUrl: 'https://i.pinimg.com/736x/1d/b4/58/1db458d635531cf291499f88ba3bd445.jpg',
      type: 'Heavy-lift orbital',
      stages: 2,
      payloadCapacity: '25,000 kg to LEO',
      country: 'China',
      operator: 'CASC',
      ownership: 'Government',
      totalLaunches: 10, 
      successRate: 90.0, 
      firstLaunchDate: '2016-11-03',
      lastLaunchDate: null,
      description: "China's most powerful operational rocket, key to its space station construction (Tiangong) and ambitious lunar exploration programs like Chang'e.",
      status: 'active',
    },
     {
        id: 'atlas-v',
        name: 'Atlas V',
        imageUrl: 'https://i.pinimg.com/736x/d7/e4/af/d7e4afec22b935c5f942cb42d17d6e48.jpg',
        type: 'Medium-lift to Heavy-lift orbital', 
        stages: 2,
        payloadCapacity: 'Up to 18,810 kg to LEO',
        country: 'USA',
        operator: 'ULA (United Launch Alliance)',
        ownership: 'Private', 
        totalLaunches: 100, 
        successRate: 99.0, 
        firstLaunchDate: '2002-08-21',
        lastLaunchDate: null, 
        description: 'Versatile and highly reliable rocket used for military, civilian (NASA), and commercial payloads. Known for its many configurations with varying numbers of solid rocket boosters.',
        status: 'active',
     },
      {
        id: 'delta-iv-heavy',
        name: 'Delta IV Heavy',
        imageUrl: 'https://i.pinimg.com/736x/f5/f6/a8/f5f6a81fb0825103bfe4d1ddf8d71e81.jpg',
        type: 'Heavy-lift orbital',
        stages: 2, 
        payloadCapacity: '28,790 kg to LEO',
        country: 'USA',
        operator: 'ULA (United Launch Alliance)',
        ownership: 'Private',
        totalLaunches: 16, // Updated total launches
        successRate: 93.75, // Updated based on 15 successes out of 16
        firstLaunchDate: '2004-12-21',
        lastLaunchDate: '2024-04-09', 
        description: 'One of the most powerful rockets, used primarily for high-value US government payloads. Notable for its fiery hydrogen burn-off at ignition and its three-core first stage.',
        status: 'past',
      },
       {
        id: 'vega',
        name: 'Vega',
        imageUrl: 'https://i.pinimg.com/736x/0b/ca/b2/0bcab25bf3540acb30af0a55b861a9aa.jpg',
        type: 'Small-lift orbital',
        stages: 4, 
        payloadCapacity: '1,500 kg to LEO',
        country: 'Europe (ESA/Italy)',
        operator: 'Arianespace',
        ownership: 'Government',
        totalLaunches: 23, 
        successRate: 87.0, 
        firstLaunchDate: '2012-02-13',
        lastLaunchDate: null,
        description: 'European launcher designed for small satellites, complementing the heavier Ariane rockets. Key for providing access to space for smaller European payloads.',
        status: 'active',
      },
  ];
  
  const dataWithIds = stubbedData.map(rocket => ({
    ...rocket,
    id: rocket.id || slugify(rocket.name),
  }));

  return dataWithIds;
}
