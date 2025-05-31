
'use client';

import type { Metadata, ResolvingMetadata } from 'next';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, MessageSquare, Send, User, Loader2, AlertCircle, Trash2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { getCurrentUserId, getUserProfile } from '@/services/user-data';
import {
    getTopicById,
    getPostsByTopic,
    addPost,
    deletePost, 
    type ForumTopicJson,
    type ForumPostJson,
    type DisplayPost
} from '@/services/forum-data';
import { formatRelativeTime } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

// Function to generate metadata (intended for Server Components, but logic can be adapted)
// This specific function is not directly used by this client component, but the logic is
// replicated within useEffect for dynamic title and meta tag updates.
//
// export async function generateMetadata(
//   { params }: { params: { topicId: string } },
//   parent: ResolvingMetadata
// ): Promise<Metadata> { ... }
// The above comment block is retained for future reference if converting to Server Component.

const PostSchema = z.object({
  content: z.string().min(5, 'Post must be at least 5 characters.').max(2000, 'Post cannot exceed 2000 characters.'),
});

export default function TopicPage() {
  const params = useParams();
  const { toast } = useToast();
  const topicId = params?.topicId as string | undefined;

  const [topic, setTopic] = useState<ForumTopicJson | null>(null);
  const [displayPosts, setDisplayPosts] = useState<DisplayPost[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoadingTopic, setIsLoadingTopic] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); 
  const [topicError, setTopicError] = useState<string | null>(null);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [postToDelete, setPostToDelete] = useState<string | null>(null); 

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: { content: '' },
  });

  useEffect(() => {
    async function fetchUserId() {
      try {
        const userId = await getCurrentUserId();
        setCurrentUserId(userId);
      } catch (err) {
        console.error("Failed to get current user ID:", err);
        toast({ title: "Error", description: "Could not identify current user.", variant: "destructive" });
      }
    }
    fetchUserId();
  }, [toast]);

  useEffect(() => {
    if (!topicId) {
      setTopicError("Topic ID not found in URL.");
      setIsLoadingTopic(false);
      setPostsLoading(false);
      document.title = 'Topic Not Found | Rocketpedia';
      return;
    }

    async function loadData() {
      setIsLoadingTopic(true);
      setPostsLoading(true);
      setTopicError(null);
      setPostsError(null);

      let fetchedTopic: ForumTopicJson | null = null;
      let fetchedPosts: DisplayPost[] = [];

      try {
        fetchedTopic = await getTopicById(topicId);
        if (fetchedTopic) {
          setTopic(fetchedTopic);
          document.title = `${fetchedTopic.title} - Forum Discussion | Rocketpedia`;
        } else {
          setTopicError(`Topic "${topicId}" not found.`);
          document.title = `Topic Not Found | Rocketpedia`;
        }
      } catch (err) {
        console.error("Error fetching topic details:", err);
        setTopicError("Failed to load topic details.");
        document.title = 'Error Loading Topic | Rocketpedia';
      } finally {
        setIsLoadingTopic(false);
      }

      if (fetchedTopic) {
        try {
          fetchedPosts = await getPostsByTopic(topicId);
          setDisplayPosts(fetchedPosts);
        } catch (err) {
           console.error("Error fetching posts:", err);
           setPostsError("Failed to load posts for this topic.");
        } finally {
           setPostsLoading(false);
        }
      } else {
        setPostsLoading(false); // No topic, no posts to load
      }

      // Update meta tags and JSON-LD if topic and posts are loaded
      if (fetchedTopic) {
        const canonicalUrl = `${siteUrl}/forum/topic/${topicId}`;
        const setMetaTag = (type: 'property' | 'name', key: string, content: string) => {
            let element = document.querySelector(`meta[${type}='${key}']`) as HTMLMetaElement;
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(type, key);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };
        
        let canonicalLink = document.querySelector("link[rel='canonical']");
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', canonicalUrl);

        setMetaTag('name', 'description', `Join the discussion on "${fetchedTopic.title}". ${fetchedTopic.description.substring(0,100)}...`);
        setMetaTag('name', 'keywords', [fetchedTopic.title, 'forum', 'discussion', 'rockets', 'space', 'community', ...fetchedTopic.title.toLowerCase().split(' ')].join(', '));
        
        setMetaTag('property', 'og:title', `${fetchedTopic.title} - Forum | Rocketpedia`);
        setMetaTag('property', 'og:description', fetchedTopic.description);
        setMetaTag('property', 'og:url', canonicalUrl);
        setMetaTag('property', 'og:type', 'article');
        setMetaTag('property', 'og:image', `${siteUrl}/og-forum-topic.png`); // Placeholder
        
        setMetaTag('name', 'twitter:card', 'summary');
        setMetaTag('name', 'twitter:title', `${fetchedTopic.title} - Forum | Rocketpedia`);
        setMetaTag('name', 'twitter:description', fetchedTopic.description);
        setMetaTag('name', 'twitter:image', `${siteUrl}/twitter-forum-topic.png`); // Placeholder

        const firstPost = fetchedPosts.length > 0 ? fetchedPosts[0] : null;
        const lastPost = fetchedPosts.length > 0 ? fetchedPosts[fetchedPosts.length - 1] : null;

        const jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'DiscussionForumPosting',
          headline: fetchedTopic.title,
          name: fetchedTopic.title, // Alias for headline or more concise name
          description: fetchedTopic.description,
          url: canonicalUrl,
          mainEntityOfPage: canonicalUrl,
          author: firstPost && firstPost.author ? {
            '@type': 'Person',
            name: firstPost.author.username,
            // url: `${siteUrl}/profile/${firstPost.authorId}` // If public profiles exist
          } : {
            '@type': 'Organization',
            name: 'Rocketpedia Community'
          },
          datePublished: firstPost ? firstPost.timestamp.toISOString() : new Date().toISOString(), // Fallback to now
          dateModified: lastPost ? lastPost.timestamp.toISOString() : (firstPost ? firstPost.timestamp.toISOString() : new Date().toISOString()),
          interactionStatistic: [
            {
              '@type': 'InteractionCounter',
              interactionType: 'https://schema.org/CommentAction', // Signifies posts/comments
              userInteractionCount: fetchedTopic.postCount,
            }
          ],
          comment: fetchedPosts.slice(0, 5).map(p => ({ // Include a few posts as comments
            '@type': 'Comment',
            text: p.content,
            author: p.author ? { '@type': 'Person', name: p.author.username } : { '@type': 'Organization', name: 'Anonymous User' },
            dateCreated: p.timestamp.toISOString(),
          })),
          isPartOf: {
            '@type': 'WebPage', // Or Forum, if Forum is the containing element
            name: 'Rocketpedia Forum',
            url: `${siteUrl}/forum`
          },
          publisher: {
            '@type': 'Organization',
            name: 'Rocketpedia',
            logo: {
              '@type': 'ImageObject',
              url: `${siteUrl}/rocketpedia-logo.png` // Replace with actual logo URL
            }
          }
        };

        let script = document.getElementById('forum-topic-json-ld');
        if (!script) {
          script = document.createElement('script');
          script.id = 'forum-topic-json-ld';
          script.type = 'application/ld+json';
          document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(jsonLd);
      }
    }

    loadData();
    
    return () => { // Cleanup JSON-LD script
        const ldScript = document.getElementById('forum-topic-json-ld');
        if (ldScript) ldScript.remove();
    };
  }, [topicId]); // Rerun if topicId changes

  async function onSubmit(data: z.infer<typeof PostSchema>) {
    if (!topicId || !currentUserId) {
       toast({ title: "Error", description: "Cannot post. User or topic information is missing.", variant: "destructive" });
       return;
    };

    setIsPosting(true);
    try {
        const postData = {
            authorId: currentUserId,
            content: data.content,
        };
        const newPost = await addPost(topicId, postData);
        const authorProfile = await getUserProfile(currentUserId); 
        const newDisplayPost: DisplayPost = {
            ...newPost,
            id: newPost.postId,
            timestamp: new Date(newPost.timestamp),
            formattedTimestamp: formatRelativeTime(new Date(newPost.timestamp)),
            author: authorProfile
        };
        setDisplayPosts(prevPosts => [...prevPosts, newDisplayPost]);

        // Update topic post count
        if(topic) {
          setTopic(prevTopic => prevTopic ? {...prevTopic, postCount: prevTopic.postCount + 1, lastPostTimestamp: newPost.timestamp } : null);
        }

        toast({ title: "Success", description: "Your post has been added." });
        form.reset();
    } catch (error: any) {
        console.error("Error adding post:", error);
        toast({ title: "Error", description: error.message || "Failed to add your post. Please try again.", variant: "destructive" });
    } finally {
        setIsPosting(false);
    }
  }

  async function handleDeletePostConfirm() {
    if (!topicId || !postToDelete || !currentUserId) {
        toast({ title: "Error", description: "Cannot delete post. Information missing.", variant: "destructive" });
        setPostToDelete(null);
        return;
    }

    const post = displayPosts.find(p => p.id === postToDelete);
    if (post?.authorId !== currentUserId) {
        toast({ title: "Error", description: "You can only delete your own posts.", variant: "destructive" });
        setPostToDelete(null);
        return;
    }

    setIsDeleting(true);
    try {
        await deletePost(topicId, postToDelete);
        setDisplayPosts(prevPosts => prevPosts.filter(p => p.id !== postToDelete));
        
        // Update topic post count and last post timestamp
        if(topic) {
          const remainingPosts = displayPosts.filter(p => p.id !== postToDelete);
          const newPostCount = Math.max(0, topic.postCount -1);
          const newLastPostTimestamp = remainingPosts.length > 0 
            ? remainingPosts.sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime())[0].timestamp.toISOString()
            : null;
          setTopic(prevTopic => prevTopic ? {...prevTopic, postCount: newPostCount, lastPostTimestamp: newLastPostTimestamp } : null);
        }

        toast({ title: "Success", description: "Post deleted successfully." });
    } catch (error: any) {
        console.error("Error deleting post:", error);
        toast({ title: "Error", description: error.message || "Failed to delete post.", variant: "destructive" });
    } finally {
        setIsDeleting(false);
        setPostToDelete(null); 
    }
  }

  if (isLoadingTopic && !topic) {
    return <TopicPageSkeleton />;
  }

  if (topicError) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Card className="max-w-md mx-auto bg-destructive/10 border-destructive/30">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center justify-center gap-2">
                <AlertCircle className="h-6 w-6"/> Error Loading Topic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{topicError}</p>
            <Link href="/forum" passHref>
              <Button variant="outline" className="mt-6">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Forum
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto animate-launch">
        {topic && (
             <CardHeader>
             <Link href="/forum" passHref>
                 <Button variant="outline" size="sm" className="mb-4 w-fit">
                 <ArrowLeft className="mr-2 h-4 w-4" /> Back to Forum
                 </Button>
             </Link>
             <CardTitle className="text-3xl font-bold flex items-center gap-2">
                 <MessageSquare className="h-7 w-7 text-primary" />
                 {topic.title}
             </CardTitle>
             <CardDescription>{topic.description}</CardDescription>
             </CardHeader>
        )}

        <CardContent>
          <Separator className="my-6" />

          <h2 className="text-xl font-semibold mb-4">Posts</h2>
          <div className="space-y-6 mb-8">
            {postsLoading && (
                <>
                 <PostSkeleton />
                 <PostSkeleton />
                </>
            )}
            {postsError && (
                 <p className="text-sm text-destructive text-center">{postsError}</p>
            )}
            {!postsLoading && !postsError && displayPosts.length > 0 && displayPosts.map(post => (
                <article key={post.id} className="flex items-start space-x-4 group/post" id={`post-${post.id}`}>
                  <Avatar>
                    <AvatarImage src={post.author?.avatarUrl} alt={`${post.author?.username || 'User'}'s avatar`} data-ai-hint="user avatar"/>
                    <AvatarFallback>
                      {post.author?.username ? post.author.username.substring(0, 1).toUpperCase() : <User className="h-4 w-4"/>}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-muted/50 p-4 rounded-md shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-sm">{post.author?.username || 'Unknown User'}</span>
                      <time dateTime={post.timestamp.toISOString()} className="text-xs text-muted-foreground">{post.formattedTimestamp}</time>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{post.content}</p>
                    {post.authorId === currentUserId && (
                      <AlertDialog open={postToDelete === post.id} onOpenChange={(isOpen) => !isOpen && setPostToDelete(null)}>
                        <AlertDialogTrigger asChild>
                          <Button
                             variant="ghost"
                             size="icon"
                             className="mt-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover/post:opacity-100 transition-opacity h-7 w-7"
                             onClick={() => setPostToDelete(post.id)}
                             aria-label="Delete post"
                          >
                             <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your post.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setPostToDelete(null)} disabled={isDeleting}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeletePostConfirm} disabled={isDeleting}>
                              {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </article>
              ))
            }
             {!postsLoading && !postsError && displayPosts.length === 0 && (
               <p className="text-muted-foreground text-center py-4">No posts in this topic yet. Be the first to contribute!</p>
             )}
          </div>

          <Separator className="my-6" />

          <h2 className="text-xl font-semibold mb-4">Add a New Post</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="post-content">Your Message</FormLabel>
                    <FormControl>
                      <Textarea
                        id="post-content"
                        placeholder="Share your thoughts..."
                        className="resize-none"
                        rows={5}
                        {...field}
                        disabled={isPosting || !currentUserId}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPosting || !currentUserId} className="w-full sm:w-auto">
                {isPosting ? (
                    <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Posting... </>
                ) : (
                    <> <Send className="mr-2 h-4 w-4" /> Submit Post </>
                )}
              </Button>
              {!currentUserId && <p className="text-xs text-destructive">Login required to post.</p>}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

function PostSkeleton() {
    return (
        <div className="flex items-start space-x-4 animate-pulse">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-12 w-full" />
            </div>
        </div>
    );
}

function TopicPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-32 mb-4" />
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-5 w-full" />
        </CardHeader>
        <CardContent>
           <Separator className="my-6" />
           <Skeleton className="h-6 w-24 mb-4" />
           <div className="space-y-6 mb-8">
             <PostSkeleton />
             <PostSkeleton />
           </div>
            <Separator className="my-6" />
            <Skeleton className="h-6 w-36 mb-4" />
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-10 w-32" />
        </CardContent>
      </Card>
    </div>
  );
}
