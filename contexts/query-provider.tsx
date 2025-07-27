"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Tempo de cache padrão (5 minutos)
            staleTime: 1000 * 60 * 5,
            // Tempo para garbage collection (10 minutos)
            gcTime: 1000 * 60 * 10,
            // Retry automático em caso de erro
            retry: 2,
            // Refetch quando a janela ganha foco
            refetchOnWindowFocus: false,
          },
          mutations: {
            // Retry automático para mutations
            retry: 1,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}