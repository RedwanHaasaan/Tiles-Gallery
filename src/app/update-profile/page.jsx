"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authClient, useSession } from "@/lib/auth-client";
import {
  User,
  Mail,
  ImageIcon,
  ArrowLeft,
  Save,
  Loader2,
} from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      name: "",
      photoURL: "",
    },
  });

  //Redirect if not logged in
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  //Populate form
  useEffect(() => {
    if (session?.user) {
      reset({
        name: session.user.name || "",
        photoURL: session.user.image || "",
      });
    }
  }, [session, reset]);

  const name = useWatch({ control, name: "name" });
  const photoURL = useWatch({ control, name: "photoURL" });

  // Submit
const onSubmit = async (data) => {
  setIsLoading(true);

  try {
    const { error } = await authClient.updateUser({
      name: data.name,
      image: data.photoURL || undefined,
    });

    if (error) {
      toast.error(error.message || "Failed to update profile");
      return;
    }

    toast.success("Profile updated successfully!");

    router.push("/my-profile");
    router.refresh();

  } catch (err) {
    toast.error("Something went wrong");
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};
  // Loading
  if (isPending) {
    return (
      <div className="min-h-screen flex flex-col bg-cream">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-espresso" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">

          {/* Back Link */}
          <Link
            href="/my-profile"
            className="inline-flex items-center gap-2 text-ash hover:text-espresso mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </Link>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-tile-border p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-espresso mb-2">
              Update Profile
            </h1>
            <p className="text-ash mb-8">
              Update your personal information below
            </p>

            {/* Preview */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-cream rounded-xl">
              <div className="w-16 h-16 rounded-full bg-espresso overflow-hidden">
                {photoURL ? (
                  <Image
                    src={photoURL}
                    alt="Profile preview"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-gold">
                      {name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <p className="font-medium text-espresso">
                  {name || "Your Name"}
                </p>
                <p className="text-sm text-ash">
                  {session.user.email}
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-espresso font-medium">
                    Full Name
                  </span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ash z-10" />
                  <input
                    {...register("name", { required: true })}
                    placeholder="Enter your full name"
                    className="input input-bordered w-full pl-12 bg-white border-tile-border"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-espresso font-medium">
                    Email Address
                  </span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ash z-10" />
                  <input
                    type="email"
                    value={session.user.email}
                    disabled
                    className="input input-bordered w-full pl-12 bg-cream-muted"
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-espresso font-medium">
                    Photo URL
                  </span>
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ash z-10" />
                  <input
                    {...register("photoURL")}
                    placeholder="https://example.com/photo.jpg"
                    className="input input-bordered w-full pl-12 bg-white border-tile-border"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn flex-1 bg-espresso text-white"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>

                <Link
                  href="/my-profile"
                  className="btn btn-outline border-tile-border"
                >
                  Cancel
                </Link>
              </div>

            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}