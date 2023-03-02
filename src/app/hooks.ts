import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatchType, RootStateType } from './store'


export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector