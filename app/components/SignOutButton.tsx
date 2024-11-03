'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/app/components/ui/button';
import { LogOut } from 'lucide-react';

export function SignOutButton() {
   return (
      <Button
         variant="outline"
         onClick={() => signOut()}
         className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
      >
         <LogOut className="w-4 h-4 mr-2" />
         Logout
      </Button>
   );
}