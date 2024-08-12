/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @stylistic/max-len */
// CharacterTableRow.tsx
import { v4 as uuidv4 } from 'uuid'
import styles from './style.module.css'

interface CharacterTableRowProps {
  character: any
  onClick: (character: any) => void
}

export function CharacterTableRow({ character, onClick }: CharacterTableRowProps) {
  return (
    <tr className={styles.tableRow_card} onClick={() => onClick(character)}>
      <td>
        <img
          className={styles.tableRow_avatar}
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={`Imagem do personagem ${character.name}`}
        />
      </td>
      <td>
        <span className={styles.tableRow_name}>
          {character.name}
        </span>
      </td>
      <td className={styles.tableRow_columnDisplay}>
        {!character.series.items.length
          ? '-'
          : character.series.items.map((serie: any) => (
            <p key={uuidv4()}>{serie.name
              ? serie.name
              : '-'}
            </p>
          ))}
      </td>
      <td className={styles.tableRow_columnDisplay}>
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
