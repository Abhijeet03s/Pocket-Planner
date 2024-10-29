import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';

export function useSessionWithCache() {
   const { data: session, status } = useSession();
   const sessionCache = useRef(session);

   useEffect(() => {
      if (session) {
         sessionCache.current = session;
      }
   }, [session]);

   return {
      session: sessionCache.current || session,
      status
   };
}