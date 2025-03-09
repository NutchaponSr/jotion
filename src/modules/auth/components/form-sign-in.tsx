"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import {
  SignInSchema,
  SignInSchemaType
} from "@/modules/auth/schema/sign-in";

import { FormError } from "@/components/form-error";
import { ClearableInput } from "@/components/clearable-input";

export const SignInForm = () => {
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");
  const urlError = searchParams.get("error") === "CredentialsSignin" 
    ? "Invalid email or password"
    : ""

  const [error, setError] = useState<string | undefined>("");

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (value: SignInSchemaType) => {
    setError("");

    signIn("credentials", {
      email: value.email,
      password: value.password,
      redirectTo: callbackUrl || DEFAULT_SIGNIN_REDIRECT,
    }).catch(() => {
      setError("An unexpected error occurred. Please try again.");
    });
  }

  return (
    <Form {...form}>
      <form className="w-full flex flex-col space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <FormField 
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-sm text-[#787774]">Email</FormLabel>
                <FormControl>
                  <ClearableInput
                    {...field}
                    type="email"
                    placeholder="john.doe@example.com"
                    onClear={() => form.setValue("email", "")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-sm text-[#787774]">Password</FormLabel>
                <FormControl>
                  <ClearableInput
                    {...field}
                    type="password"
                    placeholder="******"
                    onClear={() => form.setValue("password", "")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-1">
          <FormError message={error || urlError} />
          <div className="text-[#acaba9] text-xs mb-[18px] flex text-left">
            Use an organization email to easily collaborate with teammates
          </div>
        </div>
          <Button variant="primary" type="submit">
          Continue
        </Button>
      </form>
    </Form>
  );
}