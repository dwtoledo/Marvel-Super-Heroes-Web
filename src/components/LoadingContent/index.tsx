/* eslint-disable @stylistic/max-len */
import { LoaderSpin } from '../../components/LoaderSpin'
import styles from './style.module.css'

interface LoadingContentProps {
  message?: string
}

export function LoadingContent({ message = 'Carregando...' }: LoadingContentProps) {
  return (
    <div className={styles.content}>
      <p className={styles.message}>
        {message}
      </p>
      <LoaderSpin />
    </div>
  )
}
