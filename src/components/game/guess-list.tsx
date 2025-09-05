import type { FC } from "react";
import type { Guess } from "./game-client";
import { ArrowDown } from "lucide-react";

interface GuessListProps {
  initialClue: string;
  guesses: Guess[];
}

const ClueText: FC<{ text: string }> = ({ text }) => (
  <div className="text-secondary-foreground/80 text-center text-base font-semibold italic">
    The clue is {text}
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
      <ClueText text={initialClue} />
      {guesses.map((guess, index) => (
        <div key={index} className="flex flex-col items-center w-full">
          <ChainConnector />
          <GuessWord text={guess.word} />
          {guess.clue && guess.clue !== "Correct!" && (
            <>
              <ChainConnector />
              <ClueText text={guess.clue} />
            </>
          )}
        </div>
      ))}
    </div>
  );
};
