import { ImageResponse } from 'next/og';
export const runtime = 'edge';
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fid = searchParams.get('fid') || '1';
  const hue = (parseInt(fid) * 137) % 360;
  return new ImageResponse(
    (<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%',height:'100%',background:'#fff'}}>
       <svg width="300" height="300" viewBox="0 0 10 10">
         <rect x="2" y="1" width="6" height="8" fill={`hsl(${hue},70%,60%)`} />
         <rect x="1" y="3" width="8" height="2" fill={`hsl(${(hue+40)%360},80%,50%)`} />
         <text x="5" y="9" textAnchor="middle" fontSize="1" fill="black">{fid}</text>
       </svg>
       <h1>BearBrick #{fid}</h1>
    </div>), {width:600,height:600}
  );
}
