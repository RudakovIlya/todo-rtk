import { useAppDispatch } from '@app/hooks'
import { DefaultTakType, TaskStatuses, TStatusType } from '@app/types'

import Delete from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import React, { ChangeEvent, FC, memo } from 'react'

import { EditableSpan } from '@ui/editable-span/EditableSpan'
import { Preloader } from '@ui/preloader/Preloader'

import { updateTaskThunk } from './tasks-reducer'
import { deleteTask } from '@features/tasks/tasks-slice'


type TaskPropsType = {
  todoStatus: TStatusType
  task: DefaultTakType
}

export const Task: FC<TaskPropsType> = memo(({ task, todoStatus }) => {
  const dispatch = useAppDispatch()
  const { todoListId, id: param } = task
  const removeTask = () => dispatch(deleteTask({ todoListId, anyParam: param }))

  const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      //@ts-ignore
      updateTaskThunk(task.todoListId, task.id, {
        status: event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
      }),
    )
  }

  const changeTitle = (title: string) => {
    //@ts-ignore
    dispatch(updateTaskThunk(task.todoListId, task.id, { title }))
  }

  return (
    <ListItem
      secondaryAction={
        <IconButton
          disabled={task.entityStatus === 'loading' || todoStatus === 'loading'}
          onClick={removeTask}
          aria-label='delete'>
          <Delete />
        </IconButton>
      }
      disablePadding>
      <ListItemButton dense>
        <ListItemIcon>
          <Checkbox
            disabled={task.entityStatus === 'loading' || todoStatus === 'loading'}
            checked={task.status === 2}
            disableRipple
            color='default'
            onChange={changeTaskStatus}
          />
        </ListItemIcon>
        {task.entityStatus === 'loading' ? (
          <Preloader />
        ) : (
          <EditableSpan title={task.title} changeTitle={changeTitle} />
        )}
      </ListItemButton>
    </ListItem>
  )
})