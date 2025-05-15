'use client'

import React from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

const BottomNav = () => {
  const pathname = usePathname()

  const navItems = [
    {id: 'discover', href: '/discover', label: 'Discover', icon: '🔍'},
    {id: 'rewards', href: '/rewards', label: 'Rewards', icon: '🏆'},
    {id: 'profile', href: '/profile', label: 'Profile', icon: '👤'},
    {
      id: 'getapp',
      href: 'https://api.werate.io/api/v1/redirect-app-store',
      label: 'Get The App',
      icon: '🔗',
      external: true
    }
  ]

  return (
    <div className="bg-werate-background border-werate-tertiary fixed bottom-0 left-0 right-0 z-50 border-t p-2">
      {' '}
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {navItems.map((item) => {
          const isActive = !item.external && pathname === item.href

          const textColorClass = isActive ? 'text-werate-purple' : 'text-werate-text'

          return (
            <Link
              key={item.id}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className={`flex flex-col items-center p-2 ${textColorClass} hover:text-werate-purple transition-colors`}
            >
              <div className={`h-6 w-6 ${textColorClass}`}>{item.icon}</div>
              <span className={`mt-1 text-xs ${textColorClass}`}>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNav
