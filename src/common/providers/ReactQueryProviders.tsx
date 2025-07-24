"use client";

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

export default function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  // We use useState to create the client instance on the initial render.
  // This ensures that the client is not recreated on every render.
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // It's good practice to set some default stale times.
        // This means data will be considered fresh for 5 minutes.
        staleTime: 1000 * 60 * 5,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
