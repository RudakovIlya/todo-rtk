import { useAppDispatch, useAppSelector } from '../../app/hooks'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { forwardRef, SyntheticEvent } from 'react'

import { setAppErrorAC } from '@features/app/app-reducer'


const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const DescriptionSnackbar = () => {
  const error = useAppSelector((state) => state.app.error)
  const todoError = useAppSelector((state) => state.todos.error)
  const dispatch = useAppDispatch()

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppErrorAC(null))
  }

  return (
    <Snackbar open={!!error || !!todoError} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
        {error || todoError}
      </Alert>
    </Snackbar>
  )
}