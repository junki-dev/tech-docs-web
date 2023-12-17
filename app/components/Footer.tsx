import Image from 'next/image'

export default function Footer() {
  return (
    <footer className={'pb-10 w-full text-center'}>
      <div className={'flex flex-row-reverse w-full text-right'}>
        <a href={'https://github.com/junki-dev'} target={'_blank'}>
          <Image src={'/github_logo.png'} alt="github" width={24} height={24} />
        </a>
        <a
          className={'mr-1'}
          href={
            'https://www.notion.so/Junki-Kim-03c4ef023f88413d9b569e2119e7665d?pvs=4'
          }
          target={'_blank'}
        >
          <Image src={'/resume_icon.png'} alt="resume" width={24} height={24} />
        </a>
      </div>
    </footer>
  )
}
