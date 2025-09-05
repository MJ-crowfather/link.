"use client";

import { useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Send } from "lucide-react";
import type { FC } from "react";
import { LetterInput } from "./letter-input";

const formSchema = z.object({
  guess: z
    .string()
    .trim()
    .length(5, "Guess must be 5 letters")
    .regex(/^[A-Z]+$/i, "Only letters allowed"),
});

interface GuessFormProps {
  onSubmit: (word: string) => void;
  isLoading: boolean;
  remainingGuesses: number;
}

export const GuessForm: FC<GuessFormProps> = ({
  onSubmit,
  isLoading,
  remainingGuesses,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guess: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  // 🔑 NEW: Ref to LetterInput container for focusing first input
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      event.preventDefault();
      const pastedData = event.clipboardData?.getData("text");
      if (pastedData && /^[a-zA-Z]{5}$/.test(pastedData)) {
        form.setValue("guess", pastedData.toUpperCase(), {
          shouldValidate: true,
        });
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [form]);

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values.guess.toUpperCase());
    form.reset();

    // 🔑 After reset, focus first letter box
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 10);
  }

  const isSubmitDisabled =
    isLoading || form.watch("guess").trim().length < 5;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="guess"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center gap-3">
                  <LetterInput
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isLoading}
                    // Pass ref to first input
                    firstInputRef={firstInputRef}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="h-14 w-14 shrink-0"
                    disabled={isSubmitDisabled}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Send />
                    )}
                    <span className="sr-only">Submit Guess</span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-center pt-2" />
            </FormItem>
          )}
        />
        <p className="text-center text-sm text-muted-foreground">
          {remainingGuesses}{" "}
          {remainingGuesses === 1 ? "guess" : "guesses"} remaining
        </p>
      </form>
    </Form>
  );
};
