import { FaArrowLeft } from 'react-icons/fa'
import styles from './style.module.css'

interface BackButtonProps {
  onClick: () => void
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <span className={styles.container} onClick={onClick}>
      <FaArrowLeft />
      Voltar
    </span>
  )
}
