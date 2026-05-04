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
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-tile-border">
            {/* Cover Image */}
            <div className="h-32 sm:h-48 bg-linear-to-r from-espresso to-[#4a453f] relative">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80')] bg-cover bg-center" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="px-6 sm:px-8 pb-8">
              {/* Avatar */}
              <div className="relative -mt-16 sm:-mt-20 mb-4">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white bg-espresso overflow-hidden shadow-lg">
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
                      <span className="text-4xl sm:text-5xl font-bold text-gold">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* User Details */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-espresso">
                    {user.name || 'User'}
                  </h1>
                  <p className="text-ash mt-1">
                    Tiles Gallery Member
                  </p>
                </div>
                <Link
                  href="/update-profile"
                  className="btn bg-espresso text-white hover:bg-espresso-dark border-none sm:self-start"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Profile Details Card */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-tile-border p-6 sm:p-8">
            <h2 className="text-xl font-bold text-espresso mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-gold" />
              Account Information
            </h2>

            <div className="space-y-6">
              {/* Name */}
              <div className="flex items-start gap-4 p-4 bg-cream rounded-xl">
                <div className="w-10 h-10 bg-stone rounded-lg flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-espresso" />
                </div>
                <div>
                  <p className="text-sm text-ash">Full Name</p>
                  <p className="text-lg font-medium text-espresso">
                    {user.name || 'Not provided'}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-cream rounded-xl">
                <div className="w-10 h-10 bg-stone rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-espresso" />
                </div>
                <div>
                  <p className="text-sm text-ash">Email Address</p>
                  <p className="text-lg font-medium text-espresso">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Created At */}
              <div className="flex items-start gap-4 p-4 bg-cream rounded-xl">
                <div className="w-10 h-10 bg-stone rounded-lg flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-espresso" />
                </div>
                <div>
                  <p className="text-sm text-ash">Member Since</p>
                  <p className="text-lg font-medium text-espresso">
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
              <div className="flex items-start gap-4 p-4 bg-cream rounded-xl">
                <div className="w-10 h-10 bg-stone rounded-lg flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-espresso" />
                </div>
                <div>
                  <p className="text-sm text-ash">Account Status</p>
                  <p className="text-lg font-medium text-espresso flex items-center gap-2">
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
              className="p-6 bg-white rounded-xl shadow-sm border border-tile-border hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-espresso rounded-lg flex items-center justify-center">
                <LayoutGrid className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-espresso">Browse Tiles</h3>
                <p className="text-sm text-ash">Explore our collection</p>
              </div>
            </Link>
            <Link
              href="/update-profile"
              className="p-6 bg-white rounded-xl shadow-sm border border-tile-border hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
                <Edit className="w-6 h-6 text-espresso" />
              </div>
              <div>
                <h3 className="font-semibold text-espresso">Update Profile</h3>
                <p className="text-sm text-ash">Edit your information</p>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}