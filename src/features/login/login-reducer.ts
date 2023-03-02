import { authMeAPI } from '../../app/api'
import { APIResultCodes, ILoginData } from '../../app/types'

import { setAppStatusAC } from '@features/app/app-reducer'

import { errorAPIHandler, handleServerNetworkError } from '@utils/error-handler'
import { Dispatch } from 'redux'


const initialState = {
  isLoggedIn: false,
}
type InitialStateType = typeof initialState

export const loginReducer = (
  state = initialState,
  action: ReturnType<typeof setIsLoggedIn>,
): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN': {
      return {
        ...state,
        isLoggedIn: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export const setIsLoggedIn = (isLogged: boolean) =>
  ({ type: 'login/SET-IS-LOGGED-IN', payload: isLogged } as const)

export const loginThunk =
  (data: ILoginData) =>
    async (dispatch: Dispatch) => {
      dispatch(setAppStatusAC('content-loading'))
      try {
        const response = await authMeAPI.login(data)
        if (response.data.resultCode === APIResultCodes.SUCCEEDED) {
          dispatch(setAppStatusAC('content-succeeded'))
          dispatch(setIsLoggedIn(true))
        } else {
          errorAPIHandler(response.data, dispatch)
        }
      } catch (error) {
        handleServerNetworkError(error, dispatch)
      }
    }

export const logoutThunk = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('content-loading'))
  try {
    const response = await authMeAPI.logout()
    if (response.data.resultCode === APIResultCodes.SUCCEEDED) {
      dispatch(setAppStatusAC('content-succeeded'))
      dispatch(setIsLoggedIn(false))
    } else {
      console.log(response.data.messages[0])
      errorAPIHandler(response.data, dispatch)
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
  }
}

export type AllLoginTypes = ReturnType<typeof setIsLoggedIn>