import { getDailyWord, getDayOfYear } from "@/lib/words";
import { generateInitialClue } from "@/ai/flows/generate-initial-clue";
import { GameClient } from "@/components/game/game-client";

export default async function Home() {
  const targetWord = getDailyWord();
  const dayNumber = getDayOfYear();
  let initialClue = "Let's begin...";

  try {
    const clueResult = await generateInitialClue({ targetWord });
    initialClue = clueResult.initialClue;
  } catch (error) {
    console.error("Failed to generate initial clue:", error);
    // Use a default clue if the AI call fails.
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-8 md:p-12 bg-background">
      <GameClient
        targetWord={targetWord}
        initialClue={initialClue}
        dayNumber={dayNumber}
      />
    </main>
  );
}
