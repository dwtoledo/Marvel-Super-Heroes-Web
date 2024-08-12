/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @stylistic/max-len */
// Home.tsx
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import md5 from 'crypto-js/md5'
import { debounce } from 'lodash'

import { CharacterDetailsContext } from '../../contexts/character-details'

import styles from './style.module.css'
import { CharacterSearchForm } from '../../components/SearchForm'
import { LoadingContent } from '../../components/LoadingContent'
import { CharacterTable } from '../../components/CharacterTable'

export function Home() {
  const [characters, setCharacters] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const debouncedChangeHandler = debounce((newValue: string) => {
    if (newValue.length) setSearchQuery(newValue)
  }, 1500)

  const { setCharacterDetails } = useContext(CharacterDetailsContext)
  const navigate = useNavigate()

  useEffect(() => {
    async function listMarvelCharacters(limit = 10, offset = 0) {
      setIsLoading(true)
      const publicKey = import.meta.env.VITE_API_PUBLIC_KEY
      const privateKey = import.meta.env.VITE_API_PRIVATE_KEY
      const timestamp = new Date().getTime()
      const hash = md5(timestamp + privateKey + publicKey).toString()
      let url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`

      if (searchQuery.length) {
        url = `${url}&nameStartsWith=${searchQuery}`
      }

      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Não foi possível obter a listagem de super-heróis!')
        }
        const data = await response.json()
        return data.data.results
      } catch (error) {
        console.error('Fetch error: ', error)
        return []
      } finally {
        setIsLoading(false)
      }
    }

    listMarvelCharacters().then((characters) => {
      setCharacters(characters)
    })
  }, [searchQuery])

  function handleSuperHeroCardClick(character: any) {
    setCharacterDetails(character)
    navigate(`/details/${character.id}`)
  }

  function handleNewSearchQuery(event: ChangeEvent<HTMLInputElement>) {
    debouncedChangeHandler(event.target.value)
  }

  return (
    <main className={styles.mainContent}>
      <div className={styles.characterList}>
        <h1>Busca de personagens:</h1>

        <CharacterSearchForm onSearchQueryChange={handleNewSearchQuery} />

        {isLoading
          ? <LoadingContent />
          : <CharacterTable characters={characters} onCharacterClick={handleSuperHeroCardClick} />}

      </div>
    </main>
  )
}
