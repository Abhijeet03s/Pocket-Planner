'use client'

import { signIn, signOut } from 'next-auth/react';
import { Button } from '@/app/components/ui/button';
import { useRouter } from 'next/navigation';
import { useSessionWithCache } from '@/hooks/useSession';
import { motion } from 'framer-motion';

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
            className={`flex items-center gap-2.5 ${className}`}
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
            className={`px-6 h-11 font-medium ${className}
               ${scrolled
                  ? 'bg-purple-700 text-white shadow-lg shadow-purple-700/20'
                  : 'bg-white text-purple-700 shadow-lg shadow-black/10'
               }`}
         >
            <span className="flex items-center gap-2">
               <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
               </svg>
               Sign in with Google
            </span>
         </Button>
      </motion.div>
   )
}