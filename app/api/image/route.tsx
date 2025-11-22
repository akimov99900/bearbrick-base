export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fid = searchParams.get('fid') || '1';
  
  // Генерируем цвета на основе FID (математика)
  const hue1 = (Number(fid) * 137) % 360;
  const hue2 = (Number(fid) * 43) % 360;
  const color1 = `hsl(${hue1}, 70%, 60%)`;
  const color2 = `hsl(${hue2}, 80%, 40%)`;

  // Рисуем SVG вручную (как текст). Это невозможно сломать.
  const svg = `
    <svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
      <!-- Фон -->
      <rect width="600" height="600" fill="#f4f4f5" />
      
      <!-- Медведь (пиксельный стиль) -->
      <g transform="scale(60)">
        <!-- Уши -->
        <rect x="1" y="0" width="2" height="1" fill="${color1}" />
        <rect x="7" y="0" width="2" height="1" fill="${color1}" />
        
        <!-- Голова -->
        <rect x="1" y="1" width="8" height="2" fill="${color1}" />
        
        <!-- Тело (верх) -->
        <rect x="2" y="3" width="6" height="3" fill="${color2}" />
        
        <!-- Руки -->
        <rect x="0" y="3" width="2" height="2" fill="${color1}" />
        <rect x="8" y="3" width="2" height="2" fill="${color1}" />
        
        <!-- Ноги -->
        <rect x="2" y="6" width="2" height="3" fill="${color1}" />
        <rect x="6" y="6" width="2" height="3" fill="${color1}" />
      </g>

      <!-- Текст -->
      <text x="300" y="550" font-family="sans-serif" font-size="40" text-anchor="middle" fill="#71717a">
        FID: ${fid}
      </text>
    </svg>
  `.trim();

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
