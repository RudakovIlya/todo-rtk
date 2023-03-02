import { ResponseType } from '@app/types'

import { AxiosError, isAxiosError } from 'axios'

import { setAppErrorAC, setAppStatusAC } from '@features/app/app-reducer'
import { AppDispatchType } from '@app/store'


export const errorAPIHandler = <T>(data: ResponseType<T>, dispatch: AppDispatchType) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('Some error occurred'))
  }
  dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: unknown, dispatch: AppDispatchType) => {
  const errors = error as Error | AxiosError
  if (!isAxiosError(error)) {
    alert(error)
  } else {
    dispatch(setAppErrorAC(errors.message))
  }
}