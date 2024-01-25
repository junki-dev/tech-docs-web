import { ReactNode } from 'react'

export default function Box({ children }: { children: ReactNode }) {
  return <div className={'w-7/12 h-100000 m-auto'}>{children}</div>
}
