import { useAppSelector } from '../app/hooks'

import { FC, PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'


export const RequiredAuth: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn)
  const location = useLocation()
  if (!isLoggedIn) {
    return <Navigate to={'/login'} state={{ from: location }} />
  }

  return <>{children}</>
}