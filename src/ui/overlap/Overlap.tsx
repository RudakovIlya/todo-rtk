import { Preloader } from '@ui/main-preloader/Preloader'

import styles from './overlap.module.css'

export const Overlap = () => {
  return (
    <div className={styles.overlap}>
      <Preloader />
    </div>
  )
}