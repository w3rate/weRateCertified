import type {Metadata} from 'next'
import './globals.css'
import NotificationContainer from '@/components/ui/NotificationContainer'
import Header from '../components/Header'
import {Footer} from '../components/Footer'
import {Background} from '../components/Background'
import {Providers} from '@/providers/sessionProvider'
import dynamic from 'next/dynamic'

const WalletContextProvider = dynamic(() => import('@/providers/walletProvider'))

export const metadata: Metadata = {
  title: 'weRate Certified',
  description: 'Discover. Rate. Earn. Repeat.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <WalletContextProvider>
        <Providers>
          <body className="max-w-screen relative pb-[75px]">
            <Background />
            <Header />
            <NotificationContainer />
            <div className="relative z-[10] m-auto min-h-screen w-full pb-16 md:w-[80%]">{children}</div>
            <Footer />
          </body>
        </Providers>
      </WalletContextProvider>
    </html>
  )
}
