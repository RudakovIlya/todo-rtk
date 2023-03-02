import { ITodoList } from '../../app/types'

import { v1 } from 'uuid'

import {
  changeTodoListFilterAC,
  createTodoListAC,
  deleteTodoListAC,
  FilterValuesType,
  ITodoListDomain,
  setTodoListsAC,
  todoListReducer,
  updateTodoListAC,
} from './todolist-reducer'

let initialState: ITodoListDomain[]
let todoListID1: string
let todoListID2: string

beforeEach(() => {
  todoListID1 = v1()
  todoListID2 = v1()

  initialState = [
    {
      id: todoListID1,
      title: 'What to learn',
      filter: 'active',
      order: 2,
      addedDate: '',
      entityStatus: 'idle',
    },
    {
      id: todoListID2,
      title: 'What to buy',
      filter: 'active',
      order: 2,
      addedDate: '',
      entityStatus: 'idle',
    },
  ]
})

test('correct todolist should be removed', () => {
  const endState = todoListReducer(initialState, deleteTodoListAC(todoListID1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todoListID2)
})

test('correct todolist should be added', () => {
  const Title = 'New Todo Title'
  const TodoList: ITodoList = {
    id: '3',
    title: Title,
    order: 0,
    addedDate: '',
  }

  const endState = todoListReducer(initialState, createTodoListAC(TodoList))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(Title)
  expect(endState[0].id).toBeDefined()
})

test('correct todolist should change its name', () => {
  const newTodolistTitle = 'New Todo Title'

  const endState = todoListReducer(initialState, updateTodoListAC(todoListID2, newTodolistTitle))

  expect(endState[0].title).toBe('What to learn')

  expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
  const newFilter: FilterValuesType = 'completed'

  const endState = todoListReducer(initialState, changeTodoListFilterAC(todoListID2, newFilter))
  expect(endState[0].filter).toBe('active')
  expect(endState[1].filter).toBe(newFilter)
})

test('todolists should be set to the store', () => {
  const endState = todoListReducer([], setTodoListsAC(initialState))
  expect(endState.length).toBe(2)
})