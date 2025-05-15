// components/RewardsPage.js
'use client';

import Image from 'next/image';
import { useState } from 'react'; // For potential future interactivity

// --- SVG Icon Components ---
const ZapIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className || 'w-5 h-5'}`}>
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
  </svg>
);

const CircleArrowUpIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className || 'w-5 h-5'}`}>
    <circle cx="12" cy="12" r="10"></circle><path d="m16 12-4-4-4 4"></path><path d="M12 16V8"></path>
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className || 'w-5 h-5'}`}>
    <path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path>
  </svg>
);

const TrophyIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className || 'w-4 h-4'}`}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
  </svg>
);

const AwardIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className || 'w-5 h-5'}`}>
    <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle>
  </svg>
);

const CircleDollarSignIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className || 'w-3.5 h-3.5'}`}>
    <circle cx="12" cy="12" r="10"></circle><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 18V6"></path>
  </svg>
);

const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className || 'w-5 h-5'}`}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline>
  </svg>
);

const BadgeDollarSignIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className || 'w-5 h-5'}`}>
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 18V6"></path>
  </svg>
);

const TicketCheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className || 'w-5 h-5'}`}>
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="m9 12 2 2 4-4"></path>
  </svg>
);

const StarIcon = ({ className, filledColor }: { className?: string, filledColor?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filledColor || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className || 'w-3 h-3'}`}>
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className || 'w-6 h-6'}`}><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
);
const UserIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className || 'w-6 h-6'}`}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
const ExternalLinkIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className || 'w-6 h-6'}`}><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
);
// --- End SVG Icon Components ---


const RewardsPage = () => {
  const primaryColor = '#C94EFF';
  const currentXP = 25;
  const nextLevelXP = 2000;
  const xpForNextLevel = 1000; // Example: XP needed for the current level up
  const xpDeficit = currentXP - xpForNextLevel; // If negative, it's needed. If positive, it's surplus for current level.
                                                // Original shows -975 XP and 1000 XP needed. So 25 XP gained, 1000 total for level.
  const progressPercentage = (currentXP / nextLevelXP) * 100;


  // Mock data for auction items - replace with actual data fetching
  const auctionItems = [
    { id: 1, rank: 1, name: 'Jupiter', logo: 'https://cryptologos.cc/logos/placeholder-logo.png', bid: '5,000 SOL', status: 'Current top bidder', isTop: true },
    { id: 2, rank: 2, name: 'Marinade Finance', logo: 'https://avatars.githubusercontent.com/u/83628089', bid: '4,800 SOL', status: 'Active bidder', isTop: false },
    { id: 3, rank: 3, name: 'Raydium', logo: 'https://cryptologos.cc/logos/placeholder-logo.png', bid: '4,500 SOL', status: 'Active bidder', isTop: false },
    { id: 4, rank: 4, name: 'Solana Fame', logo: 'https://cryptologos.cc/logos/placeholder-logo.png', bid: '4,200 SOL', status: 'Active bidder', isTop: false },
    { id: 5, rank: 5, name: 'Mango Markets', logo: 'https://cryptologos.cc/logos/placeholder-logo.png', bid: '4,000 SOL', status: 'Active bidder', isTop: false },
    { id: 6, rank: 6, name: 'Solflare', logo: 'https://cryptologos.cc/logos/placeholder-logo.png', bid: '3,800 SOL', status: 'Active bidder', isTop: false },
  ];

  const tokenRewardPools = [
    { id: 1, name: 'Jupiter', logo: 'https://cryptologos.cc/logos/placeholder-logo.png', amount: '5,000 JUP' },
    { id: 2, name: 'Marinade Finance', logo: 'https://avatars.githubusercontent.com/u/83628089', amount: '2,500 MNDE' },
    { id: 3, name: 'Raydium', logo: 'https://cryptologos.cc/logos/placeholder-logo.png', amount: '3,000 RAY' },
  ];

  const leaderboardData = [
    { rank: 1, name: 'ProjectExpert', reviews: 87, xp: '24,350 XP', isTop: true, avatarInitial: <TrophyIcon className={`w-4 h-4 text-[${primaryColor}]`} /> },
    { rank: 2, name: 'SolanaLover', reviews: 76, xp: '21,120 XP', isTop: false, avatarInitial: 'S' },
    { rank: 3, name: 'CryptoGuru', reviews: 68, xp: '19,500 XP', isTop: false, avatarInitial: 'C' },
    { rank: 4, name: 'BlockchainWiz', reviews: 64, xp: '18,200 XP', isTop: false, avatarInitial: 'B' },
    { rank: 5, name: 'TokenAnalyst', reviews: 57, xp: '15,700 XP', isTop: false, avatarInitial: 'T' },
  ];

  const currentStreak = 3;
  const streakDays = Array.from({ length: 7 }, (_, i) => i + 1);


  return (
    <div className="min-h-screen px-4 pb-24 text-white">
      <div className="max-w-lg mx-auto pt-6 pb-[10px]">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Rewards</h1>

        {/* Experience Card */}
        <div className={`relative rounded-xl bg-neutral-800 shadow-lg shadow-[${primaryColor}]/20 ring-1 ring-[${primaryColor}]/30 mb-6`}>
          <div className={`absolute -inset-1 -z-10 rounded-xl bg-[${primaryColor}]/10 blur-md`}></div>
          <div className="relative p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <ZapIcon className={`w-5 h-5 text-[${primaryColor}] mr-2`} />
              <h2 className="text-xl font-semibold text-white">Experience</h2>
            </div>
            <div className="flex justify-between items-end mb-2">
              <div>
                <div className="text-sm text-neutral-400">Level</div>
                <div className="text-3xl font-bold text-white">1</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-neutral-400">XP</div>
                <div className="text-xl font-semibold text-white">{currentXP} / {nextLevelXP}</div>
              </div>
            </div>
            <div className="mb-4">
              <div className="relative w-full overflow-hidden rounded-full h-2 bg-neutral-700">
                <div className={`h-full bg-[${primaryColor}] transition-all`} style={{ width: `${progressPercentage}%` }}></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-neutral-400">{xpDeficit < 0 ? `${xpDeficit} XP` : `${currentXP - nextLevelXP + xpForNextLevel} XP to next`}</span>
                <span className="text-xs text-neutral-400">{xpForNextLevel} XP needed</span>
              </div>
            </div>
            <div className="bg-neutral-700/50 rounded-lg p-3 border border-neutral-600/50">
              <div className="flex">
                <div className={`bg-[${primaryColor}]/20 rounded-full p-2 mr-3 flex-shrink-0 h-9 w-9 flex items-center justify-center`}>
                  <CircleArrowUpIcon className={`w-5 h-5 text-[${primaryColor}]`} />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">How to earn XP</h3>
                  <ul className="text-sm text-neutral-300 space-y-1 list-disc pl-5">
                    <li>Rate projects (100 XP)</li>
                    <li>Maintain your daily streak (50 XP daily)</li>
                    <li>Write useful reviews (bonus XP)</li>
                    <li>Connect a wallet (+20% XP bonus)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Streak Card */}
        <div className={`relative rounded-xl bg-neutral-800 shadow-lg shadow-[${primaryColor}]/20 ring-1 ring-[${primaryColor}]/30 mb-6`}>
          <div className={`absolute -inset-1 -z-10 rounded-xl bg-[${primaryColor}]/10 blur-md`}></div>
          <div className="relative p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <CalendarIcon className={`w-5 h-5 text-[${primaryColor}] mr-2`} />
              <h3 className="text-xl font-semibold text-white">Daily Streak</h3>
            </div>
            <div className="flex justify-between items-center mb-5">
              <div>
                <div className="text-sm text-neutral-400 mb-1">Current Streak</div>
                <div className="text-2xl font-bold flex items-center text-white">
                  {currentStreak}
                  <TrophyIcon className={`w-5 h-5 text-[${primaryColor}] ml-1.5`} />
                </div>
              </div>
              <button className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-80 text-white h-9 sm:h-10 px-3 sm:px-4 py-2 bg-[${primaryColor}] hover:bg-[${primaryColor}]/90`}>
                Claim Daily Streak
              </button>
            </div>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-white mb-3">Streak Progress</h4>
              <div className="flex justify-between mb-4 space-x-1 sm:space-x-2">
                {streakDays.map(day => (
                  <div key={day} className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${day <= currentStreak ? `bg-[${primaryColor}] text-white` : 'bg-neutral-700 text-neutral-300'}`}>
                    {day}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-neutral-700/40 rounded-lg p-4 mb-3 border border-neutral-600/60">
              <div className="flex items-center">
                <div className="bg-amber-600/30 rounded-full p-2 mr-3 border border-amber-500/50 flex-shrink-0 h-9 w-9 flex items-center justify-center">
                  <AwardIcon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Next Reward</h3>
                  <p className="text-sm text-neutral-300">Bonus at 7-day streak</p>
                </div>
              </div>
            </div>
            <div className="text-xs text-neutral-400">Claim your first streak today!</div>
          </div>
        </div>

        {/* Project Spotlight Auction Card */}
        <div className={`relative rounded-xl bg-neutral-800 shadow-lg shadow-[${primaryColor}]/20 ring-1 ring-[${primaryColor}]/30 mb-6`}>
          <div className={`absolute -inset-1 -z-10 rounded-xl bg-[${primaryColor}]/10 blur-md`}></div>
          <div className="relative p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <AwardIcon className={`w-5 h-5 text-[${primaryColor}] mr-2`} />
              <h2 className="text-xl font-semibold text-white">Project Spotlight Auction</h2>
            </div>
            <div className="mb-4 flex justify-between gap-2 sm:gap-4">
              <div className={`bg-neutral-700/30 p-3 rounded-lg border border-neutral-600/40 flex-1`}>
                <p className="text-sm text-neutral-400 mb-1">Current Pool</p>
                <p className={`text-lg font-bold text-[${primaryColor}]`}>26,300 SOL</p>
              </div>
              <div className={`bg-neutral-700/30 p-3 rounded-lg border border-neutral-600/40 flex-1`}>
                <p className="text-sm text-neutral-400 mb-1">Time Remaining</p>
                <p className="text-lg font-bold text-white">16 days</p>
              </div>
            </div>
            <p className="text-neutral-300 text-sm mb-4">Projects compete for 6 featured spots each month. 100% of auction revenue flows to the community reward pool!</p>
            <div className="space-y-3 mb-4">
              {auctionItems.map(item => (
                <div key={item.id} className={`flex items-center p-3 rounded-lg transition-colors ${item.isTop ? `bg-[${primaryColor}]/20 border border-[${primaryColor}]/40 hover:border-[${primaryColor}]/60` : `bg-neutral-700/30 border border-neutral-600/40 hover:border-[${primaryColor}]/40`}`}>
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full ${item.isTop ? `bg-[${primaryColor}]/30` : 'bg-neutral-600/50'} mr-2 flex-shrink-0`}>
                    <span className="text-xs font-semibold text-white">{item.rank}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full mr-3 flex-shrink-0 overflow-hidden border border-neutral-600/50">
                    <Image src={item.logo} alt={item.name} width={40} height={40} className="w-full h-full object-cover" unoptimized={item.logo.startsWith('http')}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-white">{item.name}</p>
                    <div className={`flex items-center text-xs ${item.isTop ? `text-[${primaryColor}]` : 'text-neutral-400'}`}>
                      <CircleDollarSignIcon className={`w-3.5 h-3.5 mr-1 ${item.isTop ? `text-[${primaryColor}]` : `text-[${primaryColor}]`}`} />
                      <span>{item.status}</span>
                    </div>
                  </div>
                  <div className="text-right ml-2">
                    <div className={`font-semibold text-[${primaryColor}]`}>{item.bid}</div>
                    <button className={`text-xs px-2 py-1 bg-[${primaryColor}]/20 hover:bg-[${primaryColor}]/30 rounded-md text-[${primaryColor}] border border-[${primaryColor}]/40 mt-1 transition-colors`}>Bid</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-neutral-700/50 rounded-lg p-3 border border-neutral-600/50">
              <div className="flex">
                <div className={`bg-[${primaryColor}]/20 rounded-full p-2 mr-3 flex-shrink-0 h-9 w-9 flex items-center justify-center`}>
                  <TrendingUpIcon className={`w-5 h-5 text-[${primaryColor}]`} />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Transparent On-Chain Auctions</h3>
                  <ul className="text-sm text-neutral-300 space-y-1 list-disc pl-5">
                    <li>Projects bid for 6 featured spots each month</li>
                    <li>100% of auction revenue flows to reward pool</li>
                    <li>More rewards drive more authentic reviews</li>
                    <li>Featured spots gain more visibility and value</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solana Token Rewards Card */}
        <div className={`relative rounded-xl bg-neutral-800 shadow-lg shadow-[${primaryColor}]/20 ring-1 ring-[${primaryColor}]/30 mb-6`}>
          <div className={`absolute -inset-1 -z-10 rounded-xl bg-[${primaryColor}]/10 blur-md`}></div>
          <div className="relative p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <BadgeDollarSignIcon className={`w-5 h-5 text-[${primaryColor}] mr-2`} />
              <h2 className="text-xl font-semibold text-white">Solana Token Rewards</h2>
            </div>
            <p className="text-neutral-300 text-sm mb-4">Solana projects are allocating tokens to reward quality ratings. Rate Solana projects to earn a share of these reward pools based on your rating quality and trust score.</p>
            <div className="space-y-3 mb-4">
              {tokenRewardPools.map(pool => (
                 <div key={pool.id} className={`flex items-center p-3 rounded-lg bg-neutral-700/30 border border-neutral-600/40 hover:border-[${primaryColor}]/40 transition-colors`}>
                  <div className="w-10 h-10 rounded-full mr-3 flex-shrink-0 overflow-hidden border border-neutral-600/50">
                    <Image src={pool.logo} alt={pool.name} width={40} height={40} className="w-full h-full object-cover" unoptimized={pool.logo.startsWith('http')}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-white">{pool.name}</p>
                    <div className={`flex items-center text-sm text-[${primaryColor}]`}>
                      <CircleDollarSignIcon className={`w-3.5 h-3.5 mr-1 text-[${primaryColor}]`} />
                      <span>Active Solana reward pool</span>
                    </div>
                  </div>
                  <div className="text-right ml-2">
                    <div className={`font-semibold text-[${primaryColor}]`}>{pool.amount}</div>
                    <div className="text-xs text-neutral-400">Available tokens</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-neutral-700/50 rounded-lg p-3 border border-neutral-600/50">
              <div className="flex">
                <div className={`bg-[${primaryColor}]/20 rounded-full p-2 mr-3 flex-shrink-0 h-9 w-9 flex items-center justify-center`}>
                  <TicketCheckIcon className={`w-5 h-5 text-[${primaryColor}]`} />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">How to earn Solana tokens</h3>
                  <ul className="text-sm text-neutral-300 space-y-1 list-disc pl-5">
                    <li>Submit detailed, quality ratings for Solana projects</li>
                    <li>Maintain a high trust score</li>
                    <li>Rate Solana projects with active token pools</li>
                    <li>Rewards are distributed weekly</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Earn Rewards Card */}
        <div className={`relative rounded-xl bg-neutral-800 shadow-lg shadow-[${primaryColor}]/20 ring-1 ring-[${primaryColor}]/30 mb-6`}>
          <div className={`absolute -inset-1 -z-10 rounded-xl bg-[${primaryColor}]/10 blur-md`}></div>
          <div className="relative p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <AwardIcon className={`w-5 h-5 text-[${primaryColor}] mr-2`} />
              <h2 className="text-xl font-semibold text-white">Unlock More Rewards</h2>
            </div>
            <p className="text-neutral-300 text-sm mb-4">Submit quality reviews to earn points and unlock special rewards including NFT whitelist spots and token rewards.</p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className={`w-6 h-6 rounded-full bg-[${primaryColor}]/20 border border-[${primaryColor}]/70 flex items-center justify-center mr-3`}>
                  <StarIcon className={`w-3 h-3 text-[${primaryColor}]`} />
                </div>
                <span className="text-neutral-200">250 points = Early Access NFT</span>
              </li>
              <li className="flex items-center">
                <div className={`w-6 h-6 rounded-full bg-[${primaryColor}]/20 border border-[${primaryColor}]/70 flex items-center justify-center mr-3`}>
                  <StarIcon className={`w-3 h-3 text-[${primaryColor}]`} />
                </div>
                <span className="text-neutral-200">1000 points = Exclusive WL access</span>
              </li>
              <li className="flex items-center">
                <div className={`w-6 h-6 rounded-full bg-[${primaryColor}]/20 border border-[${primaryColor}]/70 flex items-center justify-center mr-3`}>
                  <StarIcon className={`w-3 h-3 text-[${primaryColor}]`} />
                </div>
                <span className="text-neutral-200">5000 points = Token rewards</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Leaderboard Preview Card */}
        <div className={`relative rounded-xl bg-neutral-800 shadow-lg shadow-[${primaryColor}]/20 ring-1 ring-[${primaryColor}]/30 mb-6`}>
          <div className={`absolute -inset-1 -z-10 rounded-xl bg-[${primaryColor}]/10 blur-md`}></div>
          <div className="relative p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <TrophyIcon className={`w-5 h-5 text-[${primaryColor}] mr-2`} />
              <h2 className="text-xl font-semibold text-white">Leaderboard Preview</h2>
            </div>
            <div className="space-y-3">
              {leaderboardData.map(user => (
                <div key={user.rank} className={`flex items-center p-3 rounded-lg ${user.isTop ? `bg-[${primaryColor}]/20 border border-[${primaryColor}]/40` : `bg-neutral-700/40 border border-neutral-600/50`}`}>
                  <div className="text-xl font-bold w-8 text-center text-white">{user.rank}.</div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ml-2 ${user.isTop ? `bg-[${primaryColor}]/30` : `bg-neutral-600`}`}>
                    {typeof user.avatarInitial === 'string' ? <span className="text-sm font-semibold text-white">{user.avatarInitial}</span> : user.avatarInitial}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white">{user.name}</div>
                    <div className={`text-xs flex items-center ${user.isTop ? `text-[${primaryColor}]` :'text-neutral-400'}`}>
                      <StarIcon className={`w-3 h-3 mr-1 ${user.isTop ? `text-[${primaryColor}]` : `text-[${primaryColor}]`}`} /> {user.reviews} reviews
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-white">{user.xp}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className={`mt-4 p-3 rounded-lg bg-neutral-700/50 border border-neutral-600/60`}>
              <div className="flex items-center">
                <div className="text-xl font-bold w-8 text-center text-neutral-400">?</div>
                <div className={`w-8 h-8 bg-neutral-600 rounded-full flex items-center justify-center mr-3 ml-2 text-sm font-semibold text-white`}>You</div>
                <div className="flex-1">
                  <div className="font-medium text-white">Your Rank</div>
                  <div className="text-xs text-neutral-400">Keep rating to appear on the leaderboard</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-white">{currentXP} XP</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-700 p-2 z-10">
        <div className="max-w-lg mx-auto flex items-center justify-around">
          <a className={`flex flex-col items-center p-2 text-neutral-400 hover:text-[${primaryColor}]`} href="/discover"> {/* Assuming /discover is the path */}
            <div className={`w-6 h-6 text-neutral-400 group-hover:text-[${primaryColor}]`}>
              <SearchIcon />
            </div>
            <span className={`text-xs mt-1 text-neutral-400 group-hover:text-[${primaryColor}]`}>Discover</span>
          </a>
          <a className={`flex flex-col items-center p-2 text-[${primaryColor}]`} href="/rewards"> {/* Active Link */}
            <div className={`w-6 h-6 text-[${primaryColor}]`}>
              <TrophyIcon className="w-6 h-6" />
            </div>
            <span className={`text-xs mt-1 text-[${primaryColor}]`}>Rewards</span>
          </a>
          <a className={`flex flex-col items-center p-2 text-neutral-400 hover:text-[${primaryColor}]`} href="/profile">
            <div className={`w-6 h-6 text-neutral-400 group-hover:text-[${primaryColor}]`}>
             <UserIcon />
            </div>
            <span className={`text-xs mt-1 text-neutral-400 group-hover:text-[${primaryColor}]`}>Profile</span>
          </a>
          <a href="https://api.werate.io/api/v1/redirect-app-store" target="_blank" rel="noopener noreferrer" className={`flex flex-col items-center p-2 text-neutral-400 hover:text-[${primaryColor}]`}>
            <div className={`w-6 h-6 text-neutral-400 group-hover:text-[${primaryColor}]`}>
              <ExternalLinkIcon />
            </div>
            <span className={`text-xs mt-1 text-neutral-400 group-hover:text-[${primaryColor}]`}>Get The App</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;