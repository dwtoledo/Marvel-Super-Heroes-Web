/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @stylistic/max-len */
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

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

  function getSuperHeroesTable() {
    if (!characters.length) return null

    return (
      <table className={styles.superHeroesTable}>
        <thead>
          <tr className={styles.superHeroesTable_header}>
            <th className={styles.superHeroesTable_columnVisibilityMobile}>Personagem</th>
            <th className={styles.superHeroesTable_columnVisibilityDesktop}>Personagem</th>
            <th className={styles.superHeroesTable_columnDisplay}>Séries</th>
            <th className={styles.superHeroesTable_columnDisplay}>Eventos</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => {
            return (
              <tr key={character.id} className={styles.superHeroesTable_card} onClick={() => handleSuperHeroCardClick(character)}>
                <td>
                  <img
                    className={styles.superHeroesTable_avatar}
                    src={character.thumbnail.path + '.' + character.thumbnail.extension}
                    alt={`Imagem do super herói ${character.name}`}
                  />
                </td>
                <td>
                  <span className={styles.superHeroesTable_name}>
                    {character.name}
                  </span>
                </td>
                <td className={styles.superHeroesTable_columnDisplay}>
                  {!character.series.items.length
                    ? '-'
                    : (
                        character.series.items.map((serie: any) => {
                          return (
                            <p key={uuidv4()}>{serie.name
                              ? serie.name
                              : '-'}
                            </p>
                          )
                        })

                      )}
                </td>
                <td className={styles.superHeroesTable_columnDisplay}>
                  {!character.events.items.length
                    ? '-'
                    : (character.events.items.map((event: any) => {
                        return (
                          <p key={uuidv4()}>{event.name
                            ? event.name
                            : '-'}
                          </p>
                        )
                      }))}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
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
          : getSuperHeroesTable()}

      </div>
    </main>
  )
}
