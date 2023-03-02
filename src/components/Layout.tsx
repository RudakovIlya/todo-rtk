import Container from '@mui/material/Container'
import { FC, memo, PropsWithChildren } from 'react'

import { DescriptionSnackbar } from '@ui/snackbar/Snackbar'

import { Header } from './Header'


export const Layout: FC<PropsWithChildren> = memo(({ children }) => {
  return (
    <>
      <Header />
      <DescriptionSnackbar />
      <Container maxWidth={'lg'}>{children}</Container>
    </>
  )
})