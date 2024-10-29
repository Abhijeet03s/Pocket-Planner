"use client";

import { useState } from 'react';
import Link from 'next/link';
import { SignInButton } from "./SignInButton";
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { satoshi } from "@/app/fonts/font";
import { useSessionWithCache } from "@/hooks/useSession";

export default function Navbar() {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const { session } = useSessionWithCache();

   return (
      <header className={`bg-white shadow-sm sticky top-0 z-50 ${satoshi.variable}`}>
         <div className="container max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
               <div className="flex-shrink-0">
                  <Link href="/" className="flex items-center">
                     <span className="text-2xl font-bold text-black font-satoshi">Pocket Planner</span>
                  </Link>
               </div>
               <div className="md:hidden">
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                     <Menu className="h-6 w-6" />
                  </Button>
               </div>
               <nav className="hidden md:flex items-center space-x-6 font-satoshi font-bold">
                  <SignInButton />
               </nav>
            </div>
            {mobileMenuOpen && (
               <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md">
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                     {session ? (
                        <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-bold text-gray-700 hover:text-purple-600 hover:bg-gray-50">
                           Dashboard
                        </Link>
                     ) : null}
                     <div className="px-3 py-2">
                        <SignInButton />
                     </div>
                  </div>
               </div>
            )}
         </div>
      </header>
   );
}
