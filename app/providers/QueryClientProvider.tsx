'use client';

import { QueryClient, QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function QueryClientProvider({ children }: { children: React.ReactNode }) {
   const [queryClient] = useState(
      () =>
         new QueryClient({
            defaultOptions: {
               queries: {
                  staleTime: 1000 * 60 * 5,
                  refetchOnWindowFocus: false,
                  retry: 1,
               },
               mutations: {
                  retry: 1,
               },
            },
         })
   );

   return (
      <TanstackQueryClientProvider client={queryClient}>
         {children}
      </TanstackQueryClientProvider>
   );
}
