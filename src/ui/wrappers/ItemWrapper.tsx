import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { FC, PropsWithChildren } from 'react'

export const ItemWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid item xs={6} sm={4} md={4} height={'100%'}>
      <Paper elevation={2} style={{ padding: 15, borderRadius: 16 }}>
        {children}
      </Paper>
    </Grid>
  )
}