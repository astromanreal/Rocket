'use client';

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
    deletePost, // Import deletePost
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

// Schema for the new post form remains the same
const PostSchema = z.object({
  content: z.string().min(5, 'Post must be at least 5 characters.').max(2000, 'Post cannot exceed 2000 characters.'),
});

// --- TopicPage Component ---
export default function TopicPage() {
  const params = useParams();
  const { toast } = useToast();
  const topicId = params?.topicId as string | undefined;

  // --- State ---
  const [topic, setTopic] = useState<ForumTopicJson | null>(null);
  const [displayPosts, setDisplayPosts] = useState<DisplayPost[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoadingTopic, setIsLoadingTopic] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // State for delete operation
  const [topicError, setTopicError] = useState<string | null>(null);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [postToDelete, setPostToDelete] = useState<string | null>(null); // Store postId for delete confirmation

  // --- Form Handling ---
  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: { content: '' },
  });

  // --- Data Fetching Effects ---

  // Fetch current user ID
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

  // Fetch topic details and posts
  useEffect(() => {
    if (!topicId) {
      setTopicError("Topic ID not found in URL.");
      setIsLoadingTopic(false);
      setPostsLoading(false);
      return;
    }

    async function loadData() {
      setIsLoadingTopic(true);
      setPostsLoading(true);
      setTopicError(null);
      setPostsError(null);

      try {
        // Fetch topic details
        const fetchedTopic = await getTopicById(topicId);
        if (fetchedTopic) {
          setTopic(fetchedTopic);
        } else {
          setTopicError(`Topic "${topicId}" not found.`);
        }
      } catch (err) {
        console.error("Error fetching topic details:", err);
        setTopicError("Failed to load topic details.");
      } finally {
        setIsLoadingTopic(false);
      }

      try {
         // Fetch posts for the topic
        const fetchedPosts = await getPostsByTopic(topicId);
        setDisplayPosts(fetchedPosts);
      } catch (err) {
         console.error("Error fetching posts:", err);
         setPostsError("Failed to load posts for this topic.");
      } finally {
         setPostsLoading(false);
      }
    }

    loadData();
  }, [topicId]);

  // --- Post Submission ---
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

        toast({ title: "Success", description: "Your post has been added." });
        form.reset();
    } catch (error: any) {
        console.error("Error adding post:", error);
        toast({ title: "Error", description: error.message || "Failed to add your post. Please try again.", variant: "destructive" });
    } finally {
        setIsPosting(false);
    }
  }

  // --- Post Deletion ---
  async function handleDeletePostConfirm() {
    if (!topicId || !postToDelete || !currentUserId) {
        toast({ title: "Error", description: "Cannot delete post. Information missing.", variant: "destructive" });
        setPostToDelete(null);
        return;
    }

    // Ensure the user deleting is the author
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
        toast({ title: "Success", description: "Post deleted successfully." });
    } catch (error: any) {
        console.error("Error deleting post:", error);
        toast({ title: "Error", description: error.message || "Failed to delete post.", variant: "destructive" });
    } finally {
        setIsDeleting(false);
        setPostToDelete(null); // Close dialog by resetting
    }
  }


  // --- Rendering Logic ---
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
                <div key={post.id} className="flex items-start space-x-4 group/post" id={`post-${post.id}`}>
                  <Avatar>
                    <AvatarImage src={post.author?.avatarUrl} alt={`${post.author?.username || 'User'}'s avatar`} data-ai-hint="user avatar"/>
                    <AvatarFallback>
                      {post.author?.username ? post.author.username.substring(0, 1).toUpperCase() : <User className="h-4 w-4"/>}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-muted/50 p-4 rounded-md shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-sm">{post.author?.username || 'Unknown User'}</span>
                      <span className="text-xs text-muted-foreground">{post.formattedTimestamp}</span>
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
                </div>
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

// --- Skeleton Loaders ---
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
