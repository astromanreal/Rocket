
'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';
import { rocketExpert, type RocketExpertOutput } from '@/ai/flows/rocket-expert';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';
const aiExpertPageUrl = `${siteUrl}/ai-expert`;

const FormSchema = z.object({
  question: z.string().min(10, {
    message: 'Question must be at least 10 characters.',
  }).max(500, {
    message: 'Question must not be longer than 500 characters.',
  }),
});

export default function AiExpertPage() {
  const [answer, setAnswer] = useState<RocketExpertOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Ask the AI Rocket Expert - Get Your Space Questions Answered | Rocketpedia';

    // Add canonical link tag
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', aiExpertPageUrl);

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

    setMetaTag('property', 'og:title', 'AI Rocket Expert | Rocketpedia');
    setMetaTag('property', 'og:description', 'Get answers to your complex space and rocket questions from our AI.');
    setMetaTag('property', 'og:url', aiExpertPageUrl);
    setMetaTag('property', 'og:image', `${siteUrl}/og-ai-expert.png`); // Placeholder image
    setMetaTag('name', 'twitter:title', 'AI Rocket Expert | Rocketpedia');
    setMetaTag('name', 'twitter:description', 'Ask our AI about rockets and space!');
    setMetaTag('name', 'twitter:image', `${siteUrl}/twitter-ai-expert.png`); // Placeholder image

    // JSON-LD for WebPage (or QAPage if it evolves to have persistent Q&As)
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebPage', // Could be QAPage if a list of Q&A is presented. For a single interaction, WebPage is fine.
      name: 'Ask the AI Rocket Expert - Get Your Space Questions Answered',
      description: 'Have a question about rockets, propulsion, space history, or orbital mechanics? Ask our AI-powered rocket expert for detailed answers.',
      url: aiExpertPageUrl,
      keywords: ['ai rocket expert', 'ask ai space', 'rocket questions', 'spacecraft ai', 'rocketpedia ai', 'genkit ai'],
       isPartOf: {
        '@type': 'WebSite',
        url: siteUrl,
        name: 'Rocketpedia'
      }
      // If it evolves into a Q&A page, you could add:
      // mainEntity: { '@type': 'Question', name: 'What is your question about rockets?' }
    };

    let script = document.getElementById('ai-expert-json-ld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'ai-expert-json-ld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
    
    return () => { // Cleanup JSON-LD script
        const ldScript = document.getElementById('ai-expert-json-ld');
        if (ldScript) ldScript.remove();
    };

  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const result = await rocketExpert({ question: data.question });
      setAnswer(result);
    } catch (err) {
      console.error('Error calling AI expert:', err);
      setError('Sorry, I encountered an error trying to answer your question. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto animate-launch">
        <CardHeader className="text-center">
          <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold">Ask the Rocket Expert</CardTitle>
          <CardDescription>
            Have a question about rockets, propulsion, or space history? Ask our AI assistant!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Question</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Explain the difference between RP-1 and Methane fuel..."
                        className="resize-none"
                        rows={4}
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your question about rockets (10-500 characters).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Thinking...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" /> Ask Expert
                  </>
                )}
              </Button>
            </form>
          </Form>

          {error && (
            <div className="mt-6 p-4 bg-destructive/10 text-destructive border border-destructive/30 rounded-md text-sm">
              {error}
            </div>
          )}

          {answer && (
            <Card className="mt-8 bg-card/80">
              <CardHeader>
                <CardTitle className="text-xl">Answer:</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{answer.answer}</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
