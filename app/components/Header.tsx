"use client";

import Link from 'next/link';
import { SignInButton } from "./SignInButton";
import { useSession } from "next-auth/react";
import { satoshi } from "@/app/fonts/font";
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
   const { data: session } = useSession();
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

   return (
      <header className={`bg-white shadow-sm sticky top-0 z-50 ${satoshi.variable}`}>
         <div className="container max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
               <div className="flex-shrink-0">
                  <Link href="/" className="flex items-center">
                     <span className="ml-2 text-2xl font-bold text-black font-satoshi">Pocket Planner</span>
                  </Link>
               </div>
               <nav className="hidden md:flex items-center space-x-6 font-satoshi font-bold">
                  {session ? (
                     <>
                        <SignInButton />
                     </>
                  ) : (
                     <SignInButton />
                  )}
               </nav>
               <div className="md:hidden">
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                     <Menu className="h-6 w-6" />
                  </Button>
               </div>
            </div>
         </div>
         {mobileMenuOpen && (
            <div className="md:hidden">
               <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {session ? (
                     <>
                        <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-bold text-gray-700 hover:text-purple-600 hover:bg-gray-50">Dashboard</Link>
                        <Link href="/expenses" className="block px-3 py-2 rounded-md text-base font-bold text-gray-700 hover:text-purple-600 hover:bg-gray-50">Expenses</Link>
                     </>
                  ) : null}
                  <div className="px-3 py-2">
                     <SignInButton />
                  </div>
               </div>
            </div>
         )}
      </header>
   );
}
