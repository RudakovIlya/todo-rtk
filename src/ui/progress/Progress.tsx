import Box from '@mui/material/Box'

import styles from './progress.module.css'

export const Progress = () => {
  return (
    <Box sx={{ width: '100%', position: 'absolute', bottom: 0, left: 0 }}>
      <span className={styles.span}>
        <span className={`${styles.first} ${styles.root}`}></span>
        <span className={`${styles.second} ${styles.root}`}></span>
      </span>
    </Box>
  )
}