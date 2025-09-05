import type { FC } from "react";
import type { Guess } from "./game-client";
import { ArrowDown } from "lucide-react";

interface GuessListProps {
  initialClue: string;
  guesses: Guess[];
}

const CluePill: FC<{ text: string }> = ({ text }) => (
  <div className="bg-secondary text-secondary-foreground rounded-full px-4 py-2 text-center text-base font-semibold italic shadow-sm">
    "{text}"
  </div>
);

const GuessWord: FC<{ text: string }> = ({ text }) => (
  <div className="flex justify-center gap-2">
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className="w-14 h-14 bg-card border-2 border-border flex items-center justify-center text-3xl font-bold rounded-md"
      >
        {text[i]?.toUpperCase()}
      </div>
    ))}
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
          <GuessWord text={guess.word} />
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
