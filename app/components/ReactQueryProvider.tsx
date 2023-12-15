'use client'

import React, { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode
}) {
  const [queryClient] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } }),
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
