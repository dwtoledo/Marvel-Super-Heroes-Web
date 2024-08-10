import { Link } from 'react-router-dom'
import ObjectiveLogo from '../../assets/images/objective-logo.png'
import styles from './style.module.css'

const fullName = 'Douglas Toledo'

export function Header() {
  function getInitials(name: string) {
    const words = name.split(' ')
    const initials = words.map(word => word[0].toUpperCase()).join('')
    return initials
  }

  return (
    <header className={styles.contentWrapper}>
      <Link to="/">
        <img
          src={ObjectiveLogo}
          alt="Objective escrito em preto e com detalhes laranja nas letras O, J e I."
        />
      </Link>
      <div />
      <div className={styles.userInfoWrapper}>
        <div className={styles.userInfo}>
          <span><b>{fullName}</b></span>
          <span> Teste de Front-end</span>
        </div>
        <span className={styles.userInitials}>{getInitials(fullName)}</span>
      </div>
    </header>
  )
}
