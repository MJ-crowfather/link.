"use client";

import { useState, useTransition } from "react";
import type { FC } from "react";
import { Header } from "@/components/game/header";
import { GuessList } from "@/components/game/guess-list";
import { GuessForm } from "@/components/game/guess-form";
import { GameEndModal } from "@/components/game/game-end-modal";
import { handleGuess } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

export type Guess = {
  word: string;
  clue: string;
};

type GameStatus = "playing" | "won" | "lost";

interface GameClientProps {
  targetWord: string;
  initialClue: string;
  dayNumber: number;
}

export const GameClient: FC<GameClientProps> = ({
  targetWord,
  initialClue,
  dayNumber,
}) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [isGameEndModalOpen, setGameEndModalOpen] = useState(false);

  const maxGuesses = 5;
  const remainingGuesses = maxGuesses - guesses.length;

  const onGuessSubmit = (word: string) => {
    if (gameStatus !== "playing") return;

    startTransition(async () => {
      try {
        const result = await handleGuess(word, targetWord);
        const newGuess: Guess = { word, clue: result.clue };
        const newGuesses = [...guesses, newGuess];
        setGuesses(newGuesses);

        if (result.status === "win") {
          setGameStatus("won");
          setGameEndModalOpen(true);
        } else if (newGuesses.length >= maxGuesses) {
          setGameStatus("lost");
          setGameEndModalOpen(true);
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Could not process your guess. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <>
      <Header />
      <GuessList initialClue={initialClue} guesses={guesses} />

      {gameStatus === "playing" ? (
        <GuessForm
          onSubmit={onGuessSubmit}
          isLoading={isPending}
          remainingGuesses={remainingGuesses}
        />
      ) : (
        <div className="text-center text-lg font-semibold text-foreground/80 py-4">
          {gameStatus === "won"
            ? "You got it!"
            : `The word was ${targetWord}.`}
        </div>
      )}

      <GameEndModal
        isOpen={isGameEndModalOpen}
        onClose={() => setGameEndModalOpen(false)}
        status={gameStatus}
        guesses={guesses}
        targetWord={targetWord}
        dayNumber={dayNumber}
      />
    </>
  );
};
