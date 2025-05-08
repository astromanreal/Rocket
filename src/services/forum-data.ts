'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { formatRelativeTime } from '@/lib/utils';
import type { UserProfile, UserProfilePost } from '@/services/user-data'; // Assuming UserProfilePost is defined here or needs to be
import { getUserProfile } from '@/services/user-data'; // To fetch author details

// Define interfaces for the JSON structure
interface ForumTopicJson {
  id: string;
  title: string;
  description: string;
  postCount: number;
  lastPostTimestamp: string | null; // ISO string or null
}

export interface ForumPostJson {
  postId: string;
  topicId: string;
  authorId: string;
  content: string;
  timestamp: string; // ISO string
}

interface ForumData {
  topics: ForumTopicJson[];
  posts: ForumPostJson[];
}

// Define the type for a post displayed in the UI (includes author)
export interface DisplayPost extends Omit<ForumPostJson, 'timestamp'> {
  id: string; // Use postId as id
  timestamp: Date;
  formattedTimestamp: string;
  author: UserProfile | null;
}

// Path to the JSON file
// IMPORTANT: Correct path resolution is crucial, especially in different environments (dev vs. build)
const dataFilePath = path.join(process.cwd(), 'src', 'data', 'forum-data.json');

// --- Helper Function to Read Data ---
async function readForumData(): Promise<ForumData> {
  try {
    const jsonData = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(jsonData) as ForumData;
  } catch (error) {
    console.error('Error reading forum data file:', error);
    // Return empty structure or throw error depending on desired handling
    return { topics: [], posts: [] };
  }
}

// --- Helper Function to Write Data ---
// WARNING: Writing to the filesystem in serverless environments (like Vercel)
// is generally not reliable or persistent. Changes made this way might be lost
// on new deployments or instance restarts. Use a database for production.
async function writeForumData(data: ForumData): Promise<void> {
  try {
    const jsonData = JSON.stringify(data, null, 2); // Pretty print JSON
    await fs.writeFile(dataFilePath, jsonData, 'utf-8');
    console.log('Forum data written to file (Note: May not persist in serverless env)');
  } catch (error) {
    console.error('Error writing forum data file:', error);
    // Handle error appropriately
    throw new Error('Failed to write forum data.');
  }
}

// --- Service Functions ---

/**
 * Retrieves all forum topics.
 */
export async function getTopics(): Promise<ForumTopicJson[]> {
  const data = await readForumData();
  // Add derived data like relative last post time if needed here
  return data.topics.map(topic => ({
      ...topic,
      // Example: Augment data if necessary, e.g., formatting last post time
      // lastPostRelative: topic.lastPostTimestamp ? formatRelativeTime(new Date(topic.lastPostTimestamp)) : 'No posts yet',
  }));
}

/**
 * Retrieves details for a specific topic.
 */
export async function getTopicById(topicId: string): Promise<ForumTopicJson | null> {
  const data = await readForumData();
  return data.topics.find(t => t.id === topicId) || null;
}

/**
 * Retrieves posts for a specific topic, including author details.
 */
export async function getPostsByTopic(topicId: string): Promise<DisplayPost[]> {
  const data = await readForumData();
  const topicPosts = data.posts.filter(p => p.topicId === topicId);

  // Sort posts by timestamp (ascending)
  topicPosts.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  // Fetch author details for each post
  const displayPostsPromises = topicPosts.map(async (post): Promise<DisplayPost> => {
    const authorProfile = await getUserProfile(post.authorId);
    const postTimestamp = new Date(post.timestamp);
    return {
      id: post.postId,
      postId: post.postId,
      topicId: post.topicId,
      authorId: post.authorId,
      content: post.content,
      timestamp: postTimestamp,
      formattedTimestamp: formatRelativeTime(postTimestamp),
      author: authorProfile,
    };
  });

  return Promise.all(displayPostsPromises);
}

/**
 * Adds a new post to a topic.
 * WARNING: Persistence issues in serverless environments.
 */
export async function addPost(topicId: string, postData: Omit<ForumPostJson, 'postId' | 'timestamp' | 'topicId'>): Promise<ForumPostJson> {
    const data = await readForumData();

    // Find the topic to update its metadata
    const topicIndex = data.topics.findIndex(t => t.id === topicId);
    if (topicIndex === -1) {
        throw new Error(`Topic with ID ${topicId} not found.`);
    }

    const newTimestamp = new Date().toISOString();
    const newPostId = `post${Date.now()}${Math.random().toString(16).slice(2)}`; // Simple unique ID

    const newPost: ForumPostJson = {
        ...postData,
        topicId: topicId,
        postId: newPostId,
        timestamp: newTimestamp,
    };

    // Add the new post
    data.posts.push(newPost);

    // Update topic metadata
    data.topics[topicIndex].postCount += 1;
    data.topics[topicIndex].lastPostTimestamp = newTimestamp;

    // Write updated data back to file
    await writeForumData(data);

    return newPost; // Return the newly created post
}

/**
 * Deletes a post from a topic.
 * WARNING: Persistence issues in serverless environments.
 */
export async function deletePost(topicId: string, postId: string): Promise<void> {
    const data = await readForumData();

    const postIndex = data.posts.findIndex(p => p.postId === postId && p.topicId === topicId);
    if (postIndex === -1) {
        throw new Error(`Post with ID ${postId} in topic ${topicId} not found.`);
    }

    // Remove the post
    const deletedPostTimestamp = data.posts[postIndex].timestamp;
    data.posts.splice(postIndex, 1);

    // Update topic metadata
    const topicIndex = data.topics.findIndex(t => t.id === topicId);
    if (topicIndex !== -1) {
        data.topics[topicIndex].postCount = Math.max(0, data.topics[topicIndex].postCount - 1);

        // Update lastPostTimestamp if the deleted post was the last one
        if (data.topics[topicIndex].lastPostTimestamp === deletedPostTimestamp) {
            const remainingTopicPosts = data.posts
                .filter(p => p.topicId === topicId)
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()); // Sort descending

            if (remainingTopicPosts.length > 0) {
                data.topics[topicIndex].lastPostTimestamp = remainingTopicPosts[0].timestamp;
            } else {
                data.topics[topicIndex].lastPostTimestamp = null;
            }
        }
    }

    await writeForumData(data);
}


/**
 * Retrieves posts made by a specific user across all topics.
 */
export async function getPostsByUser(userId: string, count: number = 10): Promise<UserProfilePost[]> {
    const data = await readForumData();

    const userPosts = data.posts
        .filter(p => p.authorId === userId)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) // Sort descending (latest first)
        .slice(0, count); // Limit the number of posts

    return userPosts.map(post => {
        const postTimestamp = new Date(post.timestamp);
        return {
            postId: post.postId,
            topicId: post.topicId,
            content: post.content,
            timestamp: postTimestamp,
            formattedTimestamp: formatRelativeTime(postTimestamp),
        };
    });
}
