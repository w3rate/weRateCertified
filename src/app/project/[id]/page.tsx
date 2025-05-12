"use client";

import Link from 'next/link';
import { use } from 'react';
import { allProjectsData } from '@/components/constants';

interface ProjectCardData {
  id: number;
  href: string;
  title: string;
  rating: number;
  description: string;
  tags: string[];
  blockchain: string;
  img: string;
}

const ProjectRatingPage = ({ params: paramsPromise }: { params: Promise<{ id: string }> }) => {
  const params = use(paramsPromise);

  const currentProjectId = parseInt(params.id, 10);
  const projectFromData = allProjectsData.find(p => p.id === currentProjectId) as ProjectCardData | undefined;

  if (!projectFromData) {
    return <div className="pt-10 text-center text-white">Project not found.</div>;
  }

  const ratingDisplayValue = (typeof projectFromData.rating === 'number' && !isNaN(projectFromData.rating))
    ? projectFromData.rating.toFixed(1)
    : 'N/A';

  const totalReviews = 2156; 

  const staticSocialLinks = [
      { name: "Twitter", url: "https://twitter.com/solana", imageUrl: "/x.svg" },
      { name: "Github", url: "https://github.com/solana-labs", imageUrl: "/github.svg" },
      { name: "Discord", url: "https://discord.com/invite/solana", imageUrl: "/discord.svg" },
      { name: "Telegram", url: "https://t.me/solana", imageUrl: "/lovable-uploads/ba59896e-886e-4ec5-a09d-31eb12901347.png" },
  ];

  const staticRatingBreakdown = [
      { category: "Team", score: 100 },
      { category: "Codebase / Security", score: 100 },
      { category: "Usability / UX", score: 100 },
      { category: "Community / Social", score: 100 },
      { category: "Moon Potential", score: 100 },
  ];
  
  const staticRecentReviews = [
    {
      userHandle: "0x03",
      rating: 5,
      comment: "Great project with massive potential. The team is very responsive and the community is fantastic.",
      date: "3 days ago",
      badges: [
        { text: "Usage Verified", imageUrl: "/check.svg", colorClasses: "from-blue-500/20 to-blue-600/20 text-blue-400 border-blue-500/30", animateClass: "animate-bounce" },
      ],
      userBadges: [
        {text: "Consistent Reviewer", imageUrl: "/fire.svg", colorClasses: "from-amber-500/20 to-amber-600/20 text-amber-400 border-amber-500/30", animateClass: "animate-pulse"},
        {text: "Top Contributor", imageUrl: "/star.svg", colorClasses: "from-yellow-400/20 to-yellow-500/20 text-yellow-300 border-yellow-400/30", animateClass: "animate-pulse"},
      ]
    },
    {
      userHandle: "0xef",
      rating: 5,
      comment: "I've been using this for months and it's been a fantastic experience. Highly recommended!",
      date: "1 week ago",
      badges: [],
      userBadges: [
          {text: "Consistent Reviewer", imageUrl: "/fire.svg", colorClasses: "from-amber-500/20 to-amber-600/20 text-amber-400 border-amber-500/30", animateClass: "animate-pulse"},
          {text: "Top Contributor", imageUrl: "/star.svg", colorClasses: "from-yellow-400/20 to-yellow-500/20 text-yellow-300 border-yellow-400/30", animateClass: "animate-pulse"},
      ]
    },
    {
      userHandle: "0xc1",
      rating: 4,
      comment: "Solid foundation and impressive tech. Looking forward to seeing how it evolves over time.",
      date: "2 weeks ago", 
      badges: [],
      userBadges: []
    },
  ];

  return (
    <div className="pt-10">
      <div className="min-h-screen pb-20">
        <div className="max-w-3xl mx-auto px-4 mt-4 relative">
          <div className="flex justify-between items-center mb-6">
            <Link className="inline-flex items-center text-gray-400 hover:text-white transition-colors" href="/discover">
              <img src="/rightArrow.svg" alt="Back" className="w-4 h-4 mr-2 rotate-180 filter_grayscale_and_invert_for_dark_theme" />
              Back to Discover
            </Link>
            <Link href={`/rate/${currentProjectId}`}>
              <button className="bg-[#C94EFF] hover:bg-[#C94EFF]/90 text-white text-sm sm:text-base px-6 py-3 rounded-full font-semibold tracking-wider flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-105 z-10">
                <span className="flex-shrink-0">
                  <img src="/star.svg" alt="Star" className="w-4 h-4" />
                </span>
                Rate Project
              </button>
            </Link>
          </div>

          <div className="p-4 sm:p-6 mb-4 sm:mb-6 relative shadow-lg shadow-[#C94EFF]/20 ring-1 ring-[#C94EFF]/30 rounded-xl">
            <div className="absolute -inset-1 bg-[#C94EFF]/10 rounded-xl blur-md -z-10"></div>
            <div className="relative">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                <img src={projectFromData.img} alt={projectFromData.title} width={64} height={64} className="w-16 h-16 rounded-lg border-2 border-gray-600" />
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                    <h1 className="text-2xl font-bold text-white">{projectFromData.title}</h1>
                    <div className="flex flex-wrap gap-2">
                      {projectFromData.tags.map(tag => (
                        <span key={tag} className="text-xs px-3 py-1 rounded-full bg-gray-700/50 text-white border border-gray-600/30">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <img src="/glowingStar.svg" alt="Star" className="w-5 h-5 mr-2" />
                      <span className="text-xl font-bold text-white">{ratingDisplayValue}</span>
                      <span className="text-gray-400 text-sm ml-2">({totalReviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="text-base sm:text-lg font-medium mb-4 text-[#C94EFF]">About</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-6">{projectFromData.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <a href="https://solana.com" target="_blank" rel="noreferrer" className="flex items-center text-[#C94EFF] hover:underline text-sm sm:text-base">
                  <img src="/web.svg" alt="Website" className="w-4 h-4 mr-2 filter_purple_for_icons" />
                  Visit Website
                </a>
                <a href="https://solana.com/solana-whitepaper.pdf" target="_blank" rel="noreferrer" className="flex items-center text-[#C94EFF] hover:underline text-sm sm:text-base">
                  <img src="/whitepaper.svg" alt="Whitepaper" className="w-4 h-4 mr-2 filter_purple_for_icons" />
                  Whitepaper
                </a>
                <a href="https://birdeye.so/sol/2-sample-address" target="_blank" rel="noreferrer" className="flex items-center text-[#C94EFF] hover:underline text-sm sm:text-base">
                  <img src="/chart.svg" alt="Chart" className="w-4 h-4 mr-2 filter_purple_for_icons" />
                  View Chart
                </a>
              </div>
              <div className="border-t border-gray-600 pt-3 sm:pt-4">
                <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3 text-white">Social Links</h3>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {staticSocialLinks.map(link => (
                    <a key={link.name} href={link.url} target="_blank" rel="noreferrer" className="flex items-center text-gray-400 hover:text-[#C94EFF] transition-colors">
                      <img src={link.imageUrl} alt={link.name} className="w-4 h-4 sm:w-5 sm:h-5 filter_grayscale_and_invert_for_dark_theme_hover_purple" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 mb-4 sm:mb-6 relative shadow-lg shadow-[#C94EFF]/20 ring-1 ring-[#C94EFF]/30 rounded-xl">
            <div className="absolute -inset-1 bg-[#C94EFF]/10 rounded-xl blur-md -z-10"></div>
            <div className="relative">
              <h2 className="text-base sm:text-lg font-medium mb-4 sm:mb-6 text-white">Rating Breakdown</h2>
              <div className="space-y-4 sm:space-y-5">
                {staticRatingBreakdown.map(item => (
                  <div key={item.category}>
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                      <span className="text-sm sm:text-base text-white">{item.category}</span>
                      <div className="flex items-center">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                             <img key={i} src="/star.svg" alt="Star" className="w-4 h-4 cursor-default opacity-70" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-[#C94EFF] rounded-full transition-all duration-500 ease-out" style={{ width: `${item.score}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-4 sm:p-6 relative shadow-lg shadow-[#C94EFF]/20 ring-1 ring-[#C94EFF]/30 rounded-xl">
            <div className="absolute -inset-1 bg-[#C94EFF]/10 rounded-xl blur-md -z-10"></div>
            <div className="relative">
              <div className="flex items-center mb-3 sm:mb-4">
                <img src="/users.svg" alt="Users" className="w-4 h-4 sm:w-5 sm:h-5 mr-2 filter_purple_for_icons" />
                <h2 className="text-base sm:text-lg font-medium text-white">Recent Reviews</h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {staticRecentReviews.map((review, index) => (
                  <div key={index} className="p-3 sm:p-4 rounded-lg bg-gray-800/30 border border-gray-600">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                          <span className="text-xs text-white">{review.userHandle}</span>
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-medium text-white">Anonymous User</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {review.badges.map((badge, badgeIdx) => (
                              <div key={badgeIdx} className={`items-center rounded-full border bg-gradient-to-r ${badge.colorClasses} text-xs p-1 hover:scale-105 transition-all duration-300 inline-flex`}>
                                <img src={badge.imageUrl} alt={badge.text} className={`w-3 h-3 mr-1 ${badge.animateClass || ''}`} />
                                <span>{badge.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                         {[...Array(5)].map((_, i) => (
                          i < review.rating 
                          ? <img key={i} src="/star.svg" alt="Filled Star" className="w-4 h-4 cursor-default opacity-70" />
                          : <img key={i} src="/emptyStar.svg" alt="Empty Star" className="w-4 h-4 cursor-default opacity-70" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm mb-3">{review.comment}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-400">{review.date}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {review.userBadges.map((badge, badgeIdx) => (
                           <div key={badgeIdx} className={`flex items-center rounded-full border bg-gradient-to-r ${badge.colorClasses} text-xs p-1 ${badge.animateClass || ''}`}>
                              <img src={badge.imageUrl} alt={badge.text} className="w-3 h-3 mr-1" />
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

      <div className="fixed bottom-0 left-0 right-0 bg-[#101014] border-t border-gray-700 p-2 z-10">
        <div className="max-w-lg mx-auto flex items-center justify-around">
          <Link className="flex flex-col items-center p-2 text-gray-400 hover:text-[#C94EFF]" href="/discover">
            <div className="w-6 h-6">
              <img src="/search.svg" alt="Search" className="w-6 h-6 filter_grayscale_and_invert_for_dark_theme_hover_purple" />
            </div>
            <span className="text-xs mt-1">Discover</span>
          </Link>
          <Link className="flex flex-col items-center p-2 text-gray-400 hover:text-[#C94EFF]" href="/rewards">
            <div className="w-6 h-6">
              <img src="/medal.svg" alt="Rewards" className="w-6 h-6 filter_grayscale_and_invert_for_dark_theme_hover_purple" />
            </div>
            <span className="text-xs mt-1">Rewards</span>
          </Link>
          <Link className="flex flex-col items-center p-2 text-gray-400 hover:text-[#C94EFF]" href="/profile">
            <div className="w-6 h-6">
              <img src="/user.svg" alt="Profile" className="w-6 h-6 filter_grayscale_and_invert_for_dark_theme_hover_purple" />
            </div>
            <span className="text-xs mt-1">Profile</span>
          </Link>
          <a href="https://api.werate.io/api/v1/redirect-app-store" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-2 text-gray-400 hover:text-[#C94EFF]">
            <div className="w-6 h-6">
              <img src="/getApp.svg" alt="Get App" className="w-6 h-6 filter_grayscale_and_invert_for_dark_theme_hover_purple" />
            </div>
            <span className="text-xs mt-1">Get The App</span>
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
          filter: brightness(0) saturate(100%) invert(34%) sepia(98%) saturate(1351%) hue-rotate(257deg) brightness(102%) contrast(103%);
        }
        .filter_purple_for_icons {
           filter: brightness(0) saturate(100%) invert(34%) sepia(98%) saturate(1351%) hue-rotate(257deg) brightness(102%) contrast(103%);
        }
        body {
          background-color: #101014; 
        }
      `}</style>
    </div>
  );
}

export default ProjectRatingPage;