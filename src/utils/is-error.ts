import { AnyAction } from 'redux'

export const isRejected = (action: AnyAction) => action.type.endsWith('/rejected')
export const isPending = (action: AnyAction) => action.type.endsWith('/pending')
export const isFulfilled = (action: AnyAction) => action.type.endsWith('/fulfilled')