/* eslint-disable @stylistic/max-len */
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { CharacterDetailsContext } from '../../contexts/character-details'
import { Header } from '../../components/Header'

import styles from './style.module.css'

export function DefaultLayout() {
  const [characterDetails, setCharacterDetails] = useState<object>({})

  return (
    <div className={styles.pageContainer}>
      <Header />
      <CharacterDetailsContext.Provider value={{ characterDetails, setCharacterDetails }}>
        <Outlet />
      </CharacterDetailsContext.Provider>
    </div>
  )
}
