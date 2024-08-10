import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'

import styles from './style.module.css'

export function DefaultLayout() {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <Outlet />
    </div>
  )
}
