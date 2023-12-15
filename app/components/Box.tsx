import { ReactNode } from 'react'

export default function Box({ children }: { children: ReactNode }) {
  return <div className={'w-7/12 h-screen mt-8 m-auto'}>{children}</div>
}
