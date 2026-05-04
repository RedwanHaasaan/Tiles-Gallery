"use client";

import { useRedirectIfAuthenticated } from "@/hooks/useRedirectIfAuthenticated";
import { signIn } from "@/lib/auth-client";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function LoginClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { error } = await signIn.email({ email: data.email, password: data.password });
      if (error) {
        toast.error(error.message || "Invalid email or password");
        setShake(true);
        setTimeout(() => setShake(false), 700);
        return;
      }
      toast.success("Login successful. Welcome back!");
    } catch { toast.error("Something went wrong."); }
    finally { setIsLoading(false); }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try { await signIn.social({ provider: "google", callbackURL: "/" }); }
    catch { toast.error("Failed to sign in with Google"); setIsGoogleLoading(false); }
  };

  const { shouldRender } = useRedirectIfAuthenticated();
  if (!shouldRender) return null;

  return (
    <div className="min-h-screen flex bg-[#f8f6f3]">
      {/* Left - Image Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6" alt="Marble tiles" fill sizes="50vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2d2926]/80 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-start p-12">
          <div className="max-w-md text-white animate__animated animate__fadeInLeft">
            <Link href="/" className="flex items-center gap-2 mb-8">
              <div className="w-12 h-12 bg-[#c9a87c6a] rounded-lg flex items-center justify-center">
                <Image src="https://i.ibb.co/4wWTc3y7/tiles-gallery-Logo.png" alt="Logo" width={40} height={40} />
              </div>
              <span className="text-2xl font-bold">Tiles Gallery</span>
            </Link>
            <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
            <p className="text-gray-300 text-lg">Log in to access your account and explore our premium tile collection.</p>
          </div>
        </div>
      </div>

      {/* Right - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className={`w-full max-w-md ${shake ? "animate__animated animate__shakeX" : "animate__animated animate__fadeInUp"}`}>
          {/* Mobile Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <Image src="https://i.ibb.co/4wWTc3y7/tiles-gallery-Logo.png" alt="Logo" width={40} height={40} />
            <span className="text-xl font-bold text-[#2d2926]">Tiles Gallery</span>
          </Link>

          <div className="text-center lg:text-left mb-8">
            <h1 className="text-3xl font-bold text-[#2d2926] mb-2">Log In</h1>
            <p className="text-[#6b6b6b]">{"Don't have an account? "}
              <Link href="/register" className="text-[#c9a87c] hover:underline font-medium">Create one</Link>
            </p>
          </div>

          {/* Google */}
          <button type="button" onClick={handleGoogleSignIn} disabled={isGoogleLoading}
            className="btn btn-outline w-full border-[#e0dcd6] text-[#2d2926] hover:bg-[#e8e4df] hover:border-[#e8e4df] mb-6 hover:scale-[1.02] transition-transform duration-200">
            {isGoogleLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Continue with Google
          </button>

          <div className="divider text-[#6b6b6b] text-sm">or Log in with email</div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="form-control animate__animated animate__fadeIn stagger-2" style={{ animationFillMode: 'both' }}>
              <label className="label"><span className="label-text text-[#2d2926] font-medium">Email Address</span></label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b6b] z-10" />
                <input type="email" placeholder="you@example.com"
                  {...register("email", { required: "Email is required" })}
                  className="input input-bordered w-full pl-12 bg-white border-[#e0dcd6] focus:border-[#c9a87c] focus:outline-none transition-colors duration-200" />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1 animate__animated animate__fadeIn">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="form-control animate__animated animate__fadeIn stagger-3" style={{ animationFillMode: 'both' }}>
              <label className="label"><span className="label-text text-[#2d2926] font-medium">Password</span></label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b6b] z-10" />
                <input type={showPassword ? "text" : "password"} placeholder="Enter your password"
                  {...register("password", { required: "Password is required" })}
                  className="input input-bordered w-full pl-12 pr-12 bg-white border-[#e0dcd6] focus:border-[#c9a87c] focus:outline-none transition-colors duration-200" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b6b6b] hover:text-[#2d2926] transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1 animate__animated animate__fadeIn">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isLoading}
              className="btn w-full bg-[#2d2926] text-white hover:bg-[#c9a87c] border-none transition-all duration-300 hover:scale-[1.02] animate__animated animate__fadeIn stagger-4"
              style={{ animationFillMode: 'both' }}>
              {isLoading ? "Logging in..." : "Log In"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center mt-8 text-[#6b6b6b] text-sm">
            <Link href="/" className="hover:text-[#2d2926] hover:underline transition-colors duration-200">Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}