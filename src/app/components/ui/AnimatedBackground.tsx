// src/app/components/ui/AnimatedBackground.tsx
// Версия, максимально точно повторяющая оригинальный HTML фона

import React from 'react'

const AnimatedBackground: React.FC = () => {
  // Значения стилей взяты напрямую из оригинального HTML
  const originalBackgroundColor = 'rgb(26, 31, 44)'
  const originalGradientColor = 'rgba(201, 78, 255, 0.4)'
  const originalOverlayColor = 'rgba(21, 21, 33, 0.5)'

  return (
    // 1. Основной контейнер фона
    <div
      className="fixed inset-0 z-[-1] overflow-hidden"
      style={{
        backgroundSize: '30px 30px',
        backgroundImage: `radial-gradient(${originalGradientColor} 2px, transparent 2px)`,
        backgroundPosition: 'center center',
        backgroundColor: originalBackgroundColor
      }}
    >
      {/* 2. Оверлей */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: originalOverlayColor,
          mixBlendMode: 'normal'
        }}
      />

      {/* 3. Звезды - ТОЧНАЯ копия структуры и стилей из оригинала */}
      {/* УБЕДИТЕСЬ, что @keyframes glow-pulse определен в CSS! */}

      {/* Star 1 */}
      <div
        className="animate-glow-pulse pointer-events-none absolute right-20 top-20 z-[-1] mix-blend-screen" // Классы как в оригинале
        style={{
          width: '120px', // Inline стили как в оригинале
          height: '120px',
          transform: 'rotate(183deg)',
          transition: 'transform 0.05s linear'
        }}
      >
        <img
          src="/star.svg" // Путь к вашей звезде
          alt="Glow Star"
          className="h-full w-full object-contain opacity-80" // Классы для img как в оригинале
        />
      </div>

      {/* Star 2 */}
      <div
        className="animate-glow-pulse pointer-events-none absolute bottom-20 left-20 z-[-1] mix-blend-screen"
        style={{
          width: '80px',
          height: '80px',
          transform: 'rotate(119deg)',
          transition: 'transform 0.05s linear'
        }}
      >
        <img src="/star.svg" alt="Glow Star" className="h-full w-full object-contain opacity-80" />
      </div>

      {/* Star 3 */}
      <div
        className="animate-glow-pulse pointer-events-none absolute left-10 top-10 z-[-1] mix-blend-screen"
        style={{
          width: '60px',
          height: '60px',
          transform: 'rotate(203deg)',
          transition: 'transform 0.05s linear'
        }}
      >
        <img src="/star.svg" alt="Glow Star" className="h-full w-full object-contain opacity-80" />
      </div>

      {/* Star 4 */}
      <div
        className="animate-glow-pulse pointer-events-none absolute bottom-10 right-10 z-[-1] mix-blend-screen"
        style={{
          width: '90px',
          height: '90px',
          transform: 'rotate(143deg)',
          transition: 'transform 0.05s linear'
        }}
      >
        <img src="/star.svg" alt="Glow Star" className="h-full w-full object-contain opacity-80" />
      </div>

      {/* Star 5 */}
      <div
        // Используем классы Tailwind для позиционирования как в оригинале
        className="animate-glow-pulse pointer-events-none absolute left-20 top-1/2 z-[-1] -translate-y-1/2 mix-blend-screen"
        style={{
          width: '50px', // Ширина/высота
          height: '50px',
          // transform ТОЛЬКО для rotate, так как translate уже задан классами
          transform: 'rotate(180deg)',
          transition: 'transform 0.05s linear' // transition
        }}
      >
        <img src="/star.svg" alt="Glow Star" className="h-full w-full object-contain opacity-80" />
      </div>
    </div>
  )
}

export default AnimatedBackground
