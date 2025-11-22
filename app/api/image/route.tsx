import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const fid = searchParams.get('fid') || '1';
    
    // 1. Генерация уникальной палитры на основе FID
    // Используем "Golden Ratio" для гармоничных цветов
    const huePrimary = (Number(fid) * 137.508) % 360;
    const hueSecondary = (huePrimary + 180) % 360; // Комплементарный цвет
    
    const colorBody = `hsl(${huePrimary}, 85%, 65%)`;   // Яркий основной
    const colorDetail = `hsl(${hueSecondary}, 80%, 50%)`; // Контрастный

    // 2. Рисуем BearBrick векторами (SVG)
    // Добавляем градиенты (defs) для эффекта пластика/3D
    const svg = `
      <svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Эффект пластикового блеска -->
          <linearGradient id="plasticShine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="white" stop-opacity="0.4"/>
            <stop offset="50%" stop-color="white" stop-opacity="0.1"/>
            <stop offset="100%" stop-color="black" stop-opacity="0.1"/>
          </linearGradient>
          <!-- Тень внизу -->
          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="10"/>
            <feOffset dx="0" dy="10" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge> 
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/> 
            </feMerge>
          </filter>
        </defs>

        <!-- Фон -->
        <rect width="600" height="600" fill="#f0f0f0"/>
        
        <!-- Группа Медведя с тенью -->
        <g filter="url(#dropShadow)">
        
          <!-- Уши (Круглые) -->
          <circle cx="210" cy="160" r="55" fill="${colorBody}" />
          <circle cx="390" cy="160" r="55" fill="${colorBody}" />
          
          <!-- Руки (Задний план) -->
          <path d="M130 320 L110 420 A 20 20 0 0 0 130 440 L160 440" stroke="${colorDetail}" stroke-width="30" fill="none" stroke-linecap="round" />
          <path d="M470 320 L490 420 A 20 20 0 0 1 470 440 L440 440" stroke="${colorDetail}" stroke-width="30" fill="none" stroke-linecap="round" />

          <!-- Ноги (Толстые) -->
          <path d="M230 450 L230 520 A 20 20 0 0 0 250 540 L280 540 A 20 20 0 0 0 300 520 L300 450 Z" fill="${colorBody}" />
          <path d="M300 450 L300 520 A 20 20 0 0 0 320 540 L350 540 A 20 20 0 0 0 370 520 L370 450 Z" fill="${colorBody}" />

          <!-- Тело (Пузико) -->
          <rect x="210" y="280" width="180" height="180" rx="40" fill="${colorDetail}" />
          <!-- Блик на животе -->
          <rect x="210" y="280" width="180" height="180" rx="40" fill="url(#plasticShine)" />

          <!-- Голова (Округлая) -->
          <rect x="170" y="150" width="260" height="200" rx="70" fill="${colorBody}" />
          
          <!-- Лицо (Схематичное) -->
          <circle cx="250" cy="230" r="15" fill="#333" /> <!-- Глаз Л -->
          <circle cx="350" cy="230" r="15" fill="#333" /> <!-- Глаз П -->
          <path d="M285 260 Q 300 275 315 260" stroke="#333" stroke-width="5" fill="none" /> <!-- Нос/Рот -->

          <!-- Общий Блик (Пластик) -->
          <rect x="170" y="150" width="260" height="200" rx="70" fill="url(#plasticShine)" />
        </g>

        <!-- Текст FID внизу -->
        <text x="300" y="580" font-family="Arial, sans-serif" font-weight="bold" font-size="24" text-anchor="middle" fill="#999">
          BEARBRICK #${fid}
        </text>
      </svg>
    `.trim();

    return new NextResponse(svg, {
      status: 200,
      headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-store' },
    });
  } catch (e) {
    return new NextResponse("Error", { status: 500 });
  }
}
