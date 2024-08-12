/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @stylistic/max-len */
// CharacterTableRow.tsx
import { v4 as uuidv4 } from 'uuid'
import styles from './CharacterTableRow.module.css'

interface CharacterTableRowProps {
  character: any
  onClick: (character: any) => void
}

export function CharacterTableRow({ character, onClick }: CharacterTableRowProps) {
  return (
    <tr className={styles.superHeroesTable_card} onClick={() => onClick(character)}>
      <td>
        <img
          className={styles.superHeroesTable_avatar}
          src={character.thumbnail.path + '.' + character.thumbnail.extension}
          alt={`Imagem do super herói ${character.name}`}
        />
      </td>
      <td>
        <span className={styles.superHeroesTable_name}>
          {character.name}
        </span>
      </td>
      <td className={styles.superHeroesTable_columnDisplay}>
        {!character.series.items.length
          ? '-'
          : character.series.items.map((serie: any) => (
            <p key={uuidv4()}>{serie.name
              ? serie.name
              : '-'}
            </p>
          ))}
      </td>
      <td className={styles.superHeroesTable_columnDisplay}>
        {!character.events.items.length
          ? '-'
          : character.events.items.map((event: any) => (
            <p key={uuidv4()}>{event.name
              ? event.name
              : '-'}
            </p>
          ))}
      </td>
    </tr>
  )
}
