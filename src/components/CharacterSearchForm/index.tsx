/* eslint-disable @stylistic/max-len */
import { ChangeEvent } from 'react'
import { FaSearch } from 'react-icons/fa'
import styles from './style.module.css'

interface CharacterSearchFormProps {
  onSearchQueryChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function CharacterSearchForm({ onSearchQueryChange }: CharacterSearchFormProps) {
  return (
    <div className={styles.characterSearchForm}>
      <label htmlFor="character-name" className={styles.characterSearchForm_label}>
        Nome do personagem
      </label>
      <div className={styles.characterSearchForm_inputContainer}>
        <FaSearch className={styles.characterSearchForm_inputIcon} />
        <input
          id="character-name"
          type="text"
          placeholder="Search"
          className={styles.characterSearchForm_input}
          onChange={onSearchQueryChange}
        />
      </div>
    </div>
  )
}
