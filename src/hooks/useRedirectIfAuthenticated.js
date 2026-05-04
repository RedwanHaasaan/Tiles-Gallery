"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

export function useRedirectIfAuthenticated(redirectTo = "/") {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && session) {
    toast.error("You are already logged in");
      router.replace(redirectTo);
    }
  }, [session, isPending, router, redirectTo]);

  const shouldRender = !isPending && !session;

  return { shouldRender };
}