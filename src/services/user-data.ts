
'use server'; // Can be used in server components/actions if needed, though primarily client for now

import { formatRelativeTime } from '@/lib/utils'; // Import formatting helper
import { getRockets, type Rocket } from '@/services/rocket-data'; // Import rocket data service

/**
 * Represents a user profile.
 * NOTE: In a real application, this would come from an authentication provider
 * and a database (like Firestore). This is a simplified mock.
 */
export interface UserProfile {
  id: string;
  username: string;
  email: string; // Usually obtained from auth, keep private if possible
  avatarUrl?: string;
  bio?: string;
  exploredRocketIds: string[]; // New: Track IDs of explored rockets
}

/**
 * Represents a user's post for display on the profile page.
 * Definition moved here for clarity, used by both services.
 */
export interface UserProfilePost {
    postId: string;
    topicId: string; // To link back to the topic
    content: string;
    timestamp: Date; // Date object for easier handling/sorting if needed
    formattedTimestamp: string;
}


// --- Mock Data Storage ---
// WARNING: This is NOT suitable for production. Data is lost on server restart
// and not shared across users/instances. Use a database in a real app.
let mockUserDatabase: { [key: string]: UserProfile } = {
  'defaultUser123': {
    id: 'defaultUser123',
    username: "CosmicExplorer456", // Use a default initially, generateRandomUsername can be called if needed
    email: 'user@example.com', // Placeholder
    avatarUrl: `https://picsum.photos/seed/defaultUser123/100/100`,
    bio: 'Rocket enthusiast and aspiring space explorer!',
    exploredRocketIds: ['falcon-9', 'saturn-v'], // Initial explored rockets
  },
  // Example of another user if needed for testing posts
  'anotherUser456': {
    id: 'anotherUser456',
    username: "GalacticNavigator123",
    email: 'another@example.com',
    avatarUrl: `https://picsum.photos/seed/anotherUser456/100/100`,
    bio: 'Loves staring at the stars.',
    exploredRocketIds: [],
  }
};

// --- Helper Functions ---

/**
 * Generates a random space/tech-themed username.
 * Made async to comply with Server Action file requirements.
 */
export async function generateRandomUsername(): Promise<string> {
  // Simulate async operation if needed, though not strictly necessary for the logic
  await Promise.resolve();

  const adjectives = ['Cosmic', 'Stellar', 'Galactic', 'Orbital', 'Astro', 'Lunar', 'Solar', 'DeepSpace', 'Quantum', 'Cyber'];
  const nouns = ['Voyager', 'Explorer', 'Pioneer', 'Navigator', 'Pilot', 'Engineer', 'Scientist', 'Comet', 'Nebula', 'Starship'];
  // Note: Math.random() might cause hydration mismatches if used directly in rendering.
  // Since this is a server action helper, it's likely fine, but be mindful.
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 900) + 100; // 100-999
  return `${randomAdj}${randomNoun}${randomNumber}`;
}

// --- Service Functions ---

/**
 * Retrieves the user profile for a given user ID.
 * Mocks fetching from a data source.
 * @param userId The ID of the user to fetch. Defaults to a mock user.
 * @returns A promise that resolves to the UserProfile or null if not found.
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

   // Initialize default user if not present (e.g., after server restart)
   if (!mockUserDatabase['defaultUser123']) {
     mockUserDatabase['defaultUser123'] = {
       id: 'defaultUser123',
       username: "StellarPioneer789", // Use a different default or call generateRandomUsername
       email: 'user@example.com',
       avatarUrl: `https://picsum.photos/seed/defaultUser123/100/100`,
       bio: 'Rocket enthusiast and aspiring space explorer!',
       exploredRocketIds: [],
     };
   }
    // Initialize another user if needed
   if (!mockUserDatabase['anotherUser456']) {
        mockUserDatabase['anotherUser456'] = {
            id: 'anotherUser456',
            username: "GalacticNavigator123",
            email: 'another@example.com',
            avatarUrl: `https://picsum.photos/seed/anotherUser456/100/100`,
            bio: 'Loves staring at the stars.',
            exploredRocketIds: [],
        };
    }


  // Return the mock user data
  return mockUserDatabase[userId] || null;
}

/**
 * Updates the user profile for a given user ID.
 * Mocks updating a data source.
 * @param userId The ID of the user to update.
 * @param updates Partial user profile data containing the updates.
 * @returns A promise that resolves to the updated UserProfile or null if user not found.
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<Pick<UserProfile, 'username' | 'bio' | 'avatarUrl'>> // Only allow specific fields
): Promise<UserProfile | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (mockUserDatabase[userId]) {
    // IMPORTANT: Create a new object for the update to avoid direct mutation issues
    // if the mock database object is used elsewhere.
    mockUserDatabase[userId] = {
      ...mockUserDatabase[userId],
      ...updates, // Apply allowed updates
    };
    return { ...mockUserDatabase[userId] }; // Return a copy
  } else {
    return null; // User not found
  }
}

/**
 * Adds or removes a rocket from the user's explored list.
 * @param userId The ID of the user.
 * @param rocketId The ID of the rocket to toggle.
 * @returns The updated list of explored rocket IDs.
 */
export async function toggleExploredRocket(userId: string, rocketId: string): Promise<string[]> {
    await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay

    const user = mockUserDatabase[userId];
    if (!user) {
        throw new Error('User not found');
    }

    const exploredIds = new Set(user.exploredRocketIds);
    if (exploredIds.has(rocketId)) {
        exploredIds.delete(rocketId); // Untrack
    } else {
        exploredIds.add(rocketId); // Track
    }

    user.exploredRocketIds = Array.from(exploredIds);
    mockUserDatabase[userId] = user;

    return user.exploredRocketIds;
}

/**
 * Gets the current user ID.
 * Mocks retrieving the logged-in user's ID. Replace with actual auth logic.
 * @returns A promise that resolves to the hardcoded user ID for the default mock user.
 */
export async function getCurrentUserId(): Promise<string> {
  // Simulate async operation if needed
  await Promise.resolve();
  // TODO: Replace with actual authentication logic to get the real user ID
  return 'defaultUser123';
}

// Removed getUserPosts - it is now handled by src/services/forum-data.ts

/**
 * Retrieves the full rocket data for the user's explored rockets.
 * @param userId The ID of the user.
 * @returns A promise that resolves to an array of Rocket objects.
 */
export async function getExploredRockets(userId: string): Promise<Rocket[]> {
  const user = await getUserProfile(userId);
  if (!user || !user.exploredRocketIds || user.exploredRocketIds.length === 0) {
    return [];
  }

  const allRockets = await getRockets();
  const exploredRockets = allRockets.filter(rocket => user.exploredRocketIds.includes(rocket.id));

  return exploredRockets;
}
