import Grid from '@mui/material/Grid'
import { FC, PropsWithChildren } from 'react'

export const ListWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {children}
    </Grid>
  )
}