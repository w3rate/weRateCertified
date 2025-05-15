import React from 'react'

const Header = () => {
  return (
    <div className="z-20 flex w-full justify-center py-6">
      <div>
        <div className="animate-float relative flex cursor-pointer items-center justify-center">
          <span className="bg-gradient-primary animate-glow-pulse bg-clip-text text-3xl font-bold tracking-wider text-transparent">
            weRate
          </span>

          <span className="text-werate-text ml-1 self-center text-base font-semibold">Certified</span>
        </div>
      </div>
    </div>
  )
}

export default Header
