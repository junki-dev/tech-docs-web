import Image from 'next/image'
import { Doc } from '@/app/types/doc.types'
import moment from 'moment'
import { Ref } from 'react'

interface DocProps {
  data: Doc
  innerRef?: Ref<HTMLParagraphElement>
}

export default function Card({ data, innerRef }: DocProps) {
  return (
    <div
      ref={innerRef}
      className="mx-3 h-128 min-w-64 mt-6 bg-my-bg-2 flex flex-col shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.1)] sm:shrink-0 sm:grow sm:basis-0 text-center items-center"
    >
      <a className={'w-full'} href={data.originUri}>
        <div className={'h-96'}>
          <img
            className="h-96 w-full mt-0 object-cover object-center"
            src={data.imageUri}
            alt="Skyscrapers"
          />
        </div>
        <div className="h-32 flex flex-col w-full pt-8 pr-8 pl-8 pb-0">
          <h5 className="h-24 w-full font-medium leading-tight text-my-font-1 text-left">
            {data.title}
          </h5>
          <div className="flex h-8 items-center w-full mb-1 mt-auto text-my-font-2">
            <Image
              src="/images/toss_logo.png"
              alt="toss"
              width={64}
              height={64}
            />
            <small className={'h-4'}>
              {moment(data.createdAt).format('YYYY.MM.DD')}
            </small>
          </div>
        </div>
      </a>
    </div>
  )
}
