"use client";

import BaseHeader from './BaseHeader';
import { Bell, Search } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function DashboardHeader() {
   const { data: session } = useSession();

   return (
      <BaseHeader>
         <div className="flex-1 min-w-0">
            <div className="relative rounded-md shadow-sm">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
               </div>
               <input
                  type="text"
                  className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search..."
               />
            </div>
         </div>
         <div className="ml-4 flex items-center md:ml-6">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
               <Bell className="h-6 w-6" />
            </button>
            {session?.user && (
               <div className="ml-3 relative flex items-center">
                  <Image
                     src={session.user.image || "/default-avatar.png"}
                     alt={session.user.name || "User"}
                     width={32}
                     height={32}
                     className="rounded-full"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                     {session.user.name}
                  </span>
               </div>
            )}
         </div>
      </BaseHeader>
   );
}