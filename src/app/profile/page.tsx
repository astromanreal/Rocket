
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Edit3, Save, Loader2, AlertCircle, MessageSquare, CornerDownRight, Rocket, Library } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import {
    getUserProfile,
    updateUserProfile,
    type UserProfile,
    type UserProfilePost,
    getCurrentUserId,
    getExploredRockets
} from '@/services/user-data';
import type { Rocket as RocketType } from '@/services/rocket-data';
import { slugify } from '@/services/rocket-data';
import { getPostsByUser } from '@/services/forum-data';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';
const profilePageUrl = `${siteUrl}/profile`;

const ProfileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters.').max(30, 'Username cannot exceed 30 characters.'),
  bio: z.string().max(200, 'Bio cannot exceed 200 characters.').optional().nullable(),
});

function ProfilePageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="items-center text-center border-b pb-6">
          <Skeleton className="h-32 w-32 rounded-full mb-4" />
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-5 w-64" />
        </CardHeader>
        <CardContent className="pt-8 space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-36" />
            <Skeleton className="h-9 w-28" />
          </div>
          <div className="space-y-4">
            <ProfilePostSkeleton />
            <ProfilePostSkeleton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProfilePostSkeleton() {
  return (
    <div className="flex flex-col p-4 border rounded-lg bg-muted/20 animate-pulse space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/4" />
    </div>
  );
}


