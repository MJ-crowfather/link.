"use client";

import { useRef } from "react";
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

  // The component is now fully controlled by the `value` prop.
  const letters = Array.from({ length: 5 }, (_, i) => value[i] ?? "");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const targetValue = e.target.value.toUpperCase();
    const newChars = [...letters];

    // Handle single character input
    if (targetValue.length === 1) {
      newChars[index] = targetValue;
      onChange(newChars.join(""));

      // Move to next input
      if (index < 4) {
        inputsRef.current[index + 1]?.focus();
      }
    } else if (targetValue.length === 0) {
      // Handle backspace clearing the input
      newChars[index] = "";
      onChange(newChars.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      // If the input is empty, move to the previous one and clear it.
      if (!letters[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 4) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-1 sm:gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          maxLength={1}
          value={letters[i]}
          onChange={(e) => handleInputChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          className={cn(
            "w-12 h-12 sm:w-14 sm:h-14 text-center text-3xl font-bold uppercase rounded-md",
            "bg-input border-2 border-border focus:border-primary focus:ring-2 focus:ring-ring focus:outline-none",
            "transition-all duration-200"
          )}
          autoComplete="off"
        />
      ))}
    </div>
  );
};
