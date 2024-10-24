'use client';

import { QueryClient, QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function QueryClientProvider({ children }: { children: React.ReactNode }) {
   const [queryClient] = useState(
      () =>
         new QueryClient({
            defaultOptions: {
               queries: {
                  staleTime: 5 * 1000,
                  refetchOnWindowFocus: true,
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
         <ReactQueryDevtools initialIsOpen={false} />
      </TanstackQueryClientProvider>
   );
}
