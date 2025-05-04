import React from 'react'

const Header = () => {
  // Воспроизводим логотип без SVG звезд и их анимаций
  return (
    <div className="z-20 flex w-full justify-center py-6">
      <div>
        {/* Анимация float и cursor-pointer */}
        <div className="animate-float relative flex cursor-pointer items-center justify-center">
          {/* Основной текст логотипа с градиентом и анимацией */}
          <span className="bg-gradient-primary animate-glow-pulse bg-clip-text text-3xl font-bold tracking-wider text-transparent">
            weRate
          </span>
          {/* Текст "Certified" */}
          <span className="text-werate-text ml-1 self-center text-base font-semibold">Certified</span>
          {/* Абсолютно позиционированные SVG звезды и <style> удалены */}
        </div>
      </div>
    </div>
  )
}

export default Header
