import Image from 'next/image';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import { Card } from '@/app/components/ui/card';
import { HelpCircle } from 'lucide-react';
import { SignOutButton } from '@/app/components/SignOutButton';

export default async function ProfilePage() {
   const session = await getServerSession(authOptions);

   if (!session) {
      redirect("/");
   }

   return (
      <div className="space-y-8">
         {/* Profile Header */}
         <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex justify-between items-start mb-6">
               <h1 className="text-2xl font-bold">User Profile</h1>
               <SignOutButton />
            </div>
            <div className="flex items-center space-x-8">
               {session.user?.image && (
                  <Image
                     src={session.user.image || "/default-avatar.png"}
                     alt={session.user.name || "User"}
                     width={80}
                     height={80}
                     className="rounded-full"
                     unoptimized
                  />
               )}
               <div className="space-y-2">
                  <p className="text-2xl font-semibold">{session.user?.name}</p>
                  <p className="text-gray-600">{session.user?.email}</p>
               </div>
            </div>
         </div>

         {/* Account Statistics */}
         <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Account Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="text-xl font-semibold text-purple-600">March 2024</p>
               </div>
               <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Expenses Tracked</p>
                  <p className="text-xl font-semibold text-green-600">127</p>
               </div>
               <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Categories Used</p>
                  <p className="text-xl font-semibold text-blue-600">8</p>
               </div>
            </div>
         </Card>

         {/* Help & Support */}
         <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Help & Support</h2>
            <div className="space-y-4">
               <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <HelpCircle className="w-5 h-5 text-gray-500 mr-3" />
                  <div>
                     <p className="font-medium">Help Center</p>
                     <p className="text-sm text-gray-500">View FAQs and privacy policy</p>
                  </div>
               </div>
               <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-600">
                     Need help? Contact our support team at support@pocketplanner.com
                  </p>
               </div>
            </div>
         </Card>
      </div>
   );
}
