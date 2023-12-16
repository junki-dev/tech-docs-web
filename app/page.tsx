'use client'

import Card from '@/app/components/Card'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Doc } from '@/app/types/doc.types'
import { useInView } from 'react-intersection-observer'

async function getDocs({ pageParam }: { pageParam: number }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DOCS_API_ENDPOINT}?limit=12&page=${pageParam}&sortField=createdAt&sortOrder=desc`,
  )
  if (!response.ok) {
    throw new Error(`Failed to fetch documentation data`)
  }

  return await response.json()
}

export default function Home() {
  const { ref, inView } = useInView()
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['docs'],
    queryFn: getDocs,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined
    },
  })

  const content = data?.pages.map((docs: Doc[]) =>
    docs.map((doc, idx) => {
      if (docs.length === idx + 1) {
        return <Card innerRef={ref} key={doc._id} data={doc} />
      }

      return <Card key={doc._id} data={doc} />
    }),
  )

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  if (status === 'pending') {
    return <p>Loading...</p>
  }

  if (status === 'error') {
    return <p>Error: {error.message} </p>
  }

  return (
    <div className="grid-cols-1 sm:grid md:grid-cols-3">
      {content}

      {isFetchingNextPage && <h4>Loading...</h4>}
    </div>
  )
}
