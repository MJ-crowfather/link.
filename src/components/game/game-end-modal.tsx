"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckCircle2, XCircle, Share2 } from "lucide-react";
import type { FC } from "react";
import type { Guess } from "./game-client";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface GameEndModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: "won" | "lost" | "playing";
  guesses: Guess[];
  targetWord: string;
}

export const GameEndModal: FC<GameEndModalProps> = ({
  isOpen,
  onClose,
  status,
  guesses,
  targetWord,
}) => {
  const { toast } = useToast();
  const [dayNumber, setDayNumber] = useState(1);

  useEffect(() => {
    // This needs to be in useEffect to avoid hydration errors
    const startOfYear = new Date(new Date().getFullYear(), 0, 0);
    const diff = (new Date() as any) - (startOfYear as any);
    const oneDay = 1000 * 60 * 60 * 24;
    setDayNumber(Math.floor(diff / oneDay));
  }, []);

  if (status === "playing") return null;

  const isWin = status === "won";
  const score = guesses.length;

  const handleShare = () => {
    // In a real app, this URL would be dynamic.
    const appUrl = "https://link-word-game.web.app";
    const shareText = `Link #${dayNumber}\nScore: ${
      isWin ? `${score}/5` : "X/5"
    }\n\n${appUrl}`;

    navigator.clipboard
      .writeText(shareText)
      .then(() => {
        toast({ title: "Copied to clipboard!" });
      })
      .catch((err) => {
        toast({
          title: "Failed to copy",
          description: "Could not copy results to clipboard.",
          variant: "destructive",
        });
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="items-center">
          {isWin ? (
            <CheckCircle2 className="w-16 h-16 text-primary" />
          ) : (
            <XCircle className="w-16 h-16 text-destructive" />
          )}
          <DialogTitle className="text-2xl pt-2">
            {isWin ? "Congratulations!" : "Better Luck Next Time!"}
          </DialogTitle>
          <DialogDescription>
            {isWin
              ? `You found the word in ${score} ${
                  score === 1 ? "guess" : "guesses"
                }.`
              : `The word was "${targetWord}".`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleShare} className="w-full">
            <Share2 className="mr-2 h-4 w-4" />
            Share Your Result
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
