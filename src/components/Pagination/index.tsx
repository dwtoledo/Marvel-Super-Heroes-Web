/* eslint-disable @stylistic/max-len */
import { useState, useEffect, useMemo } from 'react'
import styles from './style.module.css'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  onGoToPage: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
  onFirstPage,
  onLastPage,
  onGoToPage,
}: PaginationProps) {
  const [maxPagesToShow, setMaxPagesToShow] = useState(5)

  useEffect(() => {
    function handleResize() {
      setMaxPagesToShow(window.innerWidth < 768
        ? 3
        : 5)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const pageNumbers = useMemo(() => {
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2)
    let startPage = Math.max(1, currentPage - halfMaxPagesToShow)
    let endPage = Math.min(totalPages, currentPage + halfMaxPagesToShow)

    if (totalPages <= maxPagesToShow) {
      startPage = 1
      endPage = totalPages
    } else if (currentPage <= halfMaxPagesToShow) {
      startPage = 1
      endPage = maxPagesToShow
    } else if (currentPage + halfMaxPagesToShow >= totalPages) {
      startPage = totalPages - maxPagesToShow + 1
      endPage = totalPages
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }, [currentPage, totalPages, maxPagesToShow])

  return (
    <div className={styles.content}>
      <button
        onClick={onFirstPage}
        className={currentPage <= 2
          ? styles.buttonHidden
          : ''}
      >
        &#60;&#60;
      </button>
      <button
        onClick={onPreviousPage}
        className={currentPage === 1
          ? styles.buttonHidden
          : ''}
      >
        &#60;
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onGoToPage(pageNumber)}
          className={pageNumber === currentPage
            ? styles.activeButton
            : ''}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={onNextPage}
        className={currentPage === totalPages
          ? styles.buttonHidden
          : ''}
      >
        &#62;
      </button>
      <button
        onClick={onLastPage}
        className={currentPage >= totalPages - 1
          ? styles.buttonHidden
          : ''}
      >
        &#62;&#62;
      </button>
    </div>
  )
}
