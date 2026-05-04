"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export function useRedirectIfAuthenticated(defaultRedirect = "/") {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  // read redirect from URL
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    if (!isPending && session) {
      // safety: only allow internal paths
      const safe = redirect && redirect.startsWith("/") ? redirect : defaultRedirect;
      router.replace(safe);
    }
  }, [session, isPending, router, redirect, defaultRedirect]);

  // render page only if not logged in and not loading
  return { shouldRender: !isPending && !session };
}