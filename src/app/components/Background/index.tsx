export const Background = () => (
  <div
    style={{
      backgroundSize: '30px 30px',
      backgroundImage: `radial-gradient(#c4f3 2px, transparent 2px)`,
      backgroundPosition: 'center',
      backgroundColor: '#181a26'
    }}
    className={`fixed left-[0px] top-[0px] h-full w-full text-white antialiased`}
  >
    <img
      src="/glowingStar.svg"
      alt="Glow Star"
      className="spinning-glowing-element pointer-events-none fixed right-[6%] top-[12%] z-[-1] h-[120px] w-[120px] animate-pulse animate-spin object-contain opacity-80 mix-blend-screen"
    />

    <img
      src="/glowingStar.svg"
      alt="Glow Star"
      className="spinning-glowing-element pointer-events-none fixed bottom-[15%] left-[7%] z-[-1] h-[80px] w-[80px] animate-pulse animate-spin object-contain opacity-80 mix-blend-screen"
    />

    <img
      src="/glowingStar.svg"
      alt="Glow Star"
      className="spinning-glowing-element pointer-events-none fixed left-[3%] top-[6%] z-[-1] h-[60px] w-[60px] animate-spin object-contain opacity-80"
    />

    <img
      src="/glowingStar.svg"
      alt="Glow Star"
      className="spinning-glowing-element pointer-events-none fixed bottom-[10%] right-[3%] z-[-1] h-[90px] w-[90px] animate-pulse animate-spin object-contain opacity-80 mix-blend-screen"
    />

    <div className="pointer-events-none fixed left-[6%] top-1/2 z-[-1] h-[50px] w-[50px] -translate-y-1/2">
      <img
        src="/glowingStar.svg"
        alt="Glow Star"
        className="spinning-glowing-element h-full w-full animate-pulse animate-spin object-contain opacity-80 mix-blend-screen"
      />
    </div>
  </div>
)
