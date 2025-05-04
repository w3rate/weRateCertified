import React from 'react'

const NotificationContainer = () => {
  // Этот компонент просто создает контейнер для будущих уведомлений.
  // Логика добавления/удаления уведомлений здесь не реализована.
  return (
    // Атрибуты aria и tabindex важны для доступности
    <div role="region" aria-label="Notifications (F8)" tabIndex={-1} style={{pointerEvents: 'none'}}>
      {/* Стили Tailwind для позиционирования */}
      <ol
        tabIndex={-1}
        className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
      >
        {/* Сюда будут добавляться уведомления */}
      </ol>
    </div>
  )
}

export default NotificationContainer
