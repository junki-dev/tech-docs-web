import Link from 'next/link'

export default function Header() {
  return (
    <>
      <header
        className={
          'h-1/12 w-full sticky top-0 z-2 backdrop-blur-sm text-my-font-2 font-bold'
        }
      >
        <div className={'flex justify-between'}>
          <div>
            <Link href={'/docs'}>
              <h1 className={'text-4xl'}>TECHNICAL DOCUMENTATION</h1>
            </Link>
          </div>
          <div className={'text-xl'}>
            <div>
              <Link href={'/docs'}>
                <span>JUNKI KIM</span>
              </Link>
            </div>
          </div>
        </div>
        <hr className={'mt-7 mb-14'} />
      </header>
    </>
  )
}
