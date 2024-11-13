'use client';

import Image from 'next/image';
import dummyDashboard from '../assets/dummy-dashboard.png';
import { satoshi, clashDisplay } from '@/app/fonts/font';
import { motion } from 'framer-motion';
import { useSessionWithCache } from '@/hooks/useSession';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Hero() {
   const { session } = useSessionWithCache();
   const router = useRouter();

   const handleGetStarted = () => {
      if (session && session.user) {
         router.push('/dashboard');
      } else {
         signIn('google');
      }
   };

   return (
      <div className={`relative bg-hero bg-cover bg-fixed bg-center text-white overflow-hidden ${clashDisplay.variable} ${satoshi.variable}`}>
         <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900 to-black opacity-85 pointer-events-none animate-gradient" aria-hidden="true"></div>
         <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
            <div className="flex flex-col items-center justify-center min-h-screen py-20">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center space-y-6 max-w-3xl mx-auto mb-12"
               >
                  <h1 className="font-clash-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                     Manage Your <br />
                     <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                        Finances Smarter
                     </span>
                  </h1>
                  <p className="font-satoshi text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-xl mx-auto">
                     Take control of your expenses with our intelligent tracking and budgeting tools
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center">
                     <motion.button
                        onClick={handleGetStarted}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="font-satoshi bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full transition-all duration-300 shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
                     >
                        Get Started Free
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                     </motion.button>
                  </div>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative max-w-7xl w-full"
               >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 rounded-xl transform rotate-2 scale-105 blur-xl opacity-70"></div>
                  <motion.div
                     whileHover={{ scale: 1.02 }}
                     transition={{ duration: 0.3 }}
                     className="relative bg-white/10 p-3 sm:p-4 rounded-xl backdrop-blur-xl border border-white/20"
                  >
                     <Image
                        src={dummyDashboard}
                        alt="Pocket Planner Dashboard"
                        width={1000}
                        height={562}
                        className="rounded-lg shadow-2xl w-full h-auto"
                        priority
                     />
                  </motion.div>
               </motion.div>
            </div>
         </div>
      </div>
   )
}