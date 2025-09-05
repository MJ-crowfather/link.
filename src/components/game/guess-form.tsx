"use client";

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
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";
import type { FC } from "react";

const formSchema = z.object({
  guess: z
    .string()
    .length(5, "Must be 5 letters")
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
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values.guess.toUpperCase());
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="guess"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="GUESS"
                    {...field}
                    maxLength={5}
                    autoComplete="off"
                    className="text-center text-2xl h-16 tracking-[0.3em] uppercase font-bold placeholder:font-medium placeholder:tracking-normal"
                    disabled={isLoading}
                    onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12"
                    disabled={isLoading || !form.formState.isValid}
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
              <FormMessage className="text-center"/>
            </FormItem>
          )}
        />
        <p className="text-center text-sm text-muted-foreground">
          {remainingGuesses} {remainingGuesses === 1 ? "guess" : "guesses"}{" "}
          remaining
        </p>
      </form>
    </Form>
  );
};
