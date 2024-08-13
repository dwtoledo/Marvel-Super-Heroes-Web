/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @stylistic/max-len */
import styles from './style.module.css'
import { useEffect, useState, useCallback } from 'react'
import md5 from 'crypto-js/md5'

interface CharacterDetailsCardProps {
  avatarUrl: string;
  name: string;
  description: string;
  events: { items: { name: string; resourceURI: string; thumbnail: string }[] };
  series: { items: { name: string; resourceURI: string; thumbnail: string }[] };
}

export function CharacterDetailsCard({
  avatarUrl,
  name,
  description,
  events,
  series,
}: CharacterDetailsCardProps) {
  const [eventData, setEventData] = useState(events.items)
  const [serieData, setSerieData] = useState(series.items)

  const fetchThumbnails = useCallback(async (items: any[]) => {
    const updatedItems = await Promise.all(
      items.map(async (item) => {
        const thumbnail = await getThumbnailByUrl(item.resourceURI)
        return { ...item, thumbnail }
      }),
    )
    return updatedItems
  }, [])

  useEffect(() => {
    const fetchEventThumbnails = async () => {
      if (events.items?.length) {
        const updatedEvents = await fetchThumbnails(events.items)
        setEventData(updatedEvents)
      }
    }
    fetchEventThumbnails()
  }, [events, fetchThumbnails])

  useEffect(() => {
    const fetchSerieThumbnails = async () => {
      if (series.items?.length) {
        const updatedSeries = await fetchThumbnails(series.items)
        setSerieData(updatedSeries)
      }
    }
    fetchSerieThumbnails()
  }, [series, fetchThumbnails])

  async function getThumbnailByUrl(resourceURI: string) {
    const publicKey = import.meta.env.VITE_API_PUBLIC_KEY
    const privateKey = import.meta.env.VITE_API_PRIVATE_KEY
    const timestamp = new Date().getTime()
    const hash = md5(timestamp + privateKey + publicKey).toString()
    const url = `${resourceURI}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`

    try {
      const response = await fetch(url.replace('http://', 'https://'))
      if (!response.ok) {
        throw new Error('Não foi possível obter a imagem do evento!')
      }
      const data = await response.json()
      const { path, extension } = data.data.results[0].thumbnail
      return `${path}.${extension}`
    } catch (error: any) {
      console.error('Fetch error:', error)
      return ''
    }
  }

  return (
    <div className={styles.card}>
      <figure className={styles.card_picture}>
        <img src={avatarUrl} alt={`Imagem do personagem ${name}`} />
        <figcaption>
          <b>Descrição:</b> {description || 'A Marvel não disponibilizou descrição para esse personagem.'}
        </figcaption>
      </figure>

      <section className={styles.card_events}>
        <h2 className={styles.card_subtitle}>Eventos:</h2>
        {eventData?.length
          ? (
              eventData.map((event) => (
                <article key={event.resourceURI} className={styles.coverContainer}>
                  {event.thumbnail
                    ? <img src={event.thumbnail} alt={`Capa do evento ${event.name}`} />
                    : <span className={styles.loadingCoverMessage}>Carregando capa...</span>}
                  <p>{event.name}</p>
                </article>
              ))
            )
          : (
            <span>{name} não aparece em nenhum evento.</span>
            )}
      </section>

      <section className={styles.card_series}>
        <h2 className={styles.card_subtitle}>Séries:</h2>
        {serieData?.length
          ? (
              serieData.map((serie) => (
                <article key={serie.resourceURI} className={styles.coverContainer}>
                  {serie.thumbnail
                    ? <img src={serie.thumbnail} alt={`Capa da série ${serie.name}`} />
                    : <span className={styles.loadingCoverMessage}>Carregando capa...</span>}
                  <p>{serie.name}</p>
                </article>
              ))
            )
          : (
            <span>{name} não aparece em nenhuma série.</span>
            )}
      </section>
    </div>
  )
}
