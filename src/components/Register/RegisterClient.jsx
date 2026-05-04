"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, ImageIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { emailRegex, passwordRegex } from "@/utils/authHelper";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn, signUp } from "@/lib/auth-client";
import { useRedirectIfAuthenticated } from "@/hooks/useRedirectIfAuthenticated";

export default function RegisterClient() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { shouldRender } = useRedirectIfAuthenticated();
  if (!shouldRender) return null;

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { error } = await signUp.email({ name: data.name, email: data.email, password: data.password, image: data.photo || undefined });
      if (error) {
        toast.error(error.message || "Registration failed");
        setShake(true);
        setTimeout(() => setShake(false), 700);
        return;
      }
      toast.success("Account created successfully. Please log in to continue.");
      router.push("/login");
      router.refresh();
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally { setIsLoading(false); }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await signIn.social({ provider: "google", callbackURL: "/" });
      if (error) { toast.error(error.message || "Google sign-in failed"); setIsGoogleLoading(false); }
    } catch (err) { toast.error("Failed to sign in with Google"); console.error(err); setIsGoogleLoading(false); }
  };

  const googleSvg = (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );

  return (
    <div className="min-h-screen flex bg-cream">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className={`w-full max-w-md ${shake ? "animate__animated animate__shakeX" : "animate__animated animate__fadeInUp"}`}>
          {/* Mobile Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <Image src="https://i.ibb.co/4wWTc3y7/tiles-gallery-Logo.png" alt="Logo" width={40} height={40} />
            <span className="text-xl font-bold text-espresso">Tiles Gallery</span>
          </Link>

          <div className="text-center lg:text-left mb-8">
            <h1 className="text-3xl font-bold text-espresso mb-2">Create Account</h1>
            <p className="text-ash">Already have an account?{" "}
              <Link href="/login" className="text-gold hover:underline font-medium">Log in</Link>
            </p>
          </div>

          {/* Google */}
          <button onClick={handleGoogleSignIn} disabled={isGoogleLoading}
            className="btn btn-outline w-full border-tile-border text-espresso hover:bg-stone hover:border-stone mb-6 hover:scale-[1.02] transition-transform duration-200 animate__animated animate__fadeIn stagger-1"
            style={{ animationFillMode: 'both' }}>
            {isGoogleLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : googleSvg}
            Continue with Google
          </button>

          <div className="divider text-ash text-sm">or register with email</div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="form-control animate__animated animate__fadeIn stagger-2" style={{ animationFillMode: 'both' }}>
              <label className="label"><span className="label-text text-espresso font-medium">Full Name</span></label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ash z-10" />
                <input type="text" required placeholder="John Doe" {...register("name")}
                  className="input input-bordered w-full pl-12 bg-white border-tile-border focus:border-gold focus:outline-none transition-colors duration-200" />
              </div>
            </div>

            {/* Email */}
            <div className="form-control animate__animated animate__fadeIn stagger-3" style={{ animationFillMode: 'both' }}>
              <label className="label"><span className="label-text text-espresso font-medium">Email Address</span></label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ash z-10" />
                <input type="email" placeholder="you@example.com"
                  {...register("email", { required: "Email is required", pattern: { value: emailRegex, message: "Invalid email format" } })}
                  className="input input-bordered w-full pl-12 bg-white border-tile-border focus:border-gold focus:outline-none transition-colors duration-200" />
              </div>
              {errors.email && <p className="text-red-500 text-sm animate__animated animate__fadeIn">{errors.email.message}</p>}
            </div>

            {/* Photo URL */}
            <div className="form-control animate__animated animate__fadeIn stagger-4" style={{ animationFillMode: 'both' }}>
              <label className="label">
                <span className="label-text text-espresso font-medium">Photo URL</span>
                <span className="label-text-alt text-ash">Optional</span>
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ash z-10" />
                <input type="url" placeholder="https://example.com/photo.jpg" {...register("photo")}
                  className="input input-bordered w-full pl-12 bg-white border-tile-border focus:border-gold focus:outline-none transition-colors duration-200" />
              </div>
            </div>

            {/* Password */}
            <div className="form-control animate__animated animate__fadeIn stagger-5" style={{ animationFillMode: 'both' }}>
              <label className="label"><span className="label-text text-espresso font-medium">Password</span></label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ash z-10" />
                <input type={showPassword ? "text" : "password"} placeholder="Minimum 8 characters"
                  {...register("password", { required: "Password is required", pattern: { value: passwordRegex, message: "Password must be 8+ chars, include uppercase, lowercase & special character" } })}
                  className="input input-bordered w-full pl-12 pr-12 bg-white border-tile-border focus:border-gold focus:outline-none transition-colors duration-200" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ash hover:text-espresso transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm animate__animated animate__fadeIn">{errors.password.message}</p>}
            </div>

            <p className="text-sm text-ash">
              By creating an account, you agree to our{" "}
              <Link href="#" className="text-gold hover:underline">Terms of Service</Link>{" "}and{" "}
              <Link href="#" className="text-gold hover:underline">Privacy Policy</Link>.
            </p>

            <button type="submit" disabled={isLoading}
              className="btn w-full bg-espresso text-white hover:bg-gold border-none transition-all duration-300 hover:scale-[1.02] animate__animated animate__fadeIn stagger-6"
              style={{ animationFillMode: 'both' }}>
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>Register Account</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-center mt-8 text-ash text-sm">
            <Link href="/" className="hover:text-espresso hover:underline transition-colors duration-200">Back to Home</Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" alt="Beautiful tile patterns" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-l from-espresso/80 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-end p-12">
          <div className="max-w-md text-white text-right animate__animated animate__fadeInRight">
            <Link href="/" className="flex items-center gap-2 mb-8 justify-end">
              <span className="text-2xl font-bold">Tiles Gallery</span>
              <div className="w-12 h-12 bg-[#c9a87cb6] rounded-xl flex items-center justify-center">
                <Image src="https://i.ibb.co/4wWTc3y7/tiles-gallery-Logo.png" alt="Logo" width={100} height={100} />
              </div>
            </Link>
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-gray-300 text-lg">Create an account to save your favorites, track orders, and get exclusive access to new collections.</p>
          </div>
        </div>
      </div>
    </div>
  );
}