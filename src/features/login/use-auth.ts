import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ILoginData } from '../../app/types'

import { loginThunk, logoutThunk } from '@features/login/login-reducer'


export const useAuth = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn)

  const onSubmit = (data: ILoginData) => {
    dispatch(loginThunk(data))
  }
  const logout = () => {
    dispatch(logoutThunk())
  }

  return {
    logout,
    isLoggedIn,
    onSubmit,
  }
}