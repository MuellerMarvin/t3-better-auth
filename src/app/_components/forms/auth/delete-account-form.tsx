"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { CardContent } from "~/components/ui/card";
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
import { authClient } from "~/lib/auth-client";
import { cn } from "~/lib/utils";

const formSchema = z.object({
  password: z.string(),
});

export function DeleteAccountForm({
  className,
  ...props
}: {
  className?: string;
  props?: React.ComponentPropsWithoutRef<"div">;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error } = await authClient.deleteUser({
      password: values.password,
    });
    if (error) {
      console.log(error);
    } else {
      console.log("Account deleted successfully");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Account Deletion</CardTitle>
          <CardDescription>Delete your account irreversibly.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id="password"
                              type="password"
                              placeholder="********"
                              required
                            />
                          </FormControl>
                          <FormDescription>
                            Enter your password to delete your account
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      variant="destructive"
                      className="w-full"
                    >
                      Delete account
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
            <div className="text-center text-sm">
              Changed your mind ?{" "}
              <a className="underline underline-offset-4" href="/">
                Go back
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
