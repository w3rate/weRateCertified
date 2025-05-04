'use client' // Используем клиентский компонент для usePathname

import React from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation' // Для определения активной ссылки

const BottomNav = () => {
  const pathname = usePathname() // Получаем текущий путь

  const navItems = [
    // Добавляем id для ключа и иконки-заглушки
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
      {/* Увеличил z-index */}
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {navItems.map((item) => {
          // Определяем, активна ли ссылка (простое сравнение для примера)
          const isActive = !item.external && pathname === item.href
          // Определяем цвет текста/иконки
          const textColorClass = isActive ? 'text-werate-purple' : 'text-werate-text'

          return (
            <Link
              key={item.id}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              // Применяем классы цвета и базовые стили
              className={`flex flex-col items-center p-2 ${textColorClass} hover:text-werate-purple transition-colors`}
            >
              {/* Заглушка для иконки */}
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
