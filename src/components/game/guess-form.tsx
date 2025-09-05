"use client";

import { useEffect } from "react";
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

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      event.preventDefault();
      const pastedData = event.clipboardData?.getData("text");
      if (pastedData && /^[a-zA-Z]{5}$/.test(pastedData)) {
        form.setValue("guess", pastedData.toUpperCase().slice(0, 5), {
          shouldValidate: true,
        });
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [form]);

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values.guess.toUpperCase());
    form.reset();
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
                <div className="flex items-center justify-center gap-1 sm:gap-3">
                  <LetterInput
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="h-12 w-12 sm:h-14 sm:w-14 shrink-0"
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
