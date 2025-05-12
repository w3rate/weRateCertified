import Link from 'next/link'
export const Footer = () => (
  <footer className="fixed bottom-[0px] left-[0px] z-[95] flex h-fit w-full items-center justify-center gap-[20px] bg-[#151521] p-2 text-[#c4f] md:gap-[30px]">
    <nav>
      <Link href="" className="group flex flex-col items-center gap-[8px] text-inherit no-underline">
        <img
          src="/search.svg"
          width={24}
          alt="search"
          className="brightness-0 grayscale invert transition-all group-hover:brightness-100 group-hover:grayscale-0 group-hover:invert-0"
        />
        <span className="brightness-0 grayscale invert transition-all group-hover:brightness-100 group-hover:grayscale-0 group-hover:invert-0">
          Discover
        </span>
      </Link>
    </nav>

    <nav>
      <Link href="" className="group flex flex-col items-center gap-[8px] text-inherit no-underline">
        <img
          src="/rewards.svg"
          width={24}
          alt="search"
          className="brightness-0 grayscale invert transition-all group-hover:brightness-100 group-hover:grayscale-0 group-hover:invert-0"
        />
        <span className="brightness-0 grayscale invert transition-all group-hover:brightness-100 group-hover:grayscale-0 group-hover:invert-0">
          Rewards
        </span>
      </Link>
    </nav>
    <nav>
      <Link href="" className="group flex flex-col items-center gap-[8px] text-inherit no-underline">
        <img
          src="/user.svg"
          width={24}
          alt="search"
          className="brightness-0 grayscale invert transition-all group-hover:brightness-100 group-hover:grayscale-0 group-hover:invert-0"
        />
        <span className="brightness-0 grayscale invert transition-all group-hover:brightness-100 group-hover:grayscale-0 group-hover:invert-0">
          Profile
        </span>
      </Link>
    </nav>
    <nav>
      <Link href="" className="group flex flex-col items-center gap-[8px] text-inherit no-underline">
        <img
          src="/getApp.svg"
          width={24}
          alt="search"
          className="brightness-0 grayscale invert transition-all group-hover:brightness-100 group-hover:grayscale-0 group-hover:invert-0"
        />
        <span className="brightness-0 grayscale invert transition-all group-hover:brightness-100 group-hover:grayscale-0 group-hover:invert-0">
          Get the App
        </span>
      </Link>
    </nav>
  </footer>
)
