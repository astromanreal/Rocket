
import type { Rocket } from './types';

export const activeRockets: Rocket[] = [
  {
      id: 'falcon-9',
      name: 'Falcon 9',
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Falcon_9_block_5_with_Crew_Dragon_%28cropped%29.jpg/480px-Falcon_9_block_5_with_Crew_Dragon_%28cropped%29.jpg",
      status: 'active',
      operator: 'SpaceX',
      manufacturer: "SpaceX",
      country: "USA",
      ownership: "Private",
      type: "Medium-lift orbital",
      reusability: "Partially reusable",
      stages: 2,
      propellant: "RP-1 (kerosene) / Liquid Oxygen",
      firstLaunchDate: "2010-06-04",
      lastLaunchDate: null,
      successRate: 99.1,
      totalLaunches: 350,
      notableMissions: [
        "Crew Dragon Demo-2 (first crewed launch by SpaceX)",
        "Starlink Constellation launches",
        "CRS cargo missions to ISS",
        "Transporter smallsat rideshare missions",
        "GPS III and NRO launches for U.S. government"
      ],
      payloadCapacity: {
        LEO: "22,800 kg",
        GTO: "8,300 kg",
        Mars: "4,020 kg",
        reuseStatus: "First stage reusable (land or sea landing)"
      },
      dimensions: {
        height: "70 m",
        diameter: "3.7 m",
        mass: "549,054 kg"
      },
      thrust: {
        seaLevel: "7,607 kN",
        vacuum: "8,227 kN"
      },
      engines: {
        firstStage: "9 × Merlin 1D",
        secondStage: "1 × Merlin Vacuum"
      },
      launchSites: [
        "Cape Canaveral Space Launch Complex 40 (SLC-40)",
        "Kennedy Space Center Launch Complex 39A (LC-39A)",
        "Vandenberg Space Force Base SLC-4E"
      ],
      description: 'Partially reusable two-stage-to-orbit launch vehicle. Known for booster landings and frequent launches of Starlink satellites and crewed missions.',
      summary: "Falcon 9 is a two-stage-to-orbit launch vehicle developed and manufactured by SpaceX for the reliable and safe transport of satellites, cargo, and humans to Earth orbit and beyond. As the world’s most frequently flown operational rocket, Falcon 9 is the backbone of SpaceX’s launch operations. The rocket is famous for pioneering reusable rocket technology, landing its first stage boosters on drone ships or landing pads. It plays a critical role in deploying the Starlink broadband constellation and in transporting astronauts to the ISS under NASA's Commercial Crew Program.",
      links: {
        wikipedia: "https://en.wikipedia.org/wiki/Falcon_9",
        official: "https://www.spacex.com/vehicles/falcon-9/",
        launchManifest: "https://en.wikipedia.org/wiki/List_of_Falcon_9_and_Falcon_Heavy_launches"
      }
    },
    {
      id: 'electron',
      name: 'Electron',
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Rocket_Lab_Electron_at_LC-2.jpg/480px-Rocket_Lab_Electron_at_LC-2.jpg",
      status: 'active',
      operator: 'Rocket Lab',
      manufacturer: "Rocket Lab",
      country: 'USA / New Zealand',
      ownership: 'Private',
      type: 'Small-lift orbital',
      reusability: "Partially reusable (first stage recovery in development)",
      stages: 2,
      propellant: 'RP-1 / Liquid Oxygen',
      firstLaunchDate: '2017-05-25',
      lastLaunchDate: null,
      successRate: 93.3,
      totalLaunches: 45,
      notableMissions: [
        "CAPSTONE lunar pathfinder mission for NASA",
        "Electron Kick Stage deployment of smallsats",
        "Return to Sender (first recovery attempt)",
        "Launching commercial cubesats and rideshare payloads"
      ],
      payloadCapacity: {
        LEO: '300 kg',
        GTO: '200 kg',
        reuseStatus: "Recovery in progress (parachute and helicopter capture attempts)"
      },
      dimensions: {
        height: '18 m',
        diameter: '1.2 m',
        mass: '12,500 kg'
      },
      thrust: {
        seaLevel: '162 kN (first stage total)',
        vacuum: '22 kN (second stage)'
      },
      engines: {
        firstStage: '9 × Rutherford (electric pump-fed)',
        secondStage: '1 × Vacuum-optimized Rutherford'
      },
      launchSites: [
        "Rocket Lab Launch Complex 1 (New Zealand)",
        "Launch Complex 2, Wallops Island, Virginia (USA)"
      ],
      description: 'Dedicated small satellite launch vehicle featuring innovative electric pump-fed Rutherford engines and attempts at booster recovery via helicopter capture.',
      summary: "Electron is a dedicated small satellite launch vehicle developed by Rocket Lab. It was one of the first orbital-class rockets to use electric pump-fed engines (Rutherford) and is designed to deliver small payloads to low Earth orbit quickly and affordably. Electron has been a commercial success, frequently launching cubesats and microsats. Rocket Lab is actively working on reusability, including mid-air helicopter recovery of boosters, positioning Electron as an efficient, flexible, and rapidly deployable solution in the small launch market.",
      links: {
        wikipedia: "https://en.wikipedia.org/wiki/Electron_(rocket)",
        official: "https://www.rocketlabusa.com/launch/electron/",
        launchManifest: "https://en.wikipedia.org/wiki/List_of_Electron_launches"
      }
    },
    {
      id: 'soyuz-2',
      name: 'Soyuz-2',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Soyuz_TMA-16_launch.jpg/480px-Soyuz_TMA-16_launch.jpg',
      status: 'active',
      operator: 'Roscosmos',
      manufacturer: 'Progress Rocket Space Centre (TsSKB-Progress)',
      country: 'Russia',
      ownership: 'Government',
      type: 'Medium-lift orbital',
      reusability: 'Expendable',
      stages: 3,
      propellant: 'RP-1 / Liquid Oxygen',
      firstLaunchDate: '2004-11-08',
      lastLaunchDate: null,
      successRate: 97.3,
      totalLaunches: 150,
      notableMissions: [
        'Crewed Soyuz missions to the International Space Station (ISS)',
        'Progress cargo resupply missions to ISS',
        'Launches of OneWeb satellites',
        'Sentinel satellites for Copernicus program'
      ],
      payloadCapacity: {
        LEO: '8,200 kg',
        GTO: '3,250 kg',
        reuseStatus: 'Expendable'
      },
      dimensions: {
        height: '46.3 m',
        diameter: '10.3 m (with boosters)',
        mass: '305,000 kg'
      },
      thrust: {
        seaLevel: '4,100 kN (total)',
        vacuum: '4,150 kN'
      },
      engines: {
        firstStage: '4 × RD-107A (strap-on boosters)',
        secondStage: '1 × RD-108A (core stage)',
        thirdStage: '1 × RD-0110'
      },
      launchSites: [
        'Baikonur Cosmodrome (Kazakhstan)',
        'Vostochny Cosmodrome (Russia)',
        'Plesetsk Cosmodrome (Russia)',
        'Guiana Space Centre (France, via Arianespace - now retired)'
      ],
      description: 'Modern iteration of the legendary Soyuz rocket family, a cornerstone of Russian spaceflight, used for crewed missions to the ISS and diverse satellite launches.',
      summary: "Soyuz-2 is the modernized version of the legendary Soyuz launch vehicle family, which traces its origins to the R-7 ICBM. It features improved digital flight control systems and upgraded engines. Soyuz-2 has become a workhorse for both crewed and uncrewed missions, delivering payloads to low Earth orbit, the ISS, and beyond. It has launched hundreds of missions with remarkable reliability, and it remains a cornerstone of Russian—and global—space access.",
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Soyuz-2',
        official: 'https://www.roscosmos.ru/313/',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_Soyuz_launches_(2000%E2%80%93present)'
      }
    },
     {
      id: 'starship',
      name: 'Starship',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Starship_SN15_landing.jpg/480px-Starship_SN15_landing.jpg',
      status: 'active',
      operator: 'SpaceX',
      manufacturer: 'SpaceX',
      country: 'USA',
      ownership: 'Private',
      type: 'Super heavy-lift orbital',
      reusability: 'Fully reusable (booster and upper stage)',
      stages: 2,
      propellant: 'Liquid Methane / Liquid Oxygen (Methalox)',
      firstLaunchDate: '2023-04-20',
      lastLaunchDate: null,
      successRate: 50,
      totalLaunches: 4,
      notableMissions: [
        'Artemis III Lunar Landing System (planned)',
        'Starlink v2 deployment (planned)',
        'Point-to-point Earth transportation (concept)',
        'Mars colonization architecture (long-term goal)'
      ],
      payloadCapacity: {
        LEO: '>100,000 kg (fully reusable)',
        reuseStatus: 'Booster lands vertically, upper stage designed for full reuse'
      },
      dimensions: {
        height: '120 m (combined)',
        diameter: '9 m',
        mass: '5,000,000 kg (fully fueled)'
      },
      thrust: {
        seaLevel: '72,000 kN (Super Heavy booster)',
        vacuum: '7,500 kN (Starship upper stage)'
      },
      engines: {
        firstStage: '33 × Raptor (full-flow staged combustion)',
        secondStage: '6 × Raptor (3 sea-level, 3 vacuum optimized)'
      },
      launchSites: [
        'Starbase (Boca Chica, Texas)',
        'LC-39A (Kennedy Space Center, future site)'
      ],
      description: 'Fully reusable next-generation launch system by SpaceX, designed for Mars colonization, lunar missions, and potentially point-to-point Earth travel. Aims to revolutionize space access.',
      summary: "Starship is SpaceX’s fully reusable next-generation rocket system, composed of the Super Heavy booster and the Starship upper stage. Designed for Mars colonization, lunar missions, and heavy satellite deployment, Starship is the largest and most powerful rocket ever developed. It aims to significantly reduce the cost of space access with rapid reusability. Its development is central to NASA’s Artemis program and SpaceX’s long-term goal of making humanity multiplanetary.",
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/SpaceX_Starship',
        official: 'https://www.spacex.com/vehicles/starship/',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_Starship_launches'
      }
    },
    {
      id: 'long-march-5',
      name: 'Long March 5',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Long_March_5_Y2_launch.jpg/480px-Long_March_5_Y2_launch.jpg',
      type: 'Heavy-lift orbital',
      stages: 2,
      payloadCapacity: { LEO: '25,000 kg', GTO: '14,000 kg', reuseStatus: "Expendable" },
      country: 'China',
      operator: 'CASC (China)',
      manufacturer: 'China Academy of Launch Vehicle Technology (CALT)',
      ownership: 'Government',
      totalLaunches: 10,
      successRate: 90.0,
      firstLaunchDate: '2016-11-03',
      lastLaunchDate: null,
      description: "China's most powerful operational rocket, key to its space station construction (Tiangong) and ambitious lunar exploration programs like Chang'e.",
      status: 'active',
      dimensions: { height: '57 m', diameter: '5 m (core stage)', mass: '867,000 kg' },
      thrust: {
        seaLevel: '10,573 kN (with boosters)'
      },
      reusability: 'Expendable',
      engines: {
        firstStage: '2 × YF-77 (hydrolox)',
        secondStage: '2 × YF-75D'
      },
      propellant: 'Liquid Hydrogen / Liquid Oxygen and RP-1',
      notableMissions: [
          "Chang’e 5 lunar sample return mission",
          "Tianwen-1 Mars mission",
          "Launches for Tiangong space station modules",
          "Deployment of large GEO satellites"
      ],
      launchSites: [
          "Wenchang Satellite Launch Center (Hainan, China)"
      ],
      summary: "Long March 5 is China’s most powerful rocket to date, capable of launching large payloads to LEO, GEO, and beyond. It plays a crucial role in China's deep space ambitions, including lunar, Mars, and space station missions. With a wide-core diameter and modular design, Long March 5 enables the launch of the Tiangong space station modules and planetary exploration probes, symbolizing China's rise as a major space power.",
      links: {
          wikipedia: "https://en.wikipedia.org/wiki/Long_March_5",
          official: "http://www.spacechina.com/n25/n2014789/n2014809/c1830566/content.html",
          launchManifest: "https://en.wikipedia.org/wiki/List_of_Long_March_launches"
      }
    },
    {
      id: 'atlas-v',
      name: 'Atlas V',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Atlas_V_lifting_off_from_Cape_Canaveral_in_2015.jpg/480px-Atlas_V_lifting_off_from_Cape_Canaveral_in_2015.jpg',
      type: 'Medium-lift to Heavy-lift orbital',
      stages: 2,
      payloadCapacity: { LEO: 'Up to 18,810 kg', GTO: 'Up to 8,900 kg', reuseStatus: "Expendable" },
      country: 'USA',
      operator: 'United Launch Alliance (ULA)',
      manufacturer: 'Lockheed Martin / ULA',
      ownership: 'Private',
      totalLaunches: 100,
      successRate: 99.0,
      firstLaunchDate: '2002-08-21',
      lastLaunchDate: null,
      description: 'Versatile and highly reliable rocket used for military, civilian (NASA), and commercial payloads. Known for its many configurations with varying numbers of solid rocket boosters.',
      status: 'active',
      dimensions: { height: '58.3 m', diameter: '3.81 m (core)', mass: 'approx. 334,500 kg' },
      thrust: {
        seaLevel: '3,827 kN (with no SRBs); up to 10,000+ kN with 5 SRBs'
      },
      reusability: 'Expendable',
      engines: { firstStage: '1 × RD-180 (kerolox)', secondStage: '1 × RL10 (hydrolox)' },
      propellant: 'RP-1 / Liquid Oxygen (1st stage), Liquid Hydrogen / Liquid Oxygen (2nd stage)',
      notableMissions: [
          "Mars rovers (Curiosity, Perseverance)",
          "Landsat 8 and 9 Earth observation missions",
          "Solar Orbiter and MAVEN",
          "Military and intelligence payloads",
          "Boeing Starliner crew capsule launches"
      ],
      launchSites: [
          "Cape Canaveral SLC-41 (Florida)",
          "Vandenberg SLC-3E (California)"
      ],
      summary: "The Atlas V is one of the most reliable rockets in the world, with an exceptional success record since its debut. Built by ULA, it has launched NASA interplanetary missions, national security payloads, and commercial satellites. Its modular design allows configurations from light to heavy lift, with or without solid rocket boosters. Although nearing retirement, it remains in service while ULA transitions to Vulcan Centaur.",
      links: {
          wikipedia: "https://en.wikipedia.org/wiki/Atlas_V",
          official: "https://www.ulalaunch.com/rockets/atlas-v",
          launchManifest: "https://en.wikipedia.org/wiki/List_of_Atlas_V_launches"
      }
    },
    {
      id: 'vulcan-centaur',
      name: 'Vulcan Centaur',
      status: 'active',
      operator: 'United Launch Alliance (ULA)',
      manufacturer: 'ULA',
      country: 'USA',
      ownership: 'Private',
      type: 'Heavy-lift orbital',
      reusability: 'Partially reusable (planned for future upper stages)',
      stages: 2,
      propellant: 'Methane / Liquid Oxygen (1st stage), Liquid Hydrogen / Liquid Oxygen (Centaur upper stage)',
      firstLaunchDate: '2024-01-08',
      lastLaunchDate: null,
      successRate: 100,
      totalLaunches: 1,
      notableMissions: [
        'Peregrine lunar lander (Astrobotic / NASA CLPS)',
        'Future crewed and defense missions',
        'Replacement for Atlas V and Delta IV',
      ],
      payloadCapacity: {
        LEO: '27,200 kg',
        GTO: '13,100 kg',
        reuseStatus: 'Expendable (future upper stage reuse planned)',
      },
      dimensions: {
        height: '61.6 m',
        diameter: '5.4 m',
        mass: 'Approx. 546,000 kg',
      },
      thrust: {
        seaLevel: '4,800 kN (with boosters)',
      },
      engines: {
        firstStage: '2 × BE-4 (methalox, by Blue Origin)',
        secondStage: '1 × RL10C (hydrolox)',
      },
      launchSites: [
        'Cape Canaveral SLC-41 (Florida)',
      ],
      description: "Next-generation rocket replacing Atlas V and Delta IV. Powered by Blue Origin's BE-4 engines and ULA’s Centaur upper stage. Supports future space defense and science missions.",
      summary: 'Vulcan Centaur is the next-generation launch vehicle by ULA, intended to consolidate and replace Atlas V and Delta IV. It features methane-fueled BE-4 engines developed by Blue Origin and a proven Centaur upper stage. Vulcan supports national security, science, and commercial payloads with plans for future reusability and lunar capability.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Vulcan_Centaur_on_the_pad_%282024%29.jpg/480px-Vulcan_Centaur_on_the_pad_%282024%29.jpg',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Vulcan_Centaur',
        official: 'https://www.ulalaunch.com/rockets/vulcan-centaur',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_Vulcan_launches',
      },
    },
    {
      id: 'h-iia',
      name: 'H-IIA',
      status: 'active',
      operator: 'JAXA / Mitsubishi Heavy Industries',
      manufacturer: 'Mitsubishi Heavy Industries',
      country: 'Japan',
      ownership: 'Government',
      type: 'Medium-lift orbital',
      reusability: 'Expendable',
      stages: 2,
      propellant: 'Liquid Hydrogen / Liquid Oxygen',
      firstLaunchDate: '2001-08-29',
      lastLaunchDate: null,
      successRate: 97.9,
      totalLaunches: 48,
      notableMissions: [
        'Hayabusa2 (asteroid sample return)',
        'Akatsuki (Venus probe)',
        'Multiple reconnaissance satellites',
        'International climate and weather missions',
      ],
      payloadCapacity: {
        LEO: '10,000 kg',
        GTO: '4,100 – 6,000 kg',
        reuseStatus: 'Expendable',
      },
      dimensions: {
        height: '53 m',
        diameter: '4 m',
        mass: 'Approx. 445,000 kg',
      },
      thrust: {
        seaLevel: '1,079 kN (core); up to 2,100 kN with boosters',
      },
      engines: {
        firstStage: '1 × LE-7A',
        secondStage: '1 × LE-5B',
      },
      launchSites: [
        'Tanegashima Space Center (Yoshinobu Launch Complex), Japan',
      ],
      description: "Japan’s primary launch vehicle for satellites and interplanetary probes. Known for its high reliability and used in missions like Hayabusa2 and Akatsuki.",
      summary: 'H-IIA is Japan’s workhorse launch vehicle developed by Mitsubishi Heavy Industries and JAXA. It is known for its high reliability and precision, supporting a wide range of missions including scientific probes, national security payloads, and international collaborations. It will be succeeded by the H3 rocket.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/H-IIA_F27_with_GPM.jpg/480px-H-IIA_F27_with_GPM.jpg',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/H-IIA',
        official: 'https://global.jaxa.jp/projects/rockets/h2a/',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_H-IIA_launches',
      },
    },
    {
      id: 'gslv-mk-iii',
      name: 'GSLV Mk III (LVM3)',
      status: 'active',
      operator: 'ISRO',
      manufacturer: 'ISRO',
      country: 'India',
      ownership: 'Government',
      type: 'Heavy-lift orbital',
      reusability: 'Expendable',
      stages: 3,
      propellant: 'Solid (1st stage boosters), Liquid (core stage), Cryogenic (upper stage)',
      firstLaunchDate: '2014-12-18',
      lastLaunchDate: null,
      successRate: 85.7,
      totalLaunches: 7,
      notableMissions: [
        'Chandrayaan-2 lunar mission',
        'OneWeb satellite launches',
        'Gaganyaan human spaceflight program (upcoming)',
      ],
      payloadCapacity: {
        LEO: '10,000 kg',
        GTO: '4,000 kg',
        reuseStatus: 'Expendable',
      },
      dimensions: {
        height: '43.4 m',
        diameter: '4 m',
        mass: '640,000 kg',
      },
      thrust: {
        seaLevel: '7,000+ kN',
      },
      engines: {
        firstStage: '2 × S200 solid boosters',
        secondStage: '1 × L110 liquid stage with Vikas engines',
        thirdStage: '1 × CE-20 cryogenic engine',
      },
      launchSites: [
        'Satish Dhawan Space Centre (SDSC), Sriharikota, India',
      ],
      description: "India’s most powerful operational rocket, used in flagship missions like Chandrayaan-2 and Gaganyaan. Designed for launching heavy satellites and crewed spacecraft.",
      summary: 'GSLV Mk III, now known as LVM3, is India’s most powerful operational rocket. Designed for heavy satellite launches and future crewed spaceflight, it has demonstrated ISRO’s growing launch capabilities. It plays a central role in India’s lunar, interplanetary, and commercial satellite programs.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/GSLV-Mark-III-D2-launch.jpg/480px-GSLV-Mark-III-D2-launch.jpg',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/GSLV_Mk_III',
        official: 'https://www.isro.gov.in/GSLVMkIII.html',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_GSLV_Mk_III_launches',
      },
    },
    {
      id: 'zhuque-2',
      name: 'Zhuque-2',
      status: 'active',
      operator: 'LandSpace',
      manufacturer: 'LandSpace',
      country: 'China',
      ownership: 'Private',
      type: 'Medium-lift orbital',
      reusability: 'Expendable (reusable version planned)',
      stages: 2,
      propellant: 'Methane / Liquid Oxygen (methalox)',
      firstLaunchDate: '2022-12-14',
      lastLaunchDate: null,
      successRate: 66.7,
      totalLaunches: 3,
      notableMissions: [
        'First methane-fueled rocket to reach orbit',
        'Key milestone for private Chinese space sector',
      ],
      payloadCapacity: {
        LEO: '6,000 kg',
        GTO: '4,000 kg',
        reuseStatus: 'Currently expendable',
      },
      dimensions: {
        height: '49.5 m',
        diameter: '3.35 m',
        mass: '219,000 kg',
      },
      thrust: {
        seaLevel: '2680 kN',
      },
      engines: {
        firstStage: '4 × TQ-12 (methalox)',
        secondStage: '1 × TQ-12 + 1 × TQ-11 (methalox vernier)',
      },
      launchSites: [
        'Jiuquan Satellite Launch Center, China',
      ],
      description: "World’s first methane-fueled rocket to reach orbit. A key achievement for private Chinese launch industry.",
      summary: 'Zhuque-2 is a private Chinese launch vehicle developed by LandSpace. It is notable for being the first methane-fueled rocket to reach orbit, demonstrating a significant leap in propulsion technology. The rocket is part of a new generation of cleaner, more efficient launch systems emerging globally.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Zhuque-2_on_the_launch_pad.jpg/480px-Zhuque-2_on_the_launch_pad.jpg',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Zhuque-2',
        official: 'https://www.landspace.com',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_Zhuque-2_launches',
      },
    },
    {
      id: 'angara-a5',
      name: 'Angara A5',
      status: 'active',
      operator: 'Roscosmos',
      manufacturer: 'Khrunichev Center',
      country: 'Russia',
      ownership: 'Government',
      type: 'Heavy-lift orbital',
      reusability: 'Expendable',
      stages: 2,
      propellant: 'Kerosene / Liquid Oxygen',
      firstLaunchDate: '2014-12-23',
      lastLaunchDate: null,
      successRate: 100,
      totalLaunches: 4,
      notableMissions: [
        'Test flights replacing Proton rocket',
        'Strategic future platform for Russian heavy payloads',
      ],
      payloadCapacity: {
        LEO: '24,500 kg',
        GTO: '5,400–7,500 kg',
        reuseStatus: 'Expendable',
      },
      dimensions: {
        height: '55.4 m',
        diameter: '4.1 m',
        mass: '773,000 kg',
      },
      thrust: {
        seaLevel: '9,600 kN (with all boosters)',
      },
      engines: {
        firstStage: '5 × RD-191 (1 core + 4 boosters)',
        secondStage: '1 × RD-0124A',
      },
      launchSites: [
        'Plesetsk Cosmodrome',
        'Vostochny Cosmodrome (future)',
      ],
      description: "Next-gen Russian rocket aiming to replace Proton. Modular design allows different payload classes. Key to Russia’s future launch strategy.",
      summary: 'Angara A5 is Russia’s new-generation heavy-lift launch vehicle designed to replace the aging Proton-M. It features a modular design with environmentally friendly fuel and high adaptability. Key to Russia’s long-term plans for deep space and defense launches.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Angara_A5_Launch_2014.jpg/480px-Angara_A5_Launch_2014.jpg',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Angara_(rocket_family)#Angara_A5',
        official: 'http://www.khrunichev.ru/main.php?id=44',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_Angara_launches',
      },
    },
    {
      id: 'nuri-kslv-ii',
      name: 'Nuri (KSLV-II)',
      status: 'active',
      operator: 'Korea Aerospace Research Institute (KARI)',
      manufacturer: 'KARI',
      country: 'South Korea',
      ownership: 'Government',
      type: 'Medium-lift orbital',
      reusability: 'Expendable',
      stages: 3,
      propellant: 'Kerosene / Liquid Oxygen',
      firstLaunchDate: '2021-10-21',
      lastLaunchDate: null,
      successRate: 66.7,
      totalLaunches: 3,
      notableMissions: [
        'Successfully placed multiple satellites into orbit in 2023',
        'First fully domestic South Korean orbital rocket',
      ],
      payloadCapacity: {
        LEO: '2,600 kg',
        reuseStatus: 'Expendable',
      },
      dimensions: {
        height: '47.2 m',
        diameter: '3.5 m',
        mass: '200,000 kg',
      },
      thrust: {
        seaLevel: '3,300 kN',
      },
      engines: {
        firstStage: '4 × KRE-075',
        secondStage: '1 × KRE-075 Vacuum',
        thirdStage: '1 × KRE-007',
      },
      launchSites: [
        'Naro Space Center, South Korea',
      ],
      description: "South Korea’s first fully domestic orbital rocket. Successfully launched satellites into orbit in 2023.",
      summary: 'Nuri, also known as KSLV-II, marks South Korea’s entry into the global space race with a fully domestically developed rocket. After years of development, it successfully launched satellites into orbit in 2023, positioning South Korea as an emerging space power.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/KSLV-II_Nuri_rocket_launch_2021.jpg/480px-KSLV-II_Nuri_rocket_launch_2021.jpg',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/KSLV-II',
        official: 'https://www.kari.re.kr/eng/sub03_03_01.do',
        launchManifest: 'https://en.wikipedia.org/wiki/KSLV-II#Launch_history',
      },
    },
    {
      id: 'vega',
      name: 'Vega',
      status: 'active',
      operator: 'Arianespace',
      manufacturer: 'Avio / ESA',
      country: 'Europe (ESA/Italy)',
      ownership: 'Government',
      type: 'Small-lift orbital',
      reusability: 'Expendable',
      stages: 4,
      propellant: 'Solid fuel (first 3 stages), Liquid (4th stage AVUM)',
      firstLaunchDate: '2012-02-13',
      lastLaunchDate: null,
      successRate: 87,
      totalLaunches: 23,
      notableMissions: [
        'Earth observation and science satellites',
        'PRISMA (hyperspectral satellite)',
        'Aeolus wind mapping mission',
        'Multiple rideshare and CubeSat deployments',
      ],
      payloadCapacity: {
        LEO: '1,500 kg',
        GTO: '1,430 kg',
        reuseStatus: 'Expendable',
      },
      dimensions: {
        height: '30 m',
        diameter: '3 m',
        mass: '137,000 kg at liftoff',
      },
      thrust: {
        seaLevel: '2,200 kN (first stage P80)',
      },
      engines: {
        firstStage: 'P80 (solid)',
        secondStage: 'Zefiro 23 (solid)',
        thirdStage: 'Zefiro 9 (solid)',
      },
      launchSites: [
        'Centre Spatial Guyanais (ELA-1), French Guiana',
      ],
      description: 'European launcher designed for small satellites, complementing the heavier Ariane rockets. Key for providing access to space for smaller European payloads.',
      summary: 'Vega is a European small-lift rocket developed by ESA and Avio, optimized for launching small scientific and Earth observation satellites into low and sun-synchronous orbits. It provides affordable access to space for European payloads and has supported many technology demonstrations and institutional missions.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Vega_launch_VV16.jpg/480px-Vega_launch_VV16.jpg',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Vega_(rocket)',
        official: 'https://www.arianespace.com/vehicle/vega/',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_Vega_launches',
      },
    },
    {
      id: 'ariane-6',
      name: 'Ariane 6',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Ariane_6_rendering.jpg/480px-Ariane_6_rendering.jpg',
      status: 'active',
      operator: 'Arianespace (ESA)',
      manufacturer: 'Airbus Safran Launchers',
      country: 'Europe',
      ownership: 'Government',
      type: 'Heavy-lift orbital',
      reusability: 'Expendable',
      stages: 2,
      propellant: 'Liquid Hydrogen / Liquid Oxygen (core and upper stages)',
      firstLaunchDate: '2024-07-09',
      lastLaunchDate: null,
      successRate: 0,
      totalLaunches: 1,
      notableMissions: [
        'Planned replacement for Ariane 5',
        'Supports European autonomy in space access',
        'Launch of Galileo, Copernicus, and IRIS² satellites',
      ],
      payloadCapacity: {
        LEO: '21,600 kg',
        GTO: '10,350 kg',
        reuseStatus: 'Expendable',
      },
      dimensions: {
        height: '62 m (Ariane 64 variant)',
        diameter: '5.4 m',
        mass: '860,000 kg',
      },
      thrust: {
        seaLevel: '10,800 kN (with 4 boosters)',
      },
      engines: {
        firstStage: '1 × Vulcain 2.1',
        secondStage: '1 × Vinci',
      },
      launchSites: ['Guiana Space Centre, Kourou, French Guiana'],
      summary: 'Ariane 6 is Europe’s next-generation launch vehicle, designed for cost-effective and flexible access to space. With modular configurations (A62 and A64), it aims to meet various commercial and governmental demands while continuing Europe\'s legacy of reliable launch systems.',
      description: 'Ariane 6 is Europe’s next-generation launch vehicle, designed for cost-effective and flexible access to space.',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Ariane_6',
        official: 'https://www.ariane.group/en/launcher/ariane-6/',
        launchManifest: 'https://en.wikipedia.org/wiki/Ariane_6#Launch_history',
      },
    },
    {
      id: 'minotaur-iv',
      name: 'Minotaur IV',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Minotaur_IV_ORS-1_Launch.jpg/480px-Minotaur_IV_ORS-1_Launch.jpg',
      status: 'active',
      operator: 'Northrop Grumman (USA)',
      manufacturer: 'Northrop Grumman Innovation Systems',
      country: 'USA',
      ownership: 'Private',
      type: 'Small-lift orbital',
      reusability: 'Expendable',
      stages: 4,
      propellant: 'Solid fuel (all stages)',
      firstLaunchDate: '2010-04-22',
      lastLaunchDate: null,
      successRate: 100,
      totalLaunches: 7,
      notableMissions: ['ORSES-1 (space situational awareness)', 'HTV-2 (DARPA hypersonic test)', 'Government small payload missions'],
      payloadCapacity: {
        LEO: '1,735 kg',
        reuseStatus: 'Expendable',
      },
      dimensions: {
        height: '23.9 m',
        diameter: '2.34 m',
        mass: '86,300 kg',
      },
      thrust: {
        seaLevel: '1,660 kN',
      },
      engines: {
        firstStage: 'SR-118',
        secondStage: 'SR-119',
        thirdStage: 'SR-120',
      },
      launchSites: ['Vandenberg SLC-8', 'Wallops Island MARS Pad-0B', 'Kodiak LP-1'],
      summary: 'Minotaur IV is a four-stage solid-fueled small-lift rocket built using decommissioned ICBM stages. It offers cost-effective launch options for U.S. government payloads and has a flawless success record since its debut.',
      description: 'Minotaur IV is a four-stage solid-fueled small-lift rocket built using decommissioned ICBM stages.',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Minotaur_IV',
        official: 'https://www.northropgrumman.com/space/minotaur-launch-vehicle/',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_Minotaur_launches',
      },
    },
    {
      id: 'long-march-6a',
      name: 'Long March 6A',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Long_March_6A_Y2_launch.png/480px-Long_March_6A_Y2_launch.png',
      status: 'active',
      operator: 'CASC (China)',
      manufacturer: 'Shanghai Academy of Spaceflight Technology (SAST)',
      country: 'China',
      ownership: 'Government',
      type: 'Light-lift to Medium-lift orbital',
      reusability: 'Expendable',
      stages: 2,
      propellant: 'Liquid (kerosene/LOX) + solid boosters',
      firstLaunchDate: '2022-03-29',
      lastLaunchDate: null,
      successRate: 100,
      totalLaunches: 3,
      notableMissions: ['Pujiang-2 satellite deployment', 'Tiankun-2 technology demonstration'],
      payloadCapacity: {
        LEO: '4,500 kg',
        reuseStatus: 'Expendable',
      },
      dimensions: {
        height: '50 m',
        diameter: '3.35 m',
        mass: '530,000 kg',
      },
      thrust: {
        seaLevel: '7,200 kN (with boosters)',
      },
      engines: {
        firstStage: 'YF-100',
        secondStage: 'YF-115',
      },
      launchSites: ['Taiyuan Satellite Launch Center (LC-9A)'],
      summary: 'Long March 6A is a modern Chinese launcher designed for launching small to medium payloads into low Earth orbit. It is the first Chinese rocket to utilize solid rocket boosters alongside a liquid core, improving flexibility and performance.',
      description: 'Long March 6A is a modern Chinese launcher designed for launching small to medium payloads into low Earth orbit.',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Long_March_6A',
        official: 'http://www.spacechina.com/n25/n2014789/index.html',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_Long_March_launches',
      },
    },
    {
      id: 'h3',
      name: 'H3',
      status: 'active',
      operator: 'JAXA (Japan)',
      manufacturer: 'Mitsubishi Heavy Industries',
      country: 'Japan',
      ownership: 'Government',
      type: 'Medium-lift orbital',
      reusability: 'Expendable',
      stages: 2,
      propellant: 'Liquid hydrogen / Liquid oxygen (LE-9, LE-5B-3)',
      firstLaunchDate: '2024-02-17',
      lastLaunchDate: null,
      successRate: 50,
      totalLaunches: 2,
      notableMissions: [
        'Advanced Land Observing Satellite-3 (ALOS-3)',
        'Second flight achieved orbit (2024)',
      ],
      payloadCapacity: {
        LEO: '4,000–7,900 kg',
        reuseStatus: 'Expendable',
      },
      dimensions: {
        height: '63 m',
        diameter: '5.2 m',
        mass: '574,000 kg (H3-24)',
      },
      thrust: {
        seaLevel: '3,300 kN (with boosters)',
      },
      engines: {
        firstStage: 'LE-9 (2)',
        secondStage: 'LE-5B-3',
      },
      launchSites: ['Tanegashima Space Center (Yoshinobu Launch Complex)'],
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/H3_rocket_test_model_2_MHI_Kobe.jpg/480px-H3_rocket_test_model_2_MHI_Kobe.jpg',
      summary: "H3 is Japan’s next-generation launch vehicle, developed as a cost-effective successor to the H-IIA. With a modular design and advanced LE-9 engines, it aims to enhance Japan’s competitiveness in the commercial launch market.",
      description: "H3 is Japan’s next-generation launch vehicle, developed as a cost-effective successor to the H-IIA.",
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/H3_Launch_Vehicle',
        official: 'https://global.jaxa.jp/projects/rockets/h3/',
        launchManifest: 'https://en.wikipedia.org/wiki/List_of_H3_launches',
      },
    },
    {
      id: 'sslv',
      name: 'SSLV',
      status: 'active',
      operator: 'ISRO (India)',
      manufacturer: 'ISRO',
      country: 'India',
      ownership: 'Government',
      type: 'Small-lift orbital',
      reusability: 'Expendable',
      stages: 3,
      propellant: 'Solid (Stages 1–3) + Liquid (Velocity Trimming Module)',
      firstLaunchDate: '2022-08-07',
      lastLaunchDate: null,
      successRate: 50,
      totalLaunches: 2,
      notableMissions: [
        'SSLV-D2 successfully launched EOS-07, Janus-1, and AzaadiSAT-2 in 2023',
      ],
      payloadCapacity: {
        LEO: '500 kg',
        reuseStatus: 'Expendable',
      },
      dimensions: {
        height: '34 m',
        diameter: '2 m',
        mass: '120,000 kg',
      },
      thrust: {
        seaLevel: '2,000 kN (approx)',
      },
      engines: {
        firstStage: 'SS1 (Solid)',
        secondStage: 'SS2 (Solid)',
        thirdStage: 'SS3 (Solid)',
      },
      launchSites: ['Satish Dhawan Space Centre, Sriharikota'],
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/SSLV-D2_liftoff.png',
      summary: "The SSLV is India's compact and cost-effective launch vehicle developed for the growing small satellite market. Designed for quick turnaround and minimal launch infrastructure, it offers flexibility for commercial and academic payloads on demand.",
      description: "The SSLV is India's compact and cost-effective launch vehicle developed for the growing small satellite market.",
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Small_Satellite_Launch_Vehicle',
        official: 'https://www.isro.gov.in/Launch_Vehicles/SSLV.html',
        launchManifest: 'https://en.wikipedia.org/wiki/Small_Satellite_Launch_Vehicle#Launch_history',
      },
    },
    {
      id: "cz-11",
      name: "CZ-11 (Long March 11)",
      status: "active",
      operator: "CASC (China)",
      manufacturer: "China Academy of Launch Vehicle Technology (CALT)",
      country: "China",
      ownership: "Government",
      type: "Light-lift orbital (solid-fueled)",
      reusability: "Expendable",
      stages: 4,
      propellant: "Solid",
      firstLaunchDate: "2015-09-25",
      lastLaunchDate: null,
      successRate: 94,
      totalLaunches: 17,
      notableMissions: [
        "Launched from sea aboard a mobile platform",
        "Deployed multiple Earth observation and communication satellites"
      ],
      payloadCapacity: {
        LEO: "700 kg",
        reuseStatus: "Expendable"
      },
      dimensions: {
        height: "20.8 m",
        diameter: "2 m",
        mass: "58,000 kg"
      },
      thrust: {
        seaLevel: "1,200 kN"
      },
      engines: {
        firstStage: "Solid-fueled",
        secondStage: "Solid-fueled",
        thirdStage: "Solid-fueled",
        fourthStage: "Solid-fueled"
      },
      launchSites: [
        "Jiuquan Satellite Launch Center (Land)",
        "Sea-based platform (Yellow Sea)"
      ],
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/be/Changzheng-11_launching.jpg",
      summary: "The Long March 11 is a mobile, solid-fueled rocket designed for quick-response satellite launches. It is unique in the Long March family for its ability to launch from both land and sea-based platforms. It plays a key role in China's ambitions for flexible and fast deployment of small payloads.",
      links: {
        wikipedia: "https://en.wikipedia.org/wiki/Long_March_11",
        official: "http://www.spacechina.com/",
        launchManifest: "https://en.wikipedia.org/wiki/Long_March_11#Launch_history"
      },
      description: "The Long March 11 is a mobile, solid-fueled rocket designed for quick-response satellite launches."
    },
    {
      id: "sls",
      name: "SLS (Space Launch System)",
      status: "active",
      operator: "NASA (USA)",
      manufacturer: "Boeing, Aerojet Rocketdyne, Northrop Grumman",
      country: "USA",
      ownership: "Government",
      type: "Super heavy-lift orbital",
      reusability: "Expendable",
      stages: 2,
      propellant: "Liquid Hydrogen / Liquid Oxygen + Solid Rocket Boosters",
      firstLaunchDate: "2022-11-16",
      lastLaunchDate: null,
      successRate: 100,
      totalLaunches: 1,
      notableMissions: [
        "Artemis I (2022) – uncrewed lunar flyby mission",
        "Designed for Moon and Mars missions under Artemis program"
      ],
      payloadCapacity: {
        LEO: "95,000 kg (Block 1)",
        reuseStatus: "Expendable"
      },
      dimensions: {
        height: "98 m",
        diameter: "8.4 m core stage",
        mass: "2,600,000 kg (liftoff)"
      },
      thrust: {
        seaLevel: "39,000 kN"
      },
      engines: {
        firstStage: "4 × RS-25 + 2 × SRBs",
        secondStage: "ICPS (Interim Cryogenic Propulsion Stage)"
      },
      launchSites: [
        "Kennedy Space Center LC-39B"
      ],
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Artemis_I_SLS_launch_%28NHQ202211160001%29.jpg",
      summary: "NASA's SLS is the most powerful rocket since Saturn V, developed for deep space exploration under the Artemis program. It is designed to carry astronauts to the Moon and beyond, including future crewed Mars missions. Its modular design supports upgrades for higher payload capabilities in future configurations (Block 1B, Block 2).",
      links: {
        wikipedia: "https://en.wikipedia.org/wiki/Space_Launch_System",
        official: "https://www.nasa.gov/sls/",
        launchManifest: "https://en.wikipedia.org/wiki/Space_Launch_System#Flight_manifest"
      },
      description: "NASA's SLS is the most powerful rocket since Saturn V, developed for deep space exploration under the Artemis program."
    },
    {
      id: "starliner-atlas-v",
      name: "Starliner Atlas V",
      status: "active",
      operator: "Boeing / ULA (USA)",
      manufacturer: "Boeing & United Launch Alliance",
      country: "USA",
      ownership: "Private",
      type: "Crew-rated medium-lift orbital",
      reusability: "Partially Reusable (Starliner capsule)",
      stages: 2,
      propellant: "RP-1 / Liquid Oxygen (Atlas V), Hypergolic (Starliner service module)",
      firstLaunchDate: "2019-12-20",
      lastLaunchDate: null,
      successRate: 66.6,
      totalLaunches: 2,
      notableMissions: [
        "CST-100 Starliner Orbital Flight Test",
        "NASA Commercial Crew Program"
      ],
      payloadCapacity: {
        LEO: "13,000 kg (Atlas V)",
        reuseStatus: "Reusable capsule, expendable launch vehicle"
      },
      dimensions: {
        height: "58.3 m (with capsule)",
        diameter: "3.7 m (core)",
        mass: "540,000 kg (Atlas V at liftoff)"
      },
      thrust: {
        seaLevel: "3,800 kN"
      },
      engines: {
        firstStage: "RD-180",
        secondStage: "Centaur (2 × RL10A-4-2)"
      },
      launchSites: [
        "Cape Canaveral SLC-41"
      ],
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Atlas_V_N22_with_Starliner_OFT-2.jpg",
      summary: "Starliner Atlas V is the configuration used by Boeing’s CST-100 Starliner crew capsule, launched atop ULA's Atlas V rocket. Developed under NASA’s Commercial Crew Program, it offers an American alternative to SpaceX’s Crew Dragon for transporting astronauts to the International Space Station (ISS).",
      links: {
        wikipedia: "https://en.wikipedia.org/wiki/CST-100_Starliner",
        official: "https://www.boeing.com/space/starliner/",
        launchManifest: "https://en.wikipedia.org/wiki/CST-100_Starliner#Launch_history"
      },
      description: "Starliner Atlas V is the configuration used by Boeing’s CST-100 Starliner crew capsule, launched atop ULA's Atlas V rocket."
    },
    {
      id: 'black-brant-xii',
      name: 'Black Brant XII',
      status: 'active',
      operator: 'Canadian Space Agency / NASA (Canada/USA)',
      manufacturer: 'Black Brant Aerospace',
      country: 'Canada',
      ownership: 'Government',
      type: 'Suborbital sounding rocket',
      reusability: 'Expendable',
      stages: 4,
      propellant: 'Solid fuel',
      firstLaunchDate: '1991-01-01',
      lastLaunchDate: null,
      successRate: 98,
      totalLaunches: 200,
      notableMissions: [
        'Used extensively for atmospheric research and microgravity experiments',
        'Known for reliability and payload flexibility in sounding rocket missions'
      ],
      payloadCapacity: {
        LEO: '100–500 kg',
        reuseStatus: 'Expendable'
      },
      dimensions: {
        height: '13.3 m',
        diameter: '0.44 m',
        mass: '1,340 kg'
      },
      thrust: {
        seaLevel: '200 kN (approximate total)'
      },
      engines: {
        firstStage: 'Black Brant booster',
        secondStage: 'Black Brant sustainer',
        thirdStage: 'Nike Hercules motor'
      },
      launchSites: [
        'White Sands Missile Range',
        'Andøya Space Center',
        'Woomera Test Range'
      ],
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Black_Brant_rocket_launch_at_White_Sands_Missile_Range.jpg',
      summary: 'The Black Brant XII is a high-performance sounding rocket widely used for scientific research. It is a multi-stage solid-fueled vehicle that provides quick and reliable access to suborbital space for experiments related to atmospheric physics, astronomy, and microgravity. It remains a mainstay in North American sounding rocket programs.',
      description: 'The Black Brant XII is a high-performance sounding rocket widely used for scientific research.',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Black_Brant',
        official: 'https://www.nasa.gov/mission_pages/sounding-rockets/overview',
        launchManifest: 'https://www.asc-csa.gc.ca/eng/satellites/black-brant.asp'
      }
    },
    {
      id: 'firefly-alpha',
      name: 'Firefly Alpha',
      status: 'active',
      operator: 'Firefly Aerospace (USA)',
      manufacturer: 'Firefly Aerospace',
      country: 'USA',
      ownership: 'Private',
      type: 'Small-lift orbital',
      reusability: 'Expendable',
      stages: 2,
      propellant: 'RP-1 / Liquid Oxygen',
      firstLaunchDate: '2021-09-03',
      lastLaunchDate: null,
      successRate: 50,
      totalLaunches: 4,
      notableMissions: [
        'Responsive space access for small payloads',
        'Used for commercial and government satellite launches'
      ],
      payloadCapacity: {
        LEO: '1,170 kg',
        reuseStatus: 'Expendable'
      },
      dimensions: {
        height: '29.5 m',
        diameter: '1.8 m',
        mass: '54,000 kg'
      },
      thrust: {
        seaLevel: '736 kN'
      },
      engines: {
        firstStage: '4 × Reaver 1',
        secondStage: '1 × Lightning 1'
      },
      launchSites: [
        'Vandenberg Space Force Base (SLC-2W)'
      ],
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Firefly_Alpha_Launch_-_Maiden_Flight.jpg',
      summary: 'Firefly Alpha is a two-stage orbital launch vehicle designed to offer cost-effective, flexible launch solutions for small satellites. Built with rapid launch cadence in mind, it uses Firefly\'s own Reaver and Lightning engines and is targeted at commercial, scientific, and defense payloads.',
      description: 'Firefly Alpha is a two-stage orbital launch vehicle designed to offer cost-effective, flexible launch solutions for small satellites.',
      links: {
        wikipedia: 'https://en.wikipedia.org/wiki/Firefly_Alpha',
        official: 'https://fireflyspace.com/alpha/',
        launchManifest: 'https://en.wikipedia.org/wiki/Firefly_Alpha#Launch_history'
      }
    },
    {
      id: "jielong-3",
      name: "Jielong-3 (Smart Dragon 3)",
      status: "active",
      operator: "CASIC (China)",
      manufacturer: "China Academy of Launch Vehicle Technology (CALT)",
      country: "China",
      ownership: "Government",
      type: "Small-lift orbital (solid-fueled)",
      reusability: "Expendable",
      stages: 4,
      propellant: "Solid fuel",
      firstLaunchDate: "2022-12-09",
      lastLaunchDate: null,
      successRate: 100,
      totalLaunches: 1,
      notableMissions: [
        "Launch of multiple commercial and government smallsats"
      ],
      payloadCapacity: {
        LEO: "1,500 kg",
        reuseStatus: "No"
      },
      dimensions: {
        height: "31 m",
        diameter: "2.65 m",
        mass: "140,000 kg"
      },
      thrust: {
        seaLevel: "Unknown"
      },
      engines: {
        firstStage: "Solid motors across all stages"
      },
      launchSites: [
        "Taiyuan Satellite Launch Center"
      ],
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Jielong-3_rocket_2022.jpg",
      summary: "Jielong-3, also known as Smart Dragon 3, is a Chinese solid-fueled small-lift orbital rocket designed for rapid-response launches of small satellites. It supports China’s strategy to expand commercial launch services and increase deployment flexibility.",
      description: "Jielong-3 is a Chinese solid-fueled small-lift orbital rocket designed for rapid-response launches.",
      links: {
        wikipedia: "https://en.wikipedia.org/wiki/Smart_Dragon_3",
        official: "http://www.casic.com.cn/"
      }
    },
    {
      id: "kuaizhou-1a",
      name: "Kuaizhou-1A",
      status: "active",
      operator: "ExPace (China)",
      manufacturer: "CASIC",
      country: "China",
      ownership: "Government",
      type: "Small-lift orbital",
      reusability: "Expendable",
      stages: 4,
      propellant: "Solid fuel",
      firstLaunchDate: "2017-01-09",
      lastLaunchDate: null,
      successRate: 84,
      totalLaunches: 19,
      notableMissions: [
        "Rapid deployment of small Earth observation and tech demo satellites"
      ],
      payloadCapacity: {
        LEO: "400 kg",
        reuseStatus: "No"
      },
      dimensions: {
        height: "20 m",
        diameter: "1.4 m",
        mass: "30,000 kg"
      },
      thrust: {
        seaLevel: "Unknown"
      },
      engines: {
        firstStage: "Solid rocket motor"
      },
      launchSites: [
        "Jiuquan Satellite Launch Center"
      ],
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Kuaizhou-1A_rocket.jpg",
      summary: "Kuaizhou-1A is a small, solid-fueled rocket designed for rapid-response and cost-effective satellite launches. Operated by ExPace, a CASIC subsidiary, it is part of China's commercial space efforts and supports both government and private missions.",
      description: "Kuaizhou-1A is a small, solid-fueled rocket designed for rapid-response and cost-effective satellite launches.",
      links: {
        wikipedia: "https://en.wikipedia.org/wiki/Kuaizhou",
        official: "http://www.expace.com.cn/"
      }
    }
];
