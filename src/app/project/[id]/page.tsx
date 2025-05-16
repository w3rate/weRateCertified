'use client'

import Link from 'next/link'
import {use, useState, useEffect} from 'react'
import {allProjectsData} from '@/components/constants'

interface ProjectCardData {
  id: number
  href: string
  title: string
  rating: number
  description: string
  tags: string[]
  blockchain: string
  img: string

  whitepaperUrl?: string
  chartUrl?: string
}

interface FirestoreReview {
  overallRating: number
  comment: string
  submittedAt: string
  selectedWallet?: string
  userName?: string
  userAvatarUrl?: string
}

interface FirestoreRatingBreakdownCategory {
  sum: number
  count: number
  average: number
}

interface FirestoreProjectData {
  name?: string
  totalAverageRating?: number
  reviewCount?: number
  detailedRatingBreakdown?: {
    [categoryKey: string]: FirestoreRatingBreakdownCategory
  }
  ratings?: FirestoreReview[]
}

const categoryDisplayMapping = [
  {key: 'team', label: 'Team'},
  {key: 'codebase_security', label: 'Codebase / Security'},
  {key: 'usability_ux', label: 'Usability / UX'},
  {key: 'community_social', label: 'Community / Social'},
  {key: 'moon_potential', label: 'Moon Potential'}
]

