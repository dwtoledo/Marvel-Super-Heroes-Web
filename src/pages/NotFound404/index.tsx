import { Header } from '../../components/Header'
import styles from './style.module.css'

export function NotFound404() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.content}>
        <h1 className={styles.content_title}>
          404 - Página não encontrada
        </h1>
      </main>
    </div>
  )
}
