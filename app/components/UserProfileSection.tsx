"use client";

import { useSessionWithCache } from "@/hooks/useSession";
import { Button } from "./ui/button";
import { LogOut, ChevronUp } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface UserProfileSectionProps {
   collapsed: boolean;
}

export function UserProfileSection({ collapsed }: UserProfileSectionProps) {
   const { session } = useSessionWithCache();

   if (!session?.user) return null;

   return (
      <div className="mt-auto p-4 border-t border-gray-800">
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button
                  variant="ghost"
                  className={cn(
                     "w-full group relative hover:bg-gray-800/50 rounded-xl",
                     collapsed ? "px-2" : "px-3 py-2"
                  )}
               >
                  <div className={`flex items-center gap-4 ${collapsed ? 'justify-center' : ''}`}>
                     <div className="relative flex-shrink-0">
                        {session.user.image && (
                           <Image
                              src={session.user.image}
                              alt={session.user.name || "User"}
                              width={24}
                              height={24}
                              className="rounded-full"
                              unoptimized
                              referrerPolicy="no-referrer"
                           />
                        )}
                     </div>
                     {!collapsed && (
                        <div className="flex-1 text-left min-w-0">
                           <p className="text-sm font-medium text-gray-200 truncate group-hover:text-white transition-colors">
                              {session.user.name}
                           </p>
                           <p className="text-xs text-gray-400 truncate group-hover:text-gray-300 transition-colors">
                              {session.user.email}
                           </p>
                        </div>
                     )}
                     {!collapsed && (
                        <ChevronUp
                           className="w-4 h-4 text-gray-400 group-hover:text-white transition-transform duration-200 group-data-[state=open]:rotate-180 flex-shrink-0"
                        />
                     )}
                  </div>
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
               align={collapsed ? "center" : "end"}
               className="w-56 mt-1"
               sideOffset={5}
            >
               <DropdownMenuItem
                  onClick={() => signOut()}
                  className="text-red-600 hover:text-red-700 focus:text-red-700 focus:bg-red-50"
               >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
}