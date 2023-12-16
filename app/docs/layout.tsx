import Header from '@/app/components/Header'
import BoxContent from '@/app/components/BoxContent'
import Box from '@/app/components/Box'
import ReactQueryProvider from '@/app/components/ReactQueryProvider'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReactQueryProvider>
      <Box>
        <Header />
        <BoxContent>{children}</BoxContent>
      </Box>
    </ReactQueryProvider>
  )
}
