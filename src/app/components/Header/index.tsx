const Header = () => (
  <header className="z-20 flex w-full items-center justify-center py-6">
    <div className="animate-float relative flex cursor-pointer items-center justify-center gap-[4px]">
      <span className="bg-gradient-primary animate-glow-pulse bg-clip-text text-[30px] font-[700] leading-none tracking-wider text-transparent">
        {'weRate '}
      </span>
      <span className="ml-1 self-center text-[16px] font-[600] leading-none text-[#dde]">Certified</span>
    </div>
  </header>
)

export default Header
