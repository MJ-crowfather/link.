"use server";

import { generateContextualLinkClue } from "@/ai/flows/generate-contextual-link-clue";
import { z } from "zod";

export type GuessResult = {
  status: "win" | "keep_playing";
  clue: string;
};

const inputSchema = z.object({
  guess: z.string(),
  targetWord: z.string(),
});

export async function handleGuess(
  guess: string,
  targetWord: string
): Promise<GuessResult> {
  const validation = inputSchema.safeParse({ guess, targetWord });
  if (!validation.success) {
    throw new Error("Invalid input.");
  }

  if (guess.toUpperCase() === targetWord.toUpperCase()) {
    return { status: "win", clue: "Correct!" };
  }

  try {
    const result = await generateContextualLinkClue({ guess, targetWord });
    return { status: "keep_playing", clue: result.linkClue };
  } catch (error) {
    console.error("Error generating contextual link clue:", error);
    // Fallback clue if AI fails
    return { status: "keep_playing", clue: "No link found." };
  }
}
