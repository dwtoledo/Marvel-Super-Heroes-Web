/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CharacterTableRow } from '../CharacterTableRow'
import { v4 as uuidv4 } from 'uuid'

import styles from './style.module.css'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { CharacterDetailsContext } from '../../contexts/character-details'

interface CharacterTableProps {
  characters: any[]
}

export function CharactersTable({ characters }: CharacterTableProps) {
  const { setCharacterDetails } = useContext(CharacterDetailsContext)
  const navigate = useNavigate()

  function handleCharacterCardClick(character: any) {
    setCharacterDetails(character)
    navigate(`/details/${character.id}`)
  }

  if (!characters.length) return <p className={styles.charactersTable_notFoundMessage}>Não encontramos personagens com esse termo de busca!</p>

  return (
    <>
      <table className={styles.charactersTable}>
        <thead>
          <tr className={styles.charactersTable_header}>
            <th className={styles.charactersTable_columnVisibilityMobile}>Personagem</th>
            <th className={styles.charactersTable_columnVisibilityDesktop}>Personagem</th>
            <th className={styles.charactersTable_columnDisplay}>Séries</th>
            <th className={styles.charactersTable_columnDisplay}>Eventos</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => (
            <CharacterTableRow key={uuidv4()} character={character} onClick={handleCharacterCardClick} />
          ))}
        </tbody>
      </table>
    </>
  )
}
