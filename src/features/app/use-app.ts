import { useAppDispatch, useAppSelector } from '../../app/hooks'

import { useEffect } from 'react'

import { authMeThunk } from '@features/app/app-reducer'


export const useApp = () => {
  const isInitApp = useAppSelector((state) => state.app.isInit)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authMeThunk())
  }, [dispatch])

  return isInitApp
}