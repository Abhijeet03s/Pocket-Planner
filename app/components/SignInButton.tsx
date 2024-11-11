'use client'

import { signIn, signOut } from 'next-auth/react';
import { Button } from '@/app/components/ui/button';
import { useRouter } from 'next/navigation';
import { useSessionWithCache } from '@/hooks/useSession';

interface SignInButtonProps {
   scrolled?: boolean;
   className?: string;
}

export function SignInButton({ scrolled, className }: SignInButtonProps) {
   const { session } = useSessionWithCache();
   const router = useRouter()

   if (session && session.user) {
      return (
         <div className={`flex items-center gap-2 ${className}`}>
            <Button
               variant="ghost"
               onClick={() => router.push('/dashboard')}
               className={`font-medium transition-colors duration-300
                  ${scrolled
                     ? 'text-gray-700 hover:text-purple-600 hover:bg-purple-50/80'
                     : 'text-gray-200 hover:text-white hover:bg-white/10'
                  }`}
            >
               Dashboard
            </Button>
            <Button
               variant="outline"
               onClick={() => signOut()}
               className={`transition-all duration-300
                  ${scrolled
                     ? 'bg-white text-purple-600 border-purple-600 hover:bg-purple-600 hover:text-white'
                     : 'bg-transparent text-white border-white hover:bg-white hover:text-gray-900'
                  }`}
            >
               Logout
            </Button>
         </div>
      )
   }

   return (
      <Button
         variant="default"
         onClick={() => signIn('google')}
         className={`transition-all duration-300 ${className}
            ${scrolled
               ? 'bg-purple-600 text-white hover:bg-purple-700'
               : 'bg-white text-purple-600 hover:bg-gray-100'
            }`}
      >
         Sign in
      </Button>
   )
}