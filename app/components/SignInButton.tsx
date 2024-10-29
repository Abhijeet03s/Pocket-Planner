'use client'

import { signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useSessionWithCache } from "@/hooks/useSession"

export function SignInButton() {
   const { session } = useSessionWithCache()
   const router = useRouter()

   if (session && session.user) {
      return (
         <div className="flex items-center gap-2">
            <Button
               variant="ghost"
               onClick={() => router.push('/dashboard')}
               className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200"
            >
               Dashboard
            </Button>
            <Button
               variant="outline"
               onClick={() => signOut()}
               className="bg-white text-purple-600 border-purple-600 hover:bg-purple-600 hover:text-white transition-colors duration-200"
            >
               Sign out
            </Button>
         </div>
      )
   }
   return (
      <Button
         variant="default"
         onClick={() => signIn('google')}
         className="bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
      >
         Sign in
      </Button>
   )
}