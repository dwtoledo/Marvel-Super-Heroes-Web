/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @stylistic/max-len */
import { useEffect, useState } from 'react'
import md5 from 'crypto-js/md5'

export function useMarvelCharacters() {
  const [characters, setCharacters] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const pagesLimit = 10

  useEffect(() => {
    listMarvelCharacters(searchQuery, currentPage, pagesLimit).then(setCharacters)
  }, [searchQuery, currentPage, pagesLimit])

  async function listMarvelCharacters(
    searchQuery: string,
    currentPage: number,
    limit = 10,
  ) {
    setIsLoading(true)
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
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Não foi possível obter a listagem de super-heróis!')
      }
      const data = await response.json()
      setTotalPages(Math.ceil(data.data.total / limit))
      return data.data.results
    } catch (error) {
      console.error('Fetch error: ', error)
      return []
    } finally {
      setIsLoading(false)
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
