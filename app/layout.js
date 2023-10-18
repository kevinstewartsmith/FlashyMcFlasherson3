import '@styles/globals.css'
import { Inter } from 'next/font/google'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { Suspense } from 'react'
import { FlashCardContextProvider } from '@components/Contexts/FlashCardContext'
import { ContextProvider } from "@components/Contexts/CollectionContext"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider> 
        <ContextProvider >
        <FlashCardContextProvider>
          <Nav />
          <Suspense fallback={<div>Loading...</div>}>
          {children}
          </Suspense>
          </FlashCardContextProvider>
          </ContextProvider>
        </Provider>
      </body>
    </html>
  )
}