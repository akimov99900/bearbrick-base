/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/.well-known/farcaster.json',
        // 👇 ВСТАВЬ СЮДА СВОЮ ДЛИННУЮ ССЫЛКУ ИЗ ЗЕЛЕНОГО ПОЛЯ 👇
        destination: 'https://api.farcaster.xyz/miniapps/hosted-manifest/019aab19-2a94-dade-0b1f-e494516f13d5', 
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
