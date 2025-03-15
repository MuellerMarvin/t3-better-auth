"use client";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authClient } from "~/lib/auth-client";
import { useState } from "react";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export function PasswordResetForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [success, setSuccess] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error } = await authClient.forgetPassword({
      email: values.email,
    });

    if (error) {
      console.error(error);
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return <Success />;
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset your password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id="name"
                              type="email"
                              placeholder="email@example.com"
                              required
                            />
                          </FormControl>
                          <FormDescription>
                            Enter your email address to reset your password
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Reset Password
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Remembered your password afterall ?{" "}
                  <a
                    href="/auth/signin"
                    className="underline underline-offset-4"
                  >
                    Sign in
                  </a>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

function Success() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">Password reset email sent ✅</h1>
      <p className="text-sm text-muted-foreground">
        Please check your email for instructions on resetting your password.
      </p>
      <div className="text-center text-sm">
        <Link href="/" className="underline underline-offset-4">
          Return home
        </Link>
      </div>
    </div>
  );
}
