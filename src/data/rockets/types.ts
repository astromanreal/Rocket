
/**
 * Represents the status of a rocket.
 */
export type RocketStatus = 'active' | 'past' | 'future';

/**
 * Represents a rocket's detailed information.
 */
export interface Rocket {
  id: string; 
  name: string;
  imageUrl?: string;
  status: RocketStatus;
  operator: string;
  manufacturer?: string;
  country: string;
  ownership: 'Private' | 'Government';
  type: string;
  reusability?: string;
  stages: number;
  propellant?: string;
  firstLaunchDate: string;
  lastLaunchDate: string | null;
  successRate: number;
  totalLaunches: number;
  notableMissions?: string[];
  description: string;
  summary?: string; // More detailed summary
  payloadCapacity: {
    LEO?: string;
    GTO?: string;
    Mars?: string;
    reuseStatus?: string;
  };
  dimensions?: {
    height: string;
    diameter: string;
    mass: string;
  };
  thrust?: {
    seaLevel: string;
    vacuum?: string;
  };
  engines?: {
    firstStage: string;
    secondStage?: string;
    thirdStage?: string;
    fourthStage?: string;
  };
  launchSites?: string[];
  links?: {
    wikipedia?: string;
    official?: string;
    launchManifest?: string;
  };
}
