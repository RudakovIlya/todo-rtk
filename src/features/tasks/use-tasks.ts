import { useAppDispatch, useAppSelector } from '@app/hooks'
import { filteredTaskSelector } from '@features/tasks/tasksSelector'
import { useEffect } from 'react'
import { FilterValuesType } from '@features/todolists/todo-slice'
import { fetchTasks } from '@features/tasks/tasks-slice'

export const useTasks = (id: string, filter: FilterValuesType) => {
  const tasks = useAppSelector((state) => filteredTaskSelector(state.tasks[id], filter))
  const status = useAppSelector((state) => state.app.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasks(id))
  }, [dispatch, id])

  return {
    tasks,
    status,
  }
}