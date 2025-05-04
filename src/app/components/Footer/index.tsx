import Link from 'next/link'
export const Footer = () => (
  <footer className="fixed bottom-[0px] left-[0px] z-[95] flex h-[100px] w-full items-center justify-center gap-[20px] border-t border-t-[#335] bg-[#151521] text-white">
    <nav>
      <Link
        href=""
        className="hover:filter-[invert(30%)_sepia(94%)_saturate(6347%)_hue-rotate(250deg)_brightness(103%)_contrast(103%)] flex flex-col items-center gap-[8px] text-inherit no-underline"
      >
        <img src="/search.svg" width={24} alt="search" className="transition-all" />
        Discover
      </Link>
    </nav>
    <nav>
      <Link
        href=""
        className="hover:filter-[invert(30%)_sepia(94%)_saturate(6347%)_hue-rotate(250deg)_brightness(103%)_contrast(103%)] flex flex-col items-center gap-[8px] text-inherit no-underline"
      >
        <img src="/rewards.svg" width={24} alt="search" />
        Rewards
      </Link>
    </nav>
    <nav>
      <Link
        href=""
        className="hover:filter-[invert(30%)_sepia(94%)_saturate(6347%)_hue-rotate(250deg)_brightness(103%)_contrast(103%)] flex flex-col items-center gap-[8px] text-inherit no-underline"
      >
        <img src="/user.svg" width={24} alt="search" />
        Profile
      </Link>
    </nav>
    <nav>
      <Link
        href=""
        className="hover:filter-[invert(30%)_sepia(94%)_saturate(6347%)_hue-rotate(250deg)_brightness(103%)_contrast(103%)] flex flex-col items-center gap-[8px] text-inherit no-underline"
      >
        <img src="/getApp.svg" width={24} alt="search" />
        Get the App
      </Link>
    </nav>
  </footer>
)
