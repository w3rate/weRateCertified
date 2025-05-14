'use client'
import {useState, useCallback, useEffect, ChangeEvent} from 'react'
import {useSession, SessionContextValue} from 'next-auth/react' // Assuming User is defined in next-auth.d.ts
import {useWallet, WalletContextState} from '@solana/wallet-adapter-react'
import {useWalletModal, WalletModalContextState} from '@solana/wallet-adapter-react-ui'
import {useRouter} from 'next/navigation'
import {PublicKey} from '@solana/web3.js'
// Make sure User is correctly defined in your next-auth.d.ts to include these custom fields
// import { User } from 'next-auth' // Or your custom path if User is extended elsewhere

interface UserProfileUpdates {
  name?: string | null
  email?: string | null
  cryptoExperience?: string | null
  interests?: string[] | null
  solanaPublicKey?: string | null
  onboarded?: boolean | null
}

const Onboarding = () => {
  const [step, setStep] = useState<number>(1)
  const router = useRouter()
  const {data: session, update}: SessionContextValue = useSession()
  const {publicKey}: WalletContextState = useWallet()
  const {setVisible}: WalletModalContextState = useWalletModal()
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [cryptoExperience, setCryptoExperience] = useState<string>('')
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const isConnected: string | undefined | null = session?.user?.solanaPublicKey

  useEffect(() => {
    if (session?.user) {
      setUsername(session.user.name || session.user.email?.split('@')[0] || '')
      setEmail(session.user.email || '')
      if (session.user.cryptoExperience) setCryptoExperience(session.user.cryptoExperience as string)
      if (session.user.interests) setSelectedInterests(session.user.interests as string[])
    }
  }, [session])

  const handleWalletUpdate = useCallback(async (): Promise<void> => {
    if (!publicKey || isProcessing || !session?.user?.id) {
      if (!session?.user?.id) {
        console.warn('Cannot update wallet, session user ID is missing.')
      }
      return
    }

    setIsProcessing(true)
    try {
      const updatedSessionData = await update({
        user: {
          solanaPublicKey: publicKey.toString()
        }
      })
      console.log('Session updated with solanaPublicKey:', updatedSessionData)

      await fetch('/api/update-user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          userId: session.user.id,
          updates: {solanaPublicKey: publicKey.toString()}
        })
      })
      console.log('solanaPublicKey update sent to DB for user:', session.user.id)
    } catch (error) {
      console.error('Error in handleWalletUpdate:', error)
    } finally {
      setIsProcessing(false)
    }
  }, [publicKey, session?.user?.id, update, isProcessing])

  useEffect(() => {
    if (session?.user?.id) {
      if (publicKey && !session?.user?.solanaPublicKey) {
        handleWalletUpdate()
      }
    }
  }, [publicKey, handleWalletUpdate, session])

  const handleProfileSubmit = useCallback(async (): Promise<void> => {
    if (!session?.user?.id || isProcessing) {
      console.error('Cannot submit profile: Session user ID is missing or already processing.')
      return
    }
    setIsProcessing(true)

    const profileUpdates: UserProfileUpdates = {
      name: username,
      email: email,
      cryptoExperience: cryptoExperience,
      interests: selectedInterests
    }

    try {
      // Ensure UserProfileUpdates is compatible with Partial<Session['user']> based on your next-auth.d.ts
      const updatedSession = await update({user: profileUpdates})
      console.log('Session updated with profile info:', updatedSession)

      await fetch('/api/update-user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          userId: session.user.id,
          updates: profileUpdates
        })
      })
      console.log('Profile updates sent to DB for user:', session.user.id)
      setStep(3)
    } catch (error) {
      console.error('Error submitting profile:', error)
    } finally {
      setIsProcessing(false)
    }
  }, [session?.user?.id, username, email, cryptoExperience, selectedInterests, update, isProcessing])

  let currentStepTitle: string = ''
  if (step === 1) {
    currentStepTitle = 'Wallet Connection'
  } else if (step === 2) {
    currentStepTitle = 'Complete Your Profile'
  } else if (step === 3) {
    currentStepTitle = 'Final Step'
  }

  const handleCompleteOnboarding = useCallback(async (): Promise<void> => {
    if (!session || !session.user || !session.user.id) {
      console.error('Cannot complete onboarding: Session, user, or user ID is missing.')
      return
    }
    if (isProcessing) return

    setIsProcessing(true)
    try {
      const updatedSession = await update({
        user: {
          onboarded: true
        }
      })
      console.log('Session updated with onboarded status:', updatedSession)

      if (updatedSession?.user?.onboarded === true) {
        await fetch('/api/update-user', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            userId: session.user.id,
            updates: {onboarded: true}
          })
        })
        console.log('Onboarded status update sent to DB for user:', session.user.id)
        router.push('/')
      } else {
        console.warn('Session update did not reflect onboarded status change, or user ID missing for DB update.')
      }
    } catch (error) {
      console.error('Error in handleCompleteOnboarding:', error)
    } finally {
      setIsProcessing(false)
    }
  }, [session, update, isProcessing, router])

  const {status: sessionStatus} = useSession()
  if (typeof window !== 'undefined' && sessionStatus === 'loading' && !session) {
    return <div className="m-auto flex flex-col gap-[16px] text-center text-white md:w-[40%]">Loading session...</div>
  }

  if (!session?.user?.id && step > 1) {
    console.warn('No session user ID available for onboarding steps beyond wallet connection.')
    return (
      <div className="m-auto flex flex-col gap-[16px] text-center text-white md:w-[40%]">
        Error: User session not found. Please try logging in again.
      </div>
    )
  }

  return (
    <div className="m-auto flex flex-col gap-[16px] md:w-[40%]">
      <h1 className="text-center text-[24px] font-[700] text-white">{`${currentStepTitle} (${step}/3)`}</h1>
      <h3 className="text-center text-slate-300">Setting up your account to start reviewing projects</h3>
      <div className="flex items-center justify-center gap-[10px] p-2">
        {[1, 2, 3].map((item: number) => (
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
            <h3 className="text-[24px] font-[700] text-white">
              {isConnected ? 'Wallet connected' : 'Wallet is not connected'}
            </h3>
            <div className="flex w-full items-center gap-[10px] rounded-lg bg-[#3355] p-4">
              {isConnected && publicKey && (
                <>
                  <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#c4f5]">
                    <img src="/check.svg" width={20} height={20} alt="check" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-[500] text-white">Wallet successfully connected</span>
                    <span className="w-64 truncate text-[14px] text-white/80" title={publicKey.toString()}>
                      {(publicKey as PublicKey).toString()}
                    </span>
                    <span className="text-[14px] text-white/80">You can now continue with profile setup</span>
                  </div>
                </>
              )}
              {!isConnected && (
                <div className="flex cursor-pointer items-center gap-[10px]" onClick={() => setVisible(true)}>
                  <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#c4f5]">
                    <img src="/info.svg" width={20} height={20} alt="check" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-[500] text-white">Click here to connect your Solana wallet</span>
                  </div>
                </div>
              )}
            </div>
            <button
              className="w-full rounded-full bg-[#c4f] p-2 text-[16px] font-[600] text-white disabled:opacity-50"
              onClick={() => {
                if (isConnected) {
                  setStep(2)
                } else {
                  setVisible(true)
                }
              }}
              disabled={isProcessing || (!isConnected && !publicKey)}
            >
              {isProcessing ? 'Processing...' : 'Continue to Profile setup'}
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <h3 className="mb-4 text-[24px] font-[700] text-white">Complete Your Profile</h3>

            <div className="mb-4 flex justify-center">
              <div className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-slate-600 bg-slate-700/30 transition-colors hover:border-[#c4f]">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    className="h-full w-full rounded-full"
                    alt="user"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c4f"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-slate-300"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 12h8"></path>
                    <path d="M12 8v8"></path>
                  </svg>
                )}
              </div>
            </div>
            <div className="mb-4 text-center text-sm text-slate-300">
              {session?.user?.image
                ? 'Current Profile Picture'
                : 'Add Profile Picture (via social login or future update)'}
            </div>

            <div className="mb-4">
              <label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-300">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-base text-white placeholder-slate-400 ring-offset-[#181a26] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4f] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={username}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
                Email (Optional)
              </label>
              <input
                id="email"
                type="email"
                className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-base text-white placeholder-slate-400 ring-offset-[#181a26] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4f] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              <p className="mt-1 text-xs text-slate-300">{`We'll only use this for important account notifications`}</p>
            </div>

            <div className="mb-4">
              <label htmlFor="cryptoExperience" className="mb-2 block text-sm font-medium text-slate-300">
                How long have you been in Crypto?
              </label>
              <select
                id="cryptoExperience"
                value={cryptoExperience}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setCryptoExperience(e.target.value)}
                className="flex h-10 w-full items-center justify-between rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-slate-300 placeholder-slate-400 ring-offset-[#181a26] focus:outline-none focus:ring-2 focus:ring-[#c4f] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
              >
                <option value="">Select your experience</option>
                <option value="<1 year">&lt;1 year</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-slate-300">Interests</label>
              <div className="flex flex-wrap gap-2">
                {['Trader', 'Degen', 'Investor', 'VC', 'Noob', 'Whale', 'Creator', 'Hodler'].map((interest: string) => (
                  <button
                    key={interest}
                    onClick={() => {
                      // 'e' parameter removed here
                      setSelectedInterests((prev: string[]) =>
                        prev.includes(interest) ? prev.filter((i: string) => i !== interest) : [...prev, interest]
                      )
                    }}
                    className={`rounded-full px-4 py-2 text-sm transition-all hover:bg-slate-600 ${
                      selectedInterests.includes(interest) ? 'bg-[#c4f] text-white' : 'bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto">
              <button
                onClick={handleProfileSubmit}
                className="w-full rounded-full bg-[#c4f] p-2 text-[16px] font-[600] text-white disabled:opacity-50"
                disabled={isProcessing || !username}
              >
                {isProcessing ? 'Saving...' : 'Save Profile & Continue'}
              </button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div className="mb-4 rounded-xl bg-gradient-to-r from-[#c4f] to-purple-500 p-4">
              <h2 className="mb-1 text-center text-xl font-bold text-white">
                Welcome aboard, {session?.user?.name || 'User'}!
              </h2>
              <p className="mb-0 text-center text-white/90">Your journey begins</p>
            </div>
            <h3 className="mb-4 text-center text-[24px] font-[700] text-white">What you can earn:</h3>

            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c4f"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-3 h-6 w-6 text-yellow-400"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                  <span className="text-lg text-white">Starting Points</span>
                </div>
                <span className="text-xl font-bold text-[#c4f]">100</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c4f"
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
              className="w-full rounded-full bg-[#c4f] p-2 text-[16px] font-[600] text-white disabled:opacity-50"
              onClick={handleCompleteOnboarding}
              disabled={isProcessing}
            >
              {isProcessing ? 'Finalizing...' : 'START RATING'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Onboarding
