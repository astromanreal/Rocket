
// src/app/forum/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, PlusCircle, ChevronRight, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { getTopics } from '@/services/forum-data';
import { formatRelativeTime } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';
const forumPageUrl = `${siteUrl}/forum`;

interface ForumTopicJson {
  id: string;
  title: string;
  description: string;
  postCount: number;
  lastPostTimestamp: string | null;
}

export default function ForumPage() {
  const [topics, setTopics] = useState<ForumTopicJson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreatePostDialogOpen, setIsCreatePostDialogOpen] = useState(false);
  const [selectedTopicForNewPost, setSelectedTopicForNewPost] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    document.title = 'Community Forum - Rocket Discussions & Space Exploration | Rocketpedia';
    
    // Add canonical link tag
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', forumPageUrl);

    // Add OpenGraph and Twitter meta tags
    const setMetaTag = (type: 'property' | 'name', key: string, content: string) => {
        let element = document.querySelector(`meta[${type}='${key}']`) as HTMLMetaElement;
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute(type, key);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    };

    setMetaTag('property', 'og:title', 'Community Forum | Rocketpedia');
    setMetaTag('property', 'og:description', 'Join discussions on rockets, space exploration, missions, and technology with fellow enthusiasts.');
    setMetaTag('property', 'og:url', forumPageUrl);
    setMetaTag('property', 'og:image', `${siteUrl}/og-forum.png`); // Placeholder image
    setMetaTag('name', 'twitter:title', 'Community Forum | Rocketpedia');
    setMetaTag('name', 'twitter:description', 'Discuss space with the Rocketpedia community.');
    setMetaTag('name', 'twitter:image', `${siteUrl}/twitter-forum.png`); // Placeholder image

  }, []);

  useEffect(() => {
    async function loadTopics() {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedTopics = await getTopics();
        setTopics(fetchedTopics);
      } catch (err) {
        console.error("Failed to fetch forum topics:", err);
        setError("Could not load forum topics. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    loadTopics();
  }, []);

  useEffect(() => {
    if (topics.length > 0 && !isLoading) {
      const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage', // This page lists multiple forum topics
        name: 'Rocketpedia Community Forum - Main Page',
        description: 'Discuss rockets, space exploration, missions, and technology with fellow enthusiasts. Browse topics and join conversations.',
        url: forumPageUrl,
        keywords: "space forum, rocket discussion, astronaut community, space exploration topics, rocket science chat",
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: topics.map((topic, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: { // Each item in the list is essentially a link to a DiscussionForumPosting
              '@type': 'WebPage', // Could also be 'DiscussionForumPosting' if you want to inline some info
              name: topic.title,
              description: topic.description,
              url: `${siteUrl}/forum/topic/${topic.id}`,
            }
          }))
        },
        isPartOf: {
            '@type': 'WebSite',
            url: siteUrl,
            name: 'Rocketpedia'
        }
      };

      let script = document.getElementById('forum-list-json-ld');
      if (!script) {
        script = document.createElement('script');
        script.id = 'forum-list-json-ld';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);

      return () => {
        const ldScript = document.getElementById('forum-list-json-ld');
        if (ldScript) ldScript.remove();
      };
    }
  }, [topics, isLoading]);

  const formatLastPost = (timestamp: string | null): string => {
    if (!timestamp) return 'No posts yet';
    return formatRelativeTime(new Date(timestamp));
  };

  const handleProceedToTopic = () => {
    if (selectedTopicForNewPost) {
      setIsCreatePostDialogOpen(false);
      router.push(`/forum/topic/${selectedTopicForNewPost}`);
    } else {
      toast({
        title: "No Topic Selected",
        description: "Please select a topic to continue.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto animate-launch">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-center sm:text-left">
              <MessageSquare className="mx-auto sm:mx-0 h-12 w-12 text-primary mb-2" />
              <CardTitle className="text-3xl font-bold">Community Forum</CardTitle>
              <CardDescription>
                Discuss rockets, space exploration, and connect with fellow enthusiasts.
              </CardDescription>
            </div>
            <Dialog open={isCreatePostDialogOpen} onOpenChange={(isOpen) => {
                setIsCreatePostDialogOpen(isOpen);
                if (!isOpen) setSelectedTopicForNewPost(null); 
            }}>
              <DialogTrigger asChild>
                <Button disabled={isLoading || topics.length === 0}> 
                  <PlusCircle className="mr-2 h-4 w-4" /> Create New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Post</DialogTitle>
                  <DialogDescription>
                    Select a topic below to create your new post in.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="topic-select" className="text-right col-span-1">
                      Topic
                    </Label>
                    <Select
                        value={selectedTopicForNewPost ?? undefined} 
                        onValueChange={(value) => setSelectedTopicForNewPost(value)}
                    >
                      <SelectTrigger id="topic-select" className="col-span-3">
                        <SelectValue placeholder="Select a topic..." />
                      </SelectTrigger>
                      <SelectContent>
                        {topics.map((topic) => (
                          <SelectItem key={topic.id} value={topic.id}>
                            {topic.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                  <Button onClick={handleProceedToTopic} disabled={!selectedTopicForNewPost}>
                    <CheckCircle className="mr-2 h-4 w-4" /> Proceed to Topic
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="my-4" />

          {isLoading && (
            <div className="text-center py-8">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary mb-2" />
              <p className="text-muted-foreground">Loading topics...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-destructive">
              <AlertCircle className="mx-auto h-8 w-8 mb-2" />
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && topics.length > 0 ? (
            <ScrollArea className="h-[500px] w-full pr-4">
              <div className="space-y-3">
                {topics.map((topic) => (
                  <Card key={topic.id} className="hover:shadow-md hover:border-primary/50 transition-all duration-200 ease-in-out">
                    <Link href={`/forum/topic/${topic.id}`} passHref>
                      <div className="p-4 flex items-center justify-between cursor-pointer group">
                        <div className="flex-1 mr-4">
                          <h3 className="font-semibold text-lg text-primary group-hover:underline">{topic.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{topic.description}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1.5">
                            <span>Posts: {topic.postCount}</span>
                            <span>Last post: {formatLastPost(topic.lastPostTimestamp)}</span>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          ) : (
            !isLoading && !error && (
              <div className="text-center text-muted-foreground py-8">
                <MessageSquare className="mx-auto h-12 w-12 mb-4" />
                <p>No forum topics available yet. Check back soon!</p>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
