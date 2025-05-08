
'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Removed ReactQueryDevtools import as it's not installed
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Removed module-level export of queryClient
// export const queryClient = new QueryClient({ ... });

export function Providers({ children }: { children: React.ReactNode }) {
  // Ensure QueryClient is only created once per application lifecycle using useState
  const [queryClientInstance] = React.useState(() => new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
             refetchOnWindowFocus: false, // Optional: Disable refetch on window focus
        },
    },
  }));

  return (
    <QueryClientProvider client={queryClientInstance}>
      {children}
      {/* ReactQueryDevtools is useful for debugging, install if needed */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
