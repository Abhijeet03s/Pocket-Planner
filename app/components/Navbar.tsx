"use client";

import { useState } from 'react';
import BaseHeader from './BaseHeader';
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { SignInButton } from "./SignInButton";

export default function Navbar() {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const { data: session } = useSession();

   return (
      <BaseHeader>
         <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
               <Menu className="h-6 w-6" />
            </Button>
         </div>
         {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md">
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
      </BaseHeader>
   );
}