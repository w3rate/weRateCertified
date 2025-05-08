import Link from 'next/link';
import Image from 'next/image';
import { allProjectsData } from '@/components/constants';

// Определим тип для элементов в allProjectsData, если он еще не определен глобально
// Это должно соответствовать структуре объектов в вашем файле constants.ts
interface ProjectCardData {
  id: number;
  href: string; // Используется для построения ссылок, но мы будем использовать id
  title: string;
  rating: number;
  description: string;
  tags: string[];
  blockchain: string;
  img: string;
  // Добавьте сюда другие поля, если они есть в allProjectsData и нужны
  // Например, если бы allProjectsData содержал эти поля:
  // websiteUrl?: string;
  // whitepaperUrl?: string;
  // chartUrl?: string;
  // socialLinks?: Array<{ name: string; url: string; Icon?: React.FC<React.SVGProps<SVGSVGElement>>; imageUrl?: string; }>;
  // reviewsCount?: number;
  // ratingBreakdown?: Array<{ category: string; score: number }>;
  // recentReviews?: Array<{ /* ... */ }>;
}


const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m12 19-7-7 7-7"></path>
    <path d="M19 12H5"></path>
  </svg>
);

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
  </svg>
);

const StarIconFilled = (props: React.SVGProps<SVGSVGElement>) => (
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#C94EFF" stroke="#C94EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
  </svg>
);

const StarIconTransparent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
  </svg>
);

const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
    <path d="M2 12h20"></path>
  </svg>
);

const FileTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
    <path d="M10 9H8"></path>
    <path d="M16 13H8"></path>
    <path d="M16 17H8"></path>
  </svg>
);

const ChartNoAxesColumnIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" x2="18" y1="20" y2="10"></line>
    <line x1="12" x2="12" y1="20" y2="4"></line>
    <line x1="6" x2="6" y1="20" y2="14"></line>
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 6 9 17l-5-5"></path>
  </svg>
);

const FlameIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
  </svg>
);

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.3-4.3"></path>
  </svg>
);

const TrophyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
  </svg>
);

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ExternalLinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 3h6v6"></path>
    <path d="M10 14 21 3"></path>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
  </svg>
);


