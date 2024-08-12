/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @stylistic/max-len */
// CharacterTable.tsx
import { CharacterTableRow } from '../CharacterTableRow'
import styles from './CharacterTable.module.css'

interface CharacterTableProps {
  characters: any[]
  onCharacterClick: (character: any) => void
}

export function CharacterTable({ characters, onCharacterClick }: CharacterTableProps) {
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
        {characters.map((character) => (
          <CharacterTableRow key={character.id} character={character} onClick={onCharacterClick} />
        ))}
      </tbody>
    </table>
  )
}
