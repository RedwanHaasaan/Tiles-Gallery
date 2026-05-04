"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

export function useRequireAuth(redirectTo = "/login") {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("You must be logged in to view this page");
      router.replace(redirectTo);
    }
  }, [session, isPending, router, redirectTo]);

  const shouldRender = !isPending && !!session;

  return { shouldRender };
}