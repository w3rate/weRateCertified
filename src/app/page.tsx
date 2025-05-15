import {PageTitle} from '../components/PageTitle'
import {FeatureCard} from '../components/FeatureCard'
import ProjectGrid from '@/components/ui/ProjectGrid'
import ProjectCard from '@/components/ui/ProjectCard'
import Disclaimer from '@/components/ui/Disclaimer'
import {featuredProjectsData, allProjectsData} from '../components/constants'

interface FeatureData {
  title: string
  text: string
  iconType: 'star' | 'zap' | 'shield'
}
const featureCardsData: FeatureData[] = [
  {
    title: 'Discover Projects',
    text: 'Share your honest opinions on the latest blockchain projects and help others make informed decisions.',
    iconType: 'star'
  },
  {
    title: 'Earn Rewards',
    text: 'Get rewarded for your contributions with XP, achievements, and early access to new features.',
    iconType: 'zap'
  },
  {
    title: 'Build Reputation',
    text: 'Establish yourself as a trusted reviewer and increase your influence in the community.',
    iconType: 'shield'
  }
]

const VERCEL_DEPLOYMENT_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
const BASE_URL = VERCEL_DEPLOYMENT_URL ? `https://${VERCEL_DEPLOYMENT_URL}` : 'http://localhost:3000'


export default async function Home() {
  const featuredForDisplay = featuredProjectsData
  const allForDisplay = allProjectsData

  const ratings = async () => await (await fetch(`${BASE_URL}/api/projects-ratings`)).json()

  const ratingsData = await ratings()

  return (
    <main>
      <div className="p-6 pb-20 pt-10">
        {' '}
        <div className="mx-auto max-w-5xl">
          <PageTitle />

          <div className="mb-8 overflow-x-auto px-1 py-2">
            {' '}
            <div className="flex flex-col gap-4 md:flex-row" style={{opacity: 1, transform: 'none'}}>
              {' '}
              {featureCardsData.map((feature, index) => (
                <FeatureCard key={index} title={feature.title} text={feature.text} iconType={feature.iconType} />
              ))}
            </div>
          </div>

          {featuredForDisplay.length > 0 && (
            <div className="mb-8">
              <div className="mb-4 flex items-center">
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
                  className="lucide lucide-sparkles text-werate-purple animate-glow-pulse mr-2 h-5 w-5"
                >
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                  <path d="M20 3v4"></path>
                  <path d="M22 5h-4"></path>
                  <path d="M4 17v2"></path>
                  <path d="M5 18H3"></path>
                </svg>
                <h2 className="text-xl font-semibold text-white">Featured Projects</h2>
              </div>
              <ProjectGrid>
                {featuredForDisplay.map((project) => (
                  <ProjectCard key={`featured-${project.id}`} {...project} isFeatured={true} rating={ratingsData[project.id]} />
                ))}
              </ProjectGrid>
            </div>
          )}

          {allForDisplay.length > 0 && (
            <div className="mb-8">
              {' '}
              <h2 className="mb-4 flex items-center text-xl font-semibold text-white">
                All Projects
                <span className="text-werate-text ml-2 text-sm font-normal">({allForDisplay.length})</span>
              </h2>
              <ProjectGrid>
                {allForDisplay.map((project) => (
                  <ProjectCard key={`all-${project.id}`} {...project} rating={ratingsData[project.id]}/>
                ))}
              </ProjectGrid>
            </div>
          )}
          <Disclaimer />
        </div>
      </div>
    </main>
  )
}
