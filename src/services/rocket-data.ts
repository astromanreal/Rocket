/**
 * Represents the status of a rocket.
 */
export type RocketStatus = 'active' | 'past' | 'future';

/**
 * Represents a rocket.
 */
export interface Rocket {
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


/**
 * Asynchronously retrieves a list of rockets based on the provided filters.
 * This is currently stubbed data. Replace with actual API/DB calls.
 * @param status The status to filter rockets by
 * @param query An optional search query.
 * @returns A promise that resolves to an array of Rocket objects.
 */
export async function getRockets(
  status?: RocketStatus,
  query?: string
): Promise<Rocket[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // TODO: Replace this with actual data fetching (Firebase, API, etc.)
  // Updated types for better filtering
  const stubbedData: Rocket[] = [
    {
      name: 'Falcon 9',
      imageUrl: 'https://i.pinimg.com/736x/32/d4/01/32d40169267d171d0dcaec308b9b630e.jpg',
      type: 'Medium-lift orbital',
      stages: 2,
      payloadCapacity: '22,800 kg to LEO',
      country: 'USA',
      operator: 'SpaceX',
      ownership: 'Private',
      totalLaunches: 350, // Fictional, update with real data
      successRate: 99.1, // Fictional
      firstLaunchDate: '2010-06-04',
      lastLaunchDate: null, // Still active
      description: 'Partially reusable two-stage-to-orbit launch vehicle. Known for booster landings and frequent launches.',
      status: 'active',
    },
    {
      name: 'Saturn V',
      imageUrl: 'https://i.pinimg.com/736x/86/dd/6c/86dd6c5c3572f53dbf4b5496e8cb67d5.jpg',
      type: 'Super heavy-lift',
      stages: 3,
      payloadCapacity: '140,000 kg to LEO',
      country: 'USA',
      operator: 'NASA',
      ownership: 'Government',
      totalLaunches: 13,
      successRate: 92.3, // 1 failure (Apollo 6 partial)
      firstLaunchDate: '1967-11-09',
      lastLaunchDate: '1973-05-14',
      description: 'The rocket that took humans to the Moon during the Apollo program. Remains the most powerful rocket ever successfully flown.',
      status: 'past',
    },
    {
      name: 'Ariane 5',
      imageUrl: 'https://i.pinimg.com/736x/ce/8f/73/ce8f7386e5a3c9a734ced6e9ac945ebb.jpg',
      type: 'Heavy-lift orbital',
      stages: 2,
      payloadCapacity: '21,000 kg to GTO',
      country: 'Europe (ESA)',
      operator: 'Arianespace',
      ownership: 'Government', // Primarily government funded/directed
      totalLaunches: 117,
      successRate: 95.7,
      firstLaunchDate: '1996-06-04',
      lastLaunchDate: '2023-07-05',
      description: 'Workhorse European launcher, known for launching heavy telecommunication satellites and the James Webb Space Telescope.',
      status: 'past', // Recently retired
    },
    {
      name: 'Electron',
      imageUrl: 'https://i.pinimg.com/736x/50/51/7a/50517ab1de77867117451b187f0e4eb7.jpg',
      type: 'Small-lift orbital',
      stages: 2,
      payloadCapacity: '300 kg to LEO',
      country: 'USA/New Zealand',
      operator: 'Rocket Lab',
      ownership: 'Private',
      totalLaunches: 45, // Fictional
      successRate: 93.3, // Fictional
      firstLaunchDate: '2017-05-25',
      lastLaunchDate: null,
      description: 'Dedicated small satellite launch vehicle featuring electric pump-fed engines and attempts at booster recovery via helicopter.',
      status: 'active',
    },
    {
      name: 'Soyuz-2',
      imageUrl: 'https://i.pinimg.com/736x/d7/ba/e9/d7bae927e816f190d3a42b0ba301199b.jpg',
      type: 'Medium-lift orbital',
      stages: 3, // Including core + 4 boosters as stage 1 & 2, Fregat upper stage
      payloadCapacity: '8,200 kg to LEO',
      country: 'Russia',
      operator: 'Roscosmos',
      ownership: 'Government',
      totalLaunches: 150, // Fictional estimate across variants
      successRate: 97.3, // Fictional estimate
      firstLaunchDate: '2004-11-08', // Soyuz-2.1a
      lastLaunchDate: null,
      description: 'Modern iteration of the legendary Soyuz rocket family, used for crewed missions to the ISS and satellite launches.',
      status: 'active',
    },
     {
      name: 'Starship',
      imageUrl: 'https://i.pinimg.com/736x/0c/09/a7/0c09a74ad198905e22d1e770b6d86767.jpg',
      type: 'Super heavy-lift',
      stages: 2,
      payloadCapacity: '>100,000 kg to LEO (reusable)',
      country: 'USA',
      operator: 'SpaceX',
      ownership: 'Private',
      totalLaunches: 4, // Including test flights as of mid 2024
      successRate: 50.0, // Highly variable during testing
      firstLaunchDate: '2023-04-20', // First integrated flight test
      lastLaunchDate: null,
      description: 'Fully reusable next-generation launch system designed for Mars colonization, lunar missions, and point-to-point Earth travel.',
      status: 'future', // Still under active development/testing
    },
     {
      name: 'New Glenn',
      imageUrl: 'https://i.pinimg.com/736x/47/ab/24/47ab244a5ef87962428b1f5e72df3533.jpg',
      type: 'Heavy-lift orbital',
      stages: 2,
      payloadCapacity: '45,000 kg to LEO (reusable)',
      country: 'USA',
      operator: 'Blue Origin',
      ownership: 'Private',
      totalLaunches: 0,
      successRate: 0, // Not yet launched
      firstLaunchDate: '2024-12-31', // Example future date
      lastLaunchDate: null,
      description: 'Large reusable launch vehicle under development, featuring BE-4 methane engines.',
      status: 'future',
    },
    {
      name: 'Space Shuttle',
      imageUrl: 'https://i.pinimg.com/736x/ff/44/89/ff44897195edbc2da1a4451c169069c8.jpg',
      type: 'Heavy-lift orbital (reusable orbiter)', // Special case, but categorized as heavy-lift
      stages: 2, // SRBs + External Tank feeding Orbiter engines
      payloadCapacity: '27,500 kg to LEO',
      country: 'USA',
      operator: 'NASA',
      ownership: 'Government',
      totalLaunches: 135,
      successRate: 98.5, // Accounting for Challenger and Columbia
      firstLaunchDate: '1981-04-12',
      lastLaunchDate: '2011-07-08',
      description: 'Iconic partially reusable system that launched Hubble, built the ISS, but suffered two tragic accidents.',
      status: 'past',
    },
     {
      name: 'Long March 5',
      imageUrl: 'https://i.pinimg.com/736x/1d/b4/58/1db458d635531cf291499f88ba3bd445.jpg',
      type: 'Heavy-lift orbital',
      stages: 2,
      payloadCapacity: '25,000 kg to LEO',
      country: 'China',
      operator: 'CASC',
      ownership: 'Government',
      totalLaunches: 10, // Fictional
      successRate: 90.0, // Fictional
      firstLaunchDate: '2016-11-03',
      lastLaunchDate: null,
      description: 'China\'s most powerful operational rocket, key to its space station and lunar exploration programs.',
      status: 'active',
    },
     {
        name: 'Atlas V',
        imageUrl: 'https://i.pinimg.com/736x/d7/e4/af/d7e4afec22b935c5f942cb42d17d6e48.jpg',
        type: 'Medium-lift to Heavy-lift orbital', // Variable based on configuration
        stages: 2,
        payloadCapacity: 'Up to 18,810 kg to LEO',
        country: 'USA',
        operator: 'ULA',
        ownership: 'Private', // Joint venture Boeing & Lockheed Martin
        totalLaunches: 100, // Fictional
        successRate: 99.0, // Fictional
        firstLaunchDate: '2002-08-21',
        lastLaunchDate: null, // Still active, phasing out
        description: 'Versatile and reliable rocket used for military, civilian, and commercial payloads. Known for its many configurations.',
        status: 'active',
     },
      {
        name: 'Delta IV Heavy',
        imageUrl: 'https://i.pinimg.com/736x/f5/f6/a8/f5f6a81fb0825103bfe4d1ddf8d71e81.jpg',
        type: 'Heavy-lift orbital',
        stages: 2, // Common Booster Cores + Upper stage
        payloadCapacity: '28,790 kg to LEO',
        country: 'USA',
        operator: 'ULA',
        ownership: 'Private',
        totalLaunches: 15, // Fictional
        successRate: 93.3, // Fictional
        firstLaunchDate: '2004-12-21',
        lastLaunchDate: '2024-04-09', // Final launch occurred
        description: 'One of the most powerful rockets, used primarily for high-value US government payloads. Notable for its fiery hydrogen burn-off at ignition.',
        status: 'past',
      },
       {
        name: 'Vega',
        imageUrl: 'https://i.pinimg.com/736x/0b/ca/b2/0bcab25bf3540acb30af0a55b861a9aa.jpg',
        type: 'Small-lift orbital',
        stages: 4, // 3 solid stages + 1 liquid upper stage
        payloadCapacity: '1,500 kg to LEO',
        country: 'Europe (ESA/Italy)',
        operator: 'Arianespace',
        ownership: 'Government',
        totalLaunches: 23, // Fictional
        successRate: 87.0, // Fictional
        firstLaunchDate: '2012-02-13',
        lastLaunchDate: null,
        description: 'European launcher designed for small satellites, complementing Ariane.',
        status: 'active',
      },
  ];

  // Apply status filter if provided (no changes needed here)
  // Apply search query if provided (no changes needed here)

  // The filtering logic is now handled within the ExplorePage component useEffect hook.
  // This function just returns the raw data.
  // This is generally better practice as the component consuming the data
  // knows best how to filter/transform it for its specific needs.

  return stubbedData;
}
