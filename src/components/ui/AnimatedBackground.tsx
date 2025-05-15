import React from 'react'

const AnimatedBackground: React.FC = () => {
  const originalBackgroundColor = 'rgb(26, 31, 44)'
  const originalGradientColor = 'rgba(201, 78, 255, 0.4)'
  const originalOverlayColor = 'rgba(21, 21, 33, 0.5)'

  return (
    <div
      className="fixed inset-0 z-[-1] overflow-hidden"
      style={{
        backgroundSize: '30px 30px',
        backgroundImage: `radial-gradient(${originalGradientColor} 2px, transparent 2px)`,
        backgroundPosition: 'center center',
        backgroundColor: originalBackgroundColor
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: originalOverlayColor,
          mixBlendMode: 'normal'
        }}
      />

      <div
        className="animate-glow-pulse pointer-events-none absolute right-20 top-20 z-[-1] mix-blend-screen"
        style={{
          width: '120px',
          height: '120px',
          transform: 'rotate(183deg)',
          transition: 'transform 0.05s linear'
        }}
      >
        <img src="/star.svg" alt="Glow Star" className="h-full w-full object-contain opacity-80" />
      </div>

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

      <div
        className="animate-glow-pulse pointer-events-none absolute left-20 top-1/2 z-[-1] -translate-y-1/2 mix-blend-screen"
        style={{
          width: '50px',
          height: '50px',

          transform: 'rotate(180deg)',
          transition: 'transform 0.05s linear'
        }}
      >
        <img src="/star.svg" alt="Glow Star" className="h-full w-full object-contain opacity-80" />
      </div>
    </div>
  )
}

export default AnimatedBackground
