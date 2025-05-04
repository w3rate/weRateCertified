import type {Metadata} from 'next'
import './globals.css'
import NotificationContainer from '@/app/components/ui/NotificationContainer'
import Header from './components/Header'
import {Footer} from './components/Footer'
import {Background} from './components/Background'

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
    <html lang="ru">
      <body className="relative pt-[20px]">
        <Background />
        <Header />
        <NotificationContainer />
        <div className="relative z-[10] m-auto min-h-screen w-[80%] pb-16">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
