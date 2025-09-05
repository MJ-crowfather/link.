'use server';

/**
 * @fileOverview Provides a one-word initial clue related to the target word at the beginning of the game.
 *
 * - generateInitialClue - A function that generates the initial clue.
 * - GenerateInitialClueInput - The input type for the generateInitialClue function.
 * - GenerateInitialClueOutput - The return type for the generateInitialClue function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialClueInputSchema = z.object({
  targetWord: z.string().describe('The 5-letter target word for the game.'),
});
export type GenerateInitialClueInput = z.infer<typeof GenerateInitialClueInputSchema>;

const GenerateInitialClueOutputSchema = z.object({
  initialClue: z.string().describe('A one-word clue related to the target word.'),
});
export type GenerateInitialClueOutput = z.infer<typeof GenerateInitialClueOutputSchema>;

export async function generateInitialClue(input: GenerateInitialClueInput): Promise<GenerateInitialClueOutput> {
  return generateInitialClueFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInitialCluePrompt',
  input: {schema: GenerateInitialClueInputSchema},
  output: {schema: GenerateInitialClueOutputSchema},
  prompt: `Given the target word: {{{targetWord}}}, provide a one-word clue that is contextually related to the word. The clue should be a single word.`, 
});

const generateInitialClueFlow = ai.defineFlow(
  {
    name: 'generateInitialClueFlow',
    inputSchema: GenerateInitialClueInputSchema,
    outputSchema: GenerateInitialClueOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
