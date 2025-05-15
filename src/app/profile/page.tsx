// components/UserProfilePage.js
'use client'; // Необходимо для использования хуков useState, useEffect и next-auth/react

import Image from 'next/image';
import { signOut } from 'next-auth/react'; // Импорт для выхода из системы
import { useState } from 'react'; // Для управления состоянием вкладок (пример)

// --- SVG Icon Components (Inlined) ---
const PenIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className || 'w-4 h-4'}`}>
    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
  </svg>
);

const TrophyIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className || 'w-4 h-4'}`}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
  </svg>
);

const LogOutIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className || 'w-4 h-4 mr-1'}`}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line>
  </svg>
);

const FileTextIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className || 'w-4 h-4 md:mr-2'}`}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path>
  </svg>
);

const StarIcon = ({ className, filledColor }: { className?: string, filledColor?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filledColor || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className || 'w-4 h-4 md:mr-2'}`}>
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
  </svg>
);

const WalletIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className || 'w-4 h-4 md:mr-2'}`}>
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
  </svg>
);
// --- End SVG Icon Components ---

const UserProfilePage = () => {
  const primaryColor = '#C94EFF';
  const [activeTab, setActiveTab] = useState('projects'); // Пример управления состоянием вкладок

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const TABS = [
    { id: 'projects', label: 'Projects', Icon: FileTextIcon },
    { id: 'reviews', label: 'Reviews', Icon: StarIcon },
    { id: 'achievements', label: 'Achievements', Icon: TrophyIcon },
    { id: 'wallets', label: 'Wallets', Icon: WalletIcon },
  ];

  return (
    <div className="max-w-2xl mx-auto pt-6 text-white">
      <div className={`relative mb-6 rounded-xl bg-neutral-800 shadow-lg shadow-[${primaryColor}]/20 ring-1 ring-[${primaryColor}]/30`}>
        <div className={`absolute -inset-1 -z-10 rounded-xl bg-[${primaryColor}]/10 blur-md`}></div>
        <div className="relative p-4 sm:p-6">
          <div className="flex flex-col items-center mb-4 sm:mb-6 text-center">
            <span className="relative flex shrink-0 overflow-hidden h-20 w-20 mb-3 rounded-full border-2 border-neutral-700">
              <Image
                className="aspect-square h-full w-full object-cover"
                src="/lovable-uploads/acace75c-dc31-41c6-ac33-d000d0a37f7a.png"
                alt="User Avatar"
                width={80}
                height={80}
              />
            </span>
            <div className="w-full">
              <div className="flex items-center justify-center mb-1">
                <h1 className="text-xl font-bold text-white">CryptoExplorer</h1>
                <button
                  title="Edit Profile"
                  className={`inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-neutral-700 bg-transparent text-white hover:bg-neutral-700/20 hover:border-[${primaryColor}] h-8 w-8 rounded-md text-xs sm:text-sm ml-2 p-0`}
                >
                  <PenIcon className="w-4 h-4" />
                  <span className="sr-only">Edit</span>
                </button>
              </div>
              <div className={`flex items-center justify-center text-sm text-neutral-300 mb-2 py-[6px]`}>
                <TrophyIcon className={`w-4 h-4 mr-1.5 text-[${primaryColor}]`} />
                <span>Level 1 • 25 XP</span>
                <span className="mx-1.5">•</span>
                <span>3 Day Streak</span>
              </div>
              <p className="text-sm text-neutral-400 px-4 sm:px-8">
                Blockchain enthusiast and Web3 developer exploring the latest in decentralized technologies.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-6">
            <button
              className={`w-full inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[${primaryColor}] text-white hover:bg-[${primaryColor}]/90 hover:scale-105 h-10 rounded-md px-4 text-sm`}
            >
              <TrophyIcon className="w-4 h-4 mr-1" />
              Rewards & Streak
            </button>
            <button
              onClick={handleSignOut}
              className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-transparent h-10 rounded-md px-4 text-sm border-red-600/40 text-red-400 hover:border-red-500 hover:bg-red-500/10"
              type="button"
            >
              <LogOutIcon className="w-4 h-4 mr-1.5" />
              Disconnect Wallet
            </button>
          </div>
        </div>
      </div>

      <div dir="ltr" data-orientation="horizontal" className="w-full">
        <div
          role="tablist"
          aria-orientation="horizontal"
          className={`mb-6 flex items-center justify-around rounded-full bg-neutral-800 p-1.5 shadow-md ring-1 ring-[${primaryColor}]/20`}
          tabIndex={0}
          data-orientation="horizontal"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              data-state={activeTab === tab.id ? 'active' : 'inactive'}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-md rounded-full data-[state=active]:bg-[${primaryColor}] data-[state=active]:text-white text-neutral-300 hover:text-white data-[state=inactive]:hover:bg-neutral-700/50`}
              tabIndex={-1}
              data-orientation="horizontal"
            >
              <tab.Icon className="w-4 h-4 md:mr-2" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sr-only sm:hidden">{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'projects' && (
          <div
            role="tabpanel"
            data-state="active"
            tabIndex={0}
            className="mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div className={`relative rounded-xl bg-neutral-800 shadow-lg shadow-[${primaryColor}]/20 ring-1 ring-[${primaryColor}]/30`}>
              <div className={`absolute -inset-1 -z-10 rounded-xl bg-[${primaryColor}]/10 blur-md`}></div>
              <div className="relative p-4 sm:p-6">
                <div className="mb-4 flex items-center">
                  <FileTextIcon className={`w-5 h-5 text-[${primaryColor}] mr-2`} />
                  <h2 className="text-lg font-medium text-white">Rated Projects</h2>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-neutral-900/40 rounded-lg border border-neutral-700/70">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-white text-lg">Jupiter</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="inline-flex items-center rounded-full border border-neutral-600/50 bg-neutral-700/60 px-2.5 py-0.5 text-xs font-semibold text-neutral-200">
                            DEX
                          </div>
                          <span className="text-xs text-neutral-400">15-5-2023</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <StarIcon className="w-5 h-5 text-yellow-400 mr-1" filledColor="#FBBF24" />
                        <span className="font-medium text-lg text-white">4.8</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-neutral-900/40 rounded-lg border border-neutral-700/70">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-white text-lg">Magic Eden</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="inline-flex items-center rounded-full border border-neutral-600/50 bg-neutral-700/60 px-2.5 py-0.5 text-xs font-semibold text-neutral-200">
                            NFT Marketplace
                          </div>
                          <span className="text-xs text-neutral-400">10-6-2023</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <StarIcon className="w-5 h-5 text-yellow-400 mr-1" filledColor="#FBBF24"/>
                        <span className="font-medium text-lg text-white">4.5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div role="tabpanel" data-state="active" tabIndex={0} className="mt-0 p-4 text-center text-neutral-400 rounded-xl bg-neutral-800 shadow-lg shadow-[${primaryColor}]/20 ring-1 ring-[${primaryColor}]/30 relative">
            <div className={`absolute -inset-1 -z-10 rounded-xl bg-[${primaryColor}]/10 blur-md`}></div>
            <div className="relative">Reviews content will be here.</div>
          </div>
        )}
        {activeTab === 'achievements' && (
          <div role="tabpanel" data-state="active" tabIndex={0} className="mt-0 p-4 text-center text-neutral-400 rounded-xl bg-neutral-800 shadow-lg shadow-[${primaryColor}]/20 ring-1 ring-[${primaryColor}]/30 relative">
            <div className={`absolute -inset-1 -z-10 rounded-xl bg-[${primaryColor}]/10 blur-md`}></div>
            <div className="relative">Achievements content will be here.</div>
          </div>
        )}
        {activeTab === 'wallets' && (
          <div role="tabpanel" data-state="active" tabIndex={0} className="mt-0 p-4 text-center text-neutral-400 rounded-xl bg-neutral-800 shadow-lg shadow-[${primaryColor}]/20 ring-1 ring-[${primaryColor}]/30 relative">
            <div className={`absolute -inset-1 -z-10 rounded-xl bg-[${primaryColor}]/10 blur-md`}></div>
            <div className="relative">Wallets content will be here.</div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-xs text-neutral-400">
        <p>
          To remove your account, please email:
          <a href="mailto:removal@werate.io" className={`text-[${primaryColor}] ml-1 hover:underline`}>
            removal@werate.io
          </a>
        </p>
        <p className="mt-1">We will process your request within 30 days.</p>
      </div>
    </div>
  );
};

export default UserProfilePage;