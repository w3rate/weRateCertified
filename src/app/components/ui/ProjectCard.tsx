'use client'

import React from 'react'
import Link from 'next/link'

export interface ProjectCardProps {
  id: string | number
  href: string
  imageUrl?: string
  title: string
  rating: number
  description: string
  tags: string[]
  blockchain: string
  isFeatured?: boolean
  img?: string
}

const ProjectCard = ({
  // id,
  href,
  title,
  rating,
  description,
  tags,
  blockchain,
  isFeatured = false,
  img
}: ProjectCardProps) => {
  const cardClasses = `floating-card bg-[#223] border rounded-xl min-w-[260px] flex-1 transform p-5 text-left transition-all duration-300 hover:translate-y-[-3px] ${
    isFeatured ? 'border-[#c4f5] hover:border-[#c4f9]' : 'border-[#fff2] hover:border-[#c4f9]'
  }`

  return (
    <Link href={href} className={cardClasses}>
      <div className="mb-3 flex items-center space-x-3">
        {img ? (
          <img src={img} alt={title} width={40} />
        ) : (
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-700"></div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-white">{title}</h3>
          <div className="flex items-center">
            <div className="flex items-center gap-[4px]">
              <img src="/star.svg" alt={title} width={20} />
              <span className="text-werate-text text-sm leading-none">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        {isFeatured && (
          <div className="flex-shrink-0 rounded-full border border-[#c4f9] bg-[#c4f2] px-2 py-1 text-xs font-medium text-[#c4f]">
            Featured
          </div>
        )}
      </div>

      <p className="text-werate-text mb-3 line-clamp-2 text-sm">{description}</p>

      <div className="mb-3 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full bg-[#335d] px-2 py-0.5 text-xs font-[500] text-white">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="rounded-full border border-[#1f95] bg-[#1f92] px-2 py-0.5 text-xs font-medium text-[#1f9]">
          {blockchain}
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <button className="flex items-center gap-[8px] rounded-full border border-[#c4f9] bg-[#c4f2] px-2.5 py-1.5 text-xs text-white transition-colors hover:bg-[#c4f5]">
            <img src="/emptyStar.svg" className="brightness-0 grayscale invert" alt={title} width={16} /> Rate{' '}
            <img
              src="/downArrow.svg"
              className="rotate-[270deg] brightness-0 grayscale invert"
              alt={title}
              width={10}
            />
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
