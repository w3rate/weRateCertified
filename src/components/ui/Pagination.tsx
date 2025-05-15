import React from 'react'
import Link from 'next/link'

const Pagination = () => {
  const currentPage = 1

  return (
    <nav role="navigation" aria-label="pagination" className="mx-auto mt-8 flex w-full justify-center">
      <ul className="flex flex-row items-center gap-1">
        {[1, 2, 3].map((page) => (
          <li key={page}>
            <Link
              href={`#`}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`ring-offset-background focus-visible:ring-ring inline-flex h-9 w-9 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:h-10 sm:w-10 ${
                page === currentPage
                  ? 'border-werate-tertiary hover:bg-werate-tertiary/10 hover:border-werate-purple border bg-transparent text-white'
                  : 'hover:bg-werate-tertiary/20 text-white hover:text-white'
              }`}
            >
              {page}
            </Link>
          </li>
        ))}

        <li>
          <Link
            href={`#`}
            className="ring-offset-background focus-visible:ring-ring hover:bg-werate-tertiary/20 inline-flex h-9 items-center justify-center gap-1 whitespace-nowrap rounded-md px-3 py-2 pr-2.5 text-sm font-medium text-white transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:h-10 sm:px-4"
            aria-label="Go to next page"
          >
            <span>Next</span>

            <span className="h-4 w-4">&gt;</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
