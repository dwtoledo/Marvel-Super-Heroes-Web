/* eslint-disable @stylistic/max-len */
import { useContext } from 'react'
import { CharacterDetailsContext } from '../../contexts/CharacterDetails'
import { useNavigate } from 'react-router-dom'

import styles from './style.module.css'
import { BackButton } from '../../components/BackButton'
import { CharacterDetailsCard } from '../../components/CharacterDetailsCard'

export function Details() {
  const { characterDetails } = useContext(CharacterDetailsContext)
  const characterAvatarUrl = `${characterDetails.thumbnail.path}.${characterDetails.thumbnail.extension}`
  const navigate = useNavigate()

  function handleBackButtonClick() {
    navigate('/')
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <BackButton onClick={handleBackButtonClick} />

        <h1 className={styles.content_title}>
          Detalhes de {characterDetails.name}:
        </h1>

        <CharacterDetailsCard
          avatarUrl={characterAvatarUrl}
          name={characterDetails.name}
          description={characterDetails.description}
          events={characterDetails.events}
          series={characterDetails.series}
        />

        <p>
          <b>Eventos</b> são grandes arcos narrativos que afetam várias séries e personagens no universo Marvel,
          cruzando diversas publicações.
        </p>
        <p>
          <b>Séries</b> são coleções contínuas de edições publicadas sob um título específico, seguindo um arco
          narrativo ou vários arcos.
        </p>
      </div>
    </main>
  )
}
