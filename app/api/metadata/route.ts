import { NextResponse } from 'next/server';
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id') || '1';
  const host = req.headers.get('host');
  const proto = host?.includes('localhost') ? 'http' : 'https';
  return NextResponse.json({
    name: `BearBrick #${id}`,
    description: "Farcaster Mint",
    image: `${proto}://${host}/api/image?fid=${id}`
  });
}
