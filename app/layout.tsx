
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BearBrick Mint',
  description: 'Mint your Vibe on Base',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
