import type { FC } from "react";
import type { Guess } from "./game-client";
import { ArrowDown } from "lucide-react";

interface GuessListProps {
  initialClue: string;
  guesses: Guess[];
}

const CluePill: FC<{ text: string }> = ({ text }) => (
  <div className="bg-accent/80 text-accent-foreground rounded-full px-4 py-2 text-center text-base font-semibold italic shadow-sm">
    "{text}"
  </div>
);

const GuessPill: FC<{ text: string }> = ({ text }) => (
  <div className="bg-card text-card-foreground rounded-lg px-4 py-3 text-center text-xl font-bold tracking-widest shadow-md border">
    {text.toUpperCase()}
  </div>
);

const ChainConnector: FC = () => (
  <div className="flex justify-center items-center h-8">
    <ArrowDown className="w-5 h-5 text-muted-foreground" />
  </div>
);

export const GuessList: FC<GuessListProps> = ({ initialClue, guesses }) => {
  return (
    <div className="flex flex-col items-center w-full space-y-2">
      <CluePill text={initialClue} />
      {guesses.map((guess, index) => (
        <div key={index} className="flex flex-col items-center w-full">
          <ChainConnector />
          <GuessPill text={guess.word} />
          {guess.clue && guess.clue !== "Correct!" && (
            <>
              <ChainConnector />
              <CluePill text={guess.clue} />
            </>
          )}
        </div>
      ))}
    </div>
  );
};
