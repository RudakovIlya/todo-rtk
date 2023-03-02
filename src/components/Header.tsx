import { useAppSelector } from '@app/hooks'

import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useLocation } from 'react-router-dom'

import { useAuth } from '@features/login/use-auth'

import { Progress } from '@ui/progress/Progress'


export const Header = () => {
  const { logout, isLoggedIn } = useAuth()
  const status = useAppSelector((state) => state.app.status)

  const { pathname } = useLocation()
  const pageTitle = pathname === '/' ? 'Todo' : pathname.slice(1, 2).toUpperCase() + pathname.slice(2)
  return (
    <AppBar sx={{ background: '#333333', position: 'relative' }} position='static'>
      <Container style={{ padding: 0 }} maxWidth={'lg'}>
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {pageTitle}
          </Typography>
          {isLoggedIn && (
            <Button onClick={logout} color='inherit'>
              Logout
            </Button>
          )}
        </Toolbar>
      </Container>
      {status === 'content-loading' && <Progress />}
    </AppBar>
  )
}