import React from 'react'

const Disclaimer = () => {
  return (
    <div className="mt-8 flex items-center gap-[8px] rounded-lg border border-[#fff1] bg-[#223] p-4 text-white/80">
      <img src="/info.svg" alt="info" width={24} />
      <p className="text-werate-text text-sm">
        The information provided on this platform is for informational purposes only and should not be considered
        financial advice. Cryptocurrency and blockchain projects involve significant risks, including volatility and
        potential loss of investment. Always conduct your own research before making any investment decisions.
      </p>
    </div>
  )
}

export default Disclaimer
