import { useAppSelector } from '@app/hooks'

import Container from '@mui/material/Container'

import { TodoLists } from '@features/todolists/TodoLists'
import { useTodoLists } from '@features/todolists/use-todolists'

import { AddTodoForm } from '@ui/add-form/AddTodoForm'
import { SkeletonList } from '@ui/skeletons/SkeletonList'
import { ListWrapper } from '@ui/wrappers/ListWrapper'


export const TodoListPage = () => {
  const status = useAppSelector((state) => state.app.status)
  useTodoLists()

  return (
    <Container>
      <AddTodoForm />
      <ListWrapper>{status === 'loading' ? <SkeletonList quantity={6} /> : <TodoLists />}</ListWrapper>
    </Container>
  )
}