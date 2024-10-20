'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function SignInButton() {
   const { data: session } = useSession()
   const router = useRouter()

   if (session && session.user) {
      return (
         <>
            <div className="flex gap-2">
               <Button variant="outline" onClick={() => router.push('/dashboard')}>
                  Go to Dashboard
               </Button>
               <Button variant="outline" onClick={() => signOut()}>
                  Signout
               </Button>
            </div>
         </>
      )
   }
   return (
      <>
         <Button variant="outline" onClick={() => signIn('google')}>
            Sign In with Google
         </Button>
      </>
   )
}