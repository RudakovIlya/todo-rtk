import { authMeAPI } from '../../app/api'

import { APIResultCodes, TStatusType } from '../../app/types'

import { setIsLoggedIn } from '@features/login/login-reducer'

import { errorAPIHandler, handleServerNetworkError } from '@utils/error-handler'
import { Dispatch } from 'redux'


interface IAppState {
  status: TStatusType
  error: string | null
  isInit: boolean
}

const appInitState: IAppState = {
  status: 'idle',
  error: null,
  isInit: false,
}

export const appReducer = (state: IAppState = appInitState, action: AllAppActionsType): IAppState => {
  switch (action.type) {
    case 'app/SET_APP_STATUS': {
      return {
        ...state,
        status: action.payload,
      }
    }
    case 'app/SET_APP_ERROR': {
      return {
        ...state,
        error: action.payload,
      }
    }
    case 'app/INIT_APP': {
      return {
        ...state,
        isInit: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export const setAppStatusAC = (status: TStatusType) =>
  ({
    type: 'app/SET_APP_STATUS',
    payload: status,
  } as const)

export const setAppErrorAC = (error: string | null) =>
  ({
    type: 'app/SET_APP_ERROR',
    payload: error,
  } as const)

export const initAppAC = (isInit: boolean) =>
  ({
    type: 'app/INIT_APP',
    payload: isInit,
  } as const)

export const authMeThunk = () => async (dispatch: Dispatch) => {
  try {
    const response = await authMeAPI.authMe()
    if (response.data.resultCode === APIResultCodes.SUCCEEDED) {
      dispatch(setIsLoggedIn(true))
    } else {
      errorAPIHandler(response.data, dispatch)
    }
    dispatch(initAppAC(true))
  } catch (error) {
    handleServerNetworkError(error, dispatch)
  }
}

export type AllAppActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof initAppAC>