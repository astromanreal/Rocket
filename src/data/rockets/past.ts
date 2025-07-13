
import type { Rocket } from './types';

export const pastRockets: Rocket[] = [
    {
      id: 'saturn-v',
      name: 'Saturn V',
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Apollo_11_Saturn_V_launch.jpg/480px-Apollo_11_Saturn_V_launch.jpg",
      status: 'past',
      operator: 'NASA',
      manufacturer: "NASA / Boeing / North American Aviation / Douglas / IBM",
      country: 'USA',
      ownership: 'Government',
      type: 'Super heavy-lift orbital',
      reusability: 'Expendable',
      stages: 3,
      propellant: "RP-1 / Liquid Oxygen (S-IC), Liquid Hydrogen / Liquid Oxygen (S-II, S-IVB)",
      firstLaunchDate: '1967-11-09',
      lastLaunchDate: '1973-05-14',
      successRate: 92.3,
      totalLaunches: 13,
      notableMissions: [
        "Apollo 11 (first crewed Moon landing)",
        "Apollo 13 (aborted lunar mission, successful return)",
        "Skylab launch (America’s first space station)"
      ],
      payloadCapacity: {
        LEO: "140,000 kg",
        GTO: "48,600 kg to Lunar Trajectory", // Mapped from TLI
        reuseStatus: "Fully expendable"
      },
      dimensions: {
        height: "110.6 m",
        diameter: "10.1 m",
        mass: "2,970,000 kg"
      },
      thrust: {
        seaLevel: "33,800 kN (first stage)",
        vacuum: "34,020 kN"
      },
      engines: {
        firstStage: "5 × F-1",
        secondStage: "5 × J-2",
        thirdStage: "1 × J-2",
      },
      launchSites: [
        "Kennedy Space Center Launch Complex 39A",
        "Kennedy Space Center Launch Complex 39B"
      ],
      description: 'The rocket that took humans to the Moon during the Apollo program. Remains the most powerful rocket ever successfully flown, enabling historic lunar landings.',
      summary: "The Saturn V was the largest and most powerful rocket ever successfully flown, developed by NASA to support the Apollo and Skylab programs. It was a three-stage, super heavy-lift launch vehicle that stood over 110 meters tall and delivered astronauts to the Moon. Its first launch in 1967 marked the beginning of a historic era in space exploration, culminating in the Apollo 11 Moon landing in 1969. Despite its size, Saturn V had an exceptional reliability record and remains an unmatched icon of human spaceflight achievement.",
      links: {
        wikipedia: "https://en.wikipedia.org/wiki/Saturn_V",
        official: "https://www.nasa.gov/history/saturn-v/",
        launchManifest: "https://en.wikipedia.org/wiki/List_of_Saturn_V_launches"
      }
    },
    {
      id: 'ariane-5',
      name: 'Ariane 5',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Ariane_5_launch_with_JWST_on_25_December_2021.jpg/480px-Ariane_5_launch_with_JWST_on_25_December_2021.jpg',
      status: 'past',
      operator: 'Arianespace',
      manufacturer: 'Airbus Defence and Space / ArianeGroup',
      country: 'Europe (ESA)',
      ownership: 'Government',
      type: 'Heavy-lift orbital',
      reusability: 'Expendable',
      stages: 2,
      propellant: 'Liquid Hydrogen / Liquid Oxygen (core stage), Solid propellant (boosters)',
      firstLaunchDate: '1996-06-04',
      lastLaunchDate: '2023-07-05',
      successRate: 95.7,
      totalLaunches: 117,
      notableMissions: [
        "James Webb Space Telescope (JWST)",
        "Galileo GPS satellites",
        "BepiColombo to Mercury",
        "Rosetta comet mission support"
      ],
      payloadCapacity: {
        LEO: '21,000 kg',
        GTO: '10,865 kg',
        reuseStatus: 'Expendable'
      },
      dimensions: {
        height: '52 m',
        diameter: '5.4 m (core stage)',
        mass: '777,000 kg (at liftoff)'
      },
      thrust: {
        seaLevel: '13,900 kN (with boosters)',
        vacuum: '1,390 kN (core stage)'
      },
      engines: {
        firstStage: "1 × Vulcain 2",
        secondStage: "1 × HM7B (in ECA variant)",
      },
      launchSites: [
        'Guiana Space Centre (Kourou), ELA-3'
      ],
      description: 'Workhorse European launcher, known for launching heavy telecommunication satellites and the James Webb Space Telescope. A symbol of European collaboration in space.',
      summary: "Ariane 5 was Europe’s most prominent and reliable heavy-lift launch vehicle, developed by the European Space Agency (ESA) and operated by Arianespace. With over 25 years of successful launches, Ariane 5 was a key pillar of European access to space. It delivered a wide range of payloads, including commercial satellites, planetary missions, and scientific observatories. The rocket achieved worldwide attention after successfully launching the James Webb Space Telescope in 2021. Its retirement in 2023 marked the end of a highly successful legacy in European rocketry.",
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Ariane_5',
        official: 'https://www.arianespace.com/vehicle/ariane-5/',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_Ariane_launches'
      }
    },
    {
      id: 'space-shuttle',
      name: 'Space Shuttle',
      status: 'past',
      operator: 'NASA',
      manufacturer: 'Rockwell International (orbiter), Thiokol (SRBs), others',
      country: 'USA',
      ownership: 'Government',
      type: 'Heavy-lift orbital (partially reusable)',
      reusability: 'Partially reusable (orbiter and boosters)',
      stages: 2,
      propellant: 'Liquid Hydrogen / Liquid Oxygen (main engines), Solid Fuel (boosters)',
      firstLaunchDate: '1981-04-12',
      lastLaunchDate: '2011-07-08',
      successRate: 98.5,
      totalLaunches: 135,
      notableMissions: [
        'Deployed the Hubble Space Telescope',
        'Assembled the International Space Station (ISS)',
        'First American woman and African American in space',
        'Final flight of Atlantis in STS-135',
      ],
      payloadCapacity: {
        LEO: '27,500 kg',
        reuseStatus: 'Orbiter and SRBs were reusable; external tank was not',
      },
      dimensions: {
        height: '56.1 m',
        diameter: '23.8 m (wingspan)',
        mass: '2,000,000 kg',
      },
      thrust: {
        seaLevel: '30,160 kN (combined)',
        vacuum: '5,300 kN (SSMEs)',
      },
      engines: {
        firstStage: '3 × RS-25 (SSMEs)',
        secondStage: '2 × SRBs',
      },
      launchSites: [
        'Kennedy Space Center LC-39A/B (Florida)',
      ],
      description: 'Iconic partially reusable system that launched the Hubble Space Telescope, assembled the International Space Station, but suffered two tragic accidents (Challenger and Columbia).',
      summary: 'The Space Shuttle was NASA’s revolutionary reusable spacecraft system used for human spaceflight missions over 30 years. It featured a reusable orbiter, external fuel tank, and solid rocket boosters. The Shuttle carried astronauts and cargo, launched and serviced satellites like Hubble, and played a key role in constructing the ISS. Despite its achievements, the program also faced major tragedies with the Challenger (1986) and Columbia (2003) disasters.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/STS-133_launch_crop.jpg/480px-STS-133_launch_crop.jpg',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Space_Shuttle',
        official: 'https://www.nasa.gov/mission_pages/shuttle/main/index.html',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_Space_Shuttle_missions',
      },
    },
    {
      id: 'delta-iv-heavy',
      name: 'Delta IV Heavy',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Delta_IV_High_Energy_Launch.jpg/480px-Delta_IV_High_Energy_Launch.jpg',
      type: 'Heavy-lift orbital',
      stages: 2, 
      payloadCapacity: { LEO: '28,790 kg', GTO: '14,220 kg', reuseStatus: "Expendable" },
      country: 'USA',
      operator: 'United Launch Alliance (ULA)',
      manufacturer: 'Boeing / ULA',
      ownership: 'Private',
      totalLaunches: 16,
      successRate: 93.8,
      firstLaunchDate: '2004-12-21',
      lastLaunchDate: '2024-04-09', 
      description: 'One of the most powerful rockets, used primarily for high-value US government payloads. Notable for its fiery hydrogen burn-off at ignition and its three-core first stage.',
      status: 'past',
      dimensions: { height: '72 m', diameter: '5.1 m (core booster)', mass: '733,000 kg at launch' },
      thrust: {
        seaLevel: '9,420 kN (combined from 3 CBCs)'
      },
      reusability: 'Expendable',
      engines: { firstStage: '3 × RS-68A (one per CBC booster)', secondStage: '1 × RL10B-2 (hydrolox)' },
      propellant: 'Liquid Hydrogen / Liquid Oxygen',
      notableMissions: [
          "Parker Solar Probe (NASA)",
          "Orion EFT-1 (Exploration Test Flight)",
          "High-value National Reconnaissance Office (NRO) payloads",
          "Defense satellite deployments"
      ],
      launchSites: [
          "Cape Canaveral SLC-37B (Florida)",
          "Vandenberg SLC-6 (California)"
      ],
      links: {
          wikipedia: "https://en.wikipedia.org/wiki/Delta_IV_Heavy",
          official: "https://www.ulalaunch.com/rockets/delta-iv",
          launchManifest: "https://en.wikipedia.org/wiki/List_of_Delta_IV_launches"
      },
      summary: "Delta IV Heavy was ULA’s flagship heavy-lift rocket, known for launching high-value and classified US government payloads. It was recognizable for its triple-core design and fiery hydrogen flame on ignition. Although powerful and highly reliable, it was costly to operate and is being replaced by the more efficient Vulcan Centaur system."
    },
    {
      id: 'terran-1',
      name: 'Terran 1',
      status: 'past',
      operator: 'Relativity Space',
      manufacturer: 'Relativity Space',
      country: 'USA',
      ownership: 'Private',
      type: 'Small-lift orbital',
      reusability: 'Partially reusable (planned, not achieved)',
      stages: 2,
      propellant: 'Liquid Methane / Liquid Oxygen (methalox)',
      firstLaunchDate: '2023-03-23',
      lastLaunchDate: '2023-03-23',
      successRate: 0,
      totalLaunches: 1,
      notableMissions: [
        'First 3D-printed rocket ever flown',
        'Test launch of Terran 1 (GLHF mission)',
        'Precursor to Terran R heavy-lift vehicle',
      ],
      payloadCapacity: {
        LEO: '1,250 kg',
        reuseStatus: 'Not achieved before retirement',
      },
      dimensions: {
        height: '33.5 m',
        diameter: '2.28 m',
        mass: '120,000 kg',
      },
      thrust: {
        seaLevel: '920 kN (combined engines)',
      },
      engines: {
        firstStage: '9 × Aeon 1 (methalox)',
        secondStage: '1 × Aeon Vacuum',
      },
      launchSites: [
        'Cape Canaveral SLC-16 (Florida)',
      ],
      description: "World’s first 3D-printed rocket. Flew once but didn’t reach orbit. Program discontinued in favor of larger Terran R.",
      summary: 'Terran 1 was the world’s first rocket made primarily using 3D printing technology, developed by Relativity Space. It represented a major innovation in aerospace manufacturing. Although its only launch failed to reach orbit, it marked a historic milestone in additive manufacturing. The program was discontinued in favor of the larger and fully reusable Terran R rocket.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Terran_1_first_launch.jpg/480px-Terran_1_first_launch.jpg',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Terran_1',
        official: 'https://www.relativityspace.com/terran1',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_Terran_1_launches',
      },
    },
    {
      id: 'proton-m',
      name: 'Proton-M',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Proton_M_launch.jpg/480px-Proton_M_launch.jpg',
      status: 'past',
      operator: 'Roscosmos',
      manufacturer: 'Khrunichev State Research and Production Center',
      country: 'Russia',
      ownership: 'Government',
      type: 'Heavy-lift orbital',
      reusability: 'Expendable',
      stages: 3,
      propellant: 'Unsymmetrical Dimethylhydrazine (UDMH) / Nitrogen Tetroxide',
      firstLaunchDate: '2001-04-07',
      lastLaunchDate: '2023-03-13',
      successRate: 88,
      totalLaunches: 100,
      notableMissions: [
        'International launches for satellites and interplanetary probes',
        'ExoMars Trace Gas Orbiter',
        'Part of Russian federal space program',
      ],
      payloadCapacity: {
        LEO: '23,000 kg',
        GTO: '6,300 kg',
        reuseStatus: 'Expendable',
      },
      dimensions: {
        height: '58.2 m',
        diameter: '7.4 m',
        mass: '705,000 kg',
      },
      thrust: {
        seaLevel: '10,320 kN',
      },
      engines: {
        firstStage: '6 × RD-275M',
        secondStage: '3 × RD-0210 + 1 × RD-0211',
        thirdStage: '1 × RD-0213 + 1 × RD-0214',
      },
      launchSites: ['Baikonur Cosmodrome, Kazakhstan'],
      summary: 'Proton-M was the last variant of Russia’s venerable Proton rocket family, serving both domestic and international missions. Despite its toxic propellants and mixed reliability, it remained a workhorse for heavy satellite launches and deep-space missions for decades.',
      description: 'Proton-M was the last variant of Russia’s venerable Proton rocket family.',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Proton-M',
        official: 'https://www.khrunichev.ru/main.php?id=44',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_Proton_launches',
      },
    },
    {
      id: 'titan-iv',
      name: 'Titan IV',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Titan_IV_launch.jpg/480px-Titan_IV_launch.jpg',
      status: 'past',
      operator: 'USAF / Lockheed Martin',
      manufacturer: 'Lockheed Martin',
      country: 'United States',
      ownership: 'Government',
      type: 'Heavy-lift orbital',
      reusability: 'Expendable',
      stages: 2,
      propellant: 'Aerozine 50 / Nitrogen Tetroxide (core), Solid fuel (boosters)',
      firstLaunchDate: '1989-06-14',
      lastLaunchDate: '2005-10-19',
      successRate: 89,
      totalLaunches: 39,
      notableMissions: ['Spy satellites, DSP early warning system, Cassini spacecraft', 'Most powerful expendable U.S. rocket before Delta IV Heavy'],
      payloadCapacity: {
        LEO: '21,680 kg',
        GTO: '10,000+ kg',
        reuseStatus: 'Expendable',
      },
      dimensions: {
        height: '63.1 m',
        diameter: '3.1 m (core)',
        mass: '1,015,000 kg',
      },
      thrust: {
        seaLevel: '12,000+ kN',
      },
      engines: {
        firstStage: 'LR87 (liquid) + 2 solid rocket motors',
        secondStage: 'LR91-AJ-11',
        thirdStage: 'IUS or Centaur (mission-dependent)',
      },
      launchSites: ['Cape Canaveral SLC-41', 'Vandenberg AFB SLC-4E'],
      summary: 'Titan IV was America’s last member of the Titan rocket family, designed to carry the largest and most sensitive national security payloads. Its enormous thrust and optional upper stages allowed it to support deep-space and high-orbit missions during the Cold War and beyond.',
      description: 'Titan IV was America’s last member of the Titan rocket family.',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Titan_IV',
        official: 'https://www.lockheedmartin.com/en-us/news/features/history/titan.html',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_Titan_launches',
      },
    },
    {
      id: 'launcherone',
      name: 'LauncherOne',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/LauncherOne_drop_test.jpg/480px-LauncherOne_drop_test.jpg',
      status: 'past',
      operator: 'Virgin Orbit (USA)',
      manufacturer: 'Virgin Orbit',
      country: 'USA',
      ownership: 'Private',
      type: 'Small-lift air-launched',
      reusability: 'Expendable',
      stages: 2,
      propellant: 'RP-1 / Liquid Oxygen',
      firstLaunchDate: '2020-05-25',
      lastLaunchDate: '2023-01-09',
      successRate: 60,
      totalLaunches: 5,
      notableMissions: ['First orbital flight from the UK', 'Deployed small cubesats for NASA and commercial clients', 'First successful air-launched orbital rocket from the USA'],
      payloadCapacity: {
        LEO: '500 kg',
        reuseStatus: 'Expendable',
      },
      dimensions: {
        height: '21.3 m',
        diameter: '1.6 m',
        mass: '30,000 kg',
      },
      thrust: {
        seaLevel: '327 kN',
      },
      engines: {
        firstStage: 'NewtonThree',
        secondStage: 'NewtonFour',
      },
      launchSites: ["Air launch from Boeing 747 'Cosmic Girl'", 'Departed from Mojave, Cornwall (UK), Guam (planned)'],
      summary: 'LauncherOne was a revolutionary air-launched small satellite rocket developed by Virgin Orbit. It offered responsive deployment from modified Boeing 747 aircraft but was discontinued after financial setbacks despite technical success.',
      description: 'LauncherOne was a revolutionary air-launched small satellite rocket developed by Virgin Orbit.',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/LauncherOne',
        official: 'https://virginorbit.com/',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_LauncherOne_launches',
      },
    },
    {
      id: 'pegasus',
      name: 'Pegasus',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Pegasus_launch.jpg/480px-Pegasus_launch.jpg',
      status: 'past',
      operator: 'Northrop Grumman (USA)',
      manufacturer: 'Orbital Sciences / Northrop Grumman',
      country: 'USA',
      ownership: 'Private',
      type: 'Small-lift air-launched',
      reusability: 'Expendable',
      stages: 3,
      propellant: 'Solid fuel (all stages)',
      firstLaunchDate: '1990-04-05',
      lastLaunchDate: '2021-06-13',
      successRate: 90,
      totalLaunches: 44,
      notableMissions: ['Launched NASA satellites such as ICON, IRIS, and NuSTAR', 'First air-launched rocket to reach orbit', 'Responsive launch capability'],
      payloadCapacity: {
        LEO: '443 kg',
        reuseStatus: 'Expendable',
      },
      dimensions: {
        height: '17.6 m',
        diameter: '1.27 m',
        mass: '23,130 kg',
      },
      thrust: {
        seaLevel: '450 kN',
      },
      engines: {
        firstStage: 'Orion 50S XL',
        secondStage: 'Orion 50 XL',
        thirdStage: 'Orion 38',
      },
      launchSites: ["Air launch from Lockheed L-1011 'Stargazer'", 'Operated over oceans or remote airspace'],
      summary: 'Pegasus was the world’s first successful air-launched orbital rocket, offering unmatched flexibility and fast response times. Though now retired, it was used for decades to deploy scientific and defense-related payloads into space.',
      description: 'Pegasus was the world’s first successful air-launched orbital rocket.',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Pegasus_(rocket)',
        official: 'https://www.northropgrumman.com/space/pegasus-launch-vehicle/',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_Pegasus_launches',
      },
    },
    {
      id: 'delta-ii',
      name: 'Delta II',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Delta_II_Mars_Phoenix_launch.jpg/480px-Delta_II_Mars_Phoenix_launch.jpg',
      status: 'past',
      operator: 'ULA / NASA (USA)',
      manufacturer: 'McDonnell Douglas / Boeing / ULA',
      country: 'USA',
      ownership: 'Private',
      type: 'Medium-lift orbital',
      reusability: 'Expendable',
      stages: 3,
      propellant: 'RP-1/LOX, Hypergolic (upper stages)',
      firstLaunchDate: '1989-02-14',
      lastLaunchDate: '2018-09-15',
      successRate: 98.7,
      totalLaunches: 155,
      notableMissions: [
        'Mars rovers (Spirit, Opportunity)',
        'Phoenix Mars Lander',
        'GPS satellite deployments',
        'ICESat and GRAIL missions',
      ],
      payloadCapacity: {
        LEO: '6,100 kg',
        reuseStatus: 'Expendable',
      },
      dimensions: {
        height: '38.9 m',
        diameter: '2.4 m',
        mass: '232,870 kg',
      },
      thrust: {
        seaLevel: '4,160 kN',
      },
      engines: {
        firstStage: 'RS-27A',
        secondStage: 'Aerojet AJ10-118K',
      },
      launchSites: ['Cape Canaveral SLC-17', 'Vandenberg AFB SLC-2'],
      summary: 'Delta II was one of the most successful rockets in history, with a near-perfect success rate across almost three decades. It was widely used by NASA and the military for Earth observation and deep space missions.',
      description: 'Delta II was one of the most successful rockets in history, with a near-perfect success rate across almost three decades.',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Delta_II',
        official: 'https://www.ulalaunch.com/rockets/delta-ii',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_Delta_launches',
      },
    },
    {
        id: 'black-arrow',
        name: 'Black Arrow',
        status: 'past',
        operator: 'British Aircraft Corporation (UK)',
        manufacturer: 'Royal Aircraft Establishment',
        country: 'United Kingdom',
        ownership: 'Government',
        type: 'Small-lift orbital',
        reusability: 'Expendable',
        stages: 3,
        propellant: 'Kerosene / Hydrogen peroxide',
        firstLaunchDate: '1969-06-28',
        lastLaunchDate: '1971-10-28',
        successRate: 25,
        totalLaunches: 4,
        notableMissions: ['Prospero satellite (1971) – only successful UK satellite launch'],
        payloadCapacity: { LEO: '135 kg', reuseStatus: 'Expendable' },
        dimensions: { height: '13 m', diameter: '2 m', mass: '18,100 kg' },
        thrust: { seaLevel: '230 kN' },
        engines: { firstStage: 'Gamma 8', secondStage: 'Gamma 2', thirdStage: 'Waxwing solid motor' },
        launchSites: ['Woomera Test Range, Australia'],
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Black_Arrow_Woomera_1971.jpg/480px-Black_Arrow_Woomera_1971.jpg',
        summary: "Black Arrow was the United Kingdom's only successful orbital launch vehicle. Despite its single success in launching the Prospero satellite, the program was canceled shortly afterward. Its legacy endures as a symbol of early British space efforts.",
        description: "Black Arrow was the United Kingdom's only successful orbital launch vehicle.",
        links: {
          wikipedia: 'https://en.wikipedia.org/wiki/Black_Arrow',
          official: 'https://www.rafmuseum.org.uk/research/collections/black-arrow-launch-vehicle/',
          launchManifest: 'https://en.wikipedia.org/wiki/List_of_Black_Arrow_launches',
        },
    },
    {
        id: 'scout',
        name: 'Scout',
        status: 'past',
        operator: 'NASA (USA)',
        manufacturer: 'Vought / LTV / Orbital Sciences',
        country: 'United States',
        ownership: 'Government',
        type: 'Small-lift orbital',
        reusability: 'Expendable',
        stages: 4,
        propellant: 'Solid-fueled',
        firstLaunchDate: '1960-07-01',
        lastLaunchDate: '1994-05-09',
        successRate: 86,
        totalLaunches: 118,
        notableMissions: [
          'Explorer, Orbiting Geophysical Observatory (OGO)',
          'San Marco platform launches (Italy)',
          'Aeros and early weather satellites',
        ],
        payloadCapacity: { LEO: '200 kg', reuseStatus: 'Expendable' },
        dimensions: { height: '22 m', diameter: '1.02 m', mass: '17,000 kg' },
        thrust: { seaLevel: '580 kN' },
        engines: { firstStage: 'Algol, Castor, Antares, Altair (various versions)' },
        launchSites: ['Wallops Flight Facility', 'Vandenberg AFB', 'San Marco platform (Italy)'],
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Scout_XE-A_with_EXOS-A_satellite.jpg/480px-Scout_XE-A_with_EXOS-A_satellite.jpg',
        summary: 'The Scout was NASA’s first solid-fueled, four-stage orbital launch vehicle. It enabled low-cost and reliable launches for small satellites and played a foundational role in early space research and satellite programs globally.',
        description: 'The Scout was NASA’s first solid-fueled, four-stage orbital launch vehicle.',
        links: {
          wikipedia: 'https://en.wikipedia.org/wiki/Scout_(rocket_family)',
          official: 'https://history.nasa.gov/SP-4012/vol3/ch1.htm',
          launchManifest: 'https://en.wikipedia.org/wiki/List_of_Scout_launches',
        },
    },
    {
        id: 'astra-rocket-3',
        name: 'Astra Rocket 3',
        status: 'past',
        operator: 'Astra (USA)',
        manufacturer: 'Astra Space',
        country: 'United States',
        ownership: 'Private',
        type: 'Small-lift orbital',
        reusability: 'Expendable',
        stages: 2,
        propellant: 'RP-1 / Liquid Oxygen',
        firstLaunchDate: '2020-09-12',
        lastLaunchDate: '2022-06-12',
        successRate: 28.5,
        totalLaunches: 7,
        notableMissions: ['First orbital success on Rocket 3.3 LV0009 in November 2021'],
        payloadCapacity: { LEO: '150 kg', reuseStatus: 'Expendable' },
        dimensions: { height: '11.6 m', diameter: '1.32 m', mass: '12,000 kg' },
        thrust: { seaLevel: '140 kN' },
        engines: { firstStage: '5x Delphin engines', secondStage: 'Aether vacuum engine' },
        launchSites: ['Pacific Spaceport Complex – Alaska', 'Cape Canaveral, Florida'],
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Astra_Rocket_3.3_launch.jpg/480px-Astra_Rocket_3.3_launch.jpg',
        summary: 'Rocket 3 was Astra’s first orbital-class launch system targeting the small satellite market. Designed for rapid manufacturing and mobile deployment, it saw several test and operational flights before being retired in favor of the upcoming Rocket 4 system.',
        description: 'Rocket 3 was Astra’s first orbital-class launch system targeting the small satellite market.',
        links: {
          wikipedia: 'https://en.wikipedia.org/wiki/Astra_Rocket_3',
          official: 'https://astra.com/',
          launchManifest: 'https://en.wikipedia.org/wiki/List_of_Astra_Rocket_3_launches',
        },
    },
    {
        id: 'thor-able',
        name: 'Thor-Able',
        status: 'past',
        operator: 'USAF / NASA (USA)',
        manufacturer: 'Douglas Aircraft Company',
        country: 'United States',
        ownership: 'Government',
        type: 'Light-lift orbital',
        reusability: 'Expendable',
        stages: 3,
        propellant: 'Liquid and solid fuel combination',
        firstLaunchDate: '1958-04-23',
        lastLaunchDate: '1960-04-01',
        successRate: 55,
        totalLaunches: 11,
        notableMissions: [
            'Pioneer 1 – first NASA lunar probe',
            'First U.S. attempts at interplanetary missions'
        ],
        payloadCapacity: {
            LEO: '150 kg',
            reuseStatus: 'No'
        },
        dimensions: {
            height: '27 m',
            diameter: '2.44 m',
            mass: '51,000 kg'
        },
        thrust: {
            seaLevel: '667 kN'
        },
        engines: {
            firstStage: 'Thor IRBM engine',
            secondStage: 'Able stage (modified Vanguard)',
            thirdStage: 'Altair solid rocket'
        },
        launchSites: [
            'Cape Canaveral LC-17'
        ],
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Thor-Able_launch.jpg',
        summary: 'Thor-Able was a U.S. launch vehicle derived from military missile technology. It played a foundational role in early NASA space exploration by launching satellites and interplanetary probes during the dawn of the space race.',
        description: 'Thor-Able was a U.S. launch vehicle derived from military missile technology.',
        links: {
            wikipedia: 'https://en.wikipedia.org/wiki/Thor-Able',
            official: 'https://history.nasa.gov/'
        }
    },
    {
        id: "n1-rocket",
        name: "N1 Rocket",
        status: "past",
        operator: "Soviet Union (USSR)",
        manufacturer: "OKB-1 (Korolev Design Bureau)",
        country: "USSR",
        ownership: "Government",
        type: "Super heavy-lift orbital",
        reusability: "Expendable",
        stages: 4,
        propellant: "Kerosene / Liquid Oxygen",
        firstLaunchDate: "1969-02-21",
        lastLaunchDate: "1972-11-23",
        successRate: 0,
        totalLaunches: 4,
        notableMissions: [
            "Intended to send cosmonauts to the Moon",
            "All four launch attempts ended in failure"
        ],
        payloadCapacity: {
            LEO: "95,000 kg (planned)",
            reuseStatus: "Expendable"
        },
        dimensions: {
            height: "105 m",
            diameter: "17 m (first stage)",
            mass: "2,735,000 kg"
        },
        thrust: {
            seaLevel: "45,400 kN"
        },
        engines: {
            firstStage: "30 × NK-15",
            secondStage: "8 × NK-15V",
            thirdStage: "4 × NK-21",
            fourthStage: "1 × RD-58"
        },
        launchSites: [
            "Baikonur Cosmodrome Site 110"
        ],
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f6/N1-Rocket_Cutaway_Diagram.png",
        summary: "The N1 rocket was the Soviet Union's answer to NASA's Saturn V, intended for lunar crewed missions. Despite its immense thrust and scale, all four test launches between 1969 and 1972 failed due to engine and stage integration issues. The project was eventually canceled, marking a critical point in the USSR's withdrawal from the lunar race.",
        links: {
            wikipedia: "https://en.wikipedia.org/wiki/N1_(rocket)",
            official: "https://www.russianspaceweb.com/n1.html",
            launchManifest: "https://en.wikipedia.org/wiki/N1_(rocket)#Launch_history"
        },
        description: "The N1 was the Soviet Union's super heavy-lift rocket for the lunar program, which failed in all four launch attempts."
    },
    {
        id: "energia",
        name: "Energia",
        status: "past",
        operator: "Soviet Union (USSR)",
        manufacturer: "NPO Energia",
        country: "USSR",
        ownership: "Government",
        type: "Super heavy-lift orbital",
        reusability: "Expendable (with potential for reusable boosters)",
        stages: 2,
        propellant: "Liquid Hydrogen / Liquid Oxygen",
        firstLaunchDate: "1987-05-15",
        lastLaunchDate: "1988-11-15",
        successRate: 50,
        totalLaunches: 2,
        notableMissions: [
            "Launched the Buran space shuttle",
            "Launched Polyus orbital weapons platform (failed)"
        ],
        payloadCapacity: {
            LEO: "100,000 kg",
            reuseStatus: "Expendable"
        },
        dimensions: {
            height: "58.8 m",
            diameter: "7.75 m core",
            mass: "2,400,000 kg"
        },
        thrust: {
            seaLevel: "34,000 kN"
        },
        engines: {
            firstStage: "4 × RD-170 (boosters)",
            secondStage: "4 × RD-0120"
        },
        launchSites: [
            "Baikonur Cosmodrome Site 250"
        ],
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Energia-Buran_rocket.jpg",
        summary: "Energia was the USSR’s most powerful launch system, designed to carry both military payloads and the Buran space shuttle. It successfully launched Buran in 1988 on an automated flight. However, the dissolution of the Soviet Union and funding issues led to its cancellation after only two launches, despite its technological success.",
        links: {
            wikipedia: "https://en.wikipedia.org/wiki/Energia",
            official: "https://www.russianspaceweb.com/energia.html",
            launchManifest: "https://en.wikipedia.org/wiki/Energia#Launch_history"
        },
        description: "Energia was the USSR's most powerful launch system, designed to carry the Buran shuttle and other heavy payloads."
    },
    {
      id: 'buran-energia',
      name: 'Buran-Energia',
      status: 'past',
      operator: 'Soviet Union (USSR)',
      manufacturer: 'NPO Energia',
      country: 'USSR',
      ownership: 'Government',
      type: 'Heavy-lift orbital (reusable orbiter)',
      reusability: 'Partial (reusable orbiter)',
      stages: 2,
      propellant: 'Liquid Hydrogen / Liquid Oxygen',
      firstLaunchDate: '1988-11-15',
      lastLaunchDate: '1988-11-15',
      successRate: 100,
      totalLaunches: 1,
      notableMissions: [
        'Only flight was an automated orbital test mission of the Buran shuttle',
        'Soviet response to NASA’s Space Shuttle program'
      ],
      payloadCapacity: {
        LEO: 'Up to 30,000 kg (orbiter payload capacity)',
        reuseStatus: 'Partially reusable'
      },
      dimensions: {
        height: '60 m',
        diameter: '7.75 m core booster',
        mass: '2,400,000 kg'
      },
      thrust: {
        seaLevel: '34,000 kN (combined boosters)'
      },
      engines: {
        firstStage: '4 × RD-170 engines (boosters)',
        secondStage: '4 × RD-0120 engines'
      },
      launchSites: [
        'Baikonur Cosmodrome Site 250'
      ],
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Buran_and_Energia.jpg',
      summary: 'The Buran-Energia system was the Soviet Union\'s answer to the US Space Shuttle, featuring a reusable orbiter launched atop the powerful Energia rocket. It completed one unmanned orbital flight successfully in 1988, demonstrating automated landing capability. The program was canceled due to political and economic turmoil after the USSR dissolved.',
      description: 'The Buran-Energia system was the Soviet Union\'s answer to the US Space Shuttle.',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Buran_program',
        official: 'https://www.russianspaceweb.com/buran.html',
        launchManifest: 'https://youtu.be/d7QmqvKZT9Y'
      }
    },
    {
      id: 'diamant',
      name: 'Diamant',
      status: 'past',
      operator: 'CNES (France)',
      manufacturer: 'Aerospatiale',
      country: 'France',
      ownership: 'Government',
      type: 'Light-lift orbital',
      reusability: 'Expendable',
      stages: 3,
      propellant: 'Hypergolic / Liquid Propellants',
      firstLaunchDate: '1965-11-26',
      lastLaunchDate: '1975-09-27',
      successRate: 50,
      totalLaunches: 10,
      notableMissions: [
        'First French and Western European satellite launch vehicle',
        'Enabled France to become the third country to launch its own satellite'
      ],
      payloadCapacity: {
        LEO: '150 kg',
        reuseStatus: 'Expendable'
      },
      dimensions: {
        height: '18.8 m',
        diameter: '1.4 m',
        mass: '18,000 kg'
      },
      thrust: {
        seaLevel: '330 kN (first stage)'
      },
      engines: {
        firstStage: 'NA801 Mammouth engine',
        secondStage: 'NA802 engine',
        thirdStage: 'Solid rocket motor'
      },
      launchSites: [
        'Kourou Space Center'
      ],
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Diamant-A_-_1965_edition.png',
      summary: 'Diamant was France’s first satellite launcher and the first successful orbital rocket developed by a Western European country. Its successful launches helped establish the European space presence, culminating in the formation of Arianespace. Diamant launched small scientific and technological payloads during its operational years.',
      description: 'Diamant was France’s first satellite launcher.',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Diamant_(rocket)',
        official: 'https://www.arianespace.com/',
        launchManifest: 'https://www.nasa.gov/centers/wstf/multimedia/history.html'
      }
    },
    {
      id: 'vostok-k',
      name: 'Vostok-K',
      status: 'past',
      operator: 'Soviet Union (USSR)',
      manufacturer: 'OKB-1',
      country: 'USSR',
      ownership: 'Government',
      type: 'Medium-lift orbital',
      reusability: 'Expendable',
      stages: 3,
      propellant: 'Kerosene / Liquid Oxygen',
      firstLaunchDate: '1960-12-22',
      lastLaunchDate: '1963-06-16',
      successRate: 85,
      totalLaunches: 13,
      notableMissions: [
        'Launched first human, Yuri Gagarin, into space in 1961',
        'Basis for early Soviet crewed spaceflights'
      ],
      payloadCapacity: {
        LEO: '4,730 kg',
        reuseStatus: 'Expendable'
      },
      dimensions: {
        height: '35.4 m',
        diameter: '10.3 m (with boosters)',
        mass: '280,000 kg'
      },
      thrust: {
        seaLevel: '3,920 kN'
      },
      engines: {
        firstStage: '4 × RD-107 engines',
        secondStage: '1 × RD-108 engine'
      },
      launchSites: [
        'Baikonur Cosmodrome Site 1/5'
      ],
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Vostok-K_launch_cropped.jpg',
      summary: 'Vostok-K was the launch vehicle for the historic first human spaceflight in 1961, carrying Yuri Gagarin into orbit. It was derived from the R-7 missile and played a key role in early Soviet space exploration, launching many uncrewed and crewed missions during the early 1960s.',
      description: 'Vostok-K was the launch vehicle for the historic first human spaceflight.',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Vostok-K',
        official: 'https://www.russianspaceweb.com/vostok-k.html',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_R-7_launches'
      }
    },
    {
      id: 'shavit',
      name: 'Shavit',
      status: 'past',
      operator: 'Israel Aerospace Industries (IAI)',
      manufacturer: 'Israel Aerospace Industries',
      country: 'Israel',
      ownership: 'Government',
      type: 'Small-lift orbital',
      reusability: 'Expendable',
      stages: 3,
      propellant: 'Solid fuel',
      firstLaunchDate: '1988-09-19',
      lastLaunchDate: '2020-07-06',
      successRate: 55,
      totalLaunches: 11,
      notableMissions: [
        'Israel’s first and only satellite launch vehicle',
        'Launched satellites into retrograde orbit due to geopolitical constraints'
      ],
      payloadCapacity: {
        LEO: '300 kg',
        reuseStatus: 'Expendable'
      },
      dimensions: {
        height: '26 m',
        diameter: '1.35 m',
        mass: '30,000 kg'
      },
      thrust: {
        seaLevel: 'Unknown (solid boosters)'
      },
      engines: {
        firstStage: 'Solid rocket motor',
        secondStage: 'Solid rocket motor',
        thirdStage: 'Solid rocket motor'
      },
      launchSites: [
        'Palmachim Airbase'
      ],
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Shavit_rocket_launch.jpg',
      summary: 'The Shavit rocket is Israel’s satellite launcher, developed under strict geopolitical conditions requiring launches westward over the Mediterranean Sea into retrograde orbit. It has been used primarily to deploy reconnaissance and communication satellites and remains a critical part of Israel’s space capabilities.',
      description: 'The Shavit rocket is Israel’s satellite launcher.',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Shavit_(rocket)',
        official: 'https://www.iai.co.il/p/shavit',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_Shavit_launches'
      }
    },
    {
      id: 'dnepr',
      name: 'Dnepr',
      status: 'past',
      operator: 'Kosmotras (Russia/Ukraine)',
      manufacturer: 'Yuzhmash',
      country: 'Russia / Ukraine',
      ownership: 'Government / Commercial',
      type: 'Medium-lift orbital',
      reusability: 'Expendable',
      stages: 3,
      propellant: 'Hydrazine / Nitrogen tetroxide',
      firstLaunchDate: '1999-04-21',
      lastLaunchDate: '2015-03-26',
      successRate: 95,
      totalLaunches: 22,
      notableMissions: [
        'Converted from Soviet-era SS-18 ICBMs',
        'Provided low-cost commercial satellite launches'
      ],
      payloadCapacity: {
        LEO: '4,500 kg',
        reuseStatus: 'Expendable'
      },
      dimensions: {
        height: '34 m',
        diameter: '3.9 m',
        mass: '211,000 kg'
      },
      thrust: {
        seaLevel: '4,000 kN'
      },
      engines: {
        firstStage: 'RD-263 engines',
        secondStage: 'RD-0255 engines',
        thirdStage: 'RD-0216 engines'
      },
      launchSites: [
        'Baikonur Cosmodrome',
        'Dombarovsky Air Base'
      ],
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dnepr_launch_-_June_2006.jpg',
      summary: 'Dnepr was a converted Soviet SS-18 intercontinental ballistic missile adapted for commercial satellite launches, offering cost-effective access to space. It launched many commercial, scientific, and military payloads until its retirement in 2015, due to geopolitical tensions between Russia and Ukraine.',
      description: 'Dnepr was a converted Soviet SS-18 ICBM adapted for commercial launches.',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Dnepr_(rocket)',
        official: 'https://www.kosmotras.ru/en',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_Dnepr_launches'
      }
    },
    {
      id: 'antares-230-plus',
      name: 'Antares 230+',
      status: 'past',
      operator: 'Northrop Grumman (USA)',
      manufacturer: 'Northrop Grumman',
      country: 'USA',
      ownership: 'Private',
      type: 'Medium-lift orbital',
      reusability: 'Expendable',
      stages: 2,
      propellant: 'RP-1 / Liquid Oxygen',
      firstLaunchDate: '2013-04-21',
      lastLaunchDate: '2023-08-02',
      successRate: 87,
      totalLaunches: 15,
      notableMissions: [
        'Cargo missions to the ISS under NASA’s CRS program',
        'Used Cygnus spacecraft to deliver supplies'
      ],
      payloadCapacity: {
        LEO: '8,000 kg',
        reuseStatus: 'Expendable'
      },
      dimensions: {
        height: '42.5 m',
        diameter: '3.9 m',
        mass: '300,000 kg'
      },
      thrust: {
        seaLevel: '3,900 kN'
      },
      engines: {
        firstStage: '2 × RD-181',
        secondStage: 'Solid-fueled Castor 30XL'
      },
      launchSites: [
        'Mid-Atlantic Regional Spaceport (Wallops Island)'
      ],
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Antares_launch_pad_0A.jpg',
      summary: 'Antares 230+ was a medium-lift rocket developed by Northrop Grumman and used to support NASA’s Commercial Resupply Services (CRS) missions to the International Space Station. It was phased out due to supply chain disruptions from the Ukraine conflict and will be replaced by the Antares 330 variant.',
      description: 'Antares 230+ was a medium-lift rocket used for ISS cargo missions.',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Antares_(rocket)',
        official: 'https://www.northropgrumman.com/space/antares-launch-vehicle/',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_Antares_launches'
      }
    },
    {
        id: "os-m1",
        name: "OS-M1",
        status: "past",
        operator: "OneSpace (China)",
        manufacturer: "OneSpace",
        country: "China",
        ownership: "Private",
        type: "Small-lift orbital",
        reusability: "Expendable",
        stages: 4,
        propellant: "Solid fuel",
        firstLaunchDate: "2019-03-27",
        lastLaunchDate: "2019-03-27",
        successRate: 0,
        totalLaunches: 1,
        notableMissions: [
          "First attempt by a private Chinese company to reach orbit"
        ],
        payloadCapacity: {
          LEO: "205 kg",
          reuseStatus: "No"
        },
        dimensions: {
          height: "19 m",
          diameter: "1.2 m",
          mass: "21,000 kg"
        },
        thrust: {
          seaLevel: "Unknown"
        },
        engines: {
          firstStage: "Solid motors (all stages)"
        },
        launchSites: [
          "Jiuquan Satellite Launch Center"
        ],
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1e/OS-M1_at_launch_pad.jpg",
        summary: "OS-M1 was the first orbital launch attempt by OneSpace, a private Chinese aerospace startup. Although the launch in 2019 failed to reach orbit, it marked a significant milestone for China's emerging commercial launch sector.",
        description: "OS-M1 was the first orbital launch attempt by OneSpace, a private Chinese aerospace startup.",
        links: {
          wikipedia: "https://en.wikipedia.org/wiki/OneSpace#OS-M1",
          official: "http://www.onespacechina.com/"
        }
    },
    {
        id: "sarge",
        name: "SARGE",
        status: "past",
        operator: "Exos Aerospace (USA)",
        manufacturer: "Exos Aerospace",
        country: "USA",
        ownership: "Private",
        type: "Reusable suborbital",
        reusability: "Fully reusable (suborbital)",
        stages: 1,
        propellant: "Liquid oxygen / Ethanol",
        firstLaunchDate: "2018-08-25",
        lastLaunchDate: "2021-09-17",
        successRate: 60,
        totalLaunches: 5,
        notableMissions: [
          "Suborbital experiments and microgravity testing"
        ],
        payloadCapacity: {
          LEO: "50–100 kg",
          reuseStatus: "Yes"
        },
        dimensions: {
          height: "11.5 m",
          diameter: "0.45 m",
          mass: "Unknown"
        },
        thrust: {
          seaLevel: "17.8 kN"
        },
        engines: {
          firstStage: "Custom reusable engine"
        },
        launchSites: [
          "Spaceport America, New Mexico"
        ],
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b9/SARGE_rocket_launch.jpg",
        summary: "SARGE (Suborbital Autonomous Rocket with GuidancE) was a reusable suborbital launch vehicle developed by Exos Aerospace. Primarily used for science experiments and microgravity tests, it aimed to provide quick and cost-effective research flights.",
        description: "SARGE was a reusable suborbital launch vehicle for science experiments.",
        links: {
          wikipedia: "https://en.wikipedia.org/wiki/Exos_Aerospace",
          official: "https://www.exosaero.com/"
        }
    }
];
