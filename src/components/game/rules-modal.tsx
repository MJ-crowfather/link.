"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";

export const RulesModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-6 w-6 text-foreground/70 hover:text-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>How to Play</DialogTitle>
          <DialogDescription>
            Guess the secret 5-letter word in 5 tries.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-sm text-foreground/80">
          <p>
            You have 5 attempts to guess the daily target word.
          </p>
          <p>
            After each guess, you will receive a 1-2 word clue that forms a "link" between your word and the target word.
          </p>
          <p>
            Use these contextual clues to get closer to the solution with each attempt.
          </p>
          <p>Good luck!</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