const formatDateAgo = (isoDateString?: string): string => {
  if (!isoDateString) return 'some time ago'
  try {
    const date = new Date(isoDateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffSeconds = Math.floor(diffTime / 1000)

    if (diffSeconds < 60) return `${diffSeconds}s ago`
    const diffMinutes = Math.floor(diffSeconds / 60)
    if (diffMinutes < 60) return `${diffMinutes}m ago`
    const diffHours = Math.floor(diffMinutes / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays < 7) return `${diffDays}d ago`
    const diffWeeks = Math.floor(diffDays / 7)
    if (diffWeeks < 5) return `${diffWeeks}w ago`
    const diffMonths = Math.floor(diffDays / 30.44)
    if (diffMonths < 12) return `${diffMonths}mo ago`
    const diffYears = Math.floor(diffDays / 365.25)
    return `${diffYears}y ago`
  } catch (e) {
    console.error(e)
    return 'date error'
  }
}

const ProjectRatingPage = ({params: paramsPromise}: {params: Promise<{id: string}>}) => {
  const resolvedParams = use(paramsPromise)
  const currentProjectId = parseInt(resolvedParams.id, 10)

  const projectStaticData = allProjectsData.find((p) => p.id === currentProjectId) as ProjectCardData | undefined

  const [firestoreData, setFirestoreData] = useState<FirestoreProjectData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isNaN(currentProjectId)) {
      setError('Invalid Project ID provided.')
      setLoading(false)
      return
    }

    const fetchProjectApiData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/project-details/${currentProjectId}`)
        const result = await response.json()

        if (!response.ok || !result.success) {
          throw new Error(result.error || result.details || `Failed to fetch project data (status: ${response.status})`)
        }
        setFirestoreData(result.data as FirestoreProjectData)
      } catch (err) {
        console.error('Error fetching project data from API:', err)
        if (err instanceof Error) {
          setError(err.message || 'An unknown error occurred while fetching project data.')
        }
        setFirestoreData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProjectApiData()
  }, [currentProjectId])

  if (!projectStaticData && !loading && !error) {
    return (
      <div className="pt-10 text-center text-white">Project static metadata not found for ID: {currentProjectId}.</div>
    )
  }

  if (loading) {
    return <div className="pt-10 text-center text-white">Loading project data...</div>
  }

  const displayTitle = firestoreData?.name || projectStaticData?.title || 'Project Title'
  const displayImg = projectStaticData?.img || '/default-project-image.png'
  const displayDescription = projectStaticData?.description || 'No description available.'
  const displayTags = projectStaticData?.tags || []
  const websiteUrl = projectStaticData?.href || '#'
  const whitepaperUrl = projectStaticData?.whitepaperUrl
  const chartUrl = projectStaticData?.chartUrl

  const ratingDisplayValue =
    typeof firestoreData?.totalAverageRating === 'number' ? firestoreData.totalAverageRating.toFixed(1) : 'N/A'
  const totalReviews = firestoreData?.reviewCount || 0

  const recentReviewsToDisplay = firestoreData?.ratings?.slice(0, 3) || []

  const staticSocialLinks = [
    {name: 'Twitter', url: 'https://twitter.com/example', imageUrl: '/x.svg'},
    {name: 'Github', url: 'https://github.com/example', imageUrl: '/github.svg'},
    {name: 'Discord', url: 'https://discord.com/invite/example', imageUrl: '/discord.svg'}
    // {
    //   name: 'Telegram',
    //   url: 'https://t.me/example',
    //   imageUrl: '/lovable-uploads/ba59896e-886e-4ec5-a09d-31eb12901347.png'
    // }
  ]

  return (
    <div className="pt-10">
      <div className="min-h-screen pb-20">
        <div className="relative mx-auto mt-4 max-w-3xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <Link className="inline-flex items-center text-gray-400 transition-colors hover:text-white" href="/">
              <img
                src="/rightArrow.svg"
                alt="Back"
                className="filter_grayscale_and_invert_for_dark_theme mr-2 h-4 w-4 rotate-180"
              />
              Back to Discover
            </Link>
            {!isNaN(currentProjectId) && (
              <Link href={`/rate/${currentProjectId}`}>
                <button className="z-10 flex transform items-center justify-center gap-2 rounded-full bg-[#C94EFF] px-6 py-3 text-sm font-semibold tracking-wider text-white transition-all duration-300 hover:scale-105 hover:bg-[#C94EFF]/90 sm:text-base">
                  <span className="flex-shrink-0">
                    <img src="/star.svg" alt="Star" className="h-4 w-4" />
                  </span>
                  Rate Project
                </button>
              </Link>
            )}
          </div>

          {error && (
            <div className="my-4 rounded-md border border-red-500/30 bg-red-500/20 p-3 text-center text-red-300">
              Could not load project ratings: {error}
            </div>
          )}

          {!projectStaticData && !loading ? null : (
            <>
              <div className="relative mb-4 rounded-xl p-4 shadow-lg shadow-[#C94EFF]/20 ring-1 ring-[#C94EFF]/30 sm:mb-6 sm:p-6">
                <div className="absolute -inset-1 -z-10 rounded-xl bg-[#C94EFF]/10 blur-md"></div>
                <div className="relative">
                  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start">
                    <img
                      src={displayImg}
                      alt={displayTitle}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-lg border-2 border-gray-600 object-cover"
                    />
                    <div className="flex-1">
                      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                        <h1 className="text-2xl font-bold text-white">{displayTitle}</h1>
                        <div className="flex flex-wrap gap-2">
                          {displayTags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-gray-600/30 bg-gray-700/50 px-3 py-1 text-xs text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <img src="/glowingStar.svg" alt="Star" className="mr-2 h-5 w-5" />
                          <span className="text-xl font-bold text-white">{ratingDisplayValue}</span>
                          {typeof totalReviews === 'number' && (
                            <span className="ml-2 text-sm text-gray-400">({totalReviews} reviews)</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <h2 className="mb-4 text-base font-medium text-[#C94EFF] sm:text-lg">About</h2>
                  <p className="mb-6 text-sm text-gray-400 sm:text-base">{displayDescription}</p>
                  <div className="mb-4 grid grid-cols-1 gap-3 sm:mb-6 sm:gap-4 md:grid-cols-2">
                    <a
                      href={websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center text-sm text-[#C94EFF] hover:underline sm:text-base"
                    >
                      <img src="/web.svg" alt="Website" className="filter_purple_for_icons mr-2 h-4 w-4" />
                      Visit Website
                    </a>
                    {whitepaperUrl && (
                      <a
                        href={whitepaperUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center text-sm text-[#C94EFF] hover:underline sm:text-base"
                      >
                        <img src="/whitepaper.svg" alt="Whitepaper" className="filter_purple_for_icons mr-2 h-4 w-4" />
                        Whitepaper
                      </a>
                    )}
                    {chartUrl && (
                      <a
                        href={chartUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center text-sm text-[#C94EFF] hover:underline sm:text-base"
                      >
                        <img src="/chart.svg" alt="Chart" className="filter_purple_for_icons mr-2 h-4 w-4" />
                        View Chart
                      </a>
                    )}
                  </div>
                  <div className="border-t border-gray-600 pt-3 sm:pt-4">
                    <h3 className="mb-2 text-xs font-medium text-white sm:mb-3 sm:text-sm">Social Links</h3>
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                      {staticSocialLinks.map((link) => (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center text-gray-400 transition-colors hover:text-[#C94EFF]"
                        >
                          <img
                            src={link.imageUrl}
                            alt={link.name}
                            className="filter_grayscale_and_invert_for_dark_theme_hover_purple h-4 w-4 sm:h-5 sm:w-5"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative mb-4 rounded-xl p-4 shadow-lg shadow-[#C94EFF]/20 ring-1 ring-[#C94EFF]/30 sm:mb-6 sm:p-6">
                <div className="absolute -inset-1 -z-10 rounded-xl bg-[#C94EFF]/10 blur-md"></div>
                <div className="relative">
                  <h2 className="mb-4 text-base font-medium text-white sm:mb-6 sm:text-lg">Rating Breakdown</h2>
                  {firestoreData?.detailedRatingBreakdown ? (
                    <div className="space-y-4 sm:space-y-5">
                      {categoryDisplayMapping.map(({key, label}) => {
                        const breakdownCategory = firestoreData.detailedRatingBreakdown?.[key]
                        const averageScore = breakdownCategory?.average || 0
                        const displayAverage = averageScore > 0 ? averageScore.toFixed(1) : 'N/A'
                        const percentageScore = Math.max(0, Math.min(100, (averageScore / 5) * 100))

                        return (
                          <div key={key}>
                            <div className="mb-2 flex items-center justify-between sm:mb-3">
                              <span className="text-sm text-white sm:text-base">{label}</span>
                              <div className="flex items-center">
                                <div className="flex space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <img
                                      key={i}
                                      src={i < Math.round(averageScore) ? '/star.svg' : '/emptyStar.svg'}
                                      alt="Star"
                                      className="h-4 w-4 cursor-default opacity-70"
                                    />
                                  ))}
                                </div>
                                <span className="ml-2 text-sm text-gray-300">{displayAverage}</span>
                              </div>
                            </div>
                            <div className="w-full">
                              <div className="h-2 overflow-hidden rounded-full bg-gray-700">
                                <div
                                  className="h-full rounded-full bg-[#C94EFF] transition-all duration-500 ease-out"
                                  style={{width: `${percentageScore}%`}}
                                ></div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">
                      {!loading && !error
                        ? 'No detailed breakdown available yet.'
                        : error
                          ? ''
                          : 'Loading breakdown...'}
                    </p>
                  )}
                </div>
              </div>

              <div className="relative rounded-xl p-4 shadow-lg shadow-[#C94EFF]/20 ring-1 ring-[#C94EFF]/30 sm:p-6">
                <div className="absolute -inset-1 -z-10 rounded-xl bg-[#C94EFF]/10 blur-md"></div>
                <div className="relative">
                  <div className="mb-3 flex items-center sm:mb-4">
                    <img src="/users.svg" alt="Users" className="filter_purple_for_icons mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    <h2 className="text-base font-medium text-white sm:text-lg">Recent Reviews</h2>
                  </div>
                  {recentReviewsToDisplay.length > 0 ? (
                    <div className="space-y-3 sm:space-y-4">
                      {recentReviewsToDisplay.map((review, index) => (
                        <div
                          key={review.submittedAt || index}
                          className="rounded-lg border border-gray-600 bg-gray-800/30 p-3 sm:p-4"
                        >
                          <div className="mb-2 flex items-start justify-between">
                            <div className="flex items-center">
                              {review.userAvatarUrl ? (
                                <img
                                  src={review.userAvatarUrl}
                                  alt={review.userName ? `${review.userName}'s avatar` : 'User Avatar'}
                                  className="mr-2 h-7 w-7 rounded-full object-cover sm:h-8 sm:w-8"
                                  onError={(e) => {
                                    e.currentTarget.src = '/logos/solana.svg'
                                  }}
                                />
                              ) : (
                                <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-700 sm:h-8 sm:w-8">
                                  <span className="text-xs text-white">
                                    {review.userName
                                      ? review.userName.charAt(0).toUpperCase()
                                      : review.selectedWallet
                                        ? review.selectedWallet.substring(0, 2) +
                                          '..' +
                                          review.selectedWallet.substring(review.selectedWallet.length - 2)
                                        : `U${index + 1}`}
                                  </span>
                                </div>
                              )}
                              <div>
                                <span className="text-xs font-medium text-white sm:text-sm">
                                  {review.userName || 'Anonimous User'}
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              {[...Array(5)].map((_, i) =>
                                i < review.overallRating ? (
                                  <img
                                    key={i}
                                    src="/star.svg"
                                    alt="Filled Star"
                                    className="h-4 w-4 cursor-default opacity-70"
                                  />
                                ) : (
                                  <img
                                    key={i}
                                    src="/emptyStar.svg"
                                    alt="Empty Star"
                                    className="h-4 w-4 cursor-default opacity-70"
                                  />
                                )
                              )}
                            </div>
                          </div>
                          <p className="mb-3 text-xs text-gray-400 sm:text-sm">{review.comment}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-400">{formatDateAgo(review.submittedAt)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">
                      {!loading && !error ? 'No reviews available yet.' : error ? '' : 'Loading reviews...'}
                    </p>
                  )}
                  {/* {firestoreData && typeof firestoreData.reviewCount === 'number' && firestoreData.reviewCount > 0 && (
                    <div className="mt-4 text-center">
                      {!isNaN(currentProjectId) && (
                        <Link
                          className="text-sm text-[#C94EFF] hover:underline"
                          href={`/project/${currentProjectId}/reviews`}
                        >
                          View all {firestoreData.reviewCount} reviews →
                        </Link>
                      )}
                    </div>
                  )} */}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-gray-700 bg-[#101014] p-2">
        <div className="mx-auto flex max-w-lg items-center justify-around">
          <Link className="flex flex-col items-center p-2 text-gray-400 hover:text-[#C94EFF]" href="/">
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
          background-color: #101014; /* Fallback, ensure text is visible */
        }
        /* Ensure text has good contrast on dark background if not explicitly set by Tailwind */
        body,
        .text-white {
          color: #e5e7eb; /* Default light gray for text on dark bg */
        }
        .text-gray-400 {
          color: #9ca3af;
        }
        .text-gray-300 {
          color: #d1d5db;
        }
        .text-\\[\\#C94EFF\\] {
          color: #c94eff;
        }
      `}</style>
    </div>
  )
}

export default ProjectRatingPage
