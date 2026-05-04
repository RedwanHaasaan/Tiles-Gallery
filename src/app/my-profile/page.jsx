import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'
import { auth } from '@/lib/auth'
import Navbar from '@/components/Layout/Navbar'
import Footer from '@/components/Layout/Footer'
import { 
  User, 
  Mail, 
  Calendar, 
  Edit, 
  Shield,
  LayoutGrid
} from 'lucide-react'

export const metadata = {
  title: 'My Profile | Tiles Gallery',
  description: 'View and manage your Tiles Gallery profile',
}

export default async function MyProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  const { user } = session

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f6f3]">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#e0dcd6]">
            {/* Cover Image */}
            <div className="h-32 sm:h-48 bg-linear-to-r from-[#2d2926] to-[#4a453f] relative">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80')] bg-cover bg-center" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="px-6 sm:px-8 pb-8">
              {/* Avatar */}
              <div className="relative -mt-16 sm:-mt-20 mb-4">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white bg-[#2d2926] overflow-hidden shadow-lg">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || 'Profile'}
                      width={144}
                      height={144}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl sm:text-5xl font-bold text-[#c9a87c]">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* User Details */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#2d2926]">
                    {user.name || 'User'}
                  </h1>
                  <p className="text-[#6b6b6b] mt-1">
                    Tiles Gallery Member
                  </p>
                </div>
                <Link
                  href="/update-profile"
                  className="btn bg-[#2d2926] text-white hover:bg-[#1a1a1a] border-none sm:self-start"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Profile Details Card */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-[#e0dcd6] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-[#2d2926] mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-[#c9a87c]" />
              Account Information
            </h2>

            <div className="space-y-6">
              {/* Name */}
              <div className="flex items-start gap-4 p-4 bg-[#f8f6f3] rounded-xl">
                <div className="w-10 h-10 bg-[#e8e4df] rounded-lg flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-[#2d2926]" />
                </div>
                <div>
                  <p className="text-sm text-[#6b6b6b]">Full Name</p>
                  <p className="text-lg font-medium text-[#2d2926]">
                    {user.name || 'Not provided'}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-[#f8f6f3] rounded-xl">
                <div className="w-10 h-10 bg-[#e8e4df] rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#2d2926]" />
                </div>
                <div>
                  <p className="text-sm text-[#6b6b6b]">Email Address</p>
                  <p className="text-lg font-medium text-[#2d2926]">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Created At */}
              <div className="flex items-start gap-4 p-4 bg-[#f8f6f3] rounded-xl">
                <div className="w-10 h-10 bg-[#e8e4df] rounded-lg flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-[#2d2926]" />
                </div>
                <div>
                  <p className="text-sm text-[#6b6b6b]">Member Since</p>
                  <p className="text-lg font-medium text-[#2d2926]">
                    {user.createdAt 
                      ? new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'Recently joined'
                    }
                  </p>
                </div>
              </div>

              {/* Email Verified */}
              <div className="flex items-start gap-4 p-4 bg-[#f8f6f3] rounded-xl">
                <div className="w-10 h-10 bg-[#e8e4df] rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-[#2d2926]" />
                </div>
                <div>
                  <p className="text-sm text-[#6b6b6b]">Account Status</p>
                  <p className="text-lg font-medium text-[#2d2926] flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Active
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/tiles"
              className="p-6 bg-white rounded-xl shadow-sm border border-[#e0dcd6] hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-[#2d2926] rounded-lg flex items-center justify-center">
                <LayoutGrid className="w-6 h-6 text-[#c9a87c]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#2d2926]">Browse Tiles</h3>
                <p className="text-sm text-[#6b6b6b]">Explore our collection</p>
              </div>
            </Link>
            <Link
              href="/update-profile"
              className="p-6 bg-white rounded-xl shadow-sm border border-[#e0dcd6] hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-[#c9a87c] rounded-lg flex items-center justify-center">
                <Edit className="w-6 h-6 text-[#2d2926]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#2d2926]">Update Profile</h3>
                <p className="text-sm text-[#6b6b6b]">Edit your information</p>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}