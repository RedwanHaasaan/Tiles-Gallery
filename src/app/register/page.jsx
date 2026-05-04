"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  ImageIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { emailRegex, passwordRegex } from "@/utils/authHelper";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="min-h-screen flex bg-[#f8f6f3]">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-10 h-10 flex items-center justify-center">
              <Image
                src="https://i.ibb.co/4wWTc3y7/tiles-gallery-Logo.png"
                alt="Tiles Gallery Logo"
                width={70}
                height={70}
              />
            </div>
            <span className="text-xl font-bold text-[#2d2926]">
              Tiles Gallery
            </span>
          </Link>

          <div className="text-center lg:text-left mb-8">
            <h1 className="text-3xl font-bold text-[#2d2926] mb-2">
              Create Account
            </h1>
            <p className="text-[#6b6b6b]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#c9a87c] hover:underline font-medium"
              >
                Log in
              </Link>
            </p>
          </div>

          {/* Google Button*/}
          <button className="btn btn-outline w-full border-[#e0dcd6] text-[#2d2926] hover:bg-[#e8e4df] hover:border-[#e8e4df] mb-6">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="divider text-[#6b6b6b] text-sm">
            or register with email
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#2d2926] font-medium">
                  Full Name
                </span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b6b] z-10" />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  {...register("name")}
                  className="input input-bordered w-full pl-12 bg-white border-[#e0dcd6] focus:border-[#c9a87c] focus:outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#2d2926] font-medium">
                  Email Address
                </span>
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b6b] z-10" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: emailRegex,
                      message: "Invalid email format",
                    },
                  })}
                  className="input input-bordered w-full pl-12 bg-white border-[#e0dcd6] focus:border-[#c9a87c] focus:outline-none"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Photo URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#2d2926] font-medium">
                  Photo URL
                </span>
                <span className="label-text-alt text-[#6b6b6b]">Optional</span>
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b6b] z-10" />
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  {...register("photo")}
                  className="input input-bordered w-full pl-12 bg-white border-[#e0dcd6] focus:border-[#c9a87c] focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[#2d2926] font-medium">
                  Password
                </span>
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b6b] z-10" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 8 characters"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: passwordRegex,
                      message:
                        "Password must be 8+ chars, include uppercase, lowercase & special character",
                    },
                  })}
                  className="input input-bordered w-full pl-12 pr-12 bg-white border-[#e0dcd6] focus:border-[#c9a87c] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b6b6b] hover:text-[#2d2926]"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <p className="text-sm text-[#6b6b6b]">
              By creating an account, you agree to our{" "}
              <Link href="#" className="text-[#c9a87c] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-[#c9a87c] hover:underline">
                Privacy Policy
              </Link>
              .
            </p>

            {/* Button */}
            <button
              type="submit"
              className="btn w-full bg-[#2d2926] text-white hover:bg-[#1a1a1a] border-none"
            >
              Register Account
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Back to Home */}
          <p className="text-center mt-8 text-[#6b6b6b] text-sm">
            <Link href="/" className="hover:text-[#2d2926] transition-colors">
              Back to Home
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Beautiful tile patterns"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-l from-[#2d2926]/80 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-end p-12">
          <div className="max-w-md text-white text-right">
            <Link href="/" className="flex items-center gap-2 mb-8 justify-end">
              <span className="text-2xl font-bold">Tiles Gallery</span>
              <div className="w-12 h-12 bg-[#c9a87cb6] rounded-xl flex items-center justify-center">
                <Image
                  src="https://i.ibb.co/4wWTc3y7/tiles-gallery-Logo.png"
                  alt="Tiles Gallery Logo"
                  width={100}
                  height={100}
                />
              </div>
            </Link>
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-gray-300 text-lg">
              Create an account to save your favorites, track orders, and get
              exclusive access to new collections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
