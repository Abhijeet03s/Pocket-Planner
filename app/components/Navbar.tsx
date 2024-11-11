"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SignInButton } from "./SignInButton";
import { Menu, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { satoshi, clashDisplay } from '@/app/fonts/font';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const [scrolled, setScrolled] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         setScrolled(window.scrollY > 20);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   return (
      <header
         className={`fixed w-full top-0 z-50 transition-all duration-300 ${satoshi.variable} ${clashDisplay.variable}
            ${scrolled
               ? 'bg-white/80 backdrop-blur-lg shadow-lg'
               : 'bg-transparent'
            }`}
      >
         <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
               <div className="flex-shrink-0">
                  <Link href="/" className="flex items-center space-x-2">
                     <span className={`text-xl sm:text-2xl font-bold transition-colors duration-300 font-clash-display
                        ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                        Pocket Planner
                     </span>
                  </Link>
               </div>

               {/* Desktop SignIn Button */}
               <div className="hidden md:block">
                  <SignInButton scrolled={scrolled} />
               </div>

               {/* Mobile Menu Button */}
               <div className="md:hidden">
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                     className={`p-2 transition-colors duration-300
                        ${scrolled
                           ? 'text-gray-900 hover:bg-gray-100'
                           : 'text-white hover:bg-white/10'
                        }`}
                  >
                     {mobileMenuOpen ? (
                        <X className="h-6 w-6" />
                     ) : (
                        <Menu className="h-6 w-6" />
                     )}
                  </Button>
               </div>
            </div>
         </div>

         {/* Mobile Menu */}
         <AnimatePresence>
            {mobileMenuOpen && (
               <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg border-t border-gray-200 overflow-hidden"
               >
                  <div className="px-4 py-3">
                     <SignInButton scrolled={true} className="w-full justify-center" />
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </header>
   );
}
