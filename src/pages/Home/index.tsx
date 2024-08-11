/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @stylistic/max-len */
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import md5 from 'crypto-js/md5'
import { debounce } from 'lodash'

import { CharacterDetailsContext } from '../../contexts/character-details'
import { LoaderSpin } from '../../components/LoaderSpin'

import styles from './style.module.css'
import { FaSearch } from 'react-icons/fa'

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

  function getSuperHeroCards() {
    if (!characters.length) return null
    const output = characters.map((character) => {
      return (
        <div className={styles.characterCard} key={character.id} onClick={() => handleSuperHeroCardClick(character)}>
          <img
            className={styles.characterCard_avatar}
            src={character.thumbnail.path + '.' + character.thumbnail.extension}
            alt={`Imagem do super herói ${character.name}`}
          />
          <span className={styles.characterCard_name}>
            {character.name}
          </span>
        </div>
      )
    })

    output.unshift(<span className={styles.characterList_caption}>Personagens:</span>)
    return output
  }

  function getLoadingContent() {
    return (
      <div className={styles.loaderContent}>
        <p className={styles.loaderMessage}>
          🦸 Buscando super-heróis...
        </p>
        <LoaderSpin />
      </div>
    )
  }

  return (
    <main className={styles.mainContent}>
      <div className={styles.characterList}>
        <h1>Busca de personagens:</h1>

        <form className={styles.characterList_form}>
          <label htmlFor="character-name" className={styles.characterList_formLabel}>
            Nome do personagem
          </label>
          <div className={styles.characterList_inputContainer}>
            <FaSearch className={styles.characterList_searchIcon} />
            <input
              id="character-name"
              type="text"
              placeholder="Search"
              className={styles.characterList_searchInput}
              onChange={handleNewSearchQuery}
            />
          </div>
        </form>

        {isLoading
          ? getLoadingContent()
          : getSuperHeroCards()}

      </div>
    </main>
  )
}
