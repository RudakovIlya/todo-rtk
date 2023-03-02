import { ITodoList } from '../../app/types'

import { tasksReducer, TasksType } from '../tasks/tasks-reducer'
import { createTodoListAC, ITodoListDomain, todoListReducer } from './todolist-reducer'


test('ids should be equals', () => {
  const startTasksState: TasksType = {}
  const startTodoListsState: ITodoListDomain[] = []
  const todo: ITodoList = {
    id: '2',
    title: 'Title',
    order: 0,
    addedDate: '',
  } as ITodoList
  const action = createTodoListAC(todo)
  const endTasksState = tasksReducer(startTasksState, action)
  const endTodoListsState = todoListReducer(startTodoListsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodoLists = endTodoListsState[0].id

  expect(idFromTasks).toBe(action.payload.todoList.id)
  expect(idFromTodoLists).toBe(action.payload.todoList.id)
})