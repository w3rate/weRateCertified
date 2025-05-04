export const PageTitle = () => {
  return (
    <div className="mb-6 mt-[8px] flex justify-between">
      <div className="mb-4 flex flex-col">
        <h1 className="m-[0px] pl-0 text-[30px] font-[700]">Discover. Rate. Earn. Repeat.</h1>
        <p className="m-[0px] text-sm">weRate Certified is your proof-of-feedback hub—powered by real users</p>
      </div>
      <div className="flex flex-row items-center gap-2">
        <button className="bg-transaprent flex gap-2 rounded-full border-2 border-[#c4f] px-[16px] py-[8px] transition-all duration-300 hover:scale-105 hover:bg-[#c4f2]">
          <img src="/phone.svg" alt="Add to Homepage" width={20} />
          Add to Home
        </button>
        <button className="bg-transaprent flex gap-2 rounded-full border-2 border-[#c4f] px-[16px] py-[8px] transition-all duration-300 hover:scale-105 hover:bg-[#c4f2]">
          <img src="/user.svg" alt="Add to Homepage" width={20} />
          Login
        </button>
      </div>
    </div>
  )
}
