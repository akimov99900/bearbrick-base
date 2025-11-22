export const metadata = {
  title: 'BearBrick Mint',
  description: 'Mint your Vibe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Подключаем Tailwind через CDN надежным способом */}
        <script src="https://cdn.tailwindcss.com"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-zinc-900 text-white min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
