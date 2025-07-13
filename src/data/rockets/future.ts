
import type { Rocket } from './types';

export const futureRockets: Rocket[] = [
    {
      id: 'new-glenn',
      name: 'New Glenn',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/New_Glenn_Rendering_2020.jpg/480px-New_Glenn_Rendering_2020.jpg',
      status: 'future',
      operator: 'Blue Origin',
      manufacturer: 'Blue Origin',
      country: 'USA',
      ownership: 'Private',
      type: 'Heavy-lift orbital',
      reusability: 'Partially reusable (first stage)',
      stages: 2,
      propellant: 'Liquid Methane / Liquid Oxygen (Methalox)',
      firstLaunchDate: '2024-12-31', // Tentative
      lastLaunchDate: null,
      successRate: 0,
      totalLaunches: 0,
      notableMissions: [
        'NASA ESCAPADE Mars mission (planned)',
        'Amazon Kuiper broadband constellation (planned)',
        'Commercial heavy payload launches'
      ],
      payloadCapacity: {
        LEO: '45,000 kg (with reuse)',
        GTO: '13,000 kg (with reuse)',
        reuseStatus: 'First stage designed for vertical landing and reuse'
      },
      dimensions: {
        height: '98 m',
        diameter: '7 m',
        mass: '3,900,000 kg (estimated)'
      },
      thrust: {
        seaLevel: '17,100 kN (booster)',
        vacuum: '1,100 kN (second stage)'
      },
      engines: {
        firstStage: '7 × BE-4 (methalox)',
        secondStage: '2 × BE-3U (hydrolox)'
      },
      launchSites: [
        'LC-36, Cape Canaveral Space Force Station (Florida)'
      ],
      description: 'Large reusable launch vehicle under development by Blue Origin, featuring powerful BE-4 methane engines and aiming for significant payload capacity.',
      summary: "New Glenn is Blue Origin’s upcoming heavy-lift launch vehicle designed for reusable operations. With a massive payload fairing and a reusable first stage, it’s positioned to compete in the commercial satellite and interplanetary mission markets. New Glenn uses BE-4 engines powered by liquid methane and is part of Blue Origin’s broader strategy to reduce launch costs and establish long-term presence in space.",
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/New_Glenn',
        official: 'https://www.blueorigin.com/new-glenn/',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_New_Glenn_launches'
      }
    },
    {
      id: 'rs1',
      name: 'RS1',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/RS1_First_Stage_Test_Firing_-_ABL_Space.jpg/480px-RS1_First_Stage_Test_Firing_-_ABL_Space.jpg',
      status: 'future',
      operator: 'ABL Space Systems (USA)',
      manufacturer: 'ABL Space Systems',
      country: 'USA',
      ownership: 'Private',
      type: 'Small-lift orbital',
      reusability: 'Expendable (planned)',
      stages: 2,
      propellant: 'RP-1 / LOX',
      firstLaunchDate: '2025-01-01',
      lastLaunchDate: null,
      successRate: 0,
      totalLaunches: 0,
      notableMissions: ['Responsive launch for US Space Force', 'Deployment of commercial smallsats'],
      payloadCapacity: {
        LEO: '1,350 kg',
        reuseStatus: 'Expendable',
      },
      dimensions: {
        height: '26 m',
        diameter: '1.8 m',
        mass: '55,000 kg',
      },
      thrust: {
        seaLevel: '1,200 kN',
      },
      engines: {
        firstStage: 'E2 engines (9)',
        secondStage: 'E2 Vacuum',
      },
      launchSites: ['Pacific Spaceport Complex (Alaska)', 'Cape Canaveral SLC-46'],
      summary: 'RS1 is a modular, containerized small satellite launcher developed by ABL Space Systems. It is designed for rapid deployment and aims to support responsive and affordable orbital launches for government and commercial clients.',
      description: 'RS1 is a modular, containerized small satellite launcher developed by ABL Space Systems.',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/ABL_Space_Systems',
        official: 'https://ablspacesystems.com/',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_RS1_launches',
      },
    },
    {
        id: 'cyclone-4m',
        name: 'Cyclone-4M',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Cyclone-4M_Rendering.png/480px-Cyclone-4M_Rendering.png',
        type: 'Medium-lift orbital',
        stages: 2,
        payloadCapacity: { LEO: '5,000 kg', reuseStatus: "Expendable" },
        country: 'Canada / Ukraine',
        operator: 'Maritime Launch Services (Canada/Ukraine)',
        manufacturer: 'Yuzhnoye Design Office (Ukraine)',
        ownership: 'Private',
        totalLaunches: 0,
        successRate: 0,
        firstLaunchDate: '2025-01-01',
        lastLaunchDate: null,
        description: "A commercial derivative of the Ukrainian Cyclone-4, expected to launch from Canada. Combines heritage design with modern capabilities.",
        status: 'future',
        dimensions: { height: '38.7 m', diameter: '4 m', mass: '280,000 kg' },
        thrust: { seaLevel: '3,800 kN (Zenit-derived RD-874 engines)' },
        reusability: 'Expendable',
        engines: { firstStage: 'RD-874', secondStage: 'RD-861K' },
        propellant: 'RP-1 / Liquid Oxygen',
        launchSites: ['Spaceport Nova Scotia, Canada'],
        summary: "Cyclone-4M is a Canadian-Ukrainian commercial launch vehicle being developed for medium-class payloads. Based on the Ukrainian Zenit rocket heritage, it aims to offer reliable orbital launches from North America. Its construction marks a significant development in Canadian space infrastructure.",
        links: {
          wikipedia: "https://en.wikipedia.org/wiki/Cyclone-4M",
          official: "https://maritimelaunch.com/",
          launchManifest: "https://en.wikipedia.org/wiki/Cyclone-4M#Launch_history"
        },
        notableMissions: ['Maiden flight expected from Spaceport Nova Scotia'],
    },
    {
        id: 'blue-whale-1',
        name: 'Blue Whale 1',
        imageUrl: 'https://imgcdn.3dmgame.com/uploads/images/news/20240404/1712225052_647806.jpg',
        type: 'Medium-lift orbital',
        stages: 2,
        payloadCapacity: { LEO: '9,000 kg', reuseStatus: 'Planned Reusable' },
        country: 'China',
        operator: 'Space Pioneer (China)',
        manufacturer: 'Beijing Tianbing Technology Co., Ltd.',
        ownership: 'Private',
        totalLaunches: 0,
        successRate: 0,
        firstLaunchDate: '2025-01-01',
        lastLaunchDate: null,
        description: "Upcoming reusable rocket powered by Tianhuo-12 methalox engines. Aims to boost China’s private launch capabilities.",
        status: 'future',
        dimensions: { height: 'Unknown', diameter: 'Unknown', mass: 'Unknown' },
        thrust: { seaLevel: 'Estimated 3,500–4,000 kN' },
        reusability: 'Planned Reusable',
        engines: { firstStage: 'Tianhuo-12 (Methalox)', secondStage: 'Tianhuo-12 Vacuum Variant' },
        propellant: 'Methane / Liquid Oxygen',
        summary: "Blue Whale 1 is Space Pioneer's next-gen reusable launch vehicle aiming to challenge global competitors in the medium-lift segment. It will be powered by their in-house methalox Tianhuo-12 engines and designed for commercial satellite deployment and LEO missions.",
        links: {
          wikipedia: "https://en.wikipedia.org/wiki/Space_Pioneer",
          official: "http://www.spacepioneer.cc/",
          launchManifest: "https://space.skyrocket.de/doc_lau_det/blue-whale-1.htm"
        },
        launchSites: ['Planned from Chinese coastal commercial spaceports'],
        notableMissions: ["Maiden launch anticipated in 2025 with satellite payloads"],
    },
    {
        id: 'miura-5',
        name: 'Miura 5',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/MIURA_5_in_flight_render.png/480px-MIURA_5_in_flight_render.png',
        type: 'Small-lift orbital',
        stages: 2,
        payloadCapacity: { LEO: '500 kg', reuseStatus: 'Planned Reusable' },
        country: 'Spain',
        operator: 'PLD Space (Spain)',
        manufacturer: 'PLD Space',
        ownership: 'Private',
        totalLaunches: 0,
        successRate: 0,
        firstLaunchDate: '2025-01-01',
        lastLaunchDate: null,
        description: "Spain’s first reusable orbital rocket under development. Will be the successor to the suborbital Miura 1 and aims for sustainable launches.",
        status: 'future',
        dimensions: { height: '25 m', diameter: '1.8 m', mass: 'Unknown' },
        thrust: { seaLevel: 'Approx. 100 kN (estimated)' },
        reusability: 'Planned Reusable',
        engines: { firstStage: 'TEPREL-C (liquid-fueled)', secondStage: 'Unknown' },
        propellant: 'RP-1 / Liquid Oxygen',
        summary: "Miura 5 is Spain’s first orbital-class launch vehicle developed by PLD Space. Building on experience from their suborbital Miura 1, this two-stage reusable rocket aims to offer dedicated access to orbit for small payloads, enhancing Europe's independent launch capacity.",
        links: {
          wikipedia: "https://en.wikipedia.org/wiki/Miura_5",
          official: "https://pldspace.com/miura-5/",
          launchManifest: "https://en.wikipedia.org/wiki/Miura_5#Launch_history"
        },
        launchSites: ['Guiana Space Centre (CSG), Kourou, French Guiana'],
        notableMissions: ["Maiden flight scheduled from French Guiana's CSG"],
    },
    {
        id: 'neutron',
        name: 'Neutron',
        status: 'future',
        operator: 'Rocket Lab (USA/New Zealand)',
        manufacturer: 'Rocket Lab',
        country: 'USA / New Zealand',
        ownership: 'Private',
        type: 'Medium-lift orbital (reusable)',
        reusability: 'Planned Reusable',
        stages: 2,
        propellant: 'Methalox (Liquid Methane + Liquid Oxygen)',
        firstLaunchDate: '2025-01-01',
        lastLaunchDate: null,
        successRate: 0,
        totalLaunches: 0,
        notableMissions: [
          'Planned to support mega-constellations and crew-rated missions'
        ],
        payloadCapacity: {
          LEO: '13,000 kg',
          reuseStatus: 'Planned Reusable (1st stage)'
        },
        dimensions: {
          height: '40 m',
          diameter: '4.5 m',
          mass: 'Unknown'
        },
        thrust: {
          seaLevel: 'Estimated 7,000–10,000 kN'
        },
        engines: {
          firstStage: 'Archimedes engines (Methalox)',
          secondStage: 'Vacuum-optimized Archimedes (Methalox)'
        },
        launchSites: [
          'Wallops Island, Virginia, USA'
        ],
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Rocket_Lab_Neutron_render.png',
        summary: 'Neutron is Rocket Lab’s next-generation reusable launch vehicle tailored for large satellite constellations and potential human spaceflight. Featuring composite materials and innovative architecture, Neutron is positioned to compete with rockets like Falcon 9 in reliability and reusability.',
        links: {
          wikipedia: 'https://en.wikipedia.org/wiki/Neutron_(rocket)',
          official: 'https://www.rocketlabusa.com/launch/neutron/',
          launchManifest: 'https://en.wikipedia.org/wiki/Neutron_(rocket)#Launch_history'
        },
        description: 'Rocket Lab’s next-generation reusable launch vehicle tailored for large satellite constellations.'
    },
    {
        id: 'iris2-rocket',
        name: 'IRIS² Rocket (Ariane 6 Variant)',
        status: 'future',
        operator: 'Arianespace (Europe)',
        manufacturer: 'ArianeGroup',
        country: 'European Union',
        ownership: 'Government',
        type: 'Heavy-lift orbital',
        reusability: 'Expendable',
        stages: 2,
        propellant: 'Liquid Hydrogen / Liquid Oxygen',
        firstLaunchDate: '2025-01-01',
        lastLaunchDate: null,
        successRate: 0,
        totalLaunches: 0,
        notableMissions: [
          'Dedicated to launching the EU’s IRIS² secure communication satellite constellation'
        ],
        payloadCapacity: {
          LEO: '22,000 kg',
          GTO: '11,500 kg',
          reuseStatus: 'Expendable'
        },
        dimensions: {
          height: '63 m',
          diameter: '5.4 m',
          mass: '860,000 kg'
        },
        thrust: {
          seaLevel: '13,000 kN (with boosters)'
        },
        engines: {
          firstStage: 'Vulcain 2.1',
          secondStage: 'HM7B'
        },
        launchSites: [
          'Guiana Space Centre (CSG), Kourou, French Guiana'
        ],
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Ariane_6_rendering_2022.png',
        summary: 'The IRIS² Rocket refers to the Ariane 6 configuration tailored for launching the European Union’s IRIS² constellation—a secure satellite network for government and defense communications. Ariane 6 aims to modernize Europe’s launch capabilities with cost-effective and modular configurations.',
        links: {
          wikipedia: 'https://en.wikipedia.org/wiki/IRIS2_(satellite_constellation)',
          official: 'https://www.arianespace.com/vehicle/ariane-6/',
          launchManifest: 'https://en.wikipedia.org/wiki/Ariane_6#Launch_manifest'
        },
        description: 'An Ariane 6 variant for launching the EU’s IRIS² satellite constellation.'
    },
    {
        id: 'launcher-l1',
        name: 'Launcher L1',
        status: 'future',
        operator: 'Launcher (USA)',
        manufacturer: 'Launcher (merged with Vast Space)',
        country: 'USA',
        ownership: 'Private',
        type: 'Small-lift orbital',
        reusability: 'Planned Reusable',
        stages: 2,
        propellant: 'RP-1 / Liquid Oxygen',
        firstLaunchDate: '2026-01-01',
        lastLaunchDate: null,
        successRate: 0,
        totalLaunches: 0,
        notableMissions: [
          'Designed for cost-effective small satellite launches',
          'Acquired by Vast Space to support orbital station missions'
        ],
        payloadCapacity: {
          LEO: '1,000 kg',
          reuseStatus: 'Planned Reusable (1st stage)'
        },
        dimensions: {
          height: 'Unknown',
          diameter: 'Unknown',
          mass: 'Unknown'
        },
        thrust: {
          seaLevel: 'Unknown'
        },
        engines: {
          firstStage: 'E-2 (3D-printed engine)',
          secondStage: 'Vacuum-optimized engine (planned)'
        },
        launchSites: [
          'Cape Canaveral Space Force Station (planned)'
        ],
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Launcher_L1_concept.png',
        summary: 'Launcher L1 was a next-gen small satellite launcher being developed by Launcher, a company focused on advanced 3D-printed rocket technology. The company was later acquired by Vast Space, and its technology is expected to support launches for future private space stations.',
        links: {
          wikipedia: 'https://en.wikipedia.org/wiki/Launcher_(company)',
          official: 'https://www.launcherspace.com/',
          launchManifest: 'https://en.wikipedia.org/wiki/Launcher_(company)#L1'
        },
        description: 'A small satellite launcher developed with 3D-printed engines, now part of Vast Space.'
    },
    {
        id: 'phoenix',
        name: 'Phoenix',
        status: 'future',
        operator: 'Korea Aerospace Industries (South Korea)',
        manufacturer: 'KAI',
        country: 'South Korea',
        ownership: 'Government',
        type: 'Small-lift orbital',
        reusability: 'Planned reusable',
        stages: 2,
        propellant: 'Unknown (expected: Kerosene / LOX)',
        firstLaunchDate: '2026-01-01',
        lastLaunchDate: null,
        successRate: 0,
        totalLaunches: 0,
        notableMissions: [
          'Part of South Korea\'s roadmap for independent space access',
          'Supports small satellite and military payload deployment'
        ],
        payloadCapacity: {
          LEO: '500 kg',
          reuseStatus: 'Planned Reusable'
        },
        dimensions: {
          height: 'Unknown',
          diameter: 'Unknown',
          mass: 'Unknown'
        },
        thrust: {
          seaLevel: 'Unknown'
        },
        engines: {
          firstStage: 'Unknown (Indigenous KAI design)',
          secondStage: 'Unknown'
        },
        launchSites: [
          'Naro Space Center (planned)'
        ],
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Korean_Phoenix_rocket_concept.jpg/800px-Korean_Phoenix_rocket_concept.jpg',
        summary: 'Phoenix is a small-lift launch vehicle under development by Korea Aerospace Industries (KAI) as part of South Korea’s growing ambition in space technology. It is expected to provide responsive launch capabilities for small satellites, especially for national security and commercial applications. Details remain limited as the rocket is in early development.',
        links: {
          wikipedia: 'https://en.wikipedia.org/wiki/Korea_Aerospace_Industries',
          official: 'https://www.koreaaero.com/',
          launchManifest: "https://en.wikipedia.org/wiki/Korea_Aerospace_Industries#Space_Launch_Vehicle"
        },
        description: 'A small-lift launch vehicle under development by Korea Aerospace Industries (KAI).'
    },
    {
      id: 'rfa-one',
      name: 'RFA One',
      status: 'future',
      operator: 'Rocket Factory Augsburg (Germany)',
      manufacturer: 'Rocket Factory Augsburg',
      country: 'Germany',
      ownership: 'Private',
      type: 'Small-lift orbital',
      reusability: 'Planned partial reuse',
      stages: 3,
      propellant: 'RP-1 / Liquid Oxygen',
      firstLaunchDate: '2025-01-01',
      lastLaunchDate: null,
      successRate: 0,
      totalLaunches: 0,
      notableMissions: [
        'Designed for cost-effective deployment of small satellites',
        'Uses staged combustion engine technology'
      ],
      payloadCapacity: {
        LEO: '1,300 kg',
        reuseStatus: 'Planned partial reuse'
      },
      dimensions: {
        height: '30 m',
        diameter: '2 m',
        mass: '60,000 kg'
      },
      thrust: {
        seaLevel: 'Unknown'
      },
      engines: {
        firstStage: 'Helix engine (9 units)',
        secondStage: '1 × Helix vacuum engine',
        thirdStage: 'Kick stage'
      },
      launchSites: [
        'Andøya Spaceport (Norway)'
      ],
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/64/RFA_One_Render.jpg',
      summary: 'RFA One is an upcoming small satellite launcher developed in Germany with modular and reusable elements. It\'s tailored for the growing demand in commercial space access and emphasizes affordability, rapid deployment, and sustainable launch practices.',
      description: 'RFA One is an upcoming small satellite launcher developed in Germany with modular and reusable elements.',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/RFA_One',
        official: 'https://rfa.space/',
        launchManifest: 'https://en.wikipedia.org/wiki/RFA_One#Launch_history'
      }
    },
    {
        id: "terran-r",
        name: "Terran R",
        status: "future",
        operator: "Relativity Space (USA)",
        manufacturer: "Relativity Space",
        country: "USA",
        ownership: "Private",
        type: "Medium-lift orbital (reusable)",
        reusability: "Fully reusable",
        stages: 2,
        propellant: "Methane / Liquid Oxygen (Methalox)",
        firstLaunchDate: "2026-01-01",
        lastLaunchDate: null,
        successRate: 0,
        totalLaunches: 0,
        notableMissions: [
          "Future competitor to Falcon 9 for commercial payloads",
          "Designed with full reusability and 3D-printed components"
        ],
        payloadCapacity: {
          LEO: "23,500 kg",
          reuseStatus: "Yes (fully reusable)"
        },
        dimensions: {
          height: "66 m",
          diameter: "4.9 m",
          mass: "Over 1,000,000 kg"
        },
        thrust: {
          seaLevel: "3,350 kN (planned)"
        },
        engines: {
          firstStage: "7 × Aeon R",
          secondStage: "1 × Aeon Vac"
        },
        launchSites: [
          "Cape Canaveral Space Launch Complex 16"
        ],
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Terran_R_render.jpg",
        summary: "Terran R is Relativity Space's fully reusable, heavy-lift rocket designed with advanced manufacturing via 3D-printing and automation. Aimed at delivering large satellites and payloads with rapid turnaround, it is a future rival to SpaceX’s Falcon 9.",
        description: "Terran R is a fully reusable, heavy-lift rocket designed with 3D-printing and automation.",
        links: {
          wikipedia: "https://en.wikipedia.org/wiki/Terran_R",
          official: "https://www.relativityspace.com/terran-r"
        }
    },
    {
        id: "skylark-l",
        name: "Skylark L",
        status: "future",
        operator: "Skyrora (UK)",
        manufacturer: "Skyrora Ltd.",
        country: "United Kingdom",
        ownership: "Private",
        type: "Suborbital/small-lift orbital (planned)",
        reusability: "Planned",
        stages: 3,
        propellant: "Hydrocarbon / Liquid Oxygen",
        firstLaunchDate: "2025-01-01",
        lastLaunchDate: null,
        successRate: 0,
        totalLaunches: 0,
        notableMissions: [
          "Planned to offer orbital access from UK-based spaceports"
        ],
        payloadCapacity: {
          LEO: "315 kg (planned)",
          reuseStatus: "Planned partial reuse"
        },
        dimensions: {
          height: "22 m",
          diameter: "1.5 m",
          mass: "Unknown"
        },
        thrust: {
          seaLevel: "Unknown"
        },
        engines: {
          firstStage: "Ecologically sustainable engines under development"
        },
        launchSites: [
          "SaxaVord Spaceport (Scotland, planned)"
        ],
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Skyrora_Skylark_L.jpg",
        summary: "Skylark L is a planned small satellite launcher developed by UK-based Skyrora. Focused on sustainability, the vehicle uses green propellants and aims to support orbital missions from the UK, contributing to its growing space sector.",
        description: "Skylark L is a planned small satellite launcher developed by UK-based Skyrora.",
        links: {
          wikipedia: "https://en.wikipedia.org/wiki/Skyrora",
          official: "https://www.skyrora.com/"
        }
    }
];
