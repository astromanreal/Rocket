// src/data/agencies-data.ts

export interface AgencyTimelineEntry {
  year: number;
  milestone: string;
}

export type AgencyType = 'Public' | 'Private';

export interface Agency {
  id: string;
  name: string;
  type: AgencyType;
  logo: string; // URL to the logo image
  country: string;
  description: string;
  notableMissions: string[];
  technologies: string[];
  timeline: AgencyTimelineEntry[];
  officialWebsite: string; // Added official website URL
}

// Using provided logo URLs
export const agenciesData: Agency[] = [
  {
    id: 'nasa',
    name: 'NASA',
    type: 'Public',
    logo: 'https://www.godigit.com/content/dam/godigit/directportal/en/nasa.png',
    country: 'USA',
    description: 'The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civil space program, aeronautics research, and space research.',
    notableMissions: ['Apollo Program (Moon Landings)', 'Space Shuttle', 'Hubble Space Telescope', 'Mars Rovers (Curiosity, Perseverance)', 'James Webb Space Telescope', 'Artemis Program'],
    technologies: ['Saturn V Rocket', 'Space Shuttle Orbiter', 'Deep Space Network', 'Advanced space suits', 'Mars rovers'],
    timeline: [
      { year: 1958, milestone: 'Established' },
      { year: 1961, milestone: 'First American in space (Alan Shepard)' },
      { year: 1969, milestone: 'First humans on the Moon (Apollo 11)' },
      { year: 1981, milestone: 'First Space Shuttle launch (STS-1)' },
      { year: 1990, milestone: 'Hubble Space Telescope deployed' },
      { year: 2011, milestone: 'Final Space Shuttle mission (STS-135)' },
      { year: 2021, milestone: 'Perseverance rover lands on Mars' },
      { year: 2022, milestone: 'Artemis I launch' },
    ],
    officialWebsite: 'https://www.nasa.gov/',
  },
  {
    id: 'spacex',
    name: 'SpaceX',
    type: 'Private',
    logo: 'https://www.godigit.com/content/dam/godigit/directportal/en/space-x.jpg',
    country: 'USA',
    description: 'Designs, manufactures, and launches rockets and spacecraft. Founded by Elon Musk with the goal of reducing space transportation costs to enable the colonization of Mars.',
    notableMissions: ['Falcon 9 Launches', 'Crew Dragon (ISS Crew Transport)', 'Starlink Constellation Deployment', 'Starship Test Flights', 'Inspiration4 (First all-civilian orbital mission)'],
    technologies: ['Reusable Rockets (Falcon 9, Falcon Heavy)', 'Merlin Engines', 'Raptor Engines (Starship)', 'Dragon Spacecraft', 'Starlink Satellite Network'],
    timeline: [
      { year: 2002, milestone: 'Founded by Elon Musk' },
      { year: 2008, milestone: 'First private liquid-fueled rocket to reach orbit (Falcon 1)' },
      { year: 2012, milestone: 'First private spacecraft to dock with ISS (Dragon)' },
      { year: 2015, milestone: 'First orbital-class rocket booster landing (Falcon 9)' },
      { year: 2020, milestone: 'First private company to send humans to ISS (Crew Dragon Demo-2)' },
      { year: 2023, milestone: 'First integrated Starship flight test' },
    ],
    officialWebsite: 'https://www.spacex.com/',
  },
  {
    id: 'isro',
    name: 'ISRO',
    type: 'Public',
    logo: 'https://www.godigit.com/content/dam/godigit/directportal/en/isro.png',
    country: 'India',
    description: 'The Indian Space Research Organisation is the national space agency of India. It operates under the Department of Space (DOS) which is directly overseen by the Prime Minister of India.',
    notableMissions: ['Chandrayaan Program (Lunar Exploration)', 'Mangalyaan (Mars Orbiter Mission)', 'PSLV & GSLV Launches', 'Gaganyaan (Human Spaceflight Program)', 'Aditya-L1 (Solar Mission)'],
    technologies: ['PSLV (Polar Satellite Launch Vehicle)', 'GSLV (Geosynchronous Satellite Launch Vehicle)', 'Cryogenic Upper Stages', 'Vikram Lander', 'NavIC Navigation System'],
    timeline: [
      { year: 1969, milestone: 'Established' },
      { year: 1975, milestone: 'First Indian satellite launched (Aryabhata)' },
      { year: 1980, milestone: 'First Indian launch vehicle (SLV-3)' },
      { year: 2008, milestone: 'First lunar mission (Chandrayaan-1)' },
      { year: 2013, milestone: 'Mars Orbiter Mission (Mangalyaan) launch' },
      { year: 2019, milestone: 'Chandrayaan-2 mission (Orbiter successful)' },
      { year: 2023, milestone: 'Chandrayaan-3 successful lunar landing' },
    ],
    officialWebsite: 'https://www.isro.gov.in/',
  },
  {
    id: 'blueorigin',
    name: 'Blue Origin',
    type: 'Private',
    logo: 'https://d1o72l87sylvqg.cloudfront.net/blue-origin/logo-feather-optimized.svg',
    country: 'USA',
    description: 'An American privately funded aerospace manufacturer and sub-orbital spaceflight services company founded by Jeff Bezos.',
    notableMissions: ['New Shepard Suborbital Flights (Tourism & Research)', 'New Glenn Development'],
    technologies: ['New Shepard (Reusable Suborbital Rocket)', 'BE-3 & BE-4 Engines', 'Vertical Landing Technology', 'New Glenn (Heavy-lift Rocket)'],
    timeline: [
      { year: 2000, milestone: 'Founded by Jeff Bezos' },
      { year: 2015, milestone: 'First vertical landing of New Shepard booster' },
      { year: 2021, milestone: 'First crewed New Shepard flight' },
    ],
    officialWebsite: 'https://www.blueorigin.com/',
  },
    {
    id: 'roscosmos',
    name: 'Roscosmos',
    type: 'Public',
    logo: 'https://www.godigit.com/content/dam/godigit/directportal/en/russian-federal.jpg',
    country: 'Russia',
    description: 'The state corporation responsible for the wide range and types of space flights and cosmonautics programs for the Russian Federation.',
    notableMissions: ['Soyuz Crew Transport (ISS)', 'Progress Cargo Resupply (ISS)', 'GLONASS Navigation System', 'Luna Program (Modern Lunar Exploration)'],
    technologies: ['Soyuz Rocket Family', 'Proton Rocket', 'Angara Rocket Family', 'RD-170/180 Engines', 'Vostochny Cosmodrome'],
    timeline: [
      { year: 1992, milestone: 'Established (as Russian Space Agency)' },
      { year: 2015, milestone: 'Reorganized into State Corporation Roscosmos' },
      { year: 1998, milestone: 'Start of International Space Station (ISS) construction (with Zarya module)' },
      { year: 2011-2020, milestone: 'Exclusive provider of crew transport to ISS' },
    ],
    officialWebsite: 'https://en.roscosmos.ru/',
  },
  {
    id: 'esa',
    name: 'ESA',
    type: 'Public',
    logo: 'https://www.godigit.com/content/dam/godigit/directportal/en/esa.png',
    country: 'Europe', // Multi-national
    description: 'The European Space Agency is an intergovernmental organisation of 22 member states dedicated to the exploration of space.',
    notableMissions: ['Ariane Launchers', 'Galileo Navigation System', 'Rosetta (Comet Landing)', 'James Webb Space Telescope (Contribution)', 'Sentinel Satellites (Copernicus Programme)'],
    technologies: ['Ariane Rocket Family (Ariane 5, Ariane 6)', 'Vega Rocket', 'Automated Transfer Vehicle (ATV)', 'Cryogenic Propulsion (Vulcain engine)', 'Planetary Science Instruments'],
    timeline: [
      { year: 1975, milestone: 'Established' },
      { year: 1979, milestone: 'First Ariane 1 launch' },
      { year: 1986, milestone: 'Giotto probe intercepts Halley\'s Comet' },
      { year: 2004, milestone: 'Rosetta mission launched' },
      { year: 2014, milestone: 'Philae lander lands on Comet 67P (Rosetta mission)' },
      { year: 2016, milestone: 'ExoMars Trace Gas Orbiter arrives at Mars' },
    ],
    officialWebsite: 'https://www.esa.int/',
  },
  {
    id: 'cnsa',
    name: 'CNSA',
    type: 'Public',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/China_National_Space_Administration.svg/1200px-China_National_Space_Administration.svg.png',
    country: 'China',
    description: 'The China National Space Administration is the national space agency of the People\'s Republic of China responsible for the national space program.',
    notableMissions: ['Shenzhou Program (Human Spaceflight)', 'Chang\'e Program (Lunar Exploration)', 'Tiangong Space Station', 'Beidou Navigation System', 'Tianwen-1 (Mars Mission)'],
    technologies: ['Long March Rocket Family', 'Shenzhou Spacecraft', 'Yutu Lunar Rovers', 'Cryogenic Engines (YF-77, YF-100)', 'Space Station Modules'],
    timeline: [
      { year: 1993, milestone: 'Established' },
      { year: 2003, milestone: 'First Chinese taikonaut in space (Yang Liwei, Shenzhou 5)' },
      { year: 2007, milestone: 'First lunar orbiter (Chang\'e 1)' },
      { year: 2013, milestone: 'First lunar rover landing (Chang\'e 3 / Yutu)' },
      { year: 2019, milestone: 'First landing on the far side of the Moon (Chang\'e 4)' },
      { year: 2020, milestone: 'Mars mission launch (Tianwen-1)' },
      { year: 2021, milestone: 'Tiangong space station core module launched' },
    ],
    officialWebsite: 'http://www.cnsa.gov.cn/english/',
  },
  {
    id: 'jaxa',
    name: 'JAXA',
    type: 'Public',
    logo: 'https://www.godigit.com/content/dam/godigit/directportal/en/jaxa.jpg',
    country: 'Japan',
    description: 'The Japan Aerospace Exploration Agency is the Japanese national aerospace and space agency.',
    notableMissions: ['Hayabusa Missions (Asteroid Sample Return)', 'Kibo Module (ISS Contribution)', 'H-II Transfer Vehicle (HTV "Kounotori")', 'SLIM (Lunar Lander)'],
    technologies: ['H-IIA / H-IIB Rockets', 'H3 Rocket', 'Epsilon Rocket', 'Ion Engines (Hayabusa)', 'Sample Return Capsules'],
    timeline: [
      { year: 2003, milestone: 'Established (merger of ISAS, NAL, NASDA)' },
      { year: 2003, milestone: 'Hayabusa mission launched to asteroid Itokawa' },
      { year: 2008, milestone: 'Kibo module attached to ISS' },
      { year: 2010, milestone: 'Hayabusa returns first asteroid samples' },
      { year: 2014, milestone: 'Hayabusa2 mission launched to asteroid Ryugu' },
      { year: 2020, milestone: 'Hayabusa2 returns asteroid samples' },
       { year: 2024, milestone: 'SLIM successful lunar landing' },
    ],
    officialWebsite: 'https://global.jaxa.jp/',
  },
];

export async function getAgencies(): Promise<Agency[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    // In a real app, this would fetch from a database or API
    return agenciesData;
}
