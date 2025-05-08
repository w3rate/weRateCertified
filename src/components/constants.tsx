import {ProjectCardProps} from './ui/ProjectCard'

export const featuredProjectsData: ProjectCardProps[] = [
  {
    id: 2,
    href: '/project/2',
    title: 'Solana',
    rating: 5.0,
    description: 'Blockchain built for mass adoption',
    tags: ['Solana', 'Layer 1'],
    blockchain: 'Solana',
    isFeatured: true,
    img: '/logos/solana.svg'
  },
  {
    id: 13,
    href: '/project/13',
    title: 'MonkeDAO',
    rating: 4.7,
    description: 'Community-driven Solana NFT DAO built around the Solana Monkey Business collection',
    tags: ['DAO', 'NFT'],
    blockchain: 'Solana',
    isFeatured: true,
    img: '/logos/monkeDao.svg'
  },
  {
    id: 17,
    href: '/project/17',
    title: 'Jupiter',
    rating: 4.9,
    description: 'The key liquidity aggregator and swap infrastructure for Solana',
    tags: ['DeFi', 'Solana'],
    blockchain: 'Solana',
    isFeatured: true,
    img: '/logos/jupiter.svg'
  },
  {
    id: 20,
    href: '/project/20',
    title: 'Raydium',
    rating: 4.7,
    description: 'Automated market maker (AMM) and liquidity provider built on Solana',
    tags: ['DeFi', 'AMM'],
    blockchain: 'Solana',
    isFeatured: true,
    img: '/logos/raydium.svg'
  },
  {
    id: 24,
    href: '/project/24',
    title: 'Magic Eden',
    rating: 4.8,
    description: 'Largest NFT marketplace on Solana by volume and users',
    tags: ['NFT', 'Marketplace'],
    blockchain: 'Solana',
    isFeatured: true,
    img: '/logos/magicEden.svg'
  },
  {
    id: 26,
    href: '/project/26',
    title: 'Phantom',
    rating: 4.9,
    description: 'Friendly, easy to use crypto wallet built for Solana',
    tags: ['Wallet', 'Infrastructure'],
    blockchain: 'Solana',
    isFeatured: true,
    img: '/logos/phantom.svg'
  }
]
export const allProjectsData: ProjectCardProps[] = [
  ...featuredProjectsData.map((p) => ({...p, isFeatured: false})),
  {
    id: 14,
    href: '/project/14',
    title: 'MadLads',
    rating: 4.6,
    description: 'Popular NFT collection on the Solana blockchain with evolving utility',
    tags: ['NFT', 'Gaming'],
    blockchain: 'Solana',
    img: '/logos/madLads.svg'
  },
  {
    id: 16,
    href: '/project/16',
    title: 'Star Atlas',
    rating: 4.2,
    description: 'Next-gen gaming metaverse emerging from the confluence of blockchain and real-time graphics',
    tags: ['Gaming', 'NFT'],
    blockchain: 'Solana',
    img: '/logos/starAtlas.svg'
  },
  {
    id: 18,
    href: '/project/18',
    title: 'Marinade Finance',
    rating: 4.6,
    description: 'Liquid staking protocol for Solana that lets you stake SOL while maintaining liquidity',
    tags: ['DeFi', 'Staking'],
    blockchain: 'Solana',
    img: '/logos/marinade.svg'
  },
  {
    id: 19,
    href: '/project/19',
    title: 'Mango Markets',
    rating: 4.2,
    description: 'Decentralized, cross-margin trading platform with up to 5x leverage',
    tags: ['DeFi', 'Trading'],
    blockchain: 'Solana',
    img: '/logos/mango.svg'
  },
  {
    id: 21,
    href: '/project/21',
    title: 'DRiP',
    rating: 4.5,
    description: 'Platform connecting creators and their communities through free digital collectibles',
    tags: ['NFT', 'Creators'],
    blockchain: 'Solana',
    img: '/logos/drip.svg'
  },
  {
    id: 22,
    href: '/project/22',
    title: 'Helium',
    rating: 4.4,
    description: 'Decentralized wireless infrastructure network migrated to Solana',
    tags: ['IoT', 'Infrastructure'],
    blockchain: 'Solana',
    img: '/logos/helium.svg'
  },
  {
    id: 23,
    href: '/project/23',
    title: 'Squads',
    rating: 4.3,
    description: 'Protocol for decentralized teams, multisig and governance',
    tags: ['DAO', 'Governance'],
    blockchain: 'Solana',
    img: '/logos/squads.svg'
  },
  {
    id: 25,
    href: '/project/25',
    title: 'Orca',
    rating: 4.5,
    description: 'User-friendly decentralized exchange built on Solana',
    tags: ['DeFi', 'AMM'],
    blockchain: 'Solana',
    img: '/logos/orca.svg'
  },
  {
    id: 27,
    href: '/project/27',
    title: 'Aurory',
    rating: 4.3,
    description: 'Play-to-earn JRPG game built on Solana',
    tags: ['Gaming', 'NFT'],
    blockchain: 'Solana',
    img: '/logos/aurory.svg'
  },
  {
    id: 28,
    href: '/project/28',
    title: 'Tensor',
    rating: 4.6,
    description: 'Next-generation NFT trading platform built on Solana',
    tags: ['NFT', 'Marketplace'],
    blockchain: 'Solana',
    img: '/logos/tensor.svg'
  },
  {
    id: 29,
    href: '/project/29',
    title: 'Solend',
    rating: 4.4,
    description: 'Algorithmic, decentralized lending protocol on Solana',
    tags: ['DeFi', 'Lending'],
    blockchain: 'Solana',
    img: '/logos/solend.svg'
  },
  {
    id: 30,
    href: '/project/30',
    title: 'Pyth Network',
    rating: 4.5,
    description: 'First-party financial market data network delivering real-time on-chain data',
    tags: ['Oracles', 'Infrastructure'],
    blockchain: 'Solana',
    img: '/logos/pyth.svg'
  },
  {
    id: 31,
    href: '/project/31',
    title: 'Saber',
    rating: 4.2,
    description: 'Cross-chain stablecoin exchange on Solana',
    tags: ['DeFi', 'Stableswap'],
    blockchain: 'Solana',
    img: '/logos/saber.svg'
  },
  {
    id: 32,
    href: '/project/32',
    title: 'Grape',
    rating: 4.2,
    description: 'Social-driven DAO and protocol hub built on Solana',
    tags: ['Social', 'DAO'],
    blockchain: 'Solana',
    img: '/logos/grape.svg'
  },
  {
    id: 33,
    href: '/project/33',
    title: 'Metaplex',
    rating: 4.6,
    description: 'NFT storefront and protocol on Solana',
    tags: ['NFT', 'Infrastructure'],
    blockchain: 'Solana',
    img: '/logos/metaplex.svg'
  },
  {
    id: 34,
    href: '/project/34',
    title: 'Drift Protocol',
    rating: 4.3,
    description: 'Decentralized exchange that combines best parts of perpetual and spot trading',
    tags: ['DeFi', 'Trading'],
    blockchain: 'Solana',
    img: '/logos/drift.svg'
  },
  {
    id: 35,
    href: '/project/35',
    title: 'Serum',
    rating: 4.4,
    description: 'Decentralized exchange and ecosystem that brings unprecedented speed and low costs',
    tags: ['DeFi', 'DEX'],
    blockchain: 'Solana',
    img: '/logos/serum.svg'
  },
  {
    id: 36,
    href: '/project/36',
    title: 'Audius',
    rating: 4.5,
    description: 'Decentralized music streaming protocol built for direct creator-to-fan connection',
    tags: ['Social', 'Music'],
    blockchain: 'Solana',
    img: '/logos/audius.svg'
  }
]
