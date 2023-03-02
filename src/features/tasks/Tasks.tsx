import { TStatusType } from '../../app/types'

import List from '@mui/material/List'
import { FC, memo, useMemo } from 'react'

import { SkeletonText } from '@ui/skeletons/SkeletonText'

import { FilterValuesType } from '../todolists/todolist-reducer'
import { Task } from './Task'

import { useTasks } from '@features/tasks/use-tasks'


interface ITasks {
  id: string
  todoStatus: TStatusType
  filter: FilterValuesType
}

export const Tasks: FC<ITasks> = memo(({ id, filter, todoStatus }) => {
  const { tasks, status } = useTasks(id, filter)

  const tasksElements = useMemo(
    () =>
      tasks.map((task) => {
        return <Task key={task.id} task={task} todoStatus={todoStatus} />
      }),
    [tasks, todoStatus],
  )

  return status !== 'succeeded' ? <List>{tasksElements}</List> : <SkeletonText />
})