import { DefaultTakType, ITodoList, TaskPriorities, TaskStatuses } from '../../app/types'

import { v1 } from 'uuid'

import { createTodoListAC, deleteTodoListAC, setTodoListsAC } from '../todolists/todolist-reducer'
import { addTaskAC, removeTaskAC, setTasksAC, tasksReducer, TasksType, updateTaskAC } from './tasks-reducer'


let todoListID1: string
let todoListID2: string
let taskID: string
let initialState: TasksType

beforeEach(() => {
  todoListID1 = v1()
  todoListID2 = v1()
  taskID = '2'
  initialState = {
    [todoListID1]: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.Completed,
        startDate: '',
        priority: TaskPriorities.Hi,
        order: 2,
        description: '',
        deadline: '',
        addedDate: '',
        todoListId: todoListID1,
        entityStatus: 'idle',
      },
      {
        id: taskID,
        title: 'CSS',
        status: TaskStatuses.Completed,
        startDate: '',
        priority: TaskPriorities.Hi,
        order: 2,
        description: '',
        deadline: '',
        addedDate: '',
        todoListId: todoListID1,
        entityStatus: 'idle',
      },
      {
        id: '3',
        title: 'CSS',
        status: TaskStatuses.Completed,
        startDate: '',
        priority: TaskPriorities.Hi,
        order: 2,
        description: '',
        deadline: '',
        addedDate: '',
        todoListId: todoListID1,
        entityStatus: 'idle',
      },
    ],
    [todoListID2]: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.Completed,
        startDate: '',
        priority: TaskPriorities.Hi,
        order: 2,
        description: '',
        deadline: '',
        addedDate: '',
        todoListId: todoListID1,
        entityStatus: 'idle',
      },
      {
        id: '2',
        title: 'CSS',
        status: TaskStatuses.Completed,
        startDate: '',
        priority: TaskPriorities.Hi,
        order: 2,
        description: '',
        deadline: '',
        addedDate: '',
        todoListId: todoListID1,
        entityStatus: 'idle',
      },
      {
        id: '3',
        title: 'CSS',
        status: TaskStatuses.Completed,
        startDate: '',
        priority: TaskPriorities.Hi,
        order: 2,
        description: '',
        deadline: '',
        addedDate: '',
        todoListId: todoListID1,
        entityStatus: 'idle',
      },
    ],
  }
})

test('correct task should be deleted from correct array', () => {
  const endState = tasksReducer(initialState, removeTaskAC(todoListID2, taskID))

  expect(endState).toEqual({
    [todoListID1]: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.Completed,
        startDate: '',
        priority: TaskPriorities.Hi,
        order: 2,
        description: '',
        deadline: '',
        addedDate: '',
        todoListId: todoListID1,
      },
      {
        id: taskID,
        title: 'CSS',
        status: TaskStatuses.Completed,
        startDate: '',
        priority: TaskPriorities.Hi,
        order: 2,
        description: '',
        deadline: '',
        addedDate: '',
        todoListId: todoListID1,
      },
      {
        id: '3',
        title: 'CSS',
        status: TaskStatuses.Completed,
        startDate: '',
        priority: TaskPriorities.Hi,
        order: 2,
        description: '',
        deadline: '',
        addedDate: '',
        todoListId: todoListID1,
      },
    ],
    [todoListID2]: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.Completed,
        startDate: '',
        priority: TaskPriorities.Hi,
        order: 2,
        description: '',
        deadline: '',
        addedDate: '',
        todoListId: todoListID1,
      },
      {
        id: '3',
        title: 'CSS',
        status: TaskStatuses.Completed,
        startDate: '',
        priority: TaskPriorities.Hi,
        order: 2,
        description: '',
        deadline: '',
        addedDate: '',
        todoListId: todoListID1,
      },
    ],
  })
  expect(endState[todoListID2].length).toBe(2)
})

test('correct task should be added to correct array', () => {
  let task: DefaultTakType = {
    id: '3',
    title: 'New Title',
    status: 2,
    description: '',
    addedDate: '',
    deadline: '',
    priority: 2,
    order: 0,
    startDate: '',
    todoListId: todoListID2,
    entityStatus: 'idle',
  }

  const endState = tasksReducer(initialState, addTaskAC(todoListID2, task))

  expect(endState[todoListID1].length).toBe(3)
  expect(endState[todoListID2].length).toBe(4)
  expect(endState[todoListID2][0]).toEqual(task)
})

test('new array should be added when new todolist is added', () => {
  const endState = tasksReducer(initialState, createTodoListAC({} as ITodoList))

  const keys = Object.keys(endState)
  const newKey = keys.find((key) => key !== todoListID1 && key !== todoListID2)
  if (!newKey) {
    throw Error('new key should be added')
  }
  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
  const action = deleteTodoListAC(todoListID2)
  const endState = tasksReducer(initialState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState[todoListID2]).toBeUndefined()
})

test('empty arrays should be added when set todolists', () => {
  const actions = setTodoListsAC([
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
  ])
  const endState = tasksReducer({}, actions)
  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState[todoListID1]).toBeDefined()
  expect(endState[todoListID2]).toBeDefined()
})

test('tasks should be added for todolist', () => {
  const actions = setTasksAC(todoListID1, initialState[todoListID1])
  const endState = tasksReducer(
    {
      [todoListID2]: [],
      [todoListID1]: [],
    },
    actions,
  )

  expect(endState[todoListID1].length).toBe(3)
  expect(endState[todoListID2].length).toBe(0)
})

test('correct task should be update', () => {
  const updateTitle = 'Update Title'
  const actionChangeTitle = updateTaskAC(todoListID1, taskID, { title: updateTitle })
  const actionChangeStatus = updateTaskAC(todoListID1, taskID, { status: TaskStatuses.New })

  const firstEndState = tasksReducer(initialState, actionChangeTitle)
  const secondEndState = tasksReducer(initialState, actionChangeStatus)

  expect(firstEndState[todoListID1][1].title).toBe(updateTitle)
  expect(secondEndState[todoListID1][1].status).toBe(TaskStatuses.New)
})