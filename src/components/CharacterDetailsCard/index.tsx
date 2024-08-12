/* eslint-disable @stylistic/max-len */
import { v4 as uuidv4 } from 'uuid'
import styles from './style.module.css'

interface CharacterDetailsCardProps {
  avatarUrl: string
  name: string
  description: string
  events: { items: { name: string }[] }
  series: { items: { name: string }[] }
}

export function CharacterDetailsCard({ avatarUrl, name, description, events, series }: CharacterDetailsCardProps) {
  return (
    <div className={styles.card}>
      <figure className={styles.card_picture}>
        <img src={avatarUrl} alt={`Imagem do personagem ${name}`} />
        <figcaption>
          <b>Descrição:</b> {description || 'A Marvel não disponibilizou descrição para esse personagem.'}
        </figcaption>
      </figure>

      <div className={styles.card_events}>
        <h2 className={styles.card_subtitle}>Eventos:</h2>
        {events.items.length
          ? events.items.map(event => <p key={uuidv4()}>{event.name}</p>)
          : <span>{name} não aparece em nenhum evento.</span>}
      </div>

      <div className={styles.card_series}>
        <h2 className={styles.card_subtitle}>Séries:</h2>
        {series.items.length
          ? series.items.map(serie => <p key={uuidv4()}>{serie.name}</p>)
          : <span>{name} não aparece em nenhuma série.</span>}
      </div>
    </div>
  )
}