const ProjectRatingPage = ({ params }: { params: { id: string } }) => {
  const currentProjectId = parseInt(params.id, 10);
  const projectFromData = allProjectsData.find(p => p.id === currentProjectId) as ProjectCardData | undefined;

  if (!projectFromData) {
    return <div className="pt-10 text-center text-white">Project not found.</div>;
  }

  const staticSocialLinks = [
      { name: "Twitter", url: "#", Icon: TwitterIcon },
      { name: "Github", url: "#", Icon: GithubIcon },
      { name: "Discord", url: "#", imageUrl: "/lovable-uploads/3ce3457f-b2a3-464a-b0aa-70bfb5d05028.png" },
      { name: "Telegram", url: "#", imageUrl: "/lovable-uploads/ba59896e-886e-4ec5-a09d-31eb12901347.png" },
  ];

  const staticRatingBreakdown = [
      { category: "Team", score: 80 },
      { category: "Codebase / Security", score: 75 },
      { category: "Usability / UX", score: 90 },
      { category: "Community / Social", score: 85 },
      { category: "Moon Potential", score: 70 },
  ];
  
  const staticRecentReviews = [
    {
      userHandle: "0x8d",
      rating: 5,
      comment: "Placeholder: Great project with massive potential. The team is very responsive and the community is fantastic.",
      date: "3 days ago",
      badges: [
        { text: "Usage Verified", Icon: CheckIcon, colorClasses: "from-blue-500/20 to-blue-600/20 text-blue-400 border-blue-500/30", animateClass: "animate-bounce" },
      ],
      userBadges: [
        {text: "Consistent Reviewer", Icon: FlameIcon, colorClasses: "from-amber-500/20 to-amber-600/20 text-amber-400 border-amber-500/30", animateClass: "animate-pulse"},
        {text: "Top Contributor", Icon: StarIcon, colorClasses: "from-yellow-400/20 to-yellow-500/20 text-yellow-300 border-yellow-400/30", animateClass: "animate-pulse"},
      ]
    },
    {
      userHandle: "0x58",
      rating: 4,
      comment: "Placeholder: I've been using this for months and it's been a fantastic experience. Highly recommended!",
      date: "1 week ago",
      badges: [],
      userBadges: [
          {text: "Consistent Reviewer", Icon: FlameIcon, colorClasses: "from-amber-500/20 to-amber-600/20 text-amber-400 border-amber-500/30", animateClass: "animate-pulse"},
      ]
    },
  ];


  return (
    <div className="pt-10">
      <div className="min-h-screen pb-20">
        <div className="max-w-3xl mx-auto px-4 mt-4 relative">
          <div className="flex justify-between items-center mb-6">
            <Link className="inline-flex items-center text-werate-text hover:text-white transition-colors" href="/discover">
              <ArrowLeftIcon className="lucide lucide-arrow-left w-4 h-4 mr-2" />
              Back to Discover
            </Link>
            <Link href={`/rate/${currentProjectId}`}>
              <button className="bg-[#c4f] hover:bg-[#c4f]/90 text-white text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold tracking-wider flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-105 z-10">
                <span className="flex-shrink-0">
                  <StarIcon className="lucide lucide-star w-4 h-4" />
                </span>
                Rate Project
              </button>
            </Link>
          </div>

          <div className="floating-card p-4 sm:p-6 mb-4 sm:mb-6 relative shadow-lg shadow-[#c4f]/20 ring-1 ring-[#c4f]/30">
            <div className="absolute -inset-1 bg-[#c4f]/10 rounded-xl blur-md"></div>
            <div className="relative">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                <Image src={projectFromData.img} alt={projectFromData.title} width={64} height={64} className="w-16 h-16 rounded-lg border-2 border-werate-tertiary" />
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                    <h1 className="text-2xl font-bold text-white">{projectFromData.title}</h1>
                    <div className="flex flex-wrap gap-2">
                      {projectFromData.tags.map(tag => (
                        <span key={tag} className="text-xs px-3 py-1 rounded-full bg-werate-tertiary/50 text-white border border-werate-tertiary/30">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <StarIconFilled className="text-[#c4f] w-5 h-5 mr-2" />
                      <span className="text-xl font-bold text-white">{projectFromData.rating.toFixed(1)}</span>
                      <span className="text-werate-text text-sm ml-2">(N/A reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="text-base sm:text-lg font-medium mb-4 text-[#c4f]">About</h2>
              <p className="text-werate-text text-sm sm:text-base mb-6">{projectFromData.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <a href="#" target="_blank" rel="noreferrer" className="flex items-center text-[#c4f] hover:underline text-sm sm:text-base">
                  <GlobeIcon className="lucide lucide-globe w-4 h-4 mr-2" />
                  Visit Website
                </a>
                <a href="#" target="_blank" rel="noreferrer" className="flex items-center text-[#c4f] hover:underline text-sm sm:text-base">
                  <FileTextIcon className="lucide lucide-file-text w-4 h-4 mr-2" />
                  Whitepaper
                </a>
                <a href="#" target="_blank" rel="noreferrer" className="flex items-center text-[#c4f] hover:underline text-sm sm:text-base">
                  <ChartNoAxesColumnIcon className="lucide lucide-chart-no-axes-column w-4 h-4 mr-2" />
                  View Chart
                </a>
              </div>
              <div className="border-t border-werate-tertiary pt-3 sm:pt-4">
                <h3 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3">Social Links</h3>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {staticSocialLinks.map(link => (
                    <a key={link.name} href={link.url} target="_blank" rel="noreferrer" className="flex items-center text-werate-text hover:text-[#c4f] transition-colors">
                      {link.Icon && <link.Icon className="lucide w-4 h-4 sm:w-5 sm:h-5" />}
                      {link.imageUrl && <Image src={link.imageUrl} alt={link.name} width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="floating-card p-4 sm:p-6 mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-medium mb-4 sm:mb-6">Rating Breakdown</h2>
            <div className="space-y-4 sm:space-y-5">
              {staticRatingBreakdown.map(item => (
                <div key={item.category}>
                  <div className="flex justify-between items-center mb-2 sm:mb-3">
                    <span className="text-sm sm:text-base">{item.category}</span>
                    <div className="flex items-center">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                           <StarIconFilled key={i} className="lucide lucide-star w-4 h-4 cursor-default opacity-70" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="h-2 bg-werate-tertiary rounded-full overflow-hidden">
                      <div className="h-full bg-[#c4f] rounded-full transition-all duration-500 ease-out" style={{ width: `${item.score}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="floating-card p-4 sm:p-6">
            <div className="flex items-center mb-3 sm:mb-4">
              <UsersIcon className="lucide lucide-users text-[#c4f] w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <h2 className="text-base sm:text-lg font-medium">Recent Reviews</h2>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {staticRecentReviews.map((review, index) => (
                <div key={index} className="p-3 sm:p-4 rounded-lg bg-werate-tertiary/30 border border-werate-tertiary">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-werate-tertiary flex items-center justify-center mr-2">
                        <span className="text-xs">{review.userHandle}</span>
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-medium">Anonymous User</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {review.badges.map((badge, badgeIdx) => (
                            <div key={badgeIdx} className={`items-center rounded-full border bg-gradient-to-r ${badge.colorClasses} text-xs p-1 hover:scale-105 transition-all duration-300 inline-flex`}>
                              <badge.Icon className={`lucide w-3 h-3 mr-1 ${badge.animateClass || ''}`} />
                              <span>{badge.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                       {[...Array(5)].map((_, i) => (
                        i < review.rating 
                        ? <StarIconFilled key={i} className="lucide lucide-star w-4 h-4 cursor-default opacity-70" />
                        : <StarIconTransparent key={i} className="lucide lucide-star w-4 h-4 cursor-default opacity-70" />
                      ))}
                    </div>
                  </div>
                  <p className="text-werate-text text-xs sm:text-sm mb-3">{review.comment}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-werate-text">{review.date}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {review.userBadges.map((badge, badgeIdx) => (
                         <div key={badgeIdx} className={`flex items-center rounded-full border bg-gradient-to-r ${badge.colorClasses} text-xs p-1 ${badge.animateClass || ''}`}>
                            <badge.Icon className="lucide w-3 h-3 mr-1" />
                           <span>{badge.text}</span>
                         </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link className="text-sm text-[#c4f] hover:underline" href={`/project/${currentProjectId}/reviews`}>
                View all N/A reviews →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-werate-background border-t border-werate-tertiary p-2 z-10">
        <div className="max-w-lg mx-auto flex items-center justify-around">
          <Link className="flex flex-col items-center p-2 text-werate-text " href="/discover">
            <div className="w-6 h-6 text-werate-text ">
              <SearchIcon />
            </div>
            <span className="text-xs mt-1 text-werate-text ">Discover</span>
          </Link>
          <Link className="flex flex-col items-center p-2 text-werate-text " href="/rewards">
            <div className="w-6 h-6 text-werate-text ">
              <TrophyIcon />
            </div>
            <span className="text-xs mt-1 text-werate-text ">Rewards</span>
          </Link>
          <Link className="flex flex-col items-center p-2 text-werate-text " href="/profile">
            <div className="w-6 h-6 text-werate-text ">
              <UserIcon />
            </div>
            <span className="text-xs mt-1 text-werate-text ">Profile</span>
          </Link>
          <a href="https://api.werate.io/api/v1/redirect-app-store" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-2 text-werate-text ">
            <div className="w-6 h-6 text-werate-text ">
              <ExternalLinkIcon />
            </div>
            <span className="text-xs mt-1 text-werate-text ">Get The App</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectRatingPage;