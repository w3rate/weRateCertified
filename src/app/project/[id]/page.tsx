'use client'

import Link from 'next/link'
import {use} from 'react'
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
}

const ProjectRatingPage = ({params: paramsPromise}: {params: Promise<{id: string}>}) => {
  const params = use(paramsPromise)

  const currentProjectId = parseInt(params.id, 10)
  const projectFromData = allProjectsData.find((p) => p.id === currentProjectId) as ProjectCardData | undefined

  if (!projectFromData) {
    return <div className="pt-10 text-center text-white">Project not found.</div>
  }

  const ratingDisplayValue =
    typeof projectFromData.rating === 'number' && !isNaN(projectFromData.rating)
      ? projectFromData.rating.toFixed(1)
      : 'N/A'

  const totalReviews = 2156

  const staticSocialLinks = [
    {name: 'Twitter', url: 'https://twitter.com/solana', imageUrl: '/x.svg'},
    {name: 'Github', url: 'https://github.com/solana-labs', imageUrl: '/github.svg'},
    {name: 'Discord', url: 'https://discord.com/invite/solana', imageUrl: '/discord.svg'},
    {
      name: 'Telegram',
      url: 'https://t.me/solana',
      imageUrl: '/lovable-uploads/ba59896e-886e-4ec5-a09d-31eb12901347.png'
    }
  ]

  const staticRatingBreakdown = [
    {category: 'Team', score: 100},
    {category: 'Codebase / Security', score: 100},
    {category: 'Usability / UX', score: 100},
    {category: 'Community / Social', score: 100},
    {category: 'Moon Potential', score: 100}
  ]

  const staticRecentReviews = [
    {
      userHandle: '0x03',
      rating: 5,
      comment: 'Great project with massive potential. The team is very responsive and the community is fantastic.',
      date: '3 days ago',
      badges: [
        {
          text: 'Usage Verified',
          imageUrl: '/check.svg',
          colorClasses: 'from-blue-500/20 to-blue-600/20 text-blue-400 border-blue-500/30',
          animateClass: 'animate-bounce'
        }
      ],
      userBadges: [
        {
          text: 'Consistent Reviewer',
          imageUrl: '/fire.svg',
          colorClasses: 'from-amber-500/20 to-amber-600/20 text-amber-400 border-amber-500/30',
          animateClass: 'animate-pulse'
        },
        {
          text: 'Top Contributor',
          imageUrl: '/star.svg',
          colorClasses: 'from-yellow-400/20 to-yellow-500/20 text-yellow-300 border-yellow-400/30',
          animateClass: 'animate-pulse'
        }
      ]
    },
    {
      userHandle: '0xef',
      rating: 5,
      comment: "I've been using this for months and it's been a fantastic experience. Highly recommended!",
      date: '1 week ago',
      badges: [],
      userBadges: [
        {
          text: 'Consistent Reviewer',
          imageUrl: '/fire.svg',
          colorClasses: 'from-amber-500/20 to-amber-600/20 text-amber-400 border-amber-500/30',
          animateClass: 'animate-pulse'
        },
        {
          text: 'Top Contributor',
          imageUrl: '/star.svg',
          colorClasses: 'from-yellow-400/20 to-yellow-500/20 text-yellow-300 border-yellow-400/30',
          animateClass: 'animate-pulse'
        }
      ]
    },
    {
      userHandle: '0xc1',
      rating: 4,
      comment: 'Solid foundation and impressive tech. Looking forward to seeing how it evolves over time.',
      date: '2 weeks ago',
      badges: [],
      userBadges: []
    }
  ]

  return (
    <div className="pt-10">
      <div className="min-h-screen pb-20">
        <div className="relative mx-auto mt-4 max-w-3xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <Link
              className="inline-flex items-center text-gray-400 transition-colors hover:text-white"
              href="/discover"
            >
              <img
                src="/rightArrow.svg"
                alt="Back"
                className="filter_grayscale_and_invert_for_dark_theme mr-2 h-4 w-4 rotate-180"
              />
              Back to Discover
            </Link>
            <Link href={`/rate/${currentProjectId}`}>
              <button className="z-10 flex transform items-center justify-center gap-2 rounded-full bg-[#C94EFF] px-6 py-3 text-sm font-semibold tracking-wider text-white transition-all duration-300 hover:scale-105 hover:bg-[#C94EFF]/90 sm:text-base">
                <span className="flex-shrink-0">
                  <img src="/star.svg" alt="Star" className="h-4 w-4" />
                </span>
                Rate Project
              </button>
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
                  <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                    <h1 className="text-2xl font-bold text-white">{projectFromData.title}</h1>
                    <div className="flex flex-wrap gap-2">
                      {projectFromData.tags.map((tag) => (
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
                      <span className="ml-2 text-sm text-gray-400">({totalReviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="mb-4 text-base font-medium text-[#C94EFF] sm:text-lg">About</h2>
              <p className="mb-6 text-sm text-gray-400 sm:text-base">{projectFromData.description}</p>
              <div className="mb-4 grid grid-cols-1 gap-3 sm:mb-6 sm:gap-4 md:grid-cols-2">
                <a
                  href="https://solana.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center text-sm text-[#C94EFF] hover:underline sm:text-base"
                >
                  <img src="/web.svg" alt="Website" className="filter_purple_for_icons mr-2 h-4 w-4" />
                  Visit Website
                </a>
                <a
                  href="https://solana.com/solana-whitepaper.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center text-sm text-[#C94EFF] hover:underline sm:text-base"
                >
                  <img src="/whitepaper.svg" alt="Whitepaper" className="filter_purple_for_icons mr-2 h-4 w-4" />
                  Whitepaper
                </a>
                <a
                  href="https://birdeye.so/sol/2-sample-address"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center text-sm text-[#C94EFF] hover:underline sm:text-base"
                >
                  <img src="/chart.svg" alt="Chart" className="filter_purple_for_icons mr-2 h-4 w-4" />
                  View Chart
                </a>
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
              <div className="space-y-4 sm:space-y-5">
                {staticRatingBreakdown.map((item) => (
                  <div key={item.category}>
                    <div className="mb-2 flex items-center justify-between sm:mb-3">
                      <span className="text-sm text-white sm:text-base">{item.category}</span>
                      <div className="flex items-center">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <img key={i} src="/star.svg" alt="Star" className="h-4 w-4 cursor-default opacity-70" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="h-2 overflow-hidden rounded-full bg-gray-700">
                        <div
                          className="h-full rounded-full bg-[#C94EFF] transition-all duration-500 ease-out"
                          style={{width: `${item.score}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative rounded-xl p-4 shadow-lg shadow-[#C94EFF]/20 ring-1 ring-[#C94EFF]/30 sm:p-6">
            <div className="absolute -inset-1 -z-10 rounded-xl bg-[#C94EFF]/10 blur-md"></div>
            <div className="relative">
              <div className="mb-3 flex items-center sm:mb-4">
                <img src="/users.svg" alt="Users" className="filter_purple_for_icons mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <h2 className="text-base font-medium text-white sm:text-lg">Recent Reviews</h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {staticRecentReviews.map((review, index) => (
                  <div key={index} className="rounded-lg border border-gray-600 bg-gray-800/30 p-3 sm:p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-700 sm:h-8 sm:w-8">
                          <span className="text-xs text-white">{review.userHandle}</span>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-white sm:text-sm">Anonymous User</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {review.badges.map((badge, badgeIdx) => (
                              <div
                                key={badgeIdx}
                                className={`items-center rounded-full border bg-gradient-to-r ${badge.colorClasses} inline-flex p-1 text-xs transition-all duration-300 hover:scale-105`}
                              >
                                <img
                                  src={badge.imageUrl}
                                  alt={badge.text}
                                  className={`mr-1 h-3 w-3 ${badge.animateClass || ''}`}
                                />
                                <span>{badge.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) =>
                          i < review.rating ? (
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
                      <div className="text-xs text-gray-400">{review.date}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {review.userBadges.map((badge, badgeIdx) => (
                          <div
                            key={badgeIdx}
                            className={`flex items-center rounded-full border bg-gradient-to-r ${badge.colorClasses} p-1 text-xs ${badge.animateClass || ''}`}
                          >
                            <img src={badge.imageUrl} alt={badge.text} className="mr-1 h-3 w-3" />
                            <span>{badge.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link className="text-sm text-[#C94EFF] hover:underline" href={`/project/${currentProjectId}/reviews`}>
                  View all {totalReviews} reviews →
                </Link>
              </div>
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
        a:hover .filter_grayscale_and_invert_for_dark_theme_hover_purple {
          filter: brightness(0) saturate(100%) invert(34%) sepia(98%) saturate(1351%) hue-rotate(257deg)
            brightness(102%) contrast(103%);
        }
        .filter_purple_for_icons {
          filter: brightness(0) saturate(100%) invert(34%) sepia(98%) saturate(1351%) hue-rotate(257deg)
            brightness(102%) contrast(103%);
        }
        body {
          background-color: #101014;
        }
      `}</style>
    </div>
  )
}

export default ProjectRatingPage
