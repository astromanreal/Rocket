
// src/data/merch-data.ts

export type MerchType = 'Poster' | 'Model' | 'Blueprint' | 'Apparel' | 'Technical Poster'; // Removed 'Sticker', Added 'Technical Poster'

export interface MerchItem {
  id: string;
  name: string;
  type: MerchType;
  image: string; // URL to the product image
  price: number; // Price in USD cents (e.g., 2999 for $29.99)
  description: string;
  techDetails?: string; // Optional: e.g., "1:100 Scale, ABS Plastic", "A1 Size, High-Quality Print"
  buyNowLink: string; // Placeholder URL - Can still be used for fallback or alternative links if needed
}

// Placeholder images using picsum.photos and new NASA images
export const merchData: MerchItem[] = [
  {
    id: 'nasa-poster-cosmic-cliffs',
    name: 'NASA "Cosmic Cliffs" Poster',
    type: 'Poster',
    image: 'https://www.nasa.gov/wp-content/uploads/2025/03/0301627orig.jpg',
    price: 2699,
    description: 'Stunning high-resolution poster of the "Cosmic Cliffs" in the Carina Nebula, captured by the James Webb Space Telescope.',
    techDetails: '24x36 inch, Premium Luster Photo Paper',
    buyNowLink: '#',
  },
  {
    id: 'nasa-poster-pillars-creation',
    name: 'NASA "Pillars of Creation" Poster',
    type: 'Poster',
    image: 'https://www.nasa.gov/wp-content/uploads/2025/03/stsci-01evvcb2xhgzxymwp0n0mfkz4y-1.png',
    price: 2599,
    description: 'Iconic "Pillars of Creation" image from the Hubble Space Telescope, perfect for any space enthusiast.',
    techDetails: '18x24 inch, Matte Finish',
    buyNowLink: '#',
  },
  {
    id: 'nasa-poster-galaxy-collision',
    name: 'NASA "Galaxy Collision" Poster',
    type: 'Poster',
    image: 'https://www.nasa.gov/wp-content/uploads/2025/03/hubble-observes-one-of-a-kind-st.jpg',
    price: 2399,
    description: 'Breathtaking poster showcasing a one-of-a-kind galaxy collision observed by Hubble.',
    techDetails: '20x30 inch, Semi-Gloss Print',
    buyNowLink: '#',
  },
  {
    id: 'model-saturn-v-detailed',
    name: 'Saturn V Detailed Scale Model',
    type: 'Model',
    image: 'https://i.pinimg.com/736x/30/00/e7/3000e7b239047828762b6a019b80307f.jpg',
    price: 14999,
    description: 'A highly detailed scale model of the historic Saturn V rocket, the launch vehicle for the Apollo missions.',
    techDetails: '1:100 Scale, Multi-stage display',
    buyNowLink: '#',
  },
  {
    id: 'model-space-shuttle-discovery',
    name: 'Space Shuttle Discovery Model',
    type: 'Model',
    image: 'https://i.pinimg.com/736x/f3/15/1e/f3151ee5da6b6e6cf6d8989d3a79e8f9.jpg',
    price: 9999,
    description: 'Collectible model of the Space Shuttle Discovery, an icon of human spaceflight.',
    techDetails: '1:150 Scale, Includes display stand',
    buyNowLink: '#',
  },
  {
    id: 'model-soyuz-rocket',
    name: 'Soyuz Rocket Scale Model',
    type: 'Model',
    image: 'https://i.pinimg.com/736x/6d/34/81/6d3481e13f616dab8791871455f7813d.jpg',
    price: 7999,
    description: 'Detailed scale model of the Soyuz rocket, a workhorse of the Russian space program.',
    techDetails: '1:200 Scale, Authentic livery',
    buyNowLink: '#',
  },
  {
    id: 'model-space-shuttle-launch-stack',
    name: 'Space Shuttle Launch Stack Model',
    type: 'Model',
    image: 'https://i.pinimg.com/736x/bb/d2/58/bbd258c69722192e41cfaf34377484f4.jpg',
    price: 12999,
    description: 'Impressive model of the Space Shuttle in its launch configuration with boosters and external tank.',
    techDetails: '1:144 Scale, Detailed SRBs and ET',
    buyNowLink: '#',
  },
  {
    id: 'model-ariane-5',
    name: 'Ariane 5 Rocket Model',
    type: 'Model',
    image: 'https://i.pinimg.com/736x/eb/68/0b/eb680b917288d16c0ea81b00c663c3cc.jpg',
    price: 8599,
    description: 'Scale model of the Ariane 5 rocket, Europe\'s heavy-lift launch vehicle.',
    techDetails: '1:200 Scale, Accurate detailing',
    buyNowLink: '#',
  },
  {
    id: 'blueprint-saturn-v',
    name: 'Saturn V Rocket Blueprint',
    type: 'Blueprint',
    image: 'https://i.pinimg.com/736x/79/92/dc/7992dceff60bd2c8a7191f387bf8d318.jpg',
    price: 3299,
    description: 'Detailed technical blueprint of the legendary Saturn V rocket, perfect for framing.',
    techDetails: 'A1 Size (594x841mm), High-Quality Heavyweight Paper',
    buyNowLink: '#',
  },
  {
    id: 'blueprint-space-shuttle',
    name: 'Space Shuttle Orbiter Blueprint',
    type: 'Blueprint',
    image: 'https://i.pinimg.com/736x/73/16/3f/73163fbf73e971f2c5bf7ea39349644a.jpg',
    price: 3199,
    description: 'Authentic-style blueprint of the Space Shuttle Orbiter, highlighting its key components.',
    techDetails: 'A1 Size (594x841mm), Premium Blueprint Paper',
    buyNowLink: '#',
  },
  {
    id: 'blueprint-falcon-heavy',
    name: 'Falcon Heavy Schematic Blueprint',
    type: 'Blueprint',
    image: 'https://i.pinimg.com/736x/5b/2d/a8/5b2da89ee40d7514b5a21bc858a3425f.jpg',
    price: 3099,
    description: 'Schematic blueprint of the Falcon Heavy rocket, showcasing its multi-core design.',
    techDetails: 'A2 Size (420x594mm), Matte Finish Print',
    buyNowLink: '#',
  },
  {
    id: 'apparel-rocket-launch-tshirt',
    name: 'Rocket Launch Silhouette T-Shirt',
    type: 'Apparel',
    image: 'https://i.pinimg.com/736x/24/26/42/24264252cc16e190ce32045deec0872e.jpg',
    price: 2499,
    description: 'Stylish t-shirt featuring a rocket launch silhouette against a vibrant sky. Made from soft, breathable cotton.',
    techDetails: '100% Cotton, Available sizes: S, M, L, XL, XXL',
    buyNowLink: '#',
  },
  {
    id: 'apparel-astronaut-moon-tshirt',
    name: 'Astronaut on Moon T-Shirt',
    type: 'Apparel',
    image: 'https://i.pinimg.com/736x/73/4b/45/734b459eb1f451635f344ca21350dba4.jpg',
    price: 2599,
    description: 'Artistic t-shirt depicting an astronaut on the lunar surface. A tribute to space exploration.',
    techDetails: 'Cotton Blend, Available sizes: S, M, L, XL, XXL',
    buyNowLink: '#',
  },
  {
    id: 'apparel-space-doodles-tshirt',
    name: 'Space Doodles & Rockets T-Shirt',
    type: 'Apparel',
    image: 'https://i.pinimg.com/736x/da/3b/3f/da3b3f216f3d338016a010cab7290078.jpg',
    price: 2399,
    description: 'Fun t-shirt with various space-themed doodles including rockets, planets, and stars.',
    techDetails: '100% Cotton, Available sizes: S, M, L, XL',
    buyNowLink: '#',
  },
  {
    id: 'apparel-retro-rocket-tshirt',
    name: 'Retro Rocket Schematic T-Shirt',
    type: 'Apparel',
    image: 'https://i.pinimg.com/736x/75/93/67/75936704deb9ba524b71515d24d73704.jpg',
    price: 2799,
    description: 'Vintage-inspired t-shirt showcasing a retro rocket schematic. Perfect for classic space fans.',
    techDetails: 'Preshrunk Cotton, Available sizes: M, L, XL, XXL',
    buyNowLink: '#',
  },
  {
    id: 'tech-poster-engine-cutaway',
    name: 'Rocket Engine Cutaway Poster',
    type: 'Technical Poster',
    image: 'https://i.pinimg.com/736x/84/af/f9/84aff909b029fef4c6e6b6d67214bb87.jpg',
    price: 2899,
    description: 'Detailed cutaway illustration of a modern rocket engine, showcasing its intricate components.',
    techDetails: '20x30 inch, Premium Matte Paper',
    buyNowLink: '#',
  },
  {
    id: 'tech-poster-stages-infographic',
    name: 'Launch Vehicle Stages Infographic',
    type: 'Technical Poster',
    image: 'https://i.pinimg.com/736x/f1/ed/a2/f1eda20774bc6f8f4cbff9d09e2aab77.jpg',
    price: 2799,
    description: 'Educational infographic explaining the different stages of a multi-stage launch vehicle.',
    techDetails: '18x24 inch, Glossy Finish',
    buyNowLink: '#',
  },
  {
    id: 'tech-poster-spacecraft-systems',
    name: 'Spacecraft Systems Diagram Poster',
    type: 'Technical Poster',
    image: 'https://i.pinimg.com/736x/90/eb/e1/90ebe17e0ec2f41be9b71257c3b04e2f.jpg',
    price: 2999,
    description: 'Comprehensive diagram illustrating the key systems of an orbital spacecraft.',
    techDetails: '24x36 inch, Luster Photo Paper',
    buyNowLink: '#',
  },
];

export async function getMerchItems(): Promise<MerchItem[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    // In a real app, this would fetch from a database or API
    return merchData;
}