export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userPosts, setUserPosts] = useState<UserProfilePost[]>([]);
  const [exploredRockets, setExploredRockets] = useState<RocketType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [postsLoading, setPostsLoading] = useState(true);
  const [exploredLoading, setExploredLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postsError, setPostsError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      username: '',
      bio: '',
    },
  });

  useEffect(() => {
    async function fetchUserId() {
      try {
        const currentUserId = await getCurrentUserId();
        setUserId(currentUserId);
      } catch (err) {
        console.error("Failed to get current user ID:", err);
        setError('Could not identify current user.');
        setIsLoading(false);
        setPostsLoading(false);
        setExploredLoading(false);
      }
    }
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) { // Only run if userId is available
        document.title = `User Profile - ${userProfile?.username || 'Loading...'} | Rocketpedia`;

        let canonicalLink = document.querySelector("link[rel='canonical']");
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', profilePageUrl);

        const setMetaTag = (type: 'property' | 'name', key: string, content: string) => {
            let element = document.querySelector(`meta[${type}='${key}']`) as HTMLMetaElement;
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(type, key);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        setMetaTag('property', 'og:title', `User Profile - ${userProfile?.username || 'User'} | Rocketpedia`);
        setMetaTag('property', 'og:description', `View ${userProfile?.username || 'user'}'s profile and activity on Rocketpedia.`);
        setMetaTag('property', 'og:url', profilePageUrl);
        setMetaTag('property', 'og:image', userProfile?.avatarUrl || `${siteUrl}/og-profile-default.png`);
        setMetaTag('name', 'twitter:title', `User Profile - ${userProfile?.username || 'User'} | Rocketpedia`);
        setMetaTag('name', 'twitter:description', `View ${userProfile?.username || 'user'}'s profile on Rocketpedia.`);
        setMetaTag('name', 'twitter:image', userProfile?.avatarUrl || `${siteUrl}/twitter-profile-default.png`);
        
        const jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          name: `${userProfile?.username || 'User Profile'} on Rocketpedia`,
          url: profilePageUrl,
          mainEntity: {
            '@type': 'Person',
            name: userProfile?.username || 'User',
            description: userProfile?.bio || 'Rocketpedia community member.',
            image: userProfile?.avatarUrl,
          },
          isPartOf: {
            '@type': 'WebSite',
            url: siteUrl,
            name: 'Rocketpedia'
          }
        };
        
        let script = document.getElementById('profile-page-json-ld');
        if (!script) {
          script = document.createElement('script');
          script.id = 'profile-page-json-ld';
          script.type = 'application/ld+json';
          document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(jsonLd);

        return () => {
            const ldScript = document.getElementById('profile-page-json-ld');
            if (ldScript) ldScript.remove();
        };
    }
  }, [userId, userProfile]);

  useEffect(() => {
    if (!userId) return;

    async function fetchProfileData() {
      setIsLoading(true);
      setError(null);
      try {
        const profile = await getUserProfile(userId);
        if (profile) {
          setUserProfile(profile);
          form.reset({
            username: profile.username,
            bio: profile.bio || '',
          });
        } else {
          setError('Could not load user profile.');
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError('Failed to load profile data.');
      } finally {
        setIsLoading(false);
      }
    }

    async function fetchActivityData() {
        setPostsLoading(true);
        setExploredLoading(true);

        try {
            const posts = await getPostsByUser(userId);
            setUserPosts(posts);
        } catch (err) {
            setPostsError('Failed to load your posts.');
        } finally {
            setPostsLoading(false);
        }

        try {
            const rockets = await getExploredRockets(userId);
            setExploredRockets(rockets);
        } catch (err) {
            console.error("Failed to load explored rockets:", err);
            // Optionally set an error state for explored rockets
        } finally {
            setExploredLoading(false);
        }
    }

    fetchProfileData();
    fetchActivityData();
  }, [userId, form]);

  async function onSubmit(data: z.infer<typeof ProfileSchema>) {
    if (!userId) {
        toast({ title: "Error", description: "Cannot save profile. User ID missing.", variant: "destructive" });
        return;
    }
    setIsSaving(true);
    setError(null);
    try {
      const updatedProfile = await updateUserProfile(userId, { username: data.username, bio: data.bio });
      if (updatedProfile) {
        setUserProfile(updatedProfile);
        form.reset({
          username: updatedProfile.username,
          bio: updatedProfile.bio || '',
        });
        setIsEditing(false);
        toast({ title: "Success", description: "Profile updated successfully." });
      } else {
        setError('Failed to save profile changes.');
        toast({ title: "Error", description: "Could not save profile.", variant: "destructive" });
      }
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError('An unexpected error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (userProfile) {
      form.reset({
        username: userProfile.username,
        bio: userProfile.bio || '',
      });
    }
    setError(null);
  };

  if (isLoading && !userProfile) {
    return <ProfilePageSkeleton />;
  }

  if (error && !userProfile) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Card className="max-w-md mx-auto bg-destructive/10 border-destructive/30">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center justify-center gap-2">
              <AlertCircle className="h-6 w-6" /> Error Loading Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!userProfile) {
    return <div className="container mx-auto px-4 py-12 text-center text-muted-foreground">User profile not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <Card className="max-w-3xl mx-auto animate-launch shadow-xl overflow-hidden">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="bg-card/50 p-6 sm:p-8 text-center relative">
              <Avatar className="h-28 w-28 sm:h-32 sm:w-32 mx-auto mb-4 border-4 border-background shadow-lg ring-2 ring-primary">
                <AvatarImage src={userProfile.avatarUrl} alt={`${userProfile.username}'s avatar`} data-ai-hint="user profile avatar" />
                <AvatarFallback className="text-5xl bg-muted">
                  {userProfile.username ? userProfile.username.substring(0, 1).toUpperCase() : <User />}
                </AvatarFallback>
              </Avatar>
              {!isEditing ? (
                <>
                  <CardTitle className="text-2xl sm:text-3xl font-bold">{userProfile.username}</CardTitle>
                  <p className="text-sm sm:text-base text-muted-foreground pt-1 max-w-md mx-auto whitespace-pre-wrap">
                    {userProfile.bio || 'No bio provided.'}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6"
                    disabled={isLoading}
                  >
                    <Edit3 className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </>
              ) : (
                <div className="w-full max-w-md mx-auto space-y-4 mt-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="username" className="sr-only">Username</FormLabel>
                        <FormControl>
                          <Input
                            id="username"
                            placeholder="Your Username"
                            className="text-center text-xl sm:text-2xl font-bold"
                            {...field}
                            disabled={isSaving}
                          />
                        </FormControl>
                        <FormMessage className="text-center" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="bio" className="sr-only">Bio</FormLabel>
                        <FormControl>
                          <Textarea id="bio" placeholder="Tell us about yourself..." {...field} value={field.value ?? ''} disabled={isSaving} rows={3} className="text-sm" />
                        </FormControl>
                        <FormDescription className="text-xs text-left">
                          Briefly introduce yourself (max 200 characters).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {error && isEditing && (
                    <p className="text-sm text-destructive text-center mt-2">{error}</p>
                  )}
                </div>
              )}
            </CardHeader>

            {!isEditing && (
              <CardContent className="p-6 sm:p-8">
                <Tabs defaultValue="activity" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="activity"><MessageSquare className="mr-2 h-4 w-4" />Forum Activity</TabsTrigger>
                    <TabsTrigger value="explored"><Library className="mr-2 h-4 w-4" />Explored Rockets</TabsTrigger>
                  </TabsList>
                  <TabsContent value="activity" className="mt-4">
                    {postsLoading && <div className="space-y-3"><ProfilePostSkeleton /><ProfilePostSkeleton /></div>}
                    {!postsLoading && postsError && <p className="text-sm text-destructive text-center bg-destructive/10 p-3 rounded-md">{postsError}</p>}
                    {!postsLoading && !postsError && userPosts.length === 0 && <p className="text-sm text-muted-foreground text-center bg-muted/30 p-4 rounded-md">You haven't made any posts yet.</p>}
                    {!postsLoading && !postsError && userPosts.length > 0 && (
                      <ScrollArea className="h-72 pr-3">
                        <div className="space-y-3">
                          {userPosts.map(post => (
                            <Link key={post.postId} href={`/forum/topic/${post.topicId}#post-${post.postId}`} passHref>
                              <div className="block p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors cursor-pointer group">
                                <p className="text-sm line-clamp-2 mb-1.5 group-hover:text-primary">{post.content}</p>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <span>{post.formattedTimestamp}</span>
                                  <span className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    View Post <CornerDownRight className="ml-1 h-3 w-3" />
                                  </span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </TabsContent>
                  <TabsContent value="explored" className="mt-4">
                    {exploredLoading && <div className="space-y-3"><ProfilePostSkeleton /><ProfilePostSkeleton /></div>}
                    {!exploredLoading && exploredRockets.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground bg-muted/30 rounded-md">
                            <Rocket className="mx-auto h-10 w-10 mb-3" />
                            <p className="font-semibold">Your Hangar is Empty</p>
                            <p className="text-xs">Start exploring rockets and track them here!</p>
                             <Link href="/explore" passHref>
                               <Button variant="link" className="mt-2">Explore Rockets</Button>
                             </Link>
                        </div>
                    )}
                    {!exploredLoading && exploredRockets.length > 0 && (
                         <ScrollArea className="h-72 pr-3">
                            <div className="space-y-3">
                                {exploredRockets.sort((a,b) => a.name.localeCompare(b.name)).map(rocket => (
                                     <Link key={rocket.id} href={`/explore/${slugify(rocket.name)}`} passHref>
                                        <div className="block p-3 border rounded-lg bg-card hover:bg-muted/50 transition-colors cursor-pointer group">
                                           <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                   <Image src={rocket.imageUrl || 'https://placehold.co/100x100.png'} alt={rocket.name} width={40} height={40} className="rounded-md object-cover" data-ai-hint="rocket" />
                                                   <div>
                                                        <p className="font-semibold group-hover:text-primary">{rocket.name}</p>
                                                        <p className="text-xs text-muted-foreground">{rocket.operator}</p>
                                                   </div>
                                                </div>
                                                <Badge variant="outline">{rocket.status}</Badge>
                                           </div>
                                        </div>
                                     </Link>
                                ))}
                            </div>
                         </ScrollArea>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            )}

            {isEditing && (
              <CardFooter className="flex flex-col sm:flex-row justify-end gap-2 p-6 sm:p-8 border-t bg-muted/30">
                <Button type="button" variant="outline" onClick={handleCancelEdit} disabled={isSaving} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving} className="w-full sm:w-auto">
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            )}
          </form>
        </Form>
      </Card>
    </div>
  );
}
