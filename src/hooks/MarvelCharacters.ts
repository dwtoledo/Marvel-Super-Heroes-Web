/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @stylistic/max-len */
import { useEffect, useState, useRef } from 'react'
import md5 from 'crypto-js/md5'

export function useMarvelCharacters() {
  const [characters, setCharacters] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const abortControllerRef = useRef<AbortController | null>(null)

  const pagesLimit = 10

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const abortController = new AbortController()
    abortControllerRef.current = abortController

    async function fetchData() {
      setIsLoading(true)
      const data = await listMarvelCharacters(searchQuery, currentPage, pagesLimit, abortController)
      if (!abortController.signal.aborted) {
        setCharacters(data)
        setIsLoading(false)
      }
    }

    fetchData()

    return () => {
      abortController.abort()
    }
  }, [searchQuery, currentPage, pagesLimit])

  async function listMarvelCharacters(
    searchQuery: string,
    currentPage: number,
    limit = pagesLimit,
    abortController: AbortController,
  ) {
    const publicKey = import.meta.env.VITE_API_PUBLIC_KEY
    const privateKey = import.meta.env.VITE_API_PRIVATE_KEY
    const timestamp = new Date().getTime()
    const hash = md5(timestamp + privateKey + publicKey).toString()
    const offset = (currentPage - 1) * limit
    let url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`

    if (searchQuery) {
      url += `&nameStartsWith=${searchQuery}`
    }

    try {
      const response = await fetch(url, { signal: abortController.signal })
      if (!response.ok) {
        throw new Error('Não foi possível obter a listagem de personagens!')
      }
      const data = await response.json()
      setTotalPages(Math.ceil(data.data.total / limit))
      return data.data.results
    } catch (error: any) {
      console.error('Fetch error:', error)
      return []
    }
  }

  return {
    characters,
    isLoading,
    searchQuery,
    currentPage,
    totalPages,
    setSearchQuery,
    setCurrentPage,
  }
}
