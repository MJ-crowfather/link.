'use server';
/**
 * @fileOverview Generates a contextual link clue between a user's guess and the target word.
 *
 * - generateContextualLinkClue - A function that generates the contextual link clue.
 * - GenerateContextualLinkClueInput - The input type for the generateContextualLinkClue function.
 * - GenerateContextualLinkClueOutput - The return type for the generateContextualLinkClue function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContextualLinkClueInputSchema = z.object({
  guess: z.string().describe('The user\'s 5-letter word guess.'),
  targetWord: z.string().describe('The 5-letter target word.'),
});
export type GenerateContextualLinkClueInput = z.infer<typeof GenerateContextualLinkClueInputSchema>;

const GenerateContextualLinkClueOutputSchema = z.object({
  linkClue: z.string().describe('A 1-2 word contextual link clue between the guess and the target word.'),
});
export type GenerateContextualLinkClueOutput = z.infer<typeof GenerateContextualLinkClueOutputSchema>;

export async function generateContextualLinkClue(input: GenerateContextualLinkClueInput): Promise<GenerateContextualLinkClueOutput> {
  return generateContextualLinkClueFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContextualLinkCluePrompt',
  input: {schema: GenerateContextualLinkClueInputSchema},
  output: {schema: GenerateContextualLinkClueOutputSchema},
  prompt: `Given the user's guess and the target word, generate a contextual link clue (1-2 words) that hints at the target word based on the guess.

User's Guess: {{{guess}}}
Target Word: {{{targetWord}}}

Contextual Link Clue:`, // Ensure the output is only the clue.
});

const generateContextualLinkClueFlow = ai.defineFlow(
  {
    name: 'generateContextualLinkClueFlow',
    inputSchema: GenerateContextualLinkClueInputSchema,
    outputSchema: GenerateContextualLinkClueOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
