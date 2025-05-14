'use client'
import React, {useState, useEffect, useCallback} from 'react'
import {signIn, useSession, getCsrfToken} from 'next-auth/react'
import {useRouter} from 'next/navigation'
import {useWallet} from '@solana/wallet-adapter-react'
import {useWalletModal} from '@solana/wallet-adapter-react-ui'
import bs58 from 'bs58'

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
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const {status, data: session} = useSession()
  const router = useRouter()

  const {connected, publicKey, signMessage} = useWallet()
  const {setVisible} = useWalletModal()
  const [isAttemptingSolanaLogin, setIsAttemptingSolanaLogin] = useState(false)

  const handleWalletLoginAttempt = useCallback(() => {
    setError(null)
    if (!connected) {
      setIsAttemptingSolanaLogin(true)
      setVisible(true)
    } else if (publicKey && signMessage) {
      setIsAttemptingSolanaLogin(true)
    }
  }, [connected, publicKey, signMessage, setVisible])

  useEffect(() => {
    if (isAttemptingSolanaLogin && connected && publicKey && signMessage) {
      const executeSignIn = async () => {
        setIsLoading('solana')
        try {
          const csrfToken = await getCsrfToken()
          if (!csrfToken) {
            throw new Error('Failed to get CSRF token.')
          }
          const messageContent = `Sign this message to log in to the app.\nNonce: ${csrfToken}`
          const messageBytes = new TextEncoder().encode(messageContent)
          const signatureBytes = await signMessage(messageBytes)
          const signatureBs58 = bs58.encode(signatureBytes)

          await signIn('credentials', {
            message: messageContent,
            signature: signatureBs58,
            publicKey: publicKey.toBase58(),
            redirect: false
          })
        } catch (err) {
          if (err instanceof Error) {
            setError(`An error occurred: ${err.message || 'Unknown error during Solana sign-in.'}`)
          }

          setIsLoading(null)
          setIsAttemptingSolanaLogin(false)
        }
      }
      executeSignIn()
    }
  }, [isAttemptingSolanaLogin, connected, publicKey, signMessage, router])

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setIsAttemptingSolanaLogin(false)
      setIsLoading(null)
      const userOnboarded = (session.user as {onboarded?: boolean}).onboarded
      router.push(userOnboarded ? '/' : '/onboarding')
    }
  }, [status, session, router])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const authError = urlParams.get('error')
    if (authError && !error) {
      const knownErrors: Record<string, string> = {
        CredentialsSignin: 'Login failed. Please check your credentials or signature.',
        OAuthSignin: 'Error signing in with OAuth provider.',
        OAuthCallback: 'Error in OAuth callback.',
        OAuthCreateAccount: 'Error creating account with OAuth provider.',
        EmailCreateAccount: 'Error creating account with email.',
        Callback: 'Error in callback handling.',
        OAuthAccountNotLinked:
          "This account is not linked. If you've signed in with this email before using a different method, try that method again.",
        Default: 'An unknown login error occurred.'
      }
      setError(knownErrors[authError] || knownErrors.Default)
      if (window.history.replaceState) {
        const cleanURL = window.location.pathname
        window.history.replaceState({}, document.title, cleanURL)
      }
      setIsLoading(null)
      setIsAttemptingSolanaLogin(false)
    }
  }, [router, error])

  const handleSocialLogin = async (provider: 'google') => {
    setError(null)
    setIsLoading(provider)
    try {
      await signIn(provider, {redirect: false})
    } catch (err) {
      if (err instanceof Error) {
        setError(`Login with ${provider} failed. ${err.message || 'Please try again.'}`)
      }

      setIsLoading(null)
    }
  }

  if (status === 'loading' && !isLoading) {
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
          {isLoading === 'solana' ? 'Processing Solana login...' : 'Processing...'}
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
          onClick={handleWalletLoginAttempt}
        >
          {isLoading === 'solana' ? (
            <Spinner />
          ) : (
            <img src="/wallet.svg" alt="Wallet" className="mr-3 h-5 w-5 invert" />
          )}
          {isLoading === 'solana'
            ? 'Processing...'
            : connected && publicKey
              ? `Wallet (${publicKey.toBase58().substring(0, 4)}...${publicKey.toBase58().substring(publicKey.toBase58().length - 4)})`
              : 'Connect Wallet'}
        </button>
      </div>
    </div>
  )
}

export default Login
