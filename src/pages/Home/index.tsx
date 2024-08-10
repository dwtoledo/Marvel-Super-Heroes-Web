import { useEffect, useState } from 'react'
import md5 from 'crypto-js/md5'

import { LoaderSpin } from '../../components/LoaderSpin'

import styles from './style.module.css'

export function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [characters, setCharacters] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function listMarvelCharacters(limit = 10, offset = 0) {
      const publicKey = import.meta.env.VITE_API_PUBLIC_KEY
      const privateKey = import.meta.env.VITE_API_PRIVATE_KEY
      const timestamp = new Date().getTime()
      const hash = md5(timestamp + privateKey + publicKey).toString()
      const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`

      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Não foi possível obter a listagem de super-heróis!')
        }
        const data = await response.json()
        return data.data.results
      } catch (error) {
        console.error('Fetch error: ', error)
        return null
      } finally {
        setIsLoading(false)
      }
    }

    listMarvelCharacters().then((characters) => {
      setCharacters(characters)
    }).catch()
  }, [])

  function getSuperHeroCards() {
    if (!characters.length) return null
    return characters.map((character) => {
      return (
        <div key={character.id} className={styles.characterCard}>
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
  }

  function getLoadingContent() {
    return (
      <div className={styles.loaderContent}>
        <p className={styles.loaderMessage}>
          🦸 Carregando a lista...
        </p>
        <LoaderSpin />
      </div>
    )
  }

  function getMainContent() {
    return (
      <>
        <div className={styles.characterCards}>
          <span className={styles.characterCards_caption}>Personagens:</span>
          {getSuperHeroCards()}
        </div>
      </>
    )
  }

  return (
    <main className={styles.mainContent}>
      {isLoading
        ? getLoadingContent()
        : getMainContent()}
    </main>
  )
}
