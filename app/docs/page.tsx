'use client'

import Card from '@/app/components/Card'
import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Doc } from '@/app/types/doc.types'
import { useInView } from 'react-intersection-observer'

async function getDocs({
  queryKey,
  pageParam,
}: {
  queryKey: string[]
  pageParam: number
}) {
  const company = queryKey[1]

  let url = `${process.env.NEXT_PUBLIC_DOCS_API_ENDPOINT}?limit=12&page=${pageParam}&sortField=createdAt&sortOrder=desc`

  if (company) {
    url += `&company=${company}`
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch documentation data`)
  }

  return await response.json()
}

export default function Docs() {
  const [company, setCompany] = useState<string>('')
  const { ref, inView } = useInView()
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['docs', company],
    queryFn: getDocs,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined
    },
  })

  const handleCompany = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newCompany: string,
  ) => {
    e.preventDefault()

    if (newCompany === company) {
      setCompany('')
    } else {
      setCompany(newCompany)
    }
  }

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
    <div>
      <div className="mb-4 w-full">
        <ul
          className="flex flex-wrap justify-center -mb-px text-2xl font-light text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <li className="me-2" role="presentation">
            <button
              className={
                'inline-block p-4 border-b-2 rounded-t-lg ' +
                (company === 'toss' ? 'text-white' : 'text-my-font-2')
              }
              id="profile-tab"
              data-tabs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
              onClick={(e) => handleCompany(e, 'toss')}
            >
              TOSS
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={
                'inline-block p-4 border-b-2 rounded-t-lg ' +
                (company === 'inflearn' ? 'text-white' : 'text-my-font-2')
              }
              id="dashboard-tab"
              data-tabs-target="#dashboard"
              type="button"
              role="tab"
              aria-controls="dashboard"
              aria-selected="false"
              onClick={(e) => handleCompany(e, 'inflearn')}
            >
              INFLEARN
            </button>
          </li>
        </ul>
      </div>

      <div className="grid-cols-1 sm:grid md:grid-cols-3">
        {content}
        {isFetchingNextPage && <h4>Loading...</h4>}
      </div>
    </div>
  )
}
