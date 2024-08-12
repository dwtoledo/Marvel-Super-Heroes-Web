/* eslint-disable @stylistic/max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CharacterTableRow } from '../CharacterTableRow'
import { v4 as uuidv4 } from 'uuid'

import styles from './style.module.css'

interface CharacterTableProps {
  characters: any[]
  onCharacterClick: (character: any) => void
}

export function CharactersTable({
  characters,
  onCharacterClick,
}: CharacterTableProps) {
  if (!characters.length) return <p>Não encontramos super-heróis com esse termo de busca, esperamos que não tenha nenhum vilão por perto!</p>

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
            <CharacterTableRow key={uuidv4()} character={character} onClick={onCharacterClick} />
          ))}
        </tbody>
      </table>
    </>
  )
}
