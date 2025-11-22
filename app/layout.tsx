import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BearBrick Gen',
  description: 'Mint your unique Vibe on Base',
  // Эти теги нужны для красивого превью в Telegram/Twitter
  openGraph: {
    title: 'BearBrick Gen',
    description: 'Mint your unique Vibe on Base',
    images: ['https://bearbrick-base-rqsi.vercel.app/api/image?fid=1'],
  },
  // А вот эти теги - САМЫЕ ВАЖНЫЕ для Farcaster
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://bearbrick-base-rqsi.vercel.app/api/image?fid=1',
    'fc:frame:image:aspect_ratio': '1:1',
    'fc:frame:button:1': 'Open BearBrick App',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': 'https://bearbrick-base-rqsi.vercel.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Подключаем стили (Tailwind) */}
        <script src="https://cdn.tailwindcss.com"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-zinc-900 text-white min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
