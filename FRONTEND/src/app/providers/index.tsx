"use client";

import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/app/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

interface ProvidersProps {
  readonly children: React.ReactNode;
  readonly sessionRequired?: boolean;
}

export function Providers({
  children,
  sessionRequired = false,
}: ProvidersProps) {
  return (
    <SessionProvider
      refetchInterval={sessionRequired ? 5 * 60 : 0}
      session={sessionRequired ? undefined : null}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
