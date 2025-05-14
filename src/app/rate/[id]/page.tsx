'use client'

import Link from 'next/link'
import {use, useState, ChangeEvent, FormEvent, useEffect} from 'react'
import {allProjectsData} from '@/components/constants'
import {useRouter} from 'next/navigation'
import {useSession} from 'next-auth/react'

interface ProjectCardData {
  id: number
  href: string
  title: string
  rating: number
  description: string
  tags: string[]
  blockchain: string
  img: string
}

interface RatingCategory {
  id: string
  label: string
}

const ProjectReviewPage = ({params: paramsPromise}: {params: Promise<{id: string}>}) => {
  const router = useRouter()
  const {data: session} = useSession()
  const resolvedParams = use(paramsPromise)
  const currentProjectId = parseInt(resolvedParams.id, 10)
  const projectFromData = allProjectsData.find((p) => p.id === currentProjectId) as ProjectCardData | undefined

  const [overallRating, setOverallRating] = useState<number>(0)
  const [usageDuration, setUsageDuration] = useState<string>('')
  const [detailedRatings, setDetailedRatings] = useState<Record<string, number | null>>({})
  const [comment, setComment] = useState<string>('')
  const [selectedWallet, setSelectedWallet] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null)
  const [submissionMessage, setSubmissionMessage] = useState<string>('')

  let walletScore = ''
  const wallet_score = async () =>
    await fetch('https://weratereview.onrender.com/analyze_wallet', {
      method: 'POST',
      body: JSON.stringify({
        wallet_address: session?.user.solanaPublicKey
      })
    }).then((r) => {
      walletScore = String(r)
    })

  useEffect(() => {
    if (session?.user.solanaPublicKey && !walletScore) {
      wallet_score()
    }
  }, [session?.user.solanaPublicKey])

  useEffect(() => {
    if (submissionStatus == 'success') {
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }
  }, [submissionStatus])

  const handleOverallRating = (rating: number): void => {
    setOverallRating(rating)
  }

  const handleDurationChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setUsageDuration(event.target.value)
  }

  const handleDetailedRating = (category: string, rating: number): void => {
    setDetailedRatings((prev) => ({...prev, [category]: rating}))
  }

  const handleDontKnowRating = (category: string): void => {
    setDetailedRatings((prev) => ({...prev, [category]: null}))
  }

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setComment(event.target.value)
  }

  const handleWalletChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedWallet(event.target.value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmissionStatus(null)
    setSubmissionMessage('')

    const reviewData = {
      projectId: currentProjectId,
      overallRating,
      usageDuration,
      detailedRatings,
      comment,
      selectedWallet
    }

    try {
      const response = await fetch('/api/submit-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmissionStatus('success')
        setSubmissionMessage(result.message || 'Review submitted successfully!')
        // Optionally reset form fields here
        // setOverallRating(0)
        // setUsageDuration('')
        // setDetailedRatings({})
        // setComment('')
        // setSelectedWallet('')
      } else {
        setSubmissionStatus('error')
        setSubmissionMessage(result.error || result.details || 'Failed to submit review.')
      }
    } catch (error) {
      console.error(error)
      setSubmissionStatus('error')
      setSubmissionMessage('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const ratingCategories: RatingCategory[] = [
    {id: 'team', label: 'Team'},
    {id: 'codebase_security', label: 'Codebase / Security'},
    {id: 'usability_ux', label: 'Usability / UX'},
    {id: 'community_social', label: 'Community / Social'},
    {id: 'moon_potential', label: 'Moon Potential'}
  ]

  if (!projectFromData) {
    return <div className="pt-10 text-center text-white">Project not found.</div>
  }

  const StarRatingInput: React.FC<{
    count: number
    value: number | null
    onRate: (rating: number) => void
    size?: string
    iconSrc?: string
    emptyIconSrc?: string
    iconClassName?: string
  }> = ({
    count,
    value,
    onRate,
    size = 'h-5 w-5',
    iconSrc = '/star.svg',
    emptyIconSrc = '/emptyStar.svg',
    iconClassName = 'opacity-70 hover:opacity-100'
  }) => {
    return (
      <div className="flex space-x-1">
        {[...Array(count)].map((_, i) => {
          const ratingValue = i + 1
          return (
            <img
              key={i}
              src={value !== null && ratingValue <= value ? iconSrc : emptyIconSrc}
              alt={value !== null && ratingValue <= value ? 'Filled Star' : 'Empty Star'}
              className={`${size} cursor-pointer transition-opacity ${iconClassName}`}
              onClick={() => onRate(ratingValue)}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="pt-10">
      <div className="min-h-screen pb-20">
        <div className="relative mx-auto mt-4 max-w-3xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <Link
              className="inline-flex items-center text-gray-400 transition-colors hover:text-white"
              href={`/project/${currentProjectId}`}
            >
              <img
                src="/rightArrow.svg"
                alt="Back"
                className="filter_grayscale_and_invert_for_dark_theme mr-2 h-4 w-4 rotate-180"
              />
              Back to Project
            </Link>
          </div>

          <div className="relative mb-4 rounded-xl p-4 shadow-lg shadow-[#C94EFF]/20 ring-1 ring-[#C94EFF]/30 sm:mb-6 sm:p-6">
            <div className="absolute -inset-1 -z-10 rounded-xl bg-[#C94EFF]/10 blur-md"></div>
            <div className="relative">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start">
                <img
                  src={projectFromData.img}
                  alt={projectFromData.title}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-lg border-2 border-gray-600"
                />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white">Rate: {projectFromData.title}</h1>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h2 className="mb-3 text-base font-medium text-white sm:text-lg">
                    How would you rate this project overall?
                  </h2>
                  <div className="flex justify-start">
                    <StarRatingInput
                      count={5}
                      value={overallRating}
                      onRate={handleOverallRating}
                      size="h-7 w-7"
                      iconSrc="/glowingStar.svg"
                      emptyIconSrc="/emptyStar.svg"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="usage-duration" className="mb-2 block text-sm font-medium text-white">
                    How long have you been using this project?
                  </label>
                  <select
                    id="usage-duration"
                    value={usageDuration}
                    onChange={handleDurationChange}
                    className="w-full appearance-none rounded-md border border-[#C94EFF]/50 bg-[#18181B] p-2.5 text-sm text-white focus:border-[#C94EFF] focus:ring-[#C94EFF] focus:ring-opacity-50"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23C94EFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem'
                    }}
                  >
                    <option value="">Select duration</option>
                    <option value="less_than_month">Less than a month</option>
                    <option value="1_3_months">1-3 months</option>
                    <option value="3_6_months">3-6 months</option>
                    <option value="6_12_months">6-12 months</option>
                    <option value="more_than_year">More than a year</option>
                  </select>
                </div>

                <div>
                  <h2 className="mb-4 text-base font-medium text-white sm:text-lg">Detailed Ratings</h2>
                  <div className="space-y-5">
                    {ratingCategories.map((category) => (
                      <div key={category.id}>
                        <div className="mb-2 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <span className="text-sm text-white sm:text-base">{category.label}</span>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => handleDontKnowRating(category.id)}
                              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${detailedRatings[category.id] === null ? 'border-[#C94EFF] bg-[#C94EFF]/20 text-[#C94EFF]' : 'border-gray-600 text-gray-400 hover:border-[#C94EFF]/70 hover:text-gray-200'}`}
                            >
                              I don&apos;t know
                            </button>
                            <StarRatingInput
                              count={5}
                              value={detailedRatings[category.id]}
                              onRate={(rating) => handleDetailedRating(category.id, rating)}
                              iconSrc="/glowingStar.svg"
                              emptyIconSrc="/emptyStar.svg"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-base font-medium text-white sm:text-lg">Add a comment</h2>
                    <span className="greyscale rounded-lg border border-[#555] p-2 text-[#555]">
                      Calculate Usefulness
                    </span>
                  </div>
                  <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    className="min-h-[100px] w-full rounded-md border border-[#C94EFF]/50 bg-[#18181B] p-2.5 text-sm text-white focus:border-[#C94EFF] focus:ring-[#C94EFF] focus:ring-opacity-50"
                    placeholder="Share your thoughts about this project..."
                    rows={4}
                  ></textarea>
                </div>

                <div>
                  <h2 className="mb-2 text-base font-medium text-white sm:text-lg">Verify your experience</h2>
                  <div>
                    <label htmlFor="wallet-connection" className="mb-2 block text-sm font-medium text-white">
                      Connect wallet to verify on-chain activity (optional)
                    </label>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <select
                        id="wallet-connection"
                        value={selectedWallet}
                        onChange={handleWalletChange}
                        className="flex-grow appearance-none rounded-md border border-[#C94EFF]/50 bg-[#18181B] p-2.5 text-sm text-white focus:border-[#C94EFF] focus:ring-[#C94EFF] focus:ring-opacity-50"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23C94EFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 0.5rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1.5em 1.5em',
                          paddingRight: '2.5rem'
                        }}
                      >
                        <option value="">{session?.user.solanaPublicKey || 'Select wallet or add new'}</option>
                      </select>
                      <button
                        type="button"
                        className="flex transform items-center justify-center gap-2 rounded-full border border-[#C94EFF]/80 bg-transparent px-4 py-2 text-sm font-medium text-[#C94EFF] transition-all duration-300 hover:scale-105 hover:bg-[#C94EFF]/10 sm:px-5"
                      >
                        <img src="/wallet.svg" alt="Wallet" className="filter_purple_for_icons h-4 w-4" />
                        {walletScore || 'Add Wallet'}
                      </button>
                    </div>
                  </div>
                </div>

                {submissionStatus && (
                  <div
                    className={`mt-4 rounded-md p-3 text-sm ${submissionStatus === 'success' ? 'border border-green-500/30 bg-green-500/20 text-green-300' : 'border border-red-500/30 bg-red-500/20 text-red-300'}`}
                  >
                    {submissionMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="z-10 flex w-full transform items-center justify-center gap-2 rounded-full bg-[#C94EFF] px-6 py-3 text-sm font-semibold tracking-wider text-white transition-all duration-300 hover:scale-105 hover:bg-[#C94EFF]/90 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <img src="/fire.svg" alt="Submit" className="h-5 w-5 invert" />
                      Submit Rating
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-gray-700 bg-[#101014] p-2">
        <div className="mx-auto flex max-w-lg items-center justify-around">
          <Link className="flex flex-col items-center p-2 text-gray-400 hover:text-[#C94EFF]" href="/discover">
            <div className="h-6 w-6">
              <img
                src="/search.svg"
                alt="Search"
                className="filter_grayscale_and_invert_for_dark_theme_hover_purple h-6 w-6"
              />
            </div>
            <span className="mt-1 text-xs">Discover</span>
          </Link>
          <Link className="flex flex-col items-center p-2 text-gray-400 hover:text-[#C94EFF]" href="/rewards">
            <div className="h-6 w-6">
              <img
                src="/medal.svg"
                alt="Rewards"
                className="filter_grayscale_and_invert_for_dark_theme_hover_purple h-6 w-6"
              />
            </div>
            <span className="mt-1 text-xs">Rewards</span>
          </Link>
          <Link className="flex flex-col items-center p-2 text-gray-400 hover:text-[#C94EFF]" href="/profile">
            <div className="h-6 w-6">
              <img
                src="/user.svg"
                alt="Profile"
                className="filter_grayscale_and_invert_for_dark_theme_hover_purple h-6 w-6"
              />
            </div>
            <span className="mt-1 text-xs">Profile</span>
          </Link>
          <a
            href="https://api.werate.io/api/v1/redirect-app-store"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-2 text-gray-400 hover:text-[#C94EFF]"
          >
            <div className="h-6 w-6">
              <img
                src="/getApp.svg"
                alt="Get App"
                className="filter_grayscale_and_invert_for_dark_theme_hover_purple h-6 w-6"
              />
            </div>
            <span className="mt-1 text-xs">Get The App</span>
          </a>
        </div>
      </div>
      <style jsx global>{`
        .filter_grayscale_and_invert_for_dark_theme {
          filter: grayscale(1) invert(0.8);
        }
        .hover\\:text-\\[\\#C94EFF\\]:hover .filter_grayscale_and_invert_for_dark_theme_hover_purple,
        .text-\\[\\#C94EFF\\] .filter_purple_for_icons,
        a:hover .filter_grayscale_and_invert_for_dark_theme_hover_purple,
        button:hover .filter_grayscale_and_invert_for_dark_theme_hover_purple {
          filter: brightness(0) saturate(100%) invert(34%) sepia(98%) saturate(1351%) hue-rotate(257deg)
            brightness(102%) contrast(103%);
        }
        .filter_purple_for_icons {
          filter: brightness(0) saturate(100%) invert(34%) sepia(98%) saturate(1351%) hue-rotate(257deg)
            brightness(102%) contrast(103%);
        }
        body {
          background-color: #101014;
          color: text-white;
        }
      `}</style>
    </div>
  )
}

export default ProjectReviewPage
