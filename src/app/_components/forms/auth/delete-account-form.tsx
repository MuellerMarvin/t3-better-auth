"use client";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useRouter } from "next/navigation";
import { DeleteAccountDialog } from "../../dialogs/auth/delete-account-dialog";

export function DeleteAccountForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset your password</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-6">
              <DeleteAccountDialog>
                <Button type="submit" className="w-full" variant="destructive">
                  Delete Your Account
                </Button>
              </DeleteAccountDialog>
            </div>
            <div className="text-center text-sm">
              Changed your mind ?{" "}
              <a
                className="underline underline-offset-4"
                onClick={() => router.back()}
              >
                Go back
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
