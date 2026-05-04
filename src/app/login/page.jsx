import LoginClient from "@/components/Login/LoginClient";
import { Suspense } from "react";
export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginClient />
  </Suspense>
  );
}