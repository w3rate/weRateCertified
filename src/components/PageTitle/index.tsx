import Link from 'next/link'
export const PageTitle = () => {
  return (
    <div className="mb-6 mt-[8px] flex flex-col justify-between text-center md:flex-row md:text-start">
      <div className="mb-4 flex flex-col">
        <h1 className="m-[0px] pl-0 text-[30px] font-[700]">Discover. Rate. Earn. Repeat.</h1>
        <p className="m-[0px] text-sm">weRate Certified is your proof-of-feedback hub—powered by real users</p>
      </div>
      <div className="flex flex-col items-center gap-2 md:flex-row">
        <button className="bg-transaprent flex gap-2 rounded-full border-2 border-[#c4f] px-[16px] py-[8px] transition-all duration-300 hover:scale-105 hover:bg-[#c4f2]">
          <img src="/phone.svg" alt="Add to Homepage" width={20} />
          Add to Home
        </button>
        <Link href="/login">
          <button className="bg-transaprent flex gap-2 rounded-full border-2 border-[#c4f] px-[16px] py-[8px] transition-all duration-300 hover:scale-105 hover:bg-[#c4f2]">
            <img src="/user.svg" alt="Add to Homepage" width={20} className="brightness-0 grayscale invert" />
            Login
          </button>
        </Link>
      </div>
    </div>
  )
}
