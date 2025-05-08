'use server';

/**
 * @fileOverview An AI agent that answers questions about rockets.
 *
 * - rocketExpert - A function that handles the question answering process.
 * - RocketExpertInput - The input type for the rocketExpert function.
 * - RocketExpertOutput - The return type for the rocketExpert function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const RocketExpertInputSchema = z.object({
  question: z.string().describe('The question about rockets.'),
});
export type RocketExpertInput = z.infer<typeof RocketExpertInputSchema>;

const RocketExpertOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about rockets.'),
});
export type RocketExpertOutput = z.infer<typeof RocketExpertOutputSchema>;

export async function rocketExpert(input: RocketExpertInput): Promise<RocketExpertOutput> {
  return rocketExpertFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rocketExpertPrompt',
  input: {
    schema: z.object({
      question: z.string().describe('The question about rockets.'),
    }),
  },
  output: {
    schema: z.object({
      answer: z.string().describe('The answer to the question about rockets.'),
    }),
  },
  prompt: `You are an expert on rockets and space launch vehicles. Answer the following question about rockets:\n\nQuestion: {{{question}}}`,
});

const rocketExpertFlow = ai.defineFlow<
  typeof RocketExpertInputSchema,
  typeof RocketExpertOutputSchema
>(
  {
    name: 'rocketExpertFlow',
    inputSchema: RocketExpertInputSchema,
    outputSchema: RocketExpertOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
