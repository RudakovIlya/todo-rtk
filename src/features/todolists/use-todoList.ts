import { useAppDispatch } from '@app/hooks'

import { useCallback } from 'react'
import { FilterValuesType } from './todolist-reducer'
import { changeTodoListFilter, deleteTodolist, updateTodolist } from './todo-slice'
import { createTask } from '@features/tasks/tasks-slice'


export const useTodoList = (id: string) => {
  const dispatch = useAppDispatch()

  const changeFilter = useCallback(
    (todolistID: string, filter: FilterValuesType): void => {
      dispatch(changeTodoListFilter({ id, filter }))
    },
    [dispatch, id],
  )

  const addTask = useCallback(
    (todoListId: string, param: string) => {
      dispatch(createTask({ todoListId, anyParam: param }))
    },
    [dispatch],
  )

  const removeTodoList = useCallback(() => {
    dispatch(deleteTodolist(id))
  }, [dispatch, id])

  const changeTodoListTitle = useCallback(
    (title: string) => {
      dispatch(updateTodolist({ id, title }))
    },
    [dispatch, id],
  )

  const onFilterChange = useCallback(
    (filter: FilterValuesType) => () => changeFilter(id, filter),
    [id, changeFilter],
  )
  return {
    addTask,
    removeTodoList,
    changeTodoListTitle,
    onFilterChange,
  }
}