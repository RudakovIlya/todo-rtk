import { useAppDispatch } from '@app/hooks'

import { useEffect } from 'react'

import { fetchTodos } from '@features/todolists/todo-slice'


export const useTodoLists = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])
}