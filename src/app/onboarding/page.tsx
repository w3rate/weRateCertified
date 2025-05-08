'use client'
import {useState} from 'react'

const Onboarding = () => {
  const [step, setStep] = useState(1)
  
  let currentStepTitle = '';
  if (step === 1) {
    currentStepTitle = 'Wallet Connection';
  } else if (step === 2) {
    currentStepTitle = 'Complete Your Profile';
  } else if (step === 3) {
    currentStepTitle = 'Final Step';
  }

  return (
    <div className="m-auto flex flex-col gap-[16px] md:w-[40%]">
      <h1 className="text-center text-[24px] font-[700] text-white">{`${currentStepTitle} (${step}/3)`}</h1>
      <h3 className="text-center text-slate-300">Setting up your account to start reviewing projects</h3>
      <div className="flex items-center justify-center gap-[10px] p-2">
        {[1, 2, 3].map((item) => (
          <div
            key={item} 
            className={`h-[10px] w-[10px] cursor-pointer rounded-full ${item === step ? 'bg-[#c4f]' : 'bg-[#335]'} transition-all hover:scale-110`}
          ></div>
        ))}
      </div>
      <div
        className={`relative m-auto flex w-full flex-col gap-[16px] rounded-3xl border border-[#c4f] bg-[#181a26] p-6 backdrop-blur-sm`}
        style={{transform: 'none'}}
      >
        {step === 1 && (
          <>
            <h3 className="text-[24px] font-[700] text-white">Wallet connected</h3>
            <div className="flex w-full items-center gap-[10px] rounded-lg bg-[#3355] p-4">
              <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#c4f5]">
                <img src="/check.svg" width={20} height={20} alt="check" />
              </div>
              <div className="flex flex-col">
                <span className="font-[500] text-white">Wallet successfully connected</span>
                <span className="text-[14px] text-white/80">You can now continue with profile setup</span>
              </div>
            </div>
            <button
              className="w-full rounded-full bg-[#c4f] p-2 text-[16px] font-[600] text-white"
              onClick={() => setStep(2)}
            >
              Continue to Profile setup
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <h3 className="text-[24px] font-[700] text-white mb-4">Complete Your Profile</h3>
            
            <div className="flex justify-center mb-4">
              <div className="bg-slate-700/30 border-slate-600 hover:border-[#c4f] flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border-2 border-dashed transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-slate-300"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 12h8"></path>
                  <path d="M12 8v8"></path>
                </svg>
                <span className="sr-only">Add Profile Picture</span>
              </div>
            </div>
            <div className="text-slate-300 mb-4 text-center text-sm">Add Profile Picture</div>
            
            <div className="mb-4">
              <label className="text-slate-300 mb-2 block text-sm font-medium">Username</label>
              <input
                type="text"
                className="border-slate-600 bg-slate-700 text-white ring-offset-[#181a26] file:text-white placeholder-slate-400 focus-visible:ring-[#c4f] flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                placeholder="SolanaExplorer"
                defaultValue=""
              />
            </div>
            
            <div className="mb-4">
              <label className="text-slate-300 mb-2 block text-sm font-medium">Email (Optional)</label>
              <input
                type="email"
                className="border-slate-600 bg-slate-700 text-white ring-offset-[#181a26] file:text-white placeholder-slate-400 focus-visible:ring-[#c4f] flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                placeholder="your@email.com"
                defaultValue=""
              />
              <p className="text-slate-300 mt-1 text-xs">We'll only use this for important account notifications</p>
            </div>

            <div className="mb-4">
              <label className="text-slate-300 mb-2 block text-sm font-medium">
                How long have you been in Crypto?
              </label>
              <button
                type="button"
                className="border-slate-600 bg-slate-700/50 text-slate-300 ring-offset-[#181a26] placeholder-slate-400 focus:ring-[#c4f] flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
              >
                <span style={{pointerEvents: 'none'}}>Select your experience</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 opacity-50"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <label className="text-slate-300 mb-2 block text-sm font-medium">Interests</label>
              <div className="flex flex-wrap gap-2">
                {['Trader', 'Degen', 'Investor', 'VC', 'Noob', 'Whale', 'Creator', 'Hodler'].map((interest) => (
                  <button key={interest} className="bg-slate-700/50 text-slate-300 hover:bg-slate-600 rounded-full px-4 py-2 text-sm transition-all">
                    {interest}
                  </button>
                ))}
                <button className="bg-slate-700/30 text-slate-300 hover:bg-slate-600 rounded-full px-4 py-2 text-sm transition-all">
                  + Add More
                </button>
              </div>
            </div>
            
            <div className="mt-auto">
              <button
                onClick={() => setStep(3)}
                className="w-full rounded-full bg-[#c4f] p-2 text-[16px] font-[600] text-white"
              >
                Start Exploring
              </button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className="from-[#c4f] to-purple-500 mb-4 rounded-xl bg-gradient-to-r p-4">
              <h2 className="mb-1 text-center text-xl font-bold text-white">Welcome aboard!</h2>
              <p className="mb-0 text-center text-white/90">Your journey begins</p>
            </div>
            <h3 className="text-[24px] font-[700] text-white text-center mb-4">What you can earn:</h3>
            
            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-3 h-6 w-6 text-yellow-400"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                  <span className="text-lg text-white">Starting Points</span>
                </div>
                <span className="text-[#c4f] text-xl font-bold">100</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-3 h-6 w-6 text-green-400"
                  >
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16"></path>
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                  </svg>
                  <span className="text-lg text-white">Newbie</span>
                </div>
                <span className="text-lg text-white">Starting Tier</span>
              </div>
            </div>
            <button
              className="w-full rounded-full bg-[#c4f] p-2 text-[16px] font-[600] text-white"
              onClick={() => { alert('Start Rating Clicked!') }} // Пример действия
            >
              START RATING
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Onboarding