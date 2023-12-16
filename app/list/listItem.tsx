'use client'

import { METHODS } from 'http'
import Link from 'next/link'
import { useEffect } from 'react'

type tResult = {
  _id: string
  title: string
  content: string
}

interface ListItemProps {}

export default function ListItem({ result }: any) {
  return (
    <div>
      {result.map((list: tResult) => (
        <div className="list-item" key={list._id.toString()}>
          <Link prefetch={false} href={`/detail/${list._id}`}>
            <h4>{list.title}</h4>
          </Link>
          <Link href={`/edit/${list._id}`}>✏️</Link>
          <span
            onClick={(e) => {
              fetch('/api/post/delete', {
                method: 'DELETE',
                body: list._id,
              })
                .then((response) => {
                  if (response.ok) {
                    const target = e.target as HTMLElement
                    if (!!target.parentElement)
                      target.parentElement.style.opacity = '0'

                    setTimeout(() => {
                      if (!!target.parentElement)
                        target.parentElement.style.display = 'none'
                    }, 1000)
                  } else {
                    console.error('삭제 실패')
                  }
                })
                .catch((error) => {
                  console.error('삭제 요청 중 오류 발생:', error)
                })
            }}
          >
            🗑️
          </span>
          <p>1월 1일</p>
        </div>
      ))}
    </div>
  )
}
