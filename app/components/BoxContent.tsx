import Footer from '@/app/components/Footer'
import { ReactNode } from 'react'

export default function BoxContent({ children }: { children: ReactNode }) {
  return (
    <div className={'w-full h-5/6 z-1'}>
      {children}
      <hr className={'my-7'} />
      <Footer />
    </div>
  )
}
