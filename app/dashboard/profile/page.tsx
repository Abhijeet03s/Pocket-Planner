import Image from 'next/image';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';
import { Card } from '@/app/components/ui/card';
import { HelpCircle } from 'lucide-react';
import { SignOutButton } from '@/app/components/SignOutButton';
import { format } from 'date-fns';
import prisma from '@/lib/prisma';
import { satoshi } from "@/app/fonts/font";

async function getUserStats(userId: string) {
   const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { createdAt: true }
   });

   const totalExpenses = await prisma.expense.count({
      where: { userId }
   });

   const categoriesUsed = await prisma.expense.findMany({
      where: { userId },
      select: { categoryId: true },
      distinct: ['categoryId']
   });

   return {
      memberSince: user?.createdAt || new Date(),
      totalExpenses,
      categoriesUsed: categoriesUsed.length
   };
}

export default async function ProfilePage() {
   const session = await getServerSession(authOptions);

   if (!session) {
      redirect("/");
   }

   const stats = await getUserStats(session.user.id);

   return (
      <div className={`space-y-8 ${satoshi.variable} font-satoshi`}>
         <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex justify-between items-start mb-6">
               <h1 className="text-2xl font-bold">User Profile</h1>
               <SignOutButton />
            </div>
            <div className="flex items-center space-x-8">
               {session.user?.image ? (
                  <Image
                     src={session.user.image}
                     alt={session.user.name || "User"}
                     width={60}
                     height={60}
                     className="rounded-full"
                  />
               ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                     <span className="text-2xl font-semibold text-gray-500">
                        {session.user?.name?.[0]?.toUpperCase() || '?'}
                     </span>
                  </div>
               )}
               <div className="space-y-2">
                  <p className="text-2xl font-semibold">{session.user?.name}</p>
                  <p className="text-gray-600">{session.user?.email}</p>
               </div>
            </div>
         </div>

         <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Account Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="text-xl font-semibold text-purple-600">
                     {format(stats.memberSince, 'MMMM yyyy')}
                  </p>
               </div>
               <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Expenses Tracked</p>
                  <p className="text-xl font-semibold text-green-600">
                     {stats.totalExpenses}
                  </p>
               </div>
               <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Categories Used</p>
                  <p className="text-xl font-semibold text-blue-600">
                     {stats.categoriesUsed}
                  </p>
               </div>
            </div>
         </Card>

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
                     Need help? Contact our support team at <span className="font-semibold">support@pocketplanner.com</span>
                  </p>
               </div>
            </div>
         </Card>
      </div>
   );
}
