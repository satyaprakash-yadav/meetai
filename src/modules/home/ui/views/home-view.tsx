"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { authClient } from "@/lib/auth-client";

export const HomeView = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  if (!session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 gap-y-4">
      <p>Logged in as {session.user.name}</p>
      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => router.push("/sign-in"),
            },
          })
        }
      >
        Sign out
      </Button>
    </div>
  );
};
