"use client";

import { useRef, useEffect } from "react";
import type { FC } from "react";
import { cn } from "@/lib/utils";

interface LetterInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export const LetterInput: FC<LetterInputProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const letters = Array.from({ length: 5 }, (_, i) => value?.[i] ?? "");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const targetValue = e.target.value.toUpperCase().slice(-1);
    const newChars = [...letters];
    newChars[index] = targetValue;
    onChange(newChars.join(""));

    // Move to next input
    if (targetValue && index < 4) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const newChars = [...letters];
      if (!letters[index] && index > 0) {
        // Go back to previous input if current is empty
        inputsRef.current[index - 1]?.focus();
      } else {
        newChars[index] = "";
        onChange(newChars.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 4) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {letters.map((char, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          maxLength={1}
          value={char}
          onChange={(e) => handleInputChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          className={cn(
            "w-14 h-14 text-center text-3xl font-bold uppercase rounded-md",
            "bg-input border-2 border-border focus:border-primary focus:ring-2 focus:ring-ring focus:outline-none",
            "transition-all duration-200"
          )}
          autoComplete="off"
        />
      ))}
    </div>
  );
};
