/* eslint-disable @stylistic/max-len */
import { ChangeEvent } from 'react'
import { FaSearch } from 'react-icons/fa'
import styles from './style.module.css'

interface CharacterSearchFormProps {
  onSearchQueryChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function CharacterSearchForm({ onSearchQueryChange }: CharacterSearchFormProps) {
  return (
    <div className={styles.form}>
      <label htmlFor="character-name" className={styles.form_label}>
        Nome do personagem
      </label>
      <div className={styles.form_inputWrapper}>
        <FaSearch className={styles.form_inputIcon} />
        <input
          id="character-name"
          type="text"
          placeholder="Search"
          className={styles.form_input}
          onChange={onSearchQueryChange}
        />
      </div>
    </div>
  )
}
