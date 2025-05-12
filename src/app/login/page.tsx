'use client'
import React, {useState, useEffect} from 'react'
import {signIn, useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'

const Spinner = () => (
  <svg
    className="mr-3 h-5 w-5 animate-spin text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#c4f" strokeWidth="4"></circle>
    <path
      className="opacity-75"
      fill="#c4f"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)

const Login = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const {data: session, status} = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [status, router])

  const handleSocialLogin = async (provider: 'google') => {
    setError(null)
    setIsLoading(provider)
    try {
      await signIn(provider, {callbackUrl: '/dashboard'})
    } catch (err: any) {
      console.error(`Login error with ${provider}:`, err)
      setError(`Login with ${provider} failed. Please try again.`)
      setIsLoading(null)
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner /> Loading session...
      </div>
    )
  }

  if (status === 'authenticated') {
    return (
      <div className="flex h-screen items-center justify-center">
        Already logged in. Redirecting... <Spinner />
      </div>
    )
  }

  return (
    <div
      className={`relative m-auto flex w-full flex-col gap-[16px] rounded-3xl border border-[#c4f] bg-[#181a26] p-8 backdrop-blur-sm md:w-[40%] ${isLoading ? 'pointer-events-none opacity-80' : ''}`}
      style={{transform: 'none'}}
    >
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-black/30">
          <Spinner />
        </div>
      )}

      <div className="mb-6 text-center">
        <h2 className="mb-4 text-lg font-medium text-white">Sign in or register</h2>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-600 bg-red-800/50 px-4 py-2 text-center text-sm text-red-100">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={() => handleSocialLogin('google')}
          disabled={!!isLoading}
          className="button-social ring-offset-background focus-visible:ring-ring hover:border-werate-purple border-werate-tertiary bg-werate-tertiary/20 hover:bg-werate-tertiary/40 inline-flex h-9 w-full items-center justify-start gap-2 whitespace-nowrap rounded-full border px-3 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:h-10 sm:px-4"
        >
          {isLoading === 'google' ? <Spinner /> : <img src="/google.svg" alt="Google" className="mr-3 h-5 w-5" />}
          {isLoading === 'google' ? 'Redirecting...' : 'Google'}
        </button>
      </div>

      <div className="space-y-3">
        <button
          disabled={!!isLoading}
          className="button-social ring-offset-background focus-visible:ring-ring hover:border-werate-purple border-werate-tertiary bg-werate-tertiary/20 hover:bg-werate-tertiary/40 inline-flex h-9 w-full items-center justify-start gap-2 whitespace-nowrap rounded-full border px-3 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:h-10 sm:px-4"
        >
          {isLoading === 'google' ? (
            <Spinner />
          ) : (
            <img src="/wallet.svg" alt="Google" className="mr-3 h-5 w-5 invert" />
          )}
          {isLoading === 'google' ? 'Redirecting...' : 'Wallet'}
        </button>
      </div>
    </div>
  )
}

export default Login
