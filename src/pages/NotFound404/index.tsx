import { Header } from '../../components/Header'
import styles from './style.module.css'

export function NotFound404() {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.mainContent_title}>
          404 - Página não encontrada
        </h1>
      </main>
    </div>
  )
}
