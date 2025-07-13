
import type { Rocket as RocketType, RocketStatus } from '@/data/rockets/types';
import { activeRockets } from '@/data/rockets/active';
import { pastRockets } from '@/data/rockets/past';
import { futureRockets } from '@/data/rockets/future';

export type { Rocket, RocketStatus } from '@/data/rockets/types';

export const slugify = (name: string): string => name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

export async function getRockets(
  status?: RocketStatus,
  query?: string
): Promise<RocketType[]> {
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate delay

  const allRockets: RocketType[] = [
    ...activeRockets,
    ...pastRockets,
    ...futureRockets,
  ];

  const dataWithIds = allRockets.map(rocket => ({
    ...rocket,
    id: rocket.id || slugify(rocket.name),
  }));

  return dataWithIds;
}
