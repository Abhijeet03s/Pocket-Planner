'use client'

import { signIn, signOut } from 'next-auth/react';
import { Button } from '@/app/components/ui/button';
import { useRouter } from 'next/navigation';
import { useSessionWithCache } from '@/hooks/useSession';
import { motion } from 'framer-motion';
import { satoshi } from '@/app/fonts/font';

interface SignInButtonProps {
   scrolled?: boolean;
   className?: string;
}

export function SignInButton({ scrolled, className }: SignInButtonProps) {
   const { session } = useSessionWithCache();
   const router = useRouter()

   if (session && session.user) {
      return (
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex items-center gap-2.5 ${className} ${satoshi.className}`}
         >
            <Button
               variant="ghost"
               onClick={() => router.push('/dashboard')}
               className={`font-medium px-5 h-10
                  ${scrolled
                     ? 'text-gray-800'
                     : 'text-gray-100'
                  }`}
            >
               Dashboard
            </Button>
            <Button
               variant="outline"
               onClick={() => signOut()}
               className={`px-5 h-10
                  ${scrolled
                     ? 'bg-white text-purple-700 border-purple-700'
                     : 'bg-transparent text-white border-white'
                  }`}
            >
               Logout
            </Button>
         </motion.div>
      )
   }

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
      >
         <Button
            variant="default"
            onClick={() => signIn('google')}
            className={`bg-white text-purple-700 shadow-lg shadow-purple-700/20 hover:bg-purple-700 hover:text-white transition-colors duration-300 ${satoshi.className}`}
         >
            Sign in
         </Button>
      </motion.div>
   )
}