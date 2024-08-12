import { LoaderSpin } from '../../components/LoaderSpin'
import styles from './LoadingContent.module.css'

export function LoadingContent() {
  return (
    <div className={styles.loaderContent}>
      <p className={styles.loaderMessage}>
        🦸 Buscando super-heróis...
      </p>
      <LoaderSpin />
    </div>
  )
}
