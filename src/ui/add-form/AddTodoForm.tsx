import { useAppDispatch } from '@app/hooks'

import Grid from '@mui/material/Grid'
import { useCallback } from 'react'


import { AddItemForm } from './AddItemForm'
import { createTodolist } from '@features/todolists/todo-slice'


export const AddTodoForm = () => {
  const dispatch = useAppDispatch()

  const addTodoListCallback = useCallback(
    (title: string) => {
      dispatch(createTodolist(title))
    },
    [dispatch],
  )

  return (
    <Grid container style={{ padding: 20 }}>
      <AddItemForm addItem={addTodoListCallback} />
    </Grid>
  )
}