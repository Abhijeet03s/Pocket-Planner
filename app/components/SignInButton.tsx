'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/app/components/ui/button"

export function SignInButton() {
   const { data: session } = useSession()

   if (session && session.user) {
      return (
         <Button variant="outline" onClick={() => signOut()}>
            Sign Out
         </Button>
      )
   }
   return (
      <Button variant="outline" onClick={() => signIn('google')}>
         Sign In with Google
      </Button>
   )
}