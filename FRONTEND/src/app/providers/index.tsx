"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/app/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { queryClient } from "@/app/lib/queryOptions";

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
        {children}

        <Toaster />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
