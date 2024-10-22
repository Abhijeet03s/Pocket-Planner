"use client";

import Link from 'next/link';
import { SignInButton } from "./SignInButton";
import { satoshi } from "@/app/fonts/font";

export default function BaseHeader({ children }: { children: React.ReactNode }) {

   return (
      <header className={`bg-white shadow-sm sticky top-0 z-50 ${satoshi.variable}`}>
         <div className="container max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
               <div className="flex-shrink-0">
                  <Link href="/" className="flex items-center">
                     <span className="ml-2 text-2xl font-bold text-black font-satoshi">Pocket Planner</span>
                  </Link>
               </div>
               {children}
               <nav className="hidden md:flex items-center space-x-6 font-satoshi font-bold">
                  <SignInButton />
               </nav>
            </div>
         </div>
      </header>
   );
}