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

  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, 5);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const targetValue = e.target.value.toUpperCase();
    const newValue = Array.from(value || "     ");
    newValue[index] = targetValue.length > 0 ? targetValue.slice(-1) : " ";
    onChange(newValue.join(""));

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
      if (value[index] === " " || !value[index]) {
        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
        }
      } else {
        const newValue = Array.from(value);
        newValue[index] = " ";
        onChange(newValue.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 4) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          maxLength={1}
          value={value?.[i] || ""}
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
