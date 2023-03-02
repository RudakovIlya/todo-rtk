import { useAppSelector } from '../../app/hooks'

import { useMemo } from 'react'

import { ItemWrapper } from '@ui/wrappers/ItemWrapper'

import { TodoList } from './TodoList'


export const TodoLists = () => {
  const todoLists = useAppSelector((state) => state.todos.todos)
  const todoListsItem = useMemo(
    () =>
      todoLists?.map((todoList) => {
        return (
          <ItemWrapper key={todoList.id}>
            <TodoList todoList={todoList} />
          </ItemWrapper>
        )
      }),
    [todoLists],
  )

  return <>{todoListsItem}</>
}