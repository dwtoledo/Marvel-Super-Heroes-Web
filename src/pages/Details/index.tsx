import { useContext } from 'react'
import styles from './style.module.css'
import { CharacterDetailsContext } from '../../contexts/character-details'

export function Details() {
  const { characterDetails } = useContext(CharacterDetailsContext)

  return (
    <main className={styles.mainContent}>
      <h1 className={styles.mainContent_title}>
        Details
      </h1>
      <p>{JSON.stringify(characterDetails)}</p>
    </main>
  )
}
