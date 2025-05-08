'use client';

import { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea'; // Use Textarea for multiline questions
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';
import { rocketExpert, type RocketExpertOutput } from '@/ai/flows/rocket-expert'; // Import the AI function

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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setError(null);
    setAnswer(null); // Clear previous answer

    try {
      const result = await rocketExpert({ question: data.question });
      setAnswer(result);
    } catch (err) {
      console.error('Error calling AI expert:', err);
      setError('Sorry, I encountered an error trying to answer your question. Please try again.');
      // Consider more specific error handling if needed
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
                        rows={4} // Adjust rows as needed
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
