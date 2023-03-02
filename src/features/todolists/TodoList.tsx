import Delete from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { FC, memo } from 'react'

import { AddItemForm } from '@ui/add-form/AddItemForm'
import { CustomButton } from '@ui/button/CustomButton'
import { EditableSpan } from '@ui/editable-span/EditableSpan'
import { Preloader } from '@ui/preloader/Preloader'

import { Tasks } from '../tasks/Tasks'
import { ITodoListDomain } from './todolist-reducer'
import { useTodoList } from './use-todoList'


type TodoListPropsType = {
  todoList: ITodoListDomain
}

export const TodoList: FC<TodoListPropsType> = memo(({ todoList }) => {
  const { id, title, filter, entityStatus } = todoList

  const { onFilterChange, changeTodoListTitle, removeTodoList, addTask } = useTodoList(id)

  return (
    <>
      <h3>
        {entityStatus !== 'loading' ? (
          <EditableSpan title={title} changeTitle={changeTodoListTitle} />
        ) : (
          <Preloader />
        )}
        <IconButton disabled={entityStatus === 'loading'} aria-label='delete' onClick={removeTodoList}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm disabled={entityStatus === 'loading'} addItem={(title) => addTask(id, title)} />
      <Tasks todoStatus={entityStatus} filter={filter} id={id} />
      <div style={{ marginTop: 15, display: 'flex', columnGap: 15 }}>
        <CustomButton
          isActive={filter === 'all'}
          variant={filter === 'all' ? 'outlined' : 'contained'}
          onClick={onFilterChange('all')}>
          All
        </CustomButton>
        <CustomButton
          isActive={filter === 'active'}
          variant={filter === 'active' ? 'outlined' : 'contained'}
          onClick={onFilterChange('active')}>
          Active
        </CustomButton>
        <CustomButton
          isActive={filter === 'completed'}
          variant={filter === 'completed' ? 'outlined' : 'contained'}
          onClick={onFilterChange('completed')}>
          Completed
        </CustomButton>
      </div>
    </>
  )
})