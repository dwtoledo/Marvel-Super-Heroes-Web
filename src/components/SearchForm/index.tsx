/* eslint-disable @stylistic/max-len */
import { ChangeEvent } from 'react'
import { FaSearch } from 'react-icons/fa'
import styles from './CharacterSearchForm.module.css'

interface CharacterSearchFormProps {
  onSearchQueryChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function CharacterSearchForm({ onSearchQueryChange }: CharacterSearchFormProps) {
  return (
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
          onChange={onSearchQueryChange}
        />
      </div>
    </form>
  )
}
