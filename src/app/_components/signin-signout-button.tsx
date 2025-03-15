"use client";

import { redirect } from "next/navigation";
import { useSession, authClient } from "~/lib/auth-client";

export default function SignInSignOutButton() {
  const { data: session } = useSession();

  return (
    <button
      onClick={async () => {
        if (session) {
          await authClient.signOut();
          window.location.reload();
        } else {
          redirect("/auth/signin");
        }
      }}
      className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
    >
      {session ? "Sign out" : "Sign in"}
    </button>
  );
}
